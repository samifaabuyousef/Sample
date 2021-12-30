import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Tag} from '../../../cms/models/tag.model';
import {LookupService} from '../../services/lookup.service';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {INgxSelectOption} from 'ngx-select-ex';

@Component({
  selector: 'app-app-topic-content-class',
  templateUrl: './app-topic-content-class.component.html',
  styleUrls: ['./app-topic-content-class.component.scss']
})
export class AppTopicContentClassComponent implements OnInit , AfterViewInit {
  @Input() form: FormGroup;
  @Input() selectedTopicContentClass: any[] = [];
  @Output() searchValue = new EventEmitter();
  loading = true;
  isSearching = false;

  // tslint:disable-next-line:variable-name
  private _topicsData = new BehaviorSubject<any[]>([]);

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  filterValue: any = '';
  searchForm: FormGroup;

  // change data to use getter and setter
  items: any = [{id: 0, description: 'All Topics'}, { id: 1, description: 'Attached Topics'}];
  selectTitle: any = 'All Topics';
  selectionType: any;
  @Input()
  set topicsData(value) {
    // set the latest value for _data BehaviorSubject
    this._topicsData.next(value);
  }
  get topicsData() {
    // get the latest value from _data BehaviorSubject
    return this._topicsData.getValue();
  }

  @Input() set isLookupLoading(value) {
    this.isSearching = value;
  }

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit() {
    this._topicsData
      .subscribe(x => {
        this.initForm();
        this.initSearchForm();
      }, () => {

      }, () => {
      });
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.search();
        })
      )
      .subscribe();
  }

  private initForm() {
    const control = this.form.controls.topics as FormArray;
    control.clear();
    this.topicsData.forEach(x => {
      control.push(
        this.fb.group({
            title: x.title,
            topicContentClasses: this.setTopicContentClasses(x),
            count: this.getTopicContentClassesCount(x),
            visible: x.visible !== undefined ? x.visible : true
          }
        )
      );
    });
  }

  setTopicContentClasses(x) {
    const arr = new FormArray([]);
    x.content_class_topic.forEach(y => {
      arr.push(this.fb.group({
        id: y.id,
        title: y.title,
        topicContentClassCheck: this.selectedTopicContentClass.includes(y.id),
        visible: y.visible !== undefined ? y.visible : true
      }));
    });
    this.isSearching = false;
    return arr;
  }

  getTopicContentClassesCount(x) {
    let count = 0;
    x.content_class_topic.forEach(y => {
      if (this.selectedTopicContentClass.includes(y.id)) {
        count++;
      }
    });
    return count;
  }

  get topics() {
    return (this.form.get('topics') as FormArray);
  }

  topicContentClasses(topic) {
    return (topic.get('topicContentClasses') as FormArray);
  }

  prepareContentClassTopic(topicContentClassArray) {
    // content_class_topic
    let contentClassTopicFiltered = [];
    topicContentClassArray.forEach(val => {
        const checkedTopicContentClass = val.topicContentClasses.filter((topicContentClass) => {
          return topicContentClass.topicContentClassCheck === true;
        });
        contentClassTopicFiltered = contentClassTopicFiltered.concat(checkedTopicContentClass);
      }
    );
    const contentClassTopicIds = contentClassTopicFiltered.map(contentClassTopic => ({id: contentClassTopic.id}));
    return contentClassTopicIds;
  }
  private initSearchForm() {
    this.searchForm = this.fb.group({
      searchText: ''
    });
  }

  onSubmit(searchForm: FormGroup) {
    this.search();
  }

  onChange() {
    this.filterValue = this.searchInput.nativeElement.value.trim();
  }

  isAllTopicsVisible() {
    const temp = this.topicsData.filter((v) => {
      const visible =  v.visible !== undefined ? v.visible : true;
      return visible === true;
    });
    return temp.length > 0;
  }

  getSummaryData(topicContentClasses: any) {
    const tempArray = [];
    topicContentClasses.forEach((v) => {
      if (v.topicContentClassCheck){
        tempArray.push(v.title);
      }
    });
    return tempArray.length > 0 ? '( ' + tempArray.join(' , ') + ' )' : '';
  }

  search() {
    this.isSearching = true;
    const search = this.searchInput.nativeElement.value.trim();
    const selectedFilter = this.selectionType;
    const tempTopicData = [];
    this.topicsData.forEach((x) => {
      const temp = x;
      let count = 0;
      if (selectedFilter === 1) {
        temp.content_class_topic.forEach((y) => {
          const contentClassTemp = y;
          if (this.selectedTopicContentClass.includes(y.id.toLowerCase())) {
            contentClassTemp.visible = true;
            count++;
          } else {
            contentClassTemp.visible = false;
          }
        });
        temp.visible = temp.title.toLowerCase().includes(search.toLowerCase()) && count > 0;
      } else {
        temp.content_class_topic.forEach((y) => {
          y.visible = true;
        });
        temp.visible = temp.title.toLowerCase().includes(search.toLowerCase());
      }
      tempTopicData.push(temp);
    });
    this.topicsData = tempTopicData;
  }

  itemSelected($event: INgxSelectOption[]) {
    if ($event[0]) {
      this.selectionType = $event[0].data.id;
    } else {
      this.selectionType = false;
    }
    this.search();
  }
}
