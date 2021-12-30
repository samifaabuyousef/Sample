import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { TimePickerComponent } from '../components/fields-componants/time-picker/time-picker.component';

@Injectable()
export class TimePickerField extends FormFieldBase<string> {
  controlType = 'timePicker';
  type: string;

  component = TimePickerComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
