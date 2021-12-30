import {FormFieldBase} from './form-field-base';
import {TextAreaComponent} from '../components/fields-componants/text-area/text-area.component';


export class TextAreaField extends FormFieldBase<string> {
  controlType = 'textArea';
  type: string;
  component = TextAreaComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
