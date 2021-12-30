import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'transformToText'})
export class TransformToTextPipe implements PipeTransform {
  transform(html) {
    const span = document.createElement('span');
    span.innerHTML = html;
    return span.textContent || span.innerText;
  }
}
