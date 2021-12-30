import {FormFieldBase} from './form-field-base';
import {TextboxComponent} from '../components/fields-componants/textbox/textbox.component';
import {Injectable} from '@angular/core';

@Injectable()
export class TextboxField extends FormFieldBase<string> {
  controlType = 'textbox';
  type: string;

  component = TextboxComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
