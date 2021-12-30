import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignEditComponent } from './pages/campaign-edit/campaign-edit.component';
import {CardModule, UploadModule} from 'nabed-components';
import {
  MatDatepickerModule,

  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatNativeDateModule,
  MatFormFieldModule
} from '@angular/material';
import {CoreModule} from '../../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSelectModule} from 'ngx-select-ex';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { CampaignService } from './campaign.service';
import { CampaignFilterComponent } from './pages/campaign-filter/campaign-filter.component';
import {NetworksModule} from "./pages/networks/networks.module";


@NgModule({
    declarations: [CampaignListComponent, CampaignEditComponent, CampaignFilterComponent],
    imports: [
        CommonModule,
        CampaignRoutingModule,
        CardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        CoreModule,
        ReactiveFormsModule,
        NgxSelectModule,
        Ng2TelInputModule,
        UploadModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
    ],
    exports: [
        CampaignFilterComponent,
    ],
    providers: [CampaignService]
})
export class CampaignModule { }
