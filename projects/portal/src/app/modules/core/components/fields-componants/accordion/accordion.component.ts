import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FieldDataInterface } from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [NgbAccordionConfig]
})
export class AccordionComponent  implements FieldDataInterface, OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  collapsedOpenItem: any='collapse0';

  constructor(config: NgbAccordionConfig) {
    // customize default values of accordions used by this component tree
    config.closeOthers = true;
    // config.type = 'info';
  }

  ngOnInit() {

  }

  toggleCollapse(id) {

    this.collapsedOpenItem = this.collapsedOpenItem === id ? null : id;
  
  }

}
