import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[field-host]',
})
export class FieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}


