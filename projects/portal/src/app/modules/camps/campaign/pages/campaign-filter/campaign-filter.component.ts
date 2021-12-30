import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-campaign-filter',
  templateUrl: './campaign-filter.component.html',
  styleUrls: ['./campaign-filter.component.scss']
})
export class CampaignFilterComponent implements OnInit {
  @Input() filterOptions: string[];
  @Input() changeFilterLink: string;
  @Input() selectedFilter: string;
  @Output() filterselectedOptionion = new EventEmitter<string>();
  selectedOption = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedOption = this.selectedFilter;
  }

  changeFilterOption(option: string) {
    this.selectedOption = option;
    this.filterselectedOptionion.emit(option);
  }

}
