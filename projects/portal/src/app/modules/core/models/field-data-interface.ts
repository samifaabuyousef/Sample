import {FormFieldBase} from '../services/form-field-base';
import {FormGroup} from '@angular/forms';
import { EventEmitter } from '@angular/core';

export interface FieldDataInterface {
  field: FormFieldBase<string>;
  form: FormGroup;
  fieldChangingValue? : EventEmitter<any>;
}
