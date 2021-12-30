import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ContentClassSelectorComponent } from "./components/content-class-selector/content-class-selector.component";
import { SortablejsModule } from "ngx-sortablejs";
import { NgxSelectModule } from "ngx-select-ex";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AuthenticationService } from "./services/authentication.service";
import {
  AUTH_SERVICE,
  PROTECTED_FALLBACK_PAGE_URI,
  PUBLIC_FALLBACK_PAGE_URI,
} from "ngx-auth";
import { TokenStorage } from "./services/token-storage.service";
import { FormContainerComponent } from "./components/form-container/form-container.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RouterModule } from "@angular/router";
import { DirtyCheckGuard } from "./guards/dirty-check.guard";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { DynamicFieldComponent } from "./components/dynamic-field/dynamic-field.component";
import { FormControlService } from "./services/form-control-service";
import { DynamicViewComponantComponent } from "./components/dynamic-view-componant/dynamic-view-componant.component";
import { ColorPickerModule } from "ngx-color-picker";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";
import { DynamicFilterComponent } from "./components/dynamic-filter/dynamic-filter.component";
import { UploadModule, TopItemsTableModule } from "nabed-components";
import { DynamicFormContentComponent } from "./components/dynamic-form-content/dynamic-form-content.component";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { MatIconModule, MAT_DATE_FORMATS } from "@angular/material";

import { MatTabsModule } from "@angular/material/tabs";
import { EditorComponent } from "./components/editor/editor.component";
import { EditorModule } from "@tinymce/tinymce-angular";
import { TagsComponent } from "./components/tags/tags.component";
import { TransformToTextPipe } from "./pipelines/transform-to-text";

import { TextboxComponent } from "./components/fields-componants/textbox/textbox.component";
import { FieldDirective } from "./directives/field.directive";
import { DropdownComponent } from "./components/fields-componants/dropdown/dropdown.component";
import { ColorpickerComponent } from "./components/fields-componants/colorpicker/colorpicker.component";
import { TextAreaComponent } from "./components/fields-componants/text-area/text-area.component";
import { ImageComponent } from "./components/fields-componants/image/image.component";
import { CustomSelectorComponent } from "./components/fields-componants/custom-selector/custom-selector.component";
import { CheckboxComponent } from "./components/fields-componants/checkbox/checkbox.component";
import { GeneralSelectorComponent } from "./components/general-selector/general-selector.component";
import { AccordionComponent } from "./components/fields-componants/accordion/accordion.component";
import { SliderComponent } from "./components/fields-componants/slider/slider.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AppTopicContentClassComponent } from "./components/app-topic-content-class/app-topic-content-class.component";
import {
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
} from "@angular/material";
import { OrgchartTreeComponent } from "./components/orgchart-tree/orgchart-tree.component";
import { OrgChartService } from "./services/orgcharts.service";
import { GeneralAppSelectorComponent } from "./components/fields-componants/general-app-selector/general-app-selector.component";
import { Ng2TelInputModule } from "ng2-tel-input";
import { MobileNumberComponent } from "./components/fields-componants/mobile-number/mobile-number.component";
import { TopElementsTableComponent } from "./components/top-elements-table/top-elements-table.component";
import { StatisticCardComponent } from "./components/statistic-card/statistic-card.component";
import { GeneralFilterComponent } from "./components/general-filter/general-filter.component";
import { PlyrModule } from "ngx-plyr";
import { VideoListComponent } from "./components/video-list/video-list.component";
import { DocumentViewerComponent } from "./components/document-viewer/document-viewer.component";
import { VideoComponentComponent } from "./components/video-component/video-component.component";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import {
  ViewCanDeactivateGuard,
  ViewComponentCanDeactivate,
} from "./guards/view-can-deactivate";
import { SearchComponent } from "./components/fields-componants/search/search.component";
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ArrayOperationService } from "./services/array.operation.service";
import { CalendarComponent } from "./components/fields-componants/calendar/calendar.component";
import { TimePickerComponent } from "./components/fields-componants/time-picker/time-picker.component";
import { DateCheckBoxComponent } from "./components/fields-componants/date-check-box/date-check-box.component";
import { ButtonComponent } from "./components/fields-componants/button/button.component";
import { ArrayContainerComponent } from "./components/fields-componants/array-container/array-container.component";
import { RadioGroupComponent } from "./components/fields-componants/radio-group/radio-group.component";
import { SafePipe } from "./pipelines/safe";
import { ComposeComponent } from "./components/fields-componants/compose/compose.component";
import { TreeComponent } from "./components/fields-componants/tree/tree.component";
import { GeneralTreeComponent } from "./components/general-tree/general-tree.component";
import { MatTreeModule } from "@angular/material/tree";
import { GeneralTreeService } from "./services/general-tree.service";
import { PageDeactivateGuard } from "./guards/page-can-deactivate.guard";
import { SessionInterceptor } from "./interceptors/session.interceptor";
import { ChannelsDropdownComponent } from "./components/channels-dropdown/channels-dropdown.component";
import { ArrayDropdownComponent } from "./components/fields-componants/array-dropdown/array-dropdown.component";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { OffsetTopDirective } from "./directives/offset-top.directive";
import { ScrollableDirective } from "./directives/scrollable.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ExcelService } from "./services/excel.service";
import { MomentDateModule } from "@angular/material-moment-adapter";

export const MY_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};

@NgModule({
  declarations: [
    SafePipe,
    ScrollableDirective,
    OffsetTopDirective,
    ContentClassSelectorComponent,
    PageNotFoundComponent,
    FormContainerComponent,
    DynamicFormComponent,
    DynamicFieldComponent,
    DynamicViewComponantComponent,
    DynamicFilterComponent,
    DynamicFormContentComponent,
    EditorComponent,
    TagsComponent,
    FieldDirective,
    TransformToTextPipe,
    TextboxComponent,
    DropdownComponent,
    ArrayDropdownComponent,
    ColorpickerComponent,
    TextAreaComponent,
    ImageComponent,
    CustomSelectorComponent,
    CheckboxComponent,
    GeneralSelectorComponent,

    AccordionComponent,

    SliderComponent,

    AppTopicContentClassComponent,
    OrgchartTreeComponent,

    GeneralAppSelectorComponent,

    MobileNumberComponent,

    TopElementsTableComponent,

    StatisticCardComponent,

    GeneralFilterComponent,

    VideoComponentComponent,

    VideoListComponent,

    DocumentViewerComponent,

    SearchComponent,

    PieChartComponent,

    CalendarComponent,

    TimePickerComponent,

    DateCheckBoxComponent,

    ButtonComponent,

    ArrayContainerComponent,

    RadioGroupComponent,

    ComposeComponent,

    TreeComponent,

    GeneralTreeComponent,

    ChannelsDropdownComponent,

    ArrayDropdownComponent,
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    NgbModule,
    MomentDateModule,
    DragDropModule,
    RouterModule,
    MatDatepickerModule,
    EditorModule,
    NgxEchartsModule,
    HttpClientModule,
    Ng2TelInputModule,
    NgxMaterialTimepickerModule,
    TopItemsTableModule,
    MatTabsModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    SortablejsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    ColorPickerModule,
    MatFormFieldModule,
    UploadModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    PlyrModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    ArrayOperationService,
    ExcelService,
    GeneralTreeService,
    TokenStorage,
    AuthenticationService,
    OrgChartService,
    FormControlService,
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ["l", "LL"],
        },
        display: {
          dateInput: "L",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY",
        },
      },
    },

    { provide: AUTH_SERVICE, useClass: AuthenticationService },
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: "/" },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: "/login" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true,
    },
    DirtyCheckGuard,
    CanDeactivateGuard,
    PageDeactivateGuard,
    ViewCanDeactivateGuard,
  ],
  exports: [
    ContentClassSelectorComponent,
    DropdownComponent,
    FormContainerComponent,
    DynamicFormComponent,
    PieChartComponent,
    DynamicViewComponantComponent,
    TransformToTextPipe,
    OrgchartTreeComponent,
    GeneralFilterComponent,
    TagsComponent,
    EditorComponent,
    TopElementsTableComponent,
    DynamicFilterComponent,
    GeneralSelectorComponent,
    AppTopicContentClassComponent,
    StatisticCardComponent,
    VideoComponentComponent,
    DocumentViewerComponent,
    VideoListComponent,
    CalendarComponent,
    SafePipe,
  ],
  entryComponents: [
    TextboxComponent,
    ArrayDropdownComponent,
    DropdownComponent,
    ColorpickerComponent,
    CheckboxComponent,
    TreeComponent,
    TextAreaComponent,
    CustomSelectorComponent,
    ImageComponent,
    GeneralAppSelectorComponent,
    AccordionComponent,
    SliderComponent,
    ButtonComponent,
    ArrayContainerComponent,
    RadioGroupComponent,
    MobileNumberComponent,
    SearchComponent,
    CalendarComponent,
    TimePickerComponent,
    DateCheckBoxComponent,
    ComposeComponent,
  ],
})
export class CoreModule {
  constructor() {}
}
