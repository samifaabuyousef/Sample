import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {ModelConfig} from '../../../models/model-config';
import {FormControlService} from '../../../services/form-control-service';
import {FormFieldBase} from '../../../services/form-field-base';
import {NodeElementBase} from '../../../services/node-element';
import * as moment_ from 'moment';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {PopupComponent} from 'nabed-components';

const moment = moment_;

@Component({
  selector: 'app-array-container',
  templateUrl: './array-container.component.html',
  styleUrls: ['./array-container.component.scss']
})
export class ArrayContainerComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;
  newDescription: any;
  @ViewChild('modal', {static: true}) modal;
  modalConfig: ModelConfig;
  modelFields: NodeElementBase<any>[] = [];
  openModel = false;
  modalKey: string;
  controlType: any;
  key: any;
  editMode: boolean;
  editElementIndex: any;
  simple: any[] = [];

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


  get fieldFormArray() {
    return this.form.controls[this.field.key] as FormArray;
  }

  getValue(element, arrr: any) {
    if (arrr === 'valid') {

      if (typeof (element.value[arrr]) === 'undefined') {
        return true;
      }
    }
    return element.value[arrr];
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {


    if (this.field.value && this.field.value.length > 0 && this.fieldFormArray.controls.length <= 0) {
      let fieldValues: any = this.field.value;

      fieldValues.forEach(element => {

        if (element) {

          const formControlFields: { name: string, control: FormControl }[] = [];
          const formGroup: FormGroup = new FormGroup({});
          for (const key in element) {


            const elemtKey = element[key];

            if (elemtKey) {
              formGroup.addControl(key, elemtKey);
            }

          }


          this.fieldFormArray.push(
            formGroup,
          );

        }

      });


    }


    this.qcs.reloadModal.subscribe((data) => {

      this.modelFields = [];

      setTimeout(() => {
        this.modelFields = this.field.modalConfig.editForm(data.formValue, data.params);
      }, 1000);
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


  constructor(private qcs: FormControlService,
              public dialog: MatDialog) {

  }

  openModal(searchKey, key, field, editMode: boolean = false, index?) {

    this.controlType = field.controlType;
    this.key = key;
    this.openModel = true;
    this.modalConfig = field.modalConfig;

    this.modal.open();
    if (editMode) {
      this.editMode = true;

      this.editElementIndex = index;
      this.qcs.modalChaning.next({
        'key': this.field.key, 'value': this.fieldFormArray.controls[index].value,
        'changingType': 'initialValue'
      });
      this.modelFields = field.modalConfig.editForm(this.fieldFormArray.controls[index].value, this.field.params);
    } else {
      this.editMode = false;
      if (!field.modalConfig.modalFormIsFunction) {

        if (this.field.params) {
          this.modelFields = this.field.modalConfig.editForm(null, this.field.params)
        } else {

          this.modelFields = field.modalConfig.modalForm();
        }

      } else {

        this.modelFields = field.modalConfig.modalForm();
      }

    }
    this.modalKey = field.modalConfig.title;
  }

  closeModal() {
    this.modal.close();
    this.openModel = false;
    this.modelFields = [];

    this.qcs.modalChaning.next({'key': this.field.key, 'changingType': 'closeModal'});

  }

  changeFormStatus(event) {

    this.qcs.modalChaning.next({'event': event, 'key': this.field.key, 'changingType': 'change'});

  }

  addContentClass(Formdata: any) {
    if (!this.editMode) {

      this.qcs.modalChaning.next({
        'formData': Formdata,
        'key': this.field.key,
        'changingType': 'submit',
        'form': this.form
      });

    } else {

      this.qcs.modalChaning.next({
        'formData': Formdata,
        'index': this.editElementIndex,
        'key': this.field.key,
        'changingType': 'edit',
        'form': this.form
      });

    }

    this.closeModal();

  }

  deleteRow(index) {

    if (this.field.deleteItemWothDialog) {

      const dialogRef = this.dialog.open(PopupComponent, {
        data: {
          title: 'Delete Item',
          description: 'Are you sure you want to delete this item ?'
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          this.qcs.modalChaning.next({
            'key': this.field.key,
            'index': index,
            'changingType': 'delete',
            'form': this.form
          });

        }
      });
    } else {
      this.qcs.modalChaning.next({'key': this.field.key, 'index': index, 'changingType': 'delete', 'form': this.form});

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

