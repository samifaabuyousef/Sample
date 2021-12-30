import {FormFieldBase} from './form-field-base';
import {CheckboxComponent} from '../components/fields-componants/checkbox/checkbox.component';


export class CheckBoxField extends FormFieldBase<string> {
  controlType = 'checkbox';
  type: string;
  component = CheckboxComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
