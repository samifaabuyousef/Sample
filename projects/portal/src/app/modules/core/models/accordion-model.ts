import {ContainerFieldsBase} from '../services/container-fields';
import {NodeElementBase} from '../services/node-element';

export class AccordionOptions {
  title: string;
  id: string;
  info?: any;
  accordionClass?: string;
  hiddenAccordion?: boolean;
  contentClass: string;
  content: NodeElementBase<any>[] = [];
}

export class AccordionConfig {
  title: string;
  id: string;
  info?: any;
  hiddenAccordion: boolean;
  accordionClass: string;
  contentClass: string;
  content: NodeElementBase<any>[] = [];

  constructor(options: AccordionOptions) {
    this.title = options.title;
    this.info = this.info;
    this.id = options.id;
    this.content = options.content;
    this.accordionClass = options.accordionClass || '';
    this.contentClass = options.contentClass || '';
    this.hiddenAccordion =options.hiddenAccordion || false;
  }
}
