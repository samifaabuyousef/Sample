import {FormFieldBase} from './form-field-base';

import {Injectable} from '@angular/core';
import { RadioGroupComponent } from '../components/fields-componants/radio-group/radio-group.component';

@Injectable()
export class RadioGroupField extends FormFieldBase<string> {
  controlType = 'radioGroup';
  type: string;

  component = RadioGroupComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}