import {Component, OnInit, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldBase} from '../../../services/form-field-base';
import {ContentClassConfig} from '../../content-class-selector/content-class-selector.component';
import {ToastrService} from 'ngx-toastr';
import {NodeElementBase} from '../../../services/node-element';
import {ModelConfig} from '../../../models/model-config';
import {objectToFormData} from 'object-to-formdata';
import {LookupService} from '../../../services/lookup.service';
import {FieldDataInterface} from '../../../models/field-data-interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-general-app-selector',
  templateUrl: './general-app-selector.component.html',
  styleUrls: ['./general-app-selector.component.scss']
})
export class GeneralAppSelectorComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @Input() dataSeved: boolean;


  key: string;
  controlType: string;
  @ViewChild('modal', {static: true}) modal;
  modalConfig: ModelConfig;
  modelFields: NodeElementBase<any>[] = [];
  openModel = false;
  modalKey: string;

  ngOnInit() {



    this.field.generalConfig.onAdd.subscribe((item ) => {
      this.onContentClassChanged(this.field.key, item, true);


    });

    this.field.generalConfig.onReset.subscribe((item ) => {
      this.changeSelect(this.field.key, null, false);
    });
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

  get isMaxLength() {
    if (this.form.controls[this.field.key].errors === null) {
      return true;
    }
    return !this.form.controls[this.field.key].errors.maxlength || !this.form.controls[this.field.key].touched;
  }

  constructor(private lookupService: LookupService, private toastr: ToastrService
  ) {

  }

  onContentClassChanged(key, data, initialFormValue: boolean = false) {
    const value = {};

    value[key] = this.field.generalConfig.contain;

    this.form.patchValue(value);
    if (!initialFormValue) {

      this.form.get(key).markAsDirty();
    }

  }


  fieldChanged(fieldKey, file) {
    this.form.patchValue({[fieldKey]: file});
    this.form.get([fieldKey]).markAsDirty();
  }


  changeSelect(key, data, initialFormValue: boolean = false) {

    const value = {};

    value[key] = this.field.generalConfig.contain;

    this.form.patchValue(value);
    if (!initialFormValue) {
      this.form.get(key).markAsDirty();
    }

    this.field.generalConfig.used = this.field.generalConfig.used.concat(this.field.generalConfig.contain);
    this.field.generalConfig.filtered =
      _.differenceBy(
        this.field.generalConfig.all,
        this.field.generalConfig.used,
        'id'
      );
  }
}
