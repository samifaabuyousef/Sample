import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

export class ContentClassContentConfig {
  all: any[];
  used: any[];
  contain: any[];
  filtered: any[];
  onAdd=new EventEmitter();
  onReset=new EventEmitter();
  enableAdd = true;

  constructor() {
    this.all = [];
    this.used = [];
    this.contain = [];
    this.filtered = [];
  }

  get containWeighted() {
    const t = this.contain.map((value, index) => ({id: value.id, weight: index + 1}));
    return t.length ? t : '';
  }

  getFiltered() {
    if (this.enableAdd && !this.filtered.some(e => e.id === '-1')) {
      this.filtered.push({id: '0', title: '', disabled: true});
      this.filtered.push({id: '-1', title: ''});
    }
    return this.filtered;
  }

  fill(items) {
    this.all = items;
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }

  add(item, type) {
    this.addContain(item);
  }

  addContain(item) {
    this.contain.push(item);
    this.used.push(item);
    this.onAdd.emit(item)
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }

  resetContain() {
    this.contain = [];
    this.used = [];
    this.filtered = _.differenceBy(this.all, this.used, 'id');
    this.onReset.emit();
  }

  removeContain(item) {
    this.contain = this.contain.filter(d => d.id !== item.id);
    this.used = this.used.filter(d => d.id !== item.id);
    this.filtered = _.differenceBy(this.all, this.used, 'id');
  }
}

@Component({
  selector: 'app-general-selector',
  templateUrl: './general-selector.component.html',
  styleUrls: ['./general-selector.component.scss']
})
export class GeneralSelectorComponent implements OnInit {

  @Input() config: ContentClassContentConfig;
  @Input() type: 'contain' | 'related';

  @Input() selectTitle = 'Attach';
  @Input() disabled = false;
  @Input() enableAdd = false;

  @Input() sortable = true;

  @Input() enableOverride = false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onContainChanged = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRelatedChanged = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAddClicked = new EventEmitter();

  public ngxValue;

  constructor() {}

  ngOnInit() {
    this.config.enableAdd = this.enableAdd;
  }

  get items() {
    return this.config.contain;
  }

  itemSelected(event) {
    if (!(event && event[0] && event[0].data && event[0].data.id !== '-1')) {
      setTimeout(e => this.ngxValue = null, 0);
      return;
    }

    setTimeout(e => this.ngxValue = null, 0);

    this.config.addContain(event[0].data);
    this.onContainChanged.emit(this.config.containWeighted);
    return;
  }

  removeItem(item) {
    this.config.removeContain(item);
    this.onContainChanged.emit(this.config.containWeighted);
    return;
  }

  addClicked(searchText) {
    this.onAddClicked.emit(searchText);
  }
}
