import {NodeElementBase} from './node-element';

import {FormFieldBase} from './form-field-base';


export class NodeElementsArray extends NodeElementBase <FormFieldBase<string>[]> {
  type = 'Elements';

  constructor(options: {} = {}) {
    super(options);

  }
}
