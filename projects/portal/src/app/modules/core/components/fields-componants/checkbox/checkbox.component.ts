import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements FieldDataInterface , OnInit{
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @Output() fieldChangingValue = new EventEmitter();
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
  get isDisabled(){
  
    const r=this.form.controls[this.field.key].status === 'DISABLED'? true:false;
    
    return r;
  }
ngOnInit(){
  this.form.get(this.field.key).valueChanges.subscribe(x => {

    this.fieldChangingValue.emit({'key': this.field.key});
 })
}
}
