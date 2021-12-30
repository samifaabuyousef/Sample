import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthenticationService} from '../../modules/core/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public url: string;
  mainUser = {
    username : '',
    email : ''
  };
  avatar ='/assets/images/user4.svg'
  public userFullName: string;
  @ViewChild('wrapperContent', {static: true}) wrapperContent;
  constructor(
      private router: Router,
      private renderer: Renderer2,
      private authService: AuthenticationService
  ) {
  }
  public ngOnInit() {
    this.url = this.router.url;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.url = e.url;
        this.closeMenu();
      }
    });
    const hcpUser = JSON.parse(localStorage.getItem('hcpUser'));
    if (hcpUser) {
      this.mainUser.username = hcpUser.username;
      this.mainUser.email = hcpUser.full_name;
    }
    this.userFullName = localStorage.getItem('user_full_name') ? localStorage.getItem('user_full_name') : '';
    this.avatar = 
    localStorage.getItem('user_image')?localStorage.getItem('user_image') 
    : localStorage.getItem('roles') && localStorage.getItem('roles').search('Admin')!= -1?
    'assets/images/logo.png'
    :
     this.avatar
 
  }

  logout() {
    this.authService.logout().subscribe();
  }
  changePassword(){
    this.router.navigate(['/profile/changePassword']);
  }
  redirectToProfile() {
    // todo redirect user to his profile
  }

  toggleMenu() {
    const active = this.wrapperContent.nativeElement.classList.contains('menu-opened');
    this.renderer[active ? 'removeClass' : 'addClass'](this.wrapperContent.nativeElement, 'menu-opened');
  }
  closeMenu() {
    this.renderer.removeClass(this.wrapperContent.nativeElement, 'menu-opened');
  }
}
