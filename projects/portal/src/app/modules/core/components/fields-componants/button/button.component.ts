import {Component, OnInit, Input} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControlService } from '../../../services/form-control-service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;
  @Output() fieldChangingValue = new EventEmitter();
  disableField: boolean;

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

  constructor( private qcs: FormControlService) {
    
  }
  buttonClick(){
 
    this.fieldChangingValue.emit({'key': this.field.key, 'type':this.field.type , 'form': this.form,'changeType' : 'click'});
  }
  ngOnInit() {
   

    this.form.get(this.field.key).valueChanges.subscribe(selectedValue => {

      this.oldValue = this.form.value[this.field.key];
    });

  
    this.form.valueChanges.subscribe(val => {
      
      if(typeof (this.field.validation) !== 'undefined' 
      && this.field.validation != null 
      && this.field.validation.fields.length > 0){

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

    if(typeof (this.field.validation) !== 'undefined' 
    && this.field.validation != null 
    && this.field.validation.fields.length > 0){
      this.validation();
      
    }

  }

  validation(){
    // switch (this.field.validation.operator) {
    //   case 'disabled':
    //     if(this.form.value[this.field.validation.fields[0]].toString().trim() !== '' &&
    //     this.form.value[this.field.validation.fields[1]].toString().trim() !== ''){
      
    //   this.disableField = false;
    //    this.form.controls[this.field.key].enable();
    //      // this.form.get(this.field.key).setErrors({'invalid':'not equal to '+this.field.validation.fields[0]});
    //    }
    //    else{


       
    //     if(document.getElementById(this.field.key) && !document.getElementById(this.field.key).hasAttribute('disabled')){
   
    //       this.form.controls[this.field.key].disable();
    //     }
    //  this.disableField = true;
    
    //    }
       
    //     break;
    
    //   default:
    //     break;
    // }


    
  

  }



}

