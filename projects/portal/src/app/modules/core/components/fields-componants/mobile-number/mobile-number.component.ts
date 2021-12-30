import {Component, OnInit, Input} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';
import { FormControlService } from '../../../services/form-control-service';

@Component({
  selector: 'app-mobile-number',
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.scss']
})
export class MobileNumberComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;

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

  constructor(private qcs: FormControlService){}
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

  validation() {
 
    switch (this.field.validation.operator) {
      case 'equal':
        if (this.field.validation.fields.length === 1) {
          if (this.form.value[this.field.key] !== this.form.value[this.field.validation.fields[0]]) {

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

  telInputObject(obj) {
    if (this.field.countryIso !== null && this.field.countryIso !== '') {
 
      obj.setCountry(this.field.countryIso.toLowerCase());
    } else {
      // obj.setCountry('lb');
     
    }
    this.qcs.mobileNumberChanged.emit({information: {
      areaCodes: obj.s.areaCodes,
      dialCode: obj.s.dialCode,
      iso2: obj.s.iso2,
      name:obj.s.name,
      priority: obj.s.priority
    }, key: this.field.key});
  }

  onCountryChange(event) {
    if (event.iso2) {
      this.qcs.mobileNumberChanged.emit({information: event, key: this.field.key});
    }
  }

  getNumber(number) {
    this.fieldChanged(this.field.key, this.form.value[this.field.key]);

  }

  hasError(ev) {

    if (!ev) {
      // this.form.get(this.field.key).setErrors({'invalid': ' is invalid '});
      this.form.get(this.field.key).setErrors({'invalid': 
      this.field.errorMessage != null?this.field.errorMessage : ' is invalid '
      
     });

    } else {
      this.form.get(this.field.key).setErrors(null);
    }

  }


  fieldChanged(fieldKey, file) {
   
    setTimeout(() => {
      this.form.patchValue({[fieldKey]: file.replace(/\s/g, "")});
      this.form.get([fieldKey]).markAsDirty();
    }, 1000);
  }

  changeNumber(ev){
  }
}


