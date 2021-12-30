import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DirtyCheckGuard} from '../../core/guards/dirty-check.guard';
import {AdvertiserListComponent} from './pages/advertiser-list/advertiser-list.component';
import {AdvertiserEditComponent} from './pages/advertiser-edit/advertiser-edit.component';
import {AdvertiserResolver} from './advertiser.resolver';

const routes: Routes = [
  {path: '',
    children: [
        {path: '', component: AdvertiserListComponent},
        {path: 'new', component: AdvertiserEditComponent,  canDeactivate: [DirtyCheckGuard]},
        {
          path: 'edit/:id',
          component: AdvertiserEditComponent,
          canDeactivate: [DirtyCheckGuard],
          resolve: {advertiser: AdvertiserResolver}
        }
        ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertiserRoutingModule { }
