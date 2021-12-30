import {FormFieldBase} from './form-field-base';
import {SliderComponent} from '../components/fields-componants/slider/slider.component';


export class SliderField extends FormFieldBase<string> {
  controlType = 'slider';
  type: string;
  component = SliderComponent;

  constructor(options: {} = {}) {
    super(options);

    this.type = options['type'] || '';
  }
}
