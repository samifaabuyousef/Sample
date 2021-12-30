import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseDataSource} from '../../../../core/models/base-data-source';
import {MatPaginator, Sort} from '@angular/material';
import {AdvertiserModal} from '../../../advertiser/modals/advertiser-modal';
import {CampaignService} from '../../campaign.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupComponent} from 'nabed-components';
import * as objectPath from 'object-path';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit , AfterViewInit {

  dataSource: BaseDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm: FormGroup;
   sortingFilter: {};
   sortArray: any[];
   dataSourceData: any;
  filterObjecyValue: any;
  displayedColumns: any = ['id', 'name', 'arabicName', 'advertiser', 'brand', 'country', 'actions'];

  constructor(
    public campaignService: CampaignService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.dataSource = new BaseDataSource<any>(this.campaignService);
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
    this.dataSource.load(newObj, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
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
  }

  public openDeleteDialog(campaign) {
    const name = objectPath.coalesce(campaign, [ 'name', 'generic_name'], '');
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Delete Campaign',
        description: 'Are you sure you want to delete ' + name + ' Campaign ?'
      },
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.dataSource.setLoadingSubject(true);
          this.campaignService.delete(campaign.id).subscribe(res => {
            this.load();
            this.toastr.success('  campaign deleted successfully');
            setTimeout(() => {
              this.dataSource.setLoadingSubject(false);
            }, 2000);
          }, error => {
            this.toastr.error('campaign can not be deleted because it is attached to another data');
            this.dataSource.setLoadingSubject(false);
            throw error;
          });
        }
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
        case 'country':
          this.sortArray.push({key: 'country', direction: sort.direction});
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
}
