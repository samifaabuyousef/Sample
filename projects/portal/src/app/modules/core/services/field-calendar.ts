import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { CalendarComponent } from '../components/fields-componants/calendar/calendar.component';

@Injectable()
export class CalendarField extends FormFieldBase<string> {
  controlType = 'calendar';
  type: string;

  component = CalendarComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
