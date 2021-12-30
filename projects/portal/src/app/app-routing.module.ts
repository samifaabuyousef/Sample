import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {BlankComponent} from './layout/blank/blank.component';
import {ProtectedGuard, PublicGuard} from 'ngx-auth';
import {PageNotFoundComponent} from './modules/core/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ProtectedGuard],
    children: [
      {
        path: 'camps',
        loadChildren: () => import('./modules/camps/camps.module').then(m => m.CampsModule)
      },
      {
        path: '',
        redirectTo: 'cms',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [PublicGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/authentication.module').then(m => m.AuthenticationModule)
      },
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
