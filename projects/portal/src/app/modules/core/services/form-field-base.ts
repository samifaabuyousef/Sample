import {ContentClassConfig} from '../components/content-class-selector/content-class-selector.component';
import {ModelConfig} from '../models/model-config';
import {Type} from '@angular/core';
import {AccordionConfig} from '../models/accordion-model';
import {SliderConfig} from '../models/slider-model';
import {ContentClassContentConfig} from '../components/general-selector/general-selector.component';
import {NodeElementBase} from './node-element';
import {runInThisContext} from 'vm';
import {IncludeExcludeLists} from '../components/general-tree/general-tree.component';
import {Subject} from 'rxjs';

export class FieldOptions<T> {
  value?: T;
  key?: string;
  placeholder?: string;
  unit?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
  columnSpace?: number;
  type?: string;
  disableState?: boolean;
  contentSelectorType?: string;
  config?: any;
  generalConfig?: ContentClassContentConfig;
  sortable ?: boolean;
  enableAdd?: boolean;
  modalConfig?: ModelConfig;
  width?: any;
  customClass?: any;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  component?: Type<any>;
  hidden?: boolean;
  accordionConfig?: AccordionConfig[] = [];
  sliderConfilg ?: SliderConfig;
  valueLimitaion?: any;
  insideFieldClass ?: string;
  multiple ?: boolean;
  pattern ?: string;
  generalSelectorClass?: string;
  selectTitle ?: string;
  arrayElementKeys?: { key: string, label: string }[];
  validation ?: { operator: string, fields: string[] };
  flag?: string;
  countryIso?: string;
  allowClear?: boolean;
  checkBoxKeys?: { key: string, name: string }[];
  fieldGroup?: NodeElementBase<any>[] = [];
  noAutoComplete?: boolean;
  customiseCheckBox?: boolean;
  description?: string;
  params?: any;
  descriptionClass?: string;
  labelClass?: string;
  fieldContainerClass?: string;
  src?: any;
  buttonText?: string;
  arrayElements?: nodeElementArrays<T>[] = [];
  unitClass?: string;
  unitContainerClass?: string;
  errorMessage?: string;
  radioFields?: { value: string, label: string }[];
  deleteItemWothDialog?: boolean;
  multipleImage?: boolean;
  messageInfo?: string;
  mediaType?: string;
  imageTextTitle?: string;
  treeData?: any;
  includeExcludeObject?: IncludeExcludeLists;
  onchange ? = new Subject<any>();
  icon?: string;
  buttonChoices?: string[];
  filter?: filterContent;
  enableFetchData?: boolean;
}

interface nodeElementArrays<T> {
  elements: FormFieldBase<T>[];
}

interface filterContent {
  fields: NodeElementBase<any>[];
  resultsUnit: string;
  resultSumUnit: string;
  resultsNumber: number;
  showReset: boolean;
  showResultSatetment: boolean;
  showFilterIcon: boolean;
}

export class FormFieldBase<T> {
  value: T;
  enableFetchData:boolean;
  filter: filterContent;
  includeExcludeObject: IncludeExcludeLists;
  buttonChoices: string[];
  treeData: any;
  icon: string;
  onchange = new Subject<any>();
  messageInfo: string;
  radioFields: { value: string, label: string }[];
  buttonText: string;
  unit: string;
  mediaType: string;
  noAutoComplete: boolean;
  imageTextTitle: string;
  params: any;
  customiseCheckBox: boolean;
  deleteItemWothDialog: boolean;
  errorMessage: string;
  multipleImage: boolean;
  key: string;
  labelClass: string;
  src: any;
  arrayElements: nodeElementArrays<T>[] = [];
  fieldContainerClass: string;
  description: string;
  descriptionClass: string;
  fieldGroup: NodeElementBase<any>[] = [];
  checkBoxKeys: { key: string, name: string }[] = [];
  label: string;
  required: boolean;
  order: number;
  pattern: string;
  controlType: string;
  hidden: boolean;
  countryIso: string;
  type: string;
  minValue: number;
  allowClear: boolean;
  valueLimitaion: any;
  validation: { operator: string, fields: string[] };
  columnSpace: string;
  options: { id: string, title: string }[];
  disableState: boolean;
  contentSelectorType: string;
  width: any;
  placeholder: string;
  config: any;
  sortable: boolean;
  generalConfig: ContentClassContentConfig = new ContentClassContentConfig();
  accordionConfig: AccordionConfig[] = [];
  enableAdd: boolean;
  arrayElementKeys: { key: string, label: string, field?: FormFieldBase<any> }[];
  modalConfig: ModelConfig = new ModelConfig();
  customClass: any;
  maxLength: number;
  component: Type<any>;
  sliderConfilg = new SliderConfig();
  insideFieldClass: string;
  multiple: boolean;
  generalSelectorClass: string;
  selectTitle: string;
  maxValue: number;
  flag: string;
  unitClass: string;
  unitContainerClass: string;

  constructor(options: FieldOptions<T> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.radioFields = options.radioFields || [];
    this.accordionConfig = options.accordionConfig || [];
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.treeData = options.treeData || null;
    this.mediaType = options.mediaType || 'image'
    this.arrayElements = options.arrayElements || [];
    this.type = options.type || '';
    this.unit = options.unit || null;
    this.unitClass = options.unitClass || null;
    this.unitContainerClass = options.unitContainerClass || null;
    this.src = options.src || '';
    this.buttonText = options.buttonText || '';
    this.errorMessage = options.errorMessage || null;
    this.imageTextTitle = options.imageTextTitle || '';
    this.minValue = options.minValue || null;
    this.disableState = options.disableState != null ? options.disableState : false;
    this.deleteItemWothDialog = options.deleteItemWothDialog != null ? options.deleteItemWothDialog : false;
    this.params = options.params || null;
    this.placeholder = options.placeholder || '';
    this.columnSpace = options.columnSpace > 0 && options.columnSpace < 13 ? 'col-' + options.columnSpace.toString() : '';
    this.contentSelectorType = options.contentSelectorType || '';
    this.config = options.config || null;
    this.includeExcludeObject = options.includeExcludeObject || new IncludeExcludeLists();
    this.generalConfig = options.generalConfig || new ContentClassContentConfig();
    this.enableAdd = options.enableAdd || false;
    this.modalConfig = options.modalConfig || new ModelConfig();
    this.checkBoxKeys = options.checkBoxKeys || [];
    this.sliderConfilg = options.sliderConfilg || new SliderConfig();
    this.width = options.width || 'unset';
    this.customClass = options.customClass || '';
    this.description = options.description || '';
    this.descriptionClass = options.descriptionClass || '';
    this.maxLength = options.maxLength || 0;
    this.maxValue = options.maxValue != null ? options.maxValue : null;
    this.component = options.component;
    this.fieldGroup = options.fieldGroup || [];
    this.hidden = options.hidden || false;
    this.valueLimitaion = options.valueLimitaion || {};
    this.insideFieldClass = options.insideFieldClass || '';
    this.multiple = options.multiple != null ? options.multiple : true;
    this.multipleImage = options.multipleImage != null ? options.multipleImage : false;
    this.pattern = options.pattern || '';
    this.sortable = options.sortable || false;
    this.generalSelectorClass = options.generalSelectorClass || '';
    this.labelClass = options.labelClass || '';
    this.fieldContainerClass = options.fieldContainerClass || '';
    this.customiseCheckBox = options.customiseCheckBox != null || typeof (options.customiseCheckBox) !== 'undefined' ?
      options.customiseCheckBox : false;
    this.messageInfo = options.messageInfo || '';
    this.noAutoComplete = options.noAutoComplete != null || typeof (options.noAutoComplete) !== 'undefined' ? options.noAutoComplete : true;
    this.selectTitle = options.selectTitle || '';

    this.validation = options.validation || null;
    this.flag = options.flag || '';
    this.arrayElementKeys = options.arrayElementKeys || [];
    this.countryIso = options.countryIso || null;
    this.filter = options.filter ||
      {
        fields: null, resultsNumber: 0, resultSumUnit: null, resultsUnit: null,

        showReset: true,
        showResultSatetment: true,
        showFilterIcon: false,
      }
    this.allowClear = options.allowClear || false;
    this.onchange = options.onchange || new Subject<any>();
    this.icon = options.icon || null;
    this.buttonChoices = options.buttonChoices || [];
    this.enableFetchData =  options.enableFetchData != null || typeof (options.enableFetchData) !== 'undefined' ? options.enableFetchData : false;
   
  }
}
