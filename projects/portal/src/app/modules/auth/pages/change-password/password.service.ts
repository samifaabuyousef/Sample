import {Injectable} from '@angular/core';
import {FormFieldBase} from '../../../core/services/form-field-base';
import {TextboxField} from '../../../core/services/field-textBox';
import {NodeElementBase} from '../../../core/services/node-element';
import {NodeElementContainer} from '../../../core/services/node-element-container';
import {NodeElementsArray} from '../../../core/services/node-elements-array';
import {CrudService} from '../../../core/services/crud.service';
import {HttpClient} from '@angular/common/http';
import {BASE_URL, SPECIALTIES, CHANGE_PASSWORD} from 'projects/portal/src/apiMap';
import {Speciality} from '../../../cms/models/speciality.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService extends CrudService<any> {

  constructor(protected http: HttpClient
  ) {
    super(http, BASE_URL, CHANGE_PASSWORD);
  }

  ContainerFields: NodeElementBase<any>[] = [];

  buildNodeForm(): NodeElementBase<any>[] {


    const firstContanainer: FormFieldBase<string>[] = [


      new TextboxField({
        key: 'old_password',
        label: 'Current Password',
        required: true,
        maxLength: 100,
        require: true,
        type: 'password',
        order: 1

      }),
      new TextboxField({
        key: 'new_password',
        label: 'New Password',
        required: true,
        maxLength: 100,
        type: 'password',
        require: true,
        order: 1

      }),

      new TextboxField({
        key: 'confirm_password',
        label: 'Confirm New Password',
        required: true,
        maxLength: 100,
        require: true,
        type: 'password',
        validation: {
          operator: 'equal',
          fields: ['new_password']
        },
        order: 1

      })

    ];


    const containerFields: NodeElementBase<any>[] =
      [
        new NodeElementContainer({
          customClass: 'row ',
          content: {
            containerClass: 'col-6 form-card',
            containerTitle: 'Details',
            nodeElements: [
              new NodeElementsArray({
                content: firstContanainer.sort((a, b) => a.order - b.order)
              })
            ]
          }
        })
      ];

    this.ContainerFields = containerFields;
    return this.ContainerFields;
  }

  changePassword(data): Observable<any> {

    return this.http.put<any>(`${this.url}/${this.endpoint}`, data);

  }
}
