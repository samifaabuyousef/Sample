import {FormFieldBase} from './form-field-base';
import {MobileNumberComponent} from '../components/fields-componants/mobile-number/mobile-number.component';
import {Injectable} from '@angular/core';

@Injectable()
export class MobileNumberField extends FormFieldBase<string> {
  controlType = 'mobileNumber';
  type: string;

  component = MobileNumberComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}