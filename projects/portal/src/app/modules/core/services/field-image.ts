import {FormFieldBase} from './form-field-base';
import {ImageComponent} from '../components/fields-componants/image/image.component';


export class ImageField extends FormFieldBase<string> {
  controlType = 'image';
  type: string;
  component = ImageComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
