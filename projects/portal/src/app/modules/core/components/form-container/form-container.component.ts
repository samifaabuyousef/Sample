import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent {

  @Input() saveText = 'Save';
  @Input() saveAndNotLeavingText = 'Save';
  @Input() cancelText = 'Cancel';
  @Input() cancelRouteLink: string;
  @Input() whiteBackGround = false;
  @Input() saveWithOutLeaving = false;
  @Input() disableSaveText = false;
  @Input() isDirty: boolean;
  @Input() routingOnCancel = true;
  @Input() deleteButtonsBar: boolean = false;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  @HostListener('window:beforeunload')
  windowUnload(): Observable<boolean> | boolean {
    return (!this.isDirty);
  }

  submit(type) {
    this.onSubmit.emit(type);
  }

  close() {
    this.onCancel.emit();
  }


}
