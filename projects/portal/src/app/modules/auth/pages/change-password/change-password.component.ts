import {Component, OnInit} from '@angular/core';
import {PasswordService} from './password.service';
import {NodeElementBase} from '../../../core/services/node-element';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PortalMenuService} from '../../../core/services/portal-menu.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  fields$: NodeElementBase<any>[] = [];
  successMessage: string;
  notValidErrorMessage: string;

  constructor(private  passwordServ: PasswordService, private toastr: ToastrService,
              private router: Router,
              private portalMenuService: PortalMenuService
  ) {
  }

  ngOnInit() {
    this.fields$ = this.passwordServ.buildNodeForm();
    this.initMessages();
  }

  changeFormStatus(event) {
   
  }

  private initMessages() {

    this.successMessage = 'Password changed successfully';
    this.notValidErrorMessage = 'Please make sure all fields are filled in correctly.';

  }

  navigateToUsersList() {
    this.router.navigateByUrl(this.portalMenuService.routAfterLogIn);
  }

  submit(form) {
    const data = {
      "old_password": form.value.old_password,
      "new_password": form.value.new_password
    };
 
    this.passwordServ.changePassword(data).subscribe((serverData) => {
       
        this.toastr.success(this.successMessage);
      },
      (error) => {
        if (error.status === 422 &&
          error.error.errors['old_password']
        ) {
          this.toastr.error('The old password is wrong');
        }

      }
    );
  }
}
