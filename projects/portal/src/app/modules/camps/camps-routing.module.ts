import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'advertisers',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'advertisers',
        loadChildren: () => import('./advertiser/advertiser.module').then(m => m.AdvertiserModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
      },
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
