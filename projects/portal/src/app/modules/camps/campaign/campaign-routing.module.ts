import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrandListComponent} from '../brand/pages/brand-list/brand-list.component';
import {BrandEditComponent} from '../brand/pages/brand-edit/brand-edit.component';
import {DirtyCheckGuard} from '../../core/guards/dirty-check.guard';
import {CampaignListComponent} from './pages/campaign-list/campaign-list.component';
import {CampaignEditComponent} from './pages/campaign-edit/campaign-edit.component';
import {BrandResolver} from '../brand/brand.resolver';
import {CampaignResolver} from './campaign.resolver';


// -- @sami -------------------------
// -- routes array for the module ---
// -- add and edit routes activated the candeactivate guard for the form
// -- the edit route resolve the campaign data using the resolver
const routes: Routes = [
  {path: '',
    children: [
      {path: '', component: CampaignListComponent},
      {path: 'new', component: CampaignEditComponent,  canDeactivate: [DirtyCheckGuard]},
      {
        path: 'edit/:id',
        component: CampaignEditComponent,
        canDeactivate: [DirtyCheckGuard],
        resolve: {campaign: CampaignResolver},
      }
    ],
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
