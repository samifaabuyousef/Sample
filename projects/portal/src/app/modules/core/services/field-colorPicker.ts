import {FormFieldBase} from './form-field-base';
import {ColorpickerComponent} from '../components/fields-componants/colorpicker/colorpicker.component';


export class ColorPickerField extends FormFieldBase<string> {
  controlType = 'colorpicker';
  type: string;
  component = ColorpickerComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
