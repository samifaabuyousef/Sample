import {Component, OnInit, Input} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;
  newDescription: any;

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

  getDescription() {
    let newDescription;
    if (this.field.description.includes(":value")) {
      newDescription = this.field.description.replace(':value', this.form.get(this.field.key).value);
    } else {
      newDescription = this.field.description;
    }
    return newDescription;
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

      case 'max':
        if (this.field.validation.fields.length === 1) {

          if (+this.form.value[this.field.validation.fields[0]] > +this.field.maxValue) {

            this.form.get(this.field.key).setErrors({
              'invalid':
                this.field.errorMessage ? this.field.errorMessage :
                  'can not be greater than the ' + this.field.maxValue
            });
          } else {

            this.form.get(this.field.key).setErrors(null);
          }
        }
        break;

        case 'min':
          if (this.field.validation.fields.length === 1) {
  
            if (+this.form.value[this.field.validation.fields[0]] < +this.field.minValue) {
  
              this.form.get(this.field.key).setErrors({
                'invalid':
                  this.field.errorMessage ? this.field.errorMessage :
                    'can not be less than the ' + this.field.minValue
              });
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

