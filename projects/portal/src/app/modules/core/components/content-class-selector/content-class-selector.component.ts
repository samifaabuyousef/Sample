import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {config, Observable, of, pipe} from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

export class ContentClassConfig {
  all: any[];
  used: any[];
  contain: any[];
  related: any[];
  filtered: any[];
  onAdd = new EventEmitter();
  onRemove = new EventEmitter<any>();
  enableAdd = true;

  constructor() {
    this.all = [];
    this.used = [];
    this.contain = [];
    this.related = [];
    this.filtered = [];
  }

  get containWeighted() {
    const t = this.contain.map((value, index) => ({id: value.id, weight: index + 1}));
    return t.length ? t : '';
  }

  get containFullWeighted() {
    const t = this.contain.map((value, index) => ({
      id: value.id,
      title: value.override_title,
      friendly_title: value.override_friendly_title,
      weight: index + 1
    }));
    return t.length ? t : '';
  }

  get containFullWeightedWithImage() {
    const t = this.contain.map((value, index) => ({
      id: value.id,
      title: value.override_title,
      subTitle: value.subtitle,
      friendly_title: value.override_friendly_title,
      image: value.image,
      weight: index + 1
    }));
    return t.length ? t : '';
  }

  get containFullWeightedWithTitle() {
    const t = this.contain.map((value, index) => ({
      id: value.id,
      title: value.title,
      friendly_title: value.override_friendly_title,
      weight: index + 1
    }));
    return t.length ? t : '';
  }

  get relatedWeighted() {
    const t = this.related.map((value, index) => ({id: value.id, weight: index + 1}));
    return t.length ? t : '';

  }

  getFiltered() {
    if (this.enableAdd && !this.filtered.some(e => e ? e.id === '-1' : false)) {
      this.filtered.push({id: '0', title: '0', disabled: true});
      this.filtered.push({id: '-1', title: '-1'});
    }

    return this.filtered;
  }

  fill(items) {
    this.all = items;
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }

  add(item, type) {
    if (type === 'contain') {
      this.addContain(item);
    } else {
      this.addRelated(item);
    }
  }

  addContain(item) {

    this.contain.push(item);
    this.used.push(item);
    const index = this.all.findIndex(x => x.id === item.id)
    if (index === -1) {
      this.all.push(item)
    }
    this.filtered = _.differenceBy(this.all, this.used, 'id');
    this.onAdd.emit();
  }

  addRelated(item) {
    this.related.push(item);
    this.used.push(item);
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }

  removeContain(item) {

    this.contain = this.contain.filter(d => d.id !== item.id);


    this.used = this.used.filter(d => d.id !== item.id);


    this.filtered = _.differenceBy(this.all, this.used, 'id');
    this.onRemove.emit(item)

  }

  removeAllSelected() {
    this.contain = this.contain.splice(1, this.contain.length);


    this.used = this.used.splice(1, this.used.length);

    this.filtered = _.differenceBy(this.all, this.used, 'id');

    this.onRemove.emit()
  }

  removeRelated(item) {
    this.related = this.related.filter(d => d.id !== item.id);
    this.used = this.used.filter(d => d.id !== item.id);
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }
}

@Component({
  selector: 'app-content-class-selector',
  templateUrl: './content-class-selector.component.html',
  styleUrls: ['./content-class-selector.component.scss']
})
export class ContentClassSelectorComponent implements OnInit, AfterViewInit {

  @Input() config: ContentClassConfig;
  @Input() type: 'contain' | 'related';
  @Input() multiple = true;
  @Input() selectTitle = 'Attach';
  @Input() disabled = false;
  @Input() enableAdd = false;
  @Input() sortable = true;
  @Input() input='t';
  @Input() enableFetchData = false;
  @Input() enableOverride = false;
  @Input() enableImage = false;
  @Input() scrollToElementId = null;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onContainChanged = new EventEmitter();

  @Output() onContainRemoved = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRelatedChanged = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAddClicked = new EventEmitter();
  
  @Output() onGetData = new EventEmitter();
  searching=false;
  public ngxValue;

  oldValue: any;
  newValue: any;

  constructor() {
  }

  ngOnInit() {
    this.config.enableAdd = this.enableAdd;

  }

  ngAfterViewInit() {

    if (this.scrollToElementId && document.getElementById(this.scrollToElementId)) {
      document.getElementById(this.scrollToElementId).scrollIntoView();
    }
  }

  get items() {

    return this.type === 'contain' ? this.config.contain : this.config.related;

  }

  imageChanged(file, item: any) {
    item.image = file;

  }

  removeImage(item: any) {
    item.image = null;
  }

  isNotObject(item) {
    if (typeof (item) !== 'object' && item) {
      return true;
    }
    return false;
  }

  itemSelected(event) {

    if (!(event && event[0] && event[0].data && event[0].data.id !== '-1')) {
      setTimeout(e => this.ngxValue = null, 0);
      return;
    }

    setTimeout(e => this.ngxValue = null, 0);

    if (this.type === 'contain') {
      if (!this.multiple) {

        for (let index = 0; index < this.config.containWeighted.length; index++) {
          const element = this.config.containWeighted[index];

          this.removeItem(element);
        }

      }
      this.config.addContain(event[0].data);
      this.onContainChanged.emit(this.config.containWeighted);
      return;
    }

    this.config.addRelated(event[0].data);
    this.onRelatedChanged.emit(this.config.relatedWeighted);
  }

  removeItem(item) {


    if (this.type === 'contain') {
      this.config.removeContain(item);
      this.onContainRemoved.emit(this.config.containWeighted);
      this.onContainChanged.emit(this.config.containWeighted);
      return;
    }

    this.config.removeRelated(item);
    this.onRelatedChanged.emit(this.config.relatedWeighted);
  }

  changingType(e,type){
  
  const index =this.config.getFiltered().filter(x => {
 
    return x.title.toString().search(e)>-1
  
  });

  if((index &&  index.length ===0) || e ===''){

    this.oldValue = this.newValue;
    this.newValue = e;
    this.searching = true;
   
    setTimeout(() => {
      if(e === this.newValue){
     
        this.getData(e);

      }
    }, 500);
  }

 

  }
  addClicked(searchText) {
    this.onAddClicked.emit(searchText);
  }

  getData(searchText){
    this.onGetData.emit({'searchText':searchText,'config':this.config,'contentClassComponant':this});
  }
  orderChanged() {
    this.onContainChanged.emit(this.config.containWeighted);
    this.onRelatedChanged.emit(this.config.relatedWeighted);
  }
}
