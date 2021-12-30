import {preserveWhitespacesDefault} from '@angular/compiler';

export class NodeOptions<T> {
  type ?: string;
  width?: any;
  margin?: any;
  content?: T;
  background?: any;
  padding?: any;
  customClass?: any;
  arrayContainerClass?: any;
  // hiddenContainer?:boolean;

}

export class NodeElementBase<T> {
  type: string;
  // hiddenContainer: boolean;
  width: any;
  margin: any;
  padding: any;
  background: any;
  content: T;
  customClass: any;

  arrayContainerClass: any;

  constructor(options: NodeOptions<T> = {}) {
    this.type = options.type || '';
    this.content = options.content || null;
    this.width = options.width || 'unset';
    this.margin = options.margin || 'unset';
    this.background = options.background || 'white';
    this.padding = options.padding || '0.5rem 1.5rem 0.5rem 1.5rem;';
    this.customClass = options.customClass || '';
    this.arrayContainerClass = options.arrayContainerClass || '';
    
    // this.hiddenContainer = options.hiddenContainer != null || typeof(options.hiddenContainer) !='undefined' ?
    // options.hiddenContainer : false;
   

  }
}
