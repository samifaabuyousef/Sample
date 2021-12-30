import {Injectable} from '@angular/core';
import {BASE_URL, LOOKUP} from '../../../../apiMap';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(protected http: HttpClient) {
  }

  public getAll(fields) {
    return this.http.get(`${BASE_URL}/${LOOKUP}`, {
      params: new HttpParams({fromObject: {'fields[]': fields}})
    });
  }

  public getContentCustomization(specialityIds, type) {
    return this.http.get(`${BASE_URL}/${LOOKUP}/content-customization`, {
      params: new HttpParams({
        fromObject: {
          'speciality_ids[]': specialityIds,
          type
        }
      })
    });
  }

  public getAllWithFilter(fields, filter: any = '') {
    let params = new HttpParams().set('fields[]', fields);
    for (const [key, value] of Object.entries(filter)) {
      params = params.append(key, value.toString());
    }
    return this.http.get(`${BASE_URL}/${LOOKUP}`, {params});
  }
}
