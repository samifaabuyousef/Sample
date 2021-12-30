import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { ButtonComponent } from '../components/fields-componants/button/button.component';


@Injectable()
export class ButtonField extends FormFieldBase<string> {
  controlType = 'button';
  type: string;

  component = ButtonComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
