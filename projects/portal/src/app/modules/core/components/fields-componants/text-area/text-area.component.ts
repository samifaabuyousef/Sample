import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements FieldDataInterface , OnInit{
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @ViewChild('myDiv',{static:false}) myDiv: ElementRef;
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

  ngOnInit(){
    this.form.valueChanges.subscribe(value => {
      this.myDiv.nativeElement.style.height = 'auto';
      this.myDiv.nativeElement.style.height = `${this.myDiv.nativeElement.scrollHeight}px`;

    });
  }

}
