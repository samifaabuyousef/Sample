import {FormFieldBase} from './form-field-base';
import {DropdownComponent} from '../components/fields-componants/dropdown/dropdown.component';
import {Injectable} from '@angular/core';

@Injectable()

export class DropdownField extends FormFieldBase <string> {
  controlType = 'dropdown';
  options: { id: string, title: string }[] = [];
  component = DropdownComponent;

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
