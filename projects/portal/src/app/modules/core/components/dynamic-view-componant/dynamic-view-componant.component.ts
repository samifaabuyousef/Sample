import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewPagedData} from '../../models/view-page-model';

@Component({
  selector: 'app-dynamic-view-componant',
  templateUrl: './dynamic-view-componant.component.html',
  styleUrls: ['./dynamic-view-componant.component.scss']
})
export class DynamicViewComponantComponent<T> implements OnInit {

  @Input() data: ViewPagedData<T> = {data: []};
  @Input() RouterLinkOnCancel: string;

  constructor() {
  }

  ngOnInit() {
  }

}
