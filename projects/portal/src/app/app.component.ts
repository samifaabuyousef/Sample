import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, NavigationStart} from '@angular/router';
import {PortalMenuService} from './modules/core/services/portal-menu.service';
import {filter} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export let firstTime = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portal';
  currentRoute;

  constructor(
    public portalMenuService: PortalMenuService,
    private router: Router,
    private route: ActivatedRoute,
    private http : HttpClient) {

    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {

        if (firstTime) {
          firstTime = false;
          if (
            event.id === 1 &&
            event.url === event.urlAfterRedirects
          ) {

          } else {


            setTimeout(() => {
              this.router.navigateByUrl(this.portalMenuService.routAfterLogIn);
            }, 100);
          }
        }

      });

  }

  ngOnInit() {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin': 'http://localhost:4200/'
//       })
//     };
//     this.http.get('https://api.ipgeolocationapi.com/geolocate/91.213.103.0 HTTP/1.1',httpOptions).subscribe(
//       (data) => {
// console.log(data)
//       }
//     )
    this.route.url.subscribe((data) => {
    });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe((config: any) => {
        this.currentRoute = config.urlAfterRedirects.split('/')[1];
        this.portalMenuService.setHeaders(this.currentRoute);
        this.portalMenuService.init();
      });
    let permission = localStorage.getItem('permission');

    this.portalMenuService.getVisiblePage(JSON.parse(permission));
    if(permission && JSON.parse(permission)[0]){
      this.portalMenuService.getTheFirstPageLink(JSON.parse(permission)[0])
    }
  

  }

}
