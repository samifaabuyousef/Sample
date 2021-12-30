import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ADVERTISEMENTCAMPAIGNS, BASE_URL} from '../../../../apiMap';
import {CrudService} from '../../core/services/crud.service';
import { CampaingModal} from './modals/campaing-modal';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends CrudService<CampaingModal>  {
  constructor(protected http: HttpClient) {
    super(http, BASE_URL, ADVERTISEMENTCAMPAIGNS);
  }
}
