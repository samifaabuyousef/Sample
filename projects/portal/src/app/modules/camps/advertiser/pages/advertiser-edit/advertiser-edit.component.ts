import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import * as objectPath from 'object-path';
import {objectToFormData} from 'object-to-formdata';
import {finalize} from 'rxjs/operators';
import {AdvertiserService} from '../../advertiser.service';
import {LookupService} from '../../../../core/services/lookup.service';

@Component({
  selector: 'app-advertiser-edit',
  templateUrl: './advertiser-edit.component.html',
  styleUrls: ['./advertiser-edit.component.scss']
})
export class AdvertiserEditComponent implements OnInit {
  loading: any = false;
  public form: FormGroup;
  title: any;
  isSubmitting = false;
  pageTitle: any = 'Add Advertiser';
  isAdd: any = true;
  isImageExist = false;
  imagePreview: any;
  currentImageName: null;
  private imageStatus: string;

  successMessage: string;
  notValidErrorMessage: string;
  countryArray: any = [];
  phoneNumber: any;
  telCodeIso: any;
  phoneNumberFromChange: any;
  dialCode: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private advertiserService: AdvertiserService,
    private lookupService: LookupService,
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.initLookup();
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.loading = true;

      this.route.data.subscribe(data => {
        this.isAdd = false;
        this.loading = false;
        const advertiser = data.advertiser;
        if (advertiser) {
          this.imagePreview = objectPath.coalesce(advertiser, ['media.url', 'media.cdn_url'], '');
          if (this.imagePreview) {
            this.isImageExist = true;
          }
          this.form.patchValue({
            generic_name: advertiser.generic_name,
            name: advertiser.name
          });
          this.keyContactBaseData(advertiser.contact, advertiser.country_iso, advertiser.mobile_number_details,advertiser.username);
        }
        this.initMessages();
      });
    } else {
      this.keyContactBaseData();
    }

  
    this.initMessages();
  }


  private initForm() {
    const fb = this.fb;
    this.form = fb.group({
      generic_name: fb.control('', [Validators.required, Validators.maxLength(100)]),
      name: fb.control('', [Validators.required, Validators.maxLength(100)]),
      key_contact: fb.array([]),
      contact: fb.array([]),
      media: fb.control(''),
    });
  }

  keyContactBaseData($contactMeta = null, $iso = null, $details = null,$userName='') {

    let dataPrecargada;
    const creds = this.form.get('key_contact') as FormArray;
    if (!this.isAdd && $contactMeta) {
      if ($details){
        this.phoneNumber = $details.ext + '' + $details.number;
      }

      dataPrecargada = [{
        key_contact_name: objectPath.coalesce($contactMeta, ['name'], ''),
        key_contact_mobile_iso: $iso && $iso !== '' ? $iso : 'lb',
        key_contact_mobile: objectPath.coalesce($details, ['number'], ''),
        // @ts-ignore
        key_contact_country: Number(objectPath.coalesce($contactMeta, ['region_id'], 0)),
        key_contact_region: [],
        key_contact_address: objectPath.coalesce($contactMeta, ['address'], ''),
        key_username: $userName,
        key_password: [],
      }];
      dataPrecargada.forEach(pasatiempo => {
        creds.push(this.fb.group({
          key_contact_name: pasatiempo.key_contact_name,
          key_contact_mobile_iso: pasatiempo.key_contact_mobile_iso,
          key_contact_mobile: pasatiempo.key_contact_mobile,
          key_contact_country: pasatiempo.key_contact_country,
          key_contact_region: pasatiempo.key_contact_region,
          key_contact_address: pasatiempo.key_contact_address,
          key_username: pasatiempo.key_username,
          key_password: pasatiempo.key_password,
        }));
      });
     
    } else {

      dataPrecargada = [
        this.fb.group({
          key_contact_name: [],
          key_contact_mobile: [],
          key_contact_country: [],
          key_contact_region: [],
          key_contact_address: [],
          key_username: [$userName, [Validators.required]],
          key_password: this.isAdd ?['', [Validators.required]]:[],
        })];
      dataPrecargada.forEach(pasatiempo => {
        creds.push(this.fb.group({
          key_contact_name: pasatiempo.key_contact_name,
          key_contact_mobile_iso: pasatiempo.key_contact_mobile_iso,
          key_contact_mobile: pasatiempo.key_contact_mobile,
          key_contact_country: pasatiempo.key_contact_country,
          key_contact_region: pasatiempo.key_contact_region,
          key_contact_address: pasatiempo.key_contact_address,
          key_username: [$userName, [Validators.required]],
          key_password:  this.isAdd ?['', [Validators.required]]:pasatiempo.key_password,
        }));
      });
    }


  }

  submit() {
    this.loading = true;
    if (!this.form.get('media').value) {
      delete this.form.value.media;
    }
    if (this.imagePreview === '') {

      this.form.value.media = null;

    }

    // maintain contact
    const keyContactValue = this.form.value.key_contact;

    this.form.value.contact = {
      name: objectPath.coalesce(keyContactValue, ['0.key_contact_name'], ''),
      mobile: this.getPhoneNumberForDB(),
      region_id:
        objectPath.coalesce(keyContactValue, ['0.key_contact_country']) === 0 ?
          ''
          :
          objectPath.coalesce(keyContactValue, ['0.key_contact_country']),
      address: objectPath.coalesce(keyContactValue, ['0.key_contact_address'], ''),
    };

    const keyPassword = objectPath.coalesce(keyContactValue, ['0.key_password'], '');
    const keyUsername = objectPath.coalesce(keyContactValue, ['0.key_username'], '');
    if (keyUsername && keyUsername !== '') {
      this.form.value.username = keyUsername;
    }
    if (keyPassword && keyPassword !== '') {
      this.form.value.password = keyPassword;
    }

    if (this.form.value.key_contact) {
      delete this.form.value.key_contact;
    }

    if (!this.isAdd) {
     
      delete this.form.value.password;
    }
    // maintain contact End

    const sendedData: any = this.form.value;

    if (this.imageStatus === '' && !this.isAdd) {

      delete sendedData.media;

    }

    const data = objectToFormData(sendedData, {indices: true});

    const subscription = this.isAdd ? this.advertiserService.add(data)
      : this.advertiserService.edit(this.route.snapshot.paramMap.get('id'), data);

    this.isSubmitting = true;

    subscription.pipe(
      finalize(() => this.isSubmitting = false)
    ).subscribe(() => {
      this.toastr.success(this.successMessage);
      this.form.markAsPristine();
      this.loading = false;
      this.router.navigate(['camps/advertisers']);

    }, e => {
      if (objectPath.coalesce(e, ['error.errors.username.0'], '') === 'validation.unique') {
        this.toastr.error('Username Already Exist', 'Error');
      } else if (e.error.errors['contact.mobile'] && e.error.errors['contact.mobile'][0]  === 'validation.phone') {
        this.toastr.error('invalid Phone number', 'Error');
      } else {
        this.toastr.error(e.message, 'Error');
      }
      this.loading = false;
    });
  }

  imageChanged(file) {
    this.currentImageName = file.name;
    this.form.patchValue({media: file});
    this.form.get('media').markAsDirty();
    this.imagePreview = null;
    this.imageStatus = 'add';

  }

  removeImage() {

    this.imageStatus = 'remove';
    this.imagePreview = '';
    this.isImageExist = false;
  }

  addNewAddressGroup() {

    const add = this.form.get('key_contact') as FormArray;
    add.push(this.fb.group({
      key_contact_name: [],
      key_contact_mobile: [],
      key_contact_country: [],
      key_contact_region: [],
      key_contact_address: [],
      key_username: [],
      key_password: [],
    }));
  }

  deleteAddressGroup(index: number) {
    const add = this.form.get('key_contact') as FormArray;
    add.removeAt(index);
  }

  get keyContact() {
    // @ts-ignore
    return this.form.get('key_contact').controls;
  }

  changeNumber($event) {
    this.phoneNumberFromChange = $event.target.value;
  }

  hasError($event: boolean) {

  }

  getNumber($event: any) {
    this.phoneNumber = $event;
  }

  telInputObject($event: any, object: any) {
    $event.setCountry(this.getIso(object));
  }

  onCountryChange($event: any) {
    this.telCodeIso = $event.iso2;
    this.dialCode = $event.dialCode;

  }

  private initMessages() {
    this.pageTitle = this.isAdd ? 'Add Advertiser' : 'Edit Advertiser';
    this.successMessage = this.isAdd ? 'Advertiser added successfully' : 'Advertiser edited successfully';
    this.notValidErrorMessage = 'Please make sure all fields are filled in correctly.';

  }

  private initLookup(fields = ['countries_regions']) {
    this.lookupService.getAll(fields).subscribe((data: any) => {
      if (fields.includes('countries_regions')) {
        data.countries_regions.forEach(element => {
          this.countryArray.push({optionId: element.id, optionTitle: element.title});
        });
      }
    });
  }

  getIso(addressGroup: any) {
    let items = 'lb';
    if (!this.isAdd) {
      if (addressGroup.value.key_contact_mobile_iso) {
        items = addressGroup.value.key_contact_mobile_iso.toLowerCase();
      }

    } else {
      if (this.telCodeIso) {
        items = this.telCodeIso;
      }
    }
    return items;
  }

  getPhoneNumberForDB() {
    if (this.phoneNumber) {
      return this.phoneNumber;
    } else if (this.phoneNumberFromChange) {
      if (this.dialCode) {
        return '+' + this.dialCode + '' + this.phoneNumberFromChange;
      } else {
        return '+961' + this.phoneNumberFromChange;
      }
    } else {
      return null;
    }
  }
}
