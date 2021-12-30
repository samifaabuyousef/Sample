import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormFieldBase} from '../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../../services/form-control-service';

import {BehaviorSubject} from 'rxjs';
import {NodeElementBase} from '../../services/node-element';
import {findLastKey} from 'lodash';

@Component({
  selector: 'app-general-filter',
  templateUrl: './general-filter.component.html',
  styleUrls: ['./general-filter.component.scss']
})
export class GeneralFilterComponent implements OnInit {
  isSubmitting = false;
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onResetFilter = new EventEmitter<FormGroup>();

  @Input() resultsNumber: string;
  @Input() resultsUnit: string;
  @Input() resultSumUnit: string;
  @Input() TopFilter: boolean = false;
  @Input() fieldsContainers: NodeElementBase<any>[] = [];
  @Input() showReset: boolean = true;
  @Input() showResultSatetment: boolean = true;
  @Input() showFilterIcon: boolean = false;

  contentFields = new BehaviorSubject<NodeElementBase<any>[]>([]);

  form: FormGroup;
  payLoad = '';
  formStatus = true;


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

  resetFilter() {
    this.onResetFilter.emit();
  }

  getResultUnit() {
    if (+this.resultsNumber !== 1) {

      return this.resultSumUnit;


    }
    return this.resultsUnit;
  }

  onChanges(): void {

    if (typeof (this.form) !== 'undefined') {
      this.form.valueChanges.subscribe(val => {

        this.formStatus = false;
        this.onFormStatusChange.emit({formStatus: this.formStatus, value: val});
      });
    }
  }

  submit() {


    this.onSubmit.emit(this.form);
  }

}

