import {CanDeactivate} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {HostListener} from '@angular/core';
import {Observable} from 'rxjs';

export interface FormComponent {
  form: FormGroup;
}

export class DirtyCheckGuard implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent) {
    if (component.form.dirty) {
      return confirm('Changes you made may not be saved.');
    }

    return true;
  }
}
