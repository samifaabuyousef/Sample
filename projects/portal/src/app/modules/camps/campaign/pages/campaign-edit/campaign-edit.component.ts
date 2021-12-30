import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LookupService } from "../../../../core/services/lookup.service";
import { CampaignService } from "../../campaign.service";
import * as moment_ from "moment";
import { objectToFormData } from "object-to-formdata";
import { finalize } from "rxjs/operators";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material";

const moment = moment_;

// -- @sami Defining the date format
export const Date_Format = {
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

@Component({
  selector: "app-campaign-edit",
  templateUrl: "./campaign-edit.component.html",
  styleUrls: ["./campaign-edit.component.scss"],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: Date_Format },
  ],
})
export class CampaignEditComponent implements OnInit {
  loading: any = false;
  public form: FormGroup;
  title: any;
  isSubmitting = false;
  pageTitle: any = "Add Campaign";
  isAdd: any = true;
  isImageExist = false;
  imagePreview: any;
  currentImageName: null;
  private imageStatus: string;
  private successMessage: string;
  private notValidErrorMessage: string;
  brandList: any = [];
  countryArray: any = [];
  campaignId: any;
  typeArray = ["Ads", "Networks", "Association"];
  filterValue = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private lookupService: LookupService,
    private campaignService: CampaignService
  ) {
    this.initForm();
  }

  ngOnInit() {
    // -- calling the lookup function to fill the lists with the needed data
    this.initLookup();
    // -- @ sami ---------------------------------------------------------
    // -- checking the router state if the page is going to be add or edit
    this.campaignId = this.route.snapshot.paramMap.get("id");
    if (this.route.snapshot.paramMap.get("id") != null) {
      this.loading = true;
      this.route.data.subscribe((data) => {
        this.isAdd = false;
        this.loading = false;
        const campaign = data.campaign;
        if (campaign) {
          this.form.patchValue({
            brand_id: campaign.brand_id,
            generic_name: campaign.generic_name,
            name: campaign.name,
            country_id: campaign.country_id,
            start_date: campaign.start_date,
            end_date: campaign.end_date,
            notification_channel: campaign.notification_channel,
          });
        }
      });
    }
    // initializing the page messages
    this.initMessages();
  }


  // -- @sami ---------------------------------
  // -- initializing the reactive form function
  private initForm() {
    const fb = this.fb;
    this.form = fb.group({
      brand_id: fb.control(""),
      generic_name: fb.control("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      name: fb.control("", [Validators.required, Validators.maxLength(100)]),
      country_id: fb.control(""),
      start_date: fb.control(new Date().toISOString().substring(0, 10), [
        Validators.required,
      ]),
      end_date: fb.control("", [Validators.required]),
      notification_channel: fb.control("whatsapp"),
    });
  }


  // -- @sami --------------------------------
  // -- submiting the form Values function ---
  submit() {
    if (this.form.get("start_date").value) {
      this.form.value.start_date = moment(
        this.form.get("start_date").value
      ).format("YYYY-MM-DD");
    }
    if (this.form.get("end_date").value) {
      this.form.value.end_date = moment(this.form.get("end_date").value).format(
        "YYYY-MM-DD"
      );
    }
    const sendedData: any = this.form.value;
    const data = objectToFormData(sendedData, { indices: true });
    const subscription = this.isAdd
      ? this.campaignService.add(data)
      : this.campaignService.edit(this.route.snapshot.paramMap.get("id"), data);
    this.isSubmitting = true;

    subscription.pipe(finalize(() => (this.isSubmitting = false))).subscribe(
      () => {
        this.toastr.success(this.successMessage);
        this.form.markAsPristine();
        this.loading = false;
        this.router.navigate(["camps/campaigns"]);
      },
      (e) => {
        this.toastr.error(e.message, "Error");
        this.loading = false;
      }
    );
  }

  imageChanged(file) {
    this.currentImageName = file.name;
    this.form.patchValue({ image: file });
    this.form.get("image").markAsDirty();
    this.imagePreview = null;
    this.imageStatus = "add";
  }

  removeImage() {
    this.imageStatus = "remove";
    this.imagePreview = "";
    this.isImageExist = false;
  }

  // -- @sami -------------------------------------
  // -- form array for building the address group--
  addNewAddressGroup() {
    const add = this.form.get("key_contact") as FormArray;
    add.push(
      this.fb.group({
        key_contact_name: [],
        key_contact_mobile: [],
        key_contact_country: [],
        key_contact_region: [],
        key_contact_address: [],
        key_username: [],
        key_password: [],
      })
    );
  }

  // -- @sami -------------------------------------
  // -- deleting from the form array
  deleteAddressGroup(index: number) {
    const add = this.form.get("key_contact") as FormArray;
    add.removeAt(index);
  }

  get keyContact() {
    // @ts-ignore
    return this.form.get("key_contact").controls;
  }


  onBlur($event: FocusEvent) {}

  // initializing messages function
  private initMessages() {
    this.pageTitle = this.isAdd ? "Add Campaign" : "Edit Campaign";
    this.successMessage = this.isAdd
      ? "Campaign added successfully"
      : "Campaign edited successfully";
    this.notValidErrorMessage =
      "Please make sure all fields are filled in correctly.";
  }

  private initLookup(fields = ["brands", "countries"]) {
    this.lookupService.getAll(fields).subscribe((data: any) => {
      if (fields.includes("brands")) {
        data.brands.forEach((element) => {
          this.brandList.push({
            optionId: element.id,
            optionTitle: element.title,
          });
        });
      }
      if (fields.includes("countries")) {
        data.countries.forEach((element) => {
          this.countryArray.push({
            optionId: element.id,
            optionTitle: element.title,
          });
        });
      }
    });
  }


}
