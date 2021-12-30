import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {CrudService} from '../services/crud.service';
import {catchError, finalize} from 'rxjs/operators';

export class BaseDataSource<T> implements DataSource<T> {

  private dataSubject = new BehaviorSubject<T[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  totalElements: number;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public currentData = new Subject<PagedData<T>>();
  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();
  public data :T[]=[];
  constructor(private crudService: CrudService<T>) {
  }

  public setLoadingSubject(value: boolean) {
    this.loadingSubject.next(value);
  }
  public load(filter: any = '', sortDirection: any = 'asc', page: number = 1, prePage: number = 10 , stopLoader = false) {
    if (!stopLoader) {
      this.loadingSubject.next(true);
    }

    this.crudService.getAll(filter, sortDirection, page, prePage).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((data: PagedData<T>) => {
        this.data=data.data;
        this.dataSubject.next(data.data);
        this.totalElements = data.meta ? data.meta.total : 'data' in data && data.data.length > 0 ? data.data.length : 0;

        this.totalSubject.next(data.meta ? data.meta.total : 'data' in data && data.data.length > 0 ? data.data.length : 0);
        this.currentData.next(data);

      });
  }


  public loadWithFetchedData(data: PagedData<T>) {

    this.loadingSubject.next(true);
    this.dataSubject.next(data.data);
    this.currentData.next(data);
    this.data=data.data;
    this.totalSubject.next(data.meta ? data.meta.total : 'data' in data && data.data.length > 0 ? data.data.length : 0);
    this.loadingSubject.next(false);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.dataSubject.asObservable();
  }

  getDataSubject() {
    return this.dataSubject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.totalSubject.complete();
    this.loadingSubject.complete();
  }

}
