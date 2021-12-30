import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { ArrayContainerComponent } from '../components/fields-componants/array-container/array-container.component';

@Injectable()
export class ArrayField extends FormFieldBase<string> {
  controlType = 'array';
  type: string;

  component = ArrayContainerComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
