import {Component, OnInit, Input, Renderer2, ViewChild, ElementRef, OnDestroy,
   ViewChildren, QueryList, AfterViewInit, AfterViewChecked} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {FieldDataInterface} from '../../../models/field-data-interface';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormControlService} from '../../../services/form-control-service';
import { OffsetTopDirective } from '../../../directives/offset-top.directive';
import { ScrollableDirective } from '../../../directives/scrollable.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-array-dropdown',
  templateUrl: './array-dropdown.component.html',
  styleUrls: ['./array-dropdown.component.scss']
})
export class ArrayDropdownComponent implements FieldDataInterface, OnInit,AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  showElementTime: string = null;
  selectedSlotControlRow: any;
  @ViewChild('modal', {static: true}) modal;
  @ViewChild('displayChoicesIcon', {static: false}) displayChoicesIcon: ElementRef;

  @ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;
  @ViewChild(ScrollableDirective,{static:false}) list: ScrollableDirective;
  appearMenuAction: boolean = false;
  selectedChoice: string;
  loadingTree: boolean;
  openModel: boolean;
  modalKey: any;
  editMode: boolean;
  editElementIndex: any;
  modelFields: any;
  selectedVideoControlRow: any;
  showElementVideoTime: any;
  displayFilter: boolean = false;
  loadingSlotList: boolean = false;
  selectedSlotControlRowIndex :number =0;


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

  constructor(private renderer: Renderer2, private qcs: FormControlService) {

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        typeof (this.displayChoicesIcon) !== 'undefined' && e.target !== this.displayChoicesIcon.nativeElement


      ) {

        this.appearMenuAction = false;

      }

    });
  }

  ngOnInit() {
 
    this.field.onchange.subscribe((data) => {

      if (data.type === 'reload_modal_fields') {

        this.modelFields = [];
        setTimeout(() => {
          this.modelFields = this.field.modalConfig.editForm(null, data.params);
          this.field.filter.resultsNumber= data.params.videoArray.length;
        }, 1000);


        this.modalKey = this.field.modalConfig.title;
      }
      if (data.type === 'addNewSlot') {
        this.loadingSlotList = false;
        this.selectedSlotControlRow = data.selectedSlot;
        this.showElementTime = this.getValue(data.selectedSlot, 'id');
      
        this.selectedSlotControlRowIndex=data.newElementIndex;
       
       

      }
    });
    this.selectedChoice = this.field.buttonChoices && this.field.buttonChoices.length > 0 ? this.field.buttonChoices[0] : '';
    if (this.field.value && this.field.value.length > 0 && this.fieldFormArray.controls.length <= 0) {
      let fieldValues: any = this.field.value;

      fieldValues.forEach(element => {

        if (element) {

          // const formControlFields: { name: string, control: FormControl }[] = [];
          const formGroup: FormGroup = new FormGroup({});
          for (const key in element) {
            const elemtKey = element[key];
            if (elemtKey) {
              formGroup.addControl(key, elemtKey);
            }

          }
          this.fieldFormArray.push(
            formGroup
          );

        }

      });


    }
  }
  
  ngAfterViewInit() {

  
  }

  ngAfterViewChecked(){
    
    if(this.selectedSlotControlRowIndex != 0){
      this.list.scrollTop = this.listItems.find((_, i) => i === this.selectedSlotControlRowIndex).offsetTop;
    }
    
  }
  get fieldFormArray() {
    return this.form.controls[this.field.key] as FormArray;
  }

  videoFormArray() {

    return this.selectedSlotControlRow.controls['videos'] as FormArray;
  }

  dateFormArray() {

    return this.selectedVideoControlRow.controls['dates'] as FormArray;
  }

  getField(field, index) {
    const newField = {
      ...field
    }
    newField.key = newField.key + index;
    return newField;
  }

  addDates() {
    this.qcs.modalChaning.next({

      'key': this.field.key,
      'changingType': 'addDateToVideo',
      'form': this.form,
      'editableVideo': this.selectedVideoControlRow
    });
  }

  getValue(element, arrr: any) {

    if (element) {
      return element.value[arrr];
    }

  }


  getValue1(element, arrr: any) {
    if (element) {
      return element.value[arrr];
    }

  }

  showSlotVideos(from, name) {
    this.selectedSlotControlRow = from;
    this.showElementTime = name;

  }

  showVideoDetails(from, name) {
    this.selectedVideoControlRow = from;
    this.showElementVideoTime = name;

  }

  showButtonChoices() {

    this.appearMenuAction = !this.appearMenuAction;


  }

  addSlot(type) {
    this.loadingSlotList = true;
    this.qcs.modalChaning.next({

      'type': type,
      'key': this.field.key,
      'changingType': 'addNewSlot',
      'form': this.form,
      'field': this.field
    });
  }


  displaySlotItems() {
    return this.getValue(this.selectedSlotControlRow, 'id') === this.showElementTime;
  }

  displayVideoItems() {
    const selectedElementId = this.getValue(this.selectedVideoControlRow, 'id');


    if (selectedElementId) {
      return selectedElementId === this.showElementVideoTime;
    }
    return false;
  }

  applyFilter(event) {
  
    this.modelFields = [];
    this.qcs.modalChaning.next({
      'formData': event,
      'key': this.field.key,
      'field': this.field,
      'changingType': 'applyFilter',
      'form': this.form
    });
  }

  resetFilter() {
  }

  deleteVideo(id) {
    this.qcs.modalChaning.next({

      'key': this.field.key,
      'videoId': id,
      'changingType': 'deleteVideo',
      'editabledSlot': this.selectedSlotControlRow
    });
  }

  deleteSlot(id) {
    this.qcs.modalChaning.next({

      'key': this.field.key,
      'slotId': id,
      'changingType': 'deleteSlot',
      'form': this.form
      
    });
  }

  openModal(field, editMode: boolean = false, index?) {

    this.displayFilter = true;
    this.openModel = true;
    // this.modalConfig = field.modalConfig;

    this.modal.open();
    if (editMode) {
      this.editMode = true;

      this.editElementIndex = index;

      this.modelFields = field.modalConfig.editForm(this.fieldFormArray.controls[index].value, this.field.params);
    } else {
      this.editMode = false;
      if (!field.modalConfig.modalFormIsFunction) {


        if (this.field.params) {

          this.modelFields = this.field.modalConfig.editForm(null, this.field.params);
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.fieldFormArray.controls, event.previousIndex, event.currentIndex);
  }
  dropVideoList(event: CdkDragDrop<string[]>, controls){
    moveItemInArray(controls, event.previousIndex, event.currentIndex);
  }

  changeFormStatus(e) {
  }

  addContentClass(Formdata: any) {
    this.qcs.modalChaning.next({
      'formData': Formdata,
      'key': this.field.key,
      'changingType': 'editSlot',
      'form': this.form,
      'editableSlot': this.getValue(this.selectedSlotControlRow, 'id')
    });

    this.closeModal();

  }

  ngOnDestroy() {
    this.field.onchange.complete();
  }
}
