import {FormFieldBase} from './form-field-base';

import {Injectable} from '@angular/core';
import { SearchComponent } from '../components/fields-componants/search/search.component';

@Injectable()
export class SearchBoxField extends FormFieldBase<string> {
  controlType = 'searchbox';
  type: string;

  component = SearchComponent;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
