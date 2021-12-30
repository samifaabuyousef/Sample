import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss']
})
export class DynamicFilterComponent implements OnInit {

  @Input() filterOptions: string[];
  @Input() changeFilterLink: string;
  @Input() selectedFilter: string;
  @Output() filterselectedOptionion = new EventEmitter<string>();
  selectedOption = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.selectedOption = this.selectedFilter;
  }

  changeFilterOption(option: string) {
    this.selectedOption = option;
    this.filterselectedOptionion.emit(option);
  }
}
