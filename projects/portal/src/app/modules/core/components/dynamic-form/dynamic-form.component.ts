import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormFieldBase} from '../../services/form-field-base';
import {FormGroup, NgForm} from '@angular/forms';
import {FormControlService} from '../../services/form-control-service';
import {ContainerFieldsBase} from '../../services/container-fields';
import {objectToFormData} from 'object-to-formdata';
import {FormCanDeactivate} from '../../guards/form-can-deactivate';
import {Subject, BehaviorSubject} from 'rxjs';
import {NodeElementBase} from '../../services/node-element';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  isSubmitting = false;
  @Input() deleteButtonsBar: boolean = false;
  @Input() fieldsContainers: NodeElementBase<any>[] = [];
  contentFields = new BehaviorSubject<NodeElementBase<any>[]>([]);
  @Input() cancelRouteLink: string;
  @Input() whiteBackGround;
  @Input() saveWithOutLeaving: boolean = false;
  form: FormGroup;
  payLoad = '';
  formStatus = true;
  @Input() routingOnCancel = true;
  @Input() submitText = 'save';
  @Input() saveAndNotLeavingText = 'save';

  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onSubmitWithOutLeaving = new EventEmitter<FormGroup>();
  @Output() onFormStatusChange = new EventEmitter<any>();


  constructor(private qcs: FormControlService) {

  }


  ngOnInit() {

    this.contentFields.next(this.fieldsContainers);
    let fields: FormFieldBase<string>[] = [];

    if (this.fieldsContainers != null) {
      fields = this.qcs.getFormFields(this.fieldsContainers);
      this.form = this.qcs.toFormGroup(fields);

    }


    this.onChanges();

  }

  onCloseEvent(event) {
    this.onCancel.emit();
  }


  submit(type) {

    this.isSubmitting = true;
    if (type === 'save') {
      this.onSubmitWithOutLeaving.emit(this.form)
    }
    if (type === 'saveAndExit') {
      this.onSubmit.emit(this.form);
    }

  }

  onChanges(): void {

    if (typeof (this.form) !== 'undefined') {
      this.form.valueChanges.subscribe(val => {

        this.formStatus = false;
        this.onFormStatusChange.emit({formStatus: this.formStatus, value: val, form: this.form});
      });
    }
  }

}
