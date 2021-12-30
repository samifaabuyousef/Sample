import {FormFieldBase} from './form-field-base';
import {Injectable} from '@angular/core';
import { ComposeComponent } from '../components/fields-componants/compose/compose.component';


@Injectable()
export class ComposeField extends FormFieldBase<string> {
  controlType = 'compose';
  type: string;

  component = ComposeComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
