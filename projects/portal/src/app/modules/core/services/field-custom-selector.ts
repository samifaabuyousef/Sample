import {FormFieldBase} from './form-field-base';
import {CustomSelectorComponent} from '../components/fields-componants/custom-selector/custom-selector.component';


export class CustomSelectorField extends FormFieldBase <string> {
  controlType = 'customSelector';
  options: { id: string, title: string }[] = [];
  component = CustomSelectorComponent;

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
