import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ADVERTISEMENTADVERTISERS, BASE_URL} from '../../../../apiMap';
import {CrudService} from '../../core/services/crud.service';
import {AdvertiserModal} from './modals/advertiser-modal';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserService extends CrudService<AdvertiserModal>  {
  constructor(protected http: HttpClient) {
    super(http, BASE_URL, ADVERTISEMENTADVERTISERS);
  }
}
