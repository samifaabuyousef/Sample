import {Component, OnInit, Input} from '@angular/core';
import {StatisticCardConfig} from '../../models/statistic-card.model';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']
})
export class StatisticCardComponent implements OnInit {
  @Input() cardInfo: StatisticCardConfig;

  constructor() {
  }

  ngOnInit() {
  }

}
