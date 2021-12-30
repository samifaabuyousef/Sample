import {NodeElementBase} from './node-element';
import {ContainerFieldsBase} from './container-fields';


export class NodeElementContainer extends NodeElementBase <ContainerFieldsBase<string>> {
  type = 'Container';

  constructor(options: {} = {}) {
    super(options);

  }
}
