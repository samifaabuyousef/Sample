import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { DateCheckBoxComponent } from '../components/fields-componants/date-check-box/date-check-box.component';

@Injectable()
export class DateCheckBoxField extends FormFieldBase<string> {
  controlType = 'dateCheckBox';
  type: string;

  component = DateCheckBoxComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
