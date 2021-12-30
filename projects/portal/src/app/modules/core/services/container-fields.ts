import {NodeElementBase} from './node-element';


export class ContainerOptions<T> {

  nodeElements?: NodeElementBase<T>[];
  subContainerClass?: string;
  containerChildStyleClass ?: string;
  containerTitle ?: string;
  containerWidth ?: string;
  outSideContainer ?: boolean;
  containerClass ?: string;
}

export class ContainerFieldsBase<T> {
  nodeElements: NodeElementBase<T>[];
  containerClass: string;
  outSideContainer: boolean;
  containerTitle: string;
  containerWidth: string;
  containerChildStyleClass: string;
  subContainerClass: string;
  content: any;
  type: string;


  constructor(options: ContainerOptions<T> = {}) {
    this.nodeElements = options.nodeElements || [];
    this.containerTitle = options.containerTitle || '';
    this.containerWidth = options.containerWidth || 'unset';
    this.outSideContainer = options.outSideContainer || true;
    this.containerClass = options.containerClass || '';
    this.containerChildStyleClass = options.containerChildStyleClass || '';
    this.subContainerClass = options.subContainerClass || '';

  }


}
