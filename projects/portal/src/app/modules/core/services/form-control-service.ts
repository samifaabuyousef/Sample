import {EventEmitter, Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {FormFieldBase} from './form-field-base';
import {NodeElementBase} from './node-element';


@Injectable()
export class FormControlService {
  fieldChangingValue = new EventEmitter<any>();
  modalChaning = new Subject<any>();
  reloadModal = new EventEmitter<any>();
  mobileNumberChanged = new EventEmitter<any>();

  constructor() {
  }

  getFormFields(nodesArr: NodeElementBase<any>[]) {
    let fieldsArray: FormFieldBase<string>[] = [];
    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].type === 'Container') {
        fieldsArray = [].concat(fieldsArray, this.getFormFields(nodesArr[i].content.nodeElements));
      } else {
        fieldsArray = [].concat(fieldsArray, nodesArr[i].content);
      }
    }
    return fieldsArray;
  }

  toFormGroup(fields: FormFieldBase<string>[]) {

    const group = this.getFieldControlsArray(fields);


    return new FormGroup(group);
  }

  getFieldControlsArray(fields: FormFieldBase<string>[]) {
    if (fields.length <= 0) {
      return [];
    }
    const group: any = {};

    fields.forEach(field => {
      if (field.controlType === 'accordion') {
        field.accordionConfig.forEach(accordionElement => {
          const accordionFields = this.getFormFields(accordionElement.content);
          accordionFields.forEach(element => {
            this.AddFieldToFormGroup(group, element);
          });

        });

      } else if (field.controlType === 'dateCheckBox' || field.controlType === 'compose') {
        this.AddFieldToFormGroup(group, field);
        const checkBoxFields = this.getFormFields(field.fieldGroup);
        checkBoxFields.forEach(element => {

          this.AddFieldToFormGroup(group, element);
        });

      } else {
        const validationArray: any[] = [];
        if (field.required) {
          validationArray.push(Validators.required);
        }
        if (field.maxLength > 0) {
          validationArray.push(Validators.maxLength(field.maxLength));
        }
        if (field.pattern !== '' && field.pattern !== null) {
          validationArray.push(Validators.pattern(field.pattern));
        }
        if (field.controlType === 'array' || field.controlType === 'arrayDropDown') {
          let arrayGroub: AbstractControl[] = [];

          field.arrayElements.forEach(element => {
            let arrayGroubObj = this.getFieldControlsArray(element.elements);
            let groupElementArray: AbstractControl[] = [];


            arrayGroub.push(new FormGroup(arrayGroubObj));
          });


          group[field.key] = new FormArray(arrayGroub, validationArray);
        } else {

          group[field.key] = new FormControl({
            value: field.value || '',
            disabled: field.disableState ? field.disableState : false
          }, validationArray);

          if (field.disableState) {

          }
        }
      }

    });

    return group;
  }

  AddFieldToFormGroup(formControls, field: FormFieldBase<string>) {

    const group: any = {};

    const validationArray: any[] = [];
    if (field.required) {
      validationArray.push(Validators.required);
    }
    if (field.maxLength > 0) {
      validationArray.push(Validators.maxLength(field.maxLength));
    }
    formControls[field.key] = new FormControl({
      value: field.value || '',
      disabled: field.disableState ? field.disableState : false
    }, validationArray);

    if (field.disableState) {

    }
    // return form;
  }


  giveFormFieldaVlaue(fieldKey: string, value: any, nodesArr: NodeElementBase<any>[]) {

    for (let i = 0; i < nodesArr.length; i++) {
      if (nodesArr[i].type === 'Container') {
        this.giveFormFieldaVlaue(fieldKey, value, nodesArr[i].content.nodeElements)
      } else {
        if (nodesArr[i].content.length > 0) {
          nodesArr[i].content.forEach(element => {
            if (element.key === fieldKey) {
              element.value = value;
              return nodesArr;
            }
          });
        }
      }
    }
    return nodesArr;
  }
}
