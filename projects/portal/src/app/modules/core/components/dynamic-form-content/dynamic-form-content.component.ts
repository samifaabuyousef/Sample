import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ContainerFieldsBase} from '../../services/container-fields';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {FormControlService} from '../../services/form-control-service';

@Component({
  selector: 'app-dynamic-form-content',
  templateUrl: './dynamic-form-content.component.html',
  styleUrls: ['./dynamic-form-content.component.scss']
})
export class DynamicFormContentComponent implements OnInit {
  @Input() fieldsContainersContent: ContainerFieldsBase<string>[] = [];
  @Input() form: FormGroup;
  // @Output() fieldChangingValuee = new Subject<any>();
  @Output() fieldChangingValuee = new EventEmitter<string>();

  constructor(private qcs: FormControlService) {
  }

  ngOnInit() {
  }

  onChangingField(event) {
  
    this.qcs.fieldChangingValue.emit(event);

  }
}
