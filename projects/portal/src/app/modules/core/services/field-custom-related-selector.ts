import {FormFieldBase} from './form-field-base';
import {TextboxComponent} from '../components/fields-componants/textbox/textbox.component';

export class CustomRelatedSelectorField extends FormFieldBase <string> {
  controlType = 'customRelatedSelector';
  options: { id: string, title: string }[] = [];
  component = TextboxComponent;

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
