import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// @sami -------------------------------------------------------------
// the camps mosule has many routes the campaigns module is the sample
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'campaigns',
        loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampsRoutingModule { }
