import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseDataSource} from '../../../../core/models/base-data-source';
import {AdvertiserModal} from '../../modals/advertiser-modal';
import {MatPaginator, Sort} from '@angular/material';
import {AdvertiserService} from '../../advertiser.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {PopupComponent} from 'nabed-components';
import {MatDialog} from '@angular/material/dialog';
import * as objectPath from 'object-path';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-advertiser-list',
  templateUrl: './advertiser-list.component.html',
  styleUrls: ['./advertiser-list.component.scss']
})
export class AdvertiserListComponent implements OnInit , AfterViewInit {
  dataSource: BaseDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm: FormGroup;

  displayedColumns: any = ['id', 'name', 'arabicName', 'actions'];
  private filterObjecyValue: any;
  private sortingFilter: {};
  private sortArray: any[];
  private dataSourceData: any;

  constructor(
    public advertiserService: AdvertiserService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) {
  }

  ngOnInit() {
    this.dataSource = new BaseDataSource<any>(this.advertiserService);
    this.paginator.page.pipe(
      tap(() => this.load())
    ).subscribe();
    this.load();
    this.initSearchForm();
    this.dataSource.currentData.subscribe((data) => {

      this.dataSourceData = data;
    });

  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: '',
    });
  }

  sortData(sort: Sort) {

    if (!sort.active || sort.direction === '' || !this.dataSourceData) {
      return;
    }
    this.dataSourceData.data = this.dataSourceData.data.sort((a, b) => {

      this.sortArray = [];
      switch (sort.active) {
        case 'id':
          this.sortArray.push({key: 'id', direction: sort.direction});
          break;
        case 'name':
          this.sortArray.push({key: 'generic_name', direction: sort.direction});
          break;
        case 'arabicName':
          this.sortArray.push({key: 'name', direction: sort.direction});
          break;
        default:
          return 0;
      }
    });
    const obj: any = {};
    this.sortingFilter = {};
    if (this.sortArray.length > 0) {


      for (let index = 0; index < this.sortArray.length; index++) {
        const element = this.sortArray[index];
        obj['sort[' + index.toString() + '][key]'] = element.key;
        obj['sort[' + index.toString() + '][direction]'] = element.direction;

      }

      this.sortingFilter = obj;
    }

    this.load();
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.search();
        })
      )
      .subscribe();
  }

  load() {
    const newObj = {
      ...this.sortingFilter,
      ...this.filterObjecyValue,
    };
    this.dataSource.load(newObj, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize ? this.paginator.pageSize : 10);
  }

  onSubmit(searchForm: FormGroup) {
    this.search();
  }

  private search() {
    const search = this.searchInput.nativeElement.value.trim();

    this.filterObjecyValue = {
      'q': search
    };
    this.load();
    // if (search !== '') {
    //   const queryString = {
    //     q: search
    //   };
    //   this.load();
    //   this.dataSource.load(queryString, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
    // } else {
    //   this.load();
    // }
  }

  public openDeleteDialog(advertiser) {
    const name = objectPath.coalesce(advertiser, [ 'name', 'generic_name'], '');
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Delete Advertiser',
        description: 'Are you sure you want to delete ' + name + ' Advertiser ?'
      },
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.dataSource.setLoadingSubject(true);
          this.advertiserService.delete(advertiser.id).subscribe(res => {
            this.load();
            this.toastr.success(' Advertiser deleted successfully');
            setTimeout(() => {
              this.dataSource.setLoadingSubject(false);
            }, 2000);
          }, error => {
            this.toastr.error('Advertiser can not be deleted because it is attached to another data');
            this.dataSource.setLoadingSubject(false);
            throw error;
          });
        }
      });
  }
}
