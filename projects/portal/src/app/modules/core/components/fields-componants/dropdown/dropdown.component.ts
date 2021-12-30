import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {ModelConfig} from '../../../models/model-config';
import {NodeElementBase} from '../../../services/node-element';
import {objectToFormData} from 'object-to-formdata';
import {ToastrService} from 'ngx-toastr';
import {FormControlService} from '../../../services/form-control-service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements FieldDataInterface {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  openModel = false;
  modalKey: string;
  modalConfig: ModelConfig;
  modelFields: NodeElementBase<any>[] = [];
  @ViewChild('modal', {static: true}) modal;
  key: string;
  @Output() fieldChangingValue = new EventEmitter();

  constructor(private toastr: ToastrService,
              private formControlService: FormControlService,
  ) {

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


  openModal(searchKey, key, field) {

    this.key = key;
    this.openModel = true;
    this.modalConfig = field.modalConfig;
    this.modelFields = field.modalConfig.modalForm;
    this.modal.open();
    this.modalKey = field.modalConfig.title;
  }

  openModalWithValue(searchKey, key, field, value) {

    this.key = key;
    this.openModel = true;
    this.modalConfig = field.modalConfig;
    const initValue = field.modalConfig.initialValue ? field.modalConfig.initialValue : this.field.key
    this.modelFields = this.formControlService.giveFormFieldaVlaue(initValue, value, field.modalConfig.modalForm);

    // this.modelFields = field.modalConfig.modalForm;
    this.modal.open();
    this.modalKey = field.modalConfig.title;
  }

  closeModal() {

    this.modal.close();
    this.openModel = false;
  }

  addContentClass(Formdata: any) {


    this.modalConfig.service.add(Formdata.getRawValue())
      .subscribe(
        (res) => {

          this.field.options.unshift({id: res.id, title: res.title});

          this.fieldChanged(this.key, res.id);

          this.closeModal();
        },
        (e) => {
          this.toastr.error('Something went wrong', 'Error');
          // this.closeModal();
        }
      );
  }

  fieldChanged(fieldKey, file) {
    setTimeout(() => {
      this.form.patchValue({[fieldKey]: file});
      this.form.get([fieldKey]).markAsDirty();
    }, 1000);
  }

  changeFieldValue(event) {
    this.fieldChangingValue.emit({
      'key': this.field.key,
      'form': this.form,
      'value': event,
      'field': this.field
    });
  }
}
