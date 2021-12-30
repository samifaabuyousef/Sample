import {Component, OnInit, Input} from '@angular/core';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})
export class ColorpickerComponent implements FieldDataInterface {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;

  get isRequired() {
    if (this.form.controls[this.field.key].errors != null) {
      return !this.form.controls[this.field.key].errors.required || !this.form.controls[this.field.key].touched;
    }
    return true;
  }

  get isValid() {
    return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched;
  }

  get isMaxLength() {
    if (this.form.controls[this.field.key].errors === null) {
      return true;
    }
    return !this.form.controls[this.field.key].errors.maxlength || !this.form.controls[this.field.key].touched;
  }


}
