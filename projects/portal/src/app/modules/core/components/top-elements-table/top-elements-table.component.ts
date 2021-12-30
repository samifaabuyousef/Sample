import {Component, OnInit, Input, Output, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {  TopPrescribedAlbums } from 'nabed-components';

@Component({
  selector: 'app-top-elements-table',
  templateUrl: './top-elements-table.component.html',
  styleUrls: ['./top-elements-table.component.scss']
})
export class TopElementsTableComponent implements OnInit {
  @Input() headers: string[];
  @Input() rows: any[][];
  @Input() service: any;
  @Input() removeFilter:boolean;
  @Input() tableTitle: string ;
  openModel = false;
  @ViewChild('modal', {static: true}) modal;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm: FormGroup;

  modalKey:string='';

  @Input() topPrescribedAlbumsData: TopPrescribedAlbums[] = [];
  constructor(private fb: FormBuilder) {
  }

  changingData(filterName){

    this.topPrescribedAlbumsData=[
      {
        name : 'What is Type 2 rrrrrrrrrrr?',
        totalClicks : 33,
        totalViews : 57
      }
      
    ];
  }
  ngOnInit() {
    this.initSearchForm();
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: '',
    });
  }

  onSubmit(searchForm: FormGroup) {
    this.search();
  }

  private search() {
    const search = this.searchInput.nativeElement.value.trim();

    if (search !== '') {
      const queryString = {
        q: search
      };
      // this.dataSource.load(queryString, 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
    } else {
      // this.load();
    }
  }

  openModal() {

    this.openModel = true;

    this.modal.open();

  }

  closeModal() {
    this.modal.close();
  }

}
