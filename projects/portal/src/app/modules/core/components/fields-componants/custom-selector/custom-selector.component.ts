import {Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldBase} from '../../../services/form-field-base';
import {ContentClassConfig} from '../../content-class-selector/content-class-selector.component';
import {ToastrService} from 'ngx-toastr';
import {NodeElementBase} from '../../../services/node-element';
import {ModelConfig} from '../../../models/model-config';
import {objectToFormData} from 'object-to-formdata';
import {LookupService} from '../../../services/lookup.service';
import {FieldDataInterface} from '../../../models/field-data-interface';
import { FormControlService } from '../../../services/form-control-service';


@Component({
  selector: 'app-custom-selector',
  templateUrl: './custom-selector.component.html',
  styleUrls: ['./custom-selector.component.scss'],
  
})
export class CustomSelectorComponent implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @Output() fieldChangingValue = new EventEmitter();

  key: string;
  controlType: string;
  @ViewChild('modal', {static: true}) modal;
  modalConfig: ModelConfig;
  modelFields: NodeElementBase<any>[] = [];
  openModel = false;
  modalKey: string;
  deleteItem: Object = null;
  loadingElement: boolean;
  config: any;

  contentClassComponant: any;

  ngOnInit() {
    

    this.qcs.reloadModal.subscribe((data) => {
   
      this.modelFields = [];
      
      setTimeout(() => {
        if(this.field.modalConfig.editForm){
          this.modelFields = this.field.modalConfig.editForm(data.formValue, null);
        }
      
      }, 1000);
    });

    this.field.config.onAdd.subscribe(() => {

      if (this.field.config.containFullWeightedWithTitle.length > 0) {

        this.onContentClassChanged(this.field.key, this.field.config.containFullWeightedWithTitle, true);
      } else if (this.field.config.contain.length > 0) {

        this.onContentClassChanged(this.field.key, this.field.config.contain, true);

      }
    });


    setTimeout(() => {
      if (this.field.config.containFullWeightedWithTitle.length > 0) {

        this.onContentClassChanged(this.field.key, this.field.config.containFullWeightedWithTitle, true);
      } else if (this.field.config.contain.length > 0) {

        this.onContentClassChanged(this.field.key, this.field.config.contain, true);

      }
    }, 1000);

    this.field.config.onRemove.subscribe((item) => {
      this.deleteItem = item;


    });
    this.field.onchange.subscribe((data)=>{
      // this.loadingElement= true;
      if(data.type='changingConfigContentClass'){
   
        this.contentClassComponant.searching=false;
        if(data.newConfigOptions && data.newConfigOptions.length>0){
          setTimeout(() => {
            this.config =new ContentClassConfig();
          this.field.config.fill(data.newConfigOptions)
          this.config.fill(data.newConfigOptions);
          
          if(this.field.modalConfig && this.field.modalConfig.config){
            this.field.modalConfig.config.fill(data.newConfigOptions);
          }
          }, 100);
        }
      
     
    
      
      }
    })
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

  constructor(private lookupService: LookupService, private toastr: ToastrService,
    private qcs: FormControlService
  ) {

  }

  onContentClassChanged(key, data, initialFormValue: boolean = false, changeType = '') {
    const value = {};
    value[key] = data;

    this.form.patchValue(value);
    if (!initialFormValue) {
      this.form.get(key).markAsDirty();
    }


    if (this.deleteItem) {
      this.fieldChangingValue.emit({
        'key': this.field.key,
        'value': value,
        'form': this.form,
        'item': this.deleteItem,
        'changeType': 'removeItem'
      });

    } else {
      this.fieldChangingValue.emit({'key': this.field.key, 'value': value, 'form': this.form, 'changeType': changeType})

    }

    this.deleteItem = null;


  }

  fetchData(event){
    this.config = event.config;
    this.contentClassComponant= event.contentClassComponant;
    this.fieldChangingValue.emit({'key': this.field.key, 'field':this.field,
    'value': event.searchText, 'form': this.form, 'changeType': 'fetchingData'})

   
  }
  openModal(searchKey, key, field) {
    
    this.controlType = field.controlType;
    this.key = key;
    this.openModel = true;
    this.modalConfig = field.modalConfig;
    if(searchKey){
      this.modelFields = field.modalConfig.editForm(null,searchKey)
    }
    
    else{
      this.modelFields = field.modalConfig.modalForm
    }
    this.modal.open();
    this.modalKey = field.modalConfig.title;
  }

  closeModal() {
    this.modal.close();

  }

  closeModal1(){
    this.modal.close();
    this.modelFields=[];
    this.openModel =false;
    this.fieldChangingValue.emit({'key': this.field.key, 'field':this.field,
    'value': '', 'form': this.form, 'changeType': 'fetchingData'})
  }
  changeFormStatus(event) {
    
    this.fieldChangingValue.emit({'event': event, 'key': this.field.key, 'changingType': 'change'});

  }
  addContentClass(Formdata: any) {

    const data = objectToFormData(Formdata.getRawValue());
   
    const sub = this.modalConfig.changingDataBeforeSending?
    this.modalConfig.service.add(Formdata.getRawValue())
    : this.modalConfig.service.add(data)
     sub.subscribe(
        (res) => {
          if(this.modalConfig.lookupField){
            this.initLookup([this.modalConfig.lookupField], this.modalConfig.config);
          }
          else if(this.modalConfig.addingFunction){
            this.modalConfig.addingFunction(this.modalConfig.config)
          }
          
          if(this.modalConfig.changingLabels){
            const newID = this.modalConfig.changingLabels.find(x => x.oldLabel === 'id') ?
            this.modalConfig.changingLabels.find(x => x.oldLabel === 'id').newLabel :'id';
            const newTitle = this.modalConfig.changingLabels.find(x => x.oldLabel === 'title') ?
            this.modalConfig.changingLabels.find(x => x.oldLabel === 'title').newLabel :'title';
            this.modalConfig.config.add({id: res[newID], title: res[newTitle]}, this.modalConfig.type);
          }
          else{
            this.modalConfig.config.add({id: res.id, title: res.title}, this.modalConfig.type);
          }
       
          if (this.controlType === 'customSelector') {
            this.fieldChanged(this.key, this.modalConfig.config.containFullWeightedWithTitle);
          } else {
            this.fieldChanged(this.key, this.modalConfig.config.relatedWeighted);
          }
          this.closeModal();
        },
        (e) => {
          this.toastr.error('Something went wrong', 'Error');
          this.closeModal();
        }
      );
  }

  fieldChanged(fieldKey, file) {
    this.form.patchValue({[fieldKey]: file});
    this.form.get([fieldKey]).markAsDirty();
  }

  private initLookup(fields: string[] = [], configuration: ContentClassConfig) {
    if (fields.length > 0) {
      this.lookupService.getAll(fields).subscribe((v: any) => {
        configuration.fill(v.conditions);

        if (fields.includes('conditions')) {
          configuration.fill(v.conditions);
        }
        if (fields.includes('procedures')) {
          configuration.fill(v.procedures);

        }
        if (fields.includes('curated')) {
          configuration.fill(v.curated);

        }
        if (fields.includes('nodes')) {
          this.field.valueLimitaion.limitationArray.forEach(element => {
            v.nodes = v.nodes.filter(x => x[element] === this.field.valueLimitaion.limitationValue.toLowerCase());
          });

          configuration.fill(v.nodes);
        }
      });
    }

  }
}
