import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CalendarComponent implements FieldDataInterface, OnInit, OnChanges {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;
  maxDate: Date;

  ngOnChanges() {
    this.maxDate = new Date();
  }

  get isRequired() {
    if (this.form.controls[this.field.key].errors != null) {
      return !this.form.controls[this.field.key].errors.required || !this.form.controls[this.field.key].touched;
    }
    return true;
  }

  get isValid() {
    return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched;
  }

  // get isEqual() {
  //   // if(typeof(this.form.get(this.field.key).errors.equal) != 'undefined'){
  //   //   return this.form.get(this.field.key).errors.equal || !this.form.controls[this.field.key].touched;

  //   // }
  //   // return false;
  // }

  get isMaxLength() {
    if (this.form.controls[this.field.key].errors === null) {
      return true;
    }
    return !this.form.controls[this.field.key].errors.maxlength || !this.form.controls[this.field.key].touched;
  }

  ngOnInit() {


    this.form.get(this.field.key).valueChanges.subscribe(selectedValue => {

      this.oldValue = this.form.value[this.field.key];
    });


    this.form.valueChanges.subscribe(val => {

      if (typeof (this.field.validation) !== 'undefined'
        && this.field.validation != null
        && this.field.validation.fields.length > 0) {
        this.validation();

      }
    });

  }

  sliderValueChange() {
    let moreThanLimit = false;
    if (typeof (this.field.valueLimitaion.limitationArray) !== 'undefined' && this.field.valueLimitaion.limitationArray.length > 0) {

      let sum = Number(this.form.get(this.field.key).value);
      this.field.valueLimitaion.limitationArray.forEach(element => {


        sum = sum + Number(this.form.get(element).value);
      });

      if (sum > this.field.valueLimitaion.limitationValue && !moreThanLimit) {

        moreThanLimit = true;
        this.form.controls[this.field.key].setValue(this.oldValue);

      } else {

        this.oldValue = this.form.get(this.field.key).value;
      }


    }

    if (typeof (this.field.validation) !== 'undefined'
      && this.field.validation != null
      && this.field.validation.fields.length > 0) {
      this.validation();

    }

  }

  onBlur(e) {
  }

  getMinValue() {
    if (this.field.minValue) {
      return this.field.minValue
    } else if (this.field.validation && this.field.validation.operator === 'min') {
      return this.form.value[this.field.validation.fields[0]]
    }
  }

  validation() {
    switch (this.field.validation.operator) {
      case 'equal':
        if (this.field.validation.fields.length === 1) {
          if (this.form.value[this.field.key] != this.form.value[this.field.validation.fields[0]]) {

            this.form.get(this.field.key).setErrors({'invalid': 'not equal to ' + this.field.validation.fields[0]});
          } else {

            this.form.get(this.field.key).setErrors(null);
          }
        }

        break;

      default:
        break;
    }
  }


}

