import {ContainerFieldsBase} from '../services/container-fields';
import {NodeElementBase} from '../services/node-element';

export interface CardPortion{
    portion:string;
    portionTitle: string;
    background : string;
}
export class StatisticCardOptions {
  title?: string;
  description?: string;
  totalNumber?: number;
  totalNumberTitle?: string;
  portions ? :CardPortion[];
}
export class StatisticCardConfig {
    title: string;
    description: string;
    totalNumber: number;
    totalNumberTitle: string;
    portions  :CardPortion[];

  constructor(options: StatisticCardOptions = {}) {
    this.title = options.title || '';
    this.description = options.description || '';
    this.totalNumber = options.totalNumber || 0;
    this.totalNumberTitle = options.totalNumberTitle || '';
    this.portions = options.portions || [];
  }
}