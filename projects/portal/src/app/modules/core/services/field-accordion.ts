import {FormFieldBase} from './form-field-base';
import {AccordionComponent} from '../components/fields-componants/accordion/accordion.component';
import { Injectable } from '@angular/core';

@Injectable()
export class AccordionField extends FormFieldBase<string> {
  controlType = 'accordion';
  type: string;
  component = AccordionComponent;

  constructor(options: {} = {}) {
    super(options);

    this.type = options['type'] || '';
  }
}
