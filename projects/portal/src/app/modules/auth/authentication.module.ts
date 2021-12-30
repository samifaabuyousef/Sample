import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {CoreModule} from '../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AUTH_SERVICE, AuthModule, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI} from 'ngx-auth';
import {AuthenticationService} from '../core/services/authentication.service';
import {TokenStorage} from '../core/services/token-storage.service';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    AuthModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: []
})
export class AuthenticationModule {
}
