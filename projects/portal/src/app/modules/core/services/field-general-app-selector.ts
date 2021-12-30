import { FormFieldBase } from './form-field-base';
import { GeneralAppSelectorComponent } from '../components/fields-componants/general-app-selector/general-app-selector.component';

export class GeneralAppSelectorField extends FormFieldBase <string> {
    controlType = 'genaralSelector';
    options: { id: string, title: string }[] = [];
    component = GeneralAppSelectorComponent;
  
    constructor(options: {} = {}) {
      super(options);
      this.options = options['options'] || [];
    }
}