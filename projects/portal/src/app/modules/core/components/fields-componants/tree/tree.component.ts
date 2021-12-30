import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldDataInterface } from '../../../models/field-data-interface';
import { ModelConfig } from '../../../models/model-config';
import { FormControlService } from '../../../services/form-control-service';
import { FormFieldBase } from '../../../services/form-field-base';
import { NodeElementBase } from '../../../services/node-element';
import { IncludeExcludeLists } from '../../general-tree/general-tree.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent  implements FieldDataInterface, OnInit, OnDestroy {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  openModel = false;
  @ViewChild('modal', {static: true}) modal;
  modalConfig: ModelConfig;


  modalKey: string;
  controlType: any;
  key: any;
  editMode: boolean;
  editElementIndex: any;
  simple: any[] = [];
  includeExcludeObject: IncludeExcludeLists;
  treeData: any;
  loadingTree = true;
   constructor(private qcs: FormControlService) {}
  ngOnInit() {
    if (this.field.treeData.length === 0) {

      this.treeData = null;
    } else {
      this.loadingTree = false;
    }

    this.field.onchange.subscribe((data) => {

      this.field.treeData = data.treeData;
      this.treeData = data.treeData;
      this.loadingTree = false;

    });
  }
  openModal(searchKey, key, field, editMode: boolean = false, index?) {

    this.openModel = true;
    this.includeExcludeObject = this.field.includeExcludeObject;
    this.treeData = this.field.treeData;



    this.modal.open();

    this.modalKey = field.modalConfig.title;
    if (this.field.treeData && this.field.treeData.length === 0 ) {
      this.loadingTree = true;
      this.qcs.fieldChangingValue.next({field: this.field, key: this.field.key, changingType: 'uploadTree'});

    }


  }
  closeModal() {
    this.openModel = false;
    this.modal.close();




  }

  onCloseEvent(event) {
    this.openModel = false;
    if (this.treeData && this.treeData.length > 0) {
      this.field.includeExcludeObject = this.includeExcludeObject;

      this.field.treeData = this.treeData;
    }


    this.closeModal();
  }
  elementTreeExpanded(element) {

    this.qcs.fieldChangingValue.next({eventElement: element, tree: this.field.treeData, key: this.field.key, changingType: 'expanded'});

  }
  fieldChanged(fieldKey, file) {

      this.form.patchValue({[fieldKey]: file});
      this.form.get([fieldKey]).markAsDirty();


  }
  ngOnDestroy() {
    this.field.treeData = [];
  }
}
