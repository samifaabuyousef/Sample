import {Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldBase} from '../../services/form-field-base';

import {NodeElementBase} from '../../services/node-element';
import {ModelConfig} from '../../models/model-config';

import {FieldDirective} from '../../directives/field.directive';
import {FieldDataInterface} from '../../models/field-data-interface';

@Component({
  selector: 'app-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent implements OnInit {
  modalKey: string;
  @ViewChild(FieldDirective, {static: true}) fieldHost: FieldDirective;
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @Output() fieldChangingValue = new EventEmitter();
  key: string;
  controlType: string;
  @ViewChild('modal', {static: true}) modal;
  modalConfig: ModelConfig;
  modelFields: NodeElementBase<any>[] = [];
  openModel = false;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (!this.field.hidden) {
      this.loadComponent();
    }

  }


  loadComponent() {

   
    if(this.field.component){
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.field.component);

      const viewContainerRef = this.fieldHost.viewContainerRef;
  
  
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<FieldDataInterface>componentRef.instance).field = this.field;
      (<FieldDataInterface>componentRef.instance).form = this.form;
      if ((<FieldDataInterface>componentRef.instance).fieldChangingValue) {
        (<FieldDataInterface>componentRef.instance).fieldChangingValue.subscribe(data => {
  
          this.fieldChangingValue.emit(data);
        });
      }
    }

  }


}

