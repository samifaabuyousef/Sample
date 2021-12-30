import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { ArrayDropdownComponent } from '../components/fields-componants/array-dropdown/array-dropdown.component';

@Injectable()
export class ArrayDropDownField extends FormFieldBase<string> {
  controlType = 'arrayDropDown';
  type: string;

  component = ArrayDropdownComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

