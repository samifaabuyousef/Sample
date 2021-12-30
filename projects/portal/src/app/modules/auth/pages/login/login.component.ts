import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { PortalMenuService } from '../../../core/services/portal-menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isSubmitting = false;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private toastr: ToastrService,
      public authService: AuthenticationService,
      private portalService :PortalMenuService,
      private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.authService.csrf().subscribe();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.isSubmitting = true;
    this.authService.login(this.form.value)
        .subscribe(
            () => {
              this.portalService.getPerssionOnHeader();
              this.portalService.changingRouterLink.subscribe(() => {
                this.zone.run(() => {
                  this.router.navigateByUrl(this.portalService.routAfterLogIn);
                });
              });
              },
            e => {
              if (e.status === 400) {
                this.toastr.error('Invalid username/email or password');
                this.isSubmitting = false;
                return;
              }
              this.toastr.error('Invalid username/email or password');
              this.isSubmitting = false;
            }
        );
  }
}
