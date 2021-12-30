import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { TreeComponent } from '../components/fields-componants/tree/tree.component';


@Injectable()
export class TreeField extends FormFieldBase<string> {
  controlType = 'tree';
  type: string;

  component = TreeComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
