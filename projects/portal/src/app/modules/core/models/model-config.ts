import {NodeElementBase} from '../services/node-element';
import {ContentClassConfig} from '../components/content-class-selector/content-class-selector.component';

export class modelOptions {
  title?: string;
  service?: any;
  config?: any;
  type?: string;
  lookupField?: string;
  addingFunction?:any;
  initialValue?: string;
  editForm?: any;
  modalFormIsFunction?: boolean;
  modalForm?: any;
  changingLabels?:{oldLabel: string,newLabel: string}[];
  changingDataBeforeSending?: boolean;
}

export class ModelConfig {
  title: string;
  service: any;
  addingFunction:any;
  modalFormIsFunction: boolean;
  config: ContentClassConfig;
  type: string;
  initialValue: string;
  editForm: any;
  lookupField: string;
  modalForm: any;
  changingLabels:{oldLabel: string,newLabel: string}[];
  changingDataBeforeSending: boolean;

  constructor(options: modelOptions = {}) {
    this.title = options.title;
    this.service = options.service;
    this.config = options.config;
    this.modalFormIsFunction = options.modalFormIsFunction != null ? options.modalFormIsFunction : false;
    this.type = options.type;
    this.lookupField = options.lookupField || null;
    this.modalForm = options.modalForm;
    this.editForm = options.editForm || '';
    this.initialValue = options.initialValue || null;
    this.changingLabels = options.changingLabels || null;
    this.addingFunction = options.addingFunction || null;
    this.changingDataBeforeSending = options.changingDataBeforeSending || false

  }
}
