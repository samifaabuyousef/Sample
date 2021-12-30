import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './layout/main/main.component';
import {BlankComponent} from './layout/blank/blank.component';
import {FinancialModule} from './modules/financial/financial.module';
import {AuthenticationModule} from './modules/auth/authentication.module';
import {
  BreadcrumbModule,
  BreadcrumbService,
  CardModule,
  MenuAsideService,
  MenuConfigService,
  ChartService,
  MenuTopNavService,
  SideBarModule, StatisticCardModule,
  TopNavModule,
  TopItemsTableModule,
  ItemsChartByDateModule
} from 'nabed-components';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CmsModule} from './modules/cms/cms.module';
import {SortablejsModule} from 'ngx-sortablejs';
import {CoreModule} from './modules/core/core.module';
import {GlobalErrorHandler} from './modules/core/error-handler/error-handler';
import {StatisticService} from './modules/poc/dashboard/pages/statistic.service';
import {GestureConfig} from '@angular/material';
import {Ng2PanZoomModule} from 'ng2-panzoom';
import {MatTreeModule} from '@angular/material/tree';
// for HttpClient import:
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// for Router import:
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {CanDeactivateGuard} from './modules/core/guards/can-deactivate.guard';
import {ViewCanDeactivateGuard} from './modules/core/guards/view-can-deactivate';
import { AdmModule } from './modules/adm/adm.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlankComponent],
  imports: [
    BrowserModule,
    Ng2PanZoomModule,
    NgxMaterialTimepickerModule,
    AppRoutingModule,
    CoreModule,
    MatSidenavModule,
    TopNavModule,
    MatTreeModule,
    AuthenticationModule,
    FinancialModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    }),
    CmsModule,
    SideBarModule,
    ToastrModule.forRoot(),
    CardModule,
    BreadcrumbModule,
    TopItemsTableModule,
    ItemsChartByDateModule,
    BrowserAnimationsModule,
    SortablejsModule.forRoot({animation: 150}),

    // for loader:
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    // for translate
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
    MenuConfigService,
    ChartService,
    MenuAsideService,
    MenuTopNavService,
    BreadcrumbService,
    ViewCanDeactivateGuard,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    StatisticService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
