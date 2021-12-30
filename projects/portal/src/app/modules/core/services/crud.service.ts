import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export abstract class CrudService<T> {

  constructor(protected http: HttpClient, protected url: string, protected endpoint?: string) {
  }


  public set endPointUrl(v : string) {
    this.endpoint = v;
  }

  public getAll(filter, sortDirection, page = 1, prePage = 10): Observable<PagedData<T>> {
    const filterParsed = this.prepareSearchParam(filter);
    let params = new HttpParams();
      // .set('page', page.toString())
      // .set('per_page', prePage.toString());
    if (filter != null && filter !== '') {
      for (const [key, value] of Object.entries(filter)) {
        params = params.append(key, value.toString());
      }
    }
    return this.http.get<PagedData<T>>(`${this.url}/${this.endpoint}`, {params});
  }

  public get(id: any): Observable<T> {
    return this.http.get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  public add(data: any): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endpoint}`, data);

  }

  public edit(id, data: any): Observable<T> {
    return this.http.put<T>(`${this.url}/${this.endpoint}/${id}`, data);
  }

  public delete(id: number): any {
    return this.http.delete(`${this.url}/${this.endpoint}/${id}`);
  }

  private prepareSearchParam(filter: string) {
  }
}

