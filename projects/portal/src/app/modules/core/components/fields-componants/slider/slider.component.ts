import {Component, OnInit, Input} from '@angular/core';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../../../services/form-control-service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  oldValue: any;

  constructor(private qcs: FormControlService) {
  }

  ngOnInit() {


    this.form.get(this.field.key).valueChanges.subscribe(selectedValue => {

      this.oldValue = this.form.value[this.field.key];
    });
  }

  sliderValueChange() {
    let moreThanLimit = false;
    if (typeof (this.field.valueLimitaion.limitationArray) !== 'undefined' && this.field.valueLimitaion.limitationArray.length > 0) {
      let sum = this.form.get(this.field.key).value;
      this.field.valueLimitaion.limitationArray.forEach(element => {
        sum = sum + this.form.get(element).value;
      });

      if (sum > this.field.valueLimitaion.limitationValue && !moreThanLimit) {

        moreThanLimit = true;
        this.form.controls[this.field.key].setValue(this.oldValue);
        return;
      } else {
        this.oldValue = this.form.get(this.field.key).value;
      }


    }

  }

}
