import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertiserRoutingModule } from './advertiser-routing.module';
import { AdvertiserListComponent } from './pages/advertiser-list/advertiser-list.component';
import { AdvertiserEditComponent } from './pages/advertiser-edit/advertiser-edit.component';
import {MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule} from '@angular/material';
import {CardModule, UploadModule} from 'nabed-components';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {NgxSelectModule} from 'ngx-select-ex';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { AdvertiserService } from './advertiser.service';


@NgModule({
  declarations: [AdvertiserListComponent, AdvertiserEditComponent],
  imports: [
    CommonModule,
    AdvertiserRoutingModule,
    MatTableModule,
    MatSortModule,
    CardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CoreModule,
    UploadModule,
    NgxSelectModule,
    Ng2TelInputModule
  ],
  providers:[AdvertiserService]
  
})
export class AdvertiserModule { }
