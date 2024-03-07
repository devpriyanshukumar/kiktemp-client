import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { enterValidInput, requiredField, foreignMask, sriLankaMask, foreignSlotChar, sriLankaSlotChar, signUpSuccess, success, error, contactSlotChar, urlPattern } from 'src/app/shared/global.constant';
import { SignUpNewUserRequest, SignupRequestDataVM, SignupRequestResponse } from 'src/app/shared/models/admin';
import { AdminService } from 'src/app/shared/services';
import { ReferenceDataService } from 'src/app/shared/services/reference.data.servie';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sign-up-new-user',
  templateUrl: './sign-up-new-user.component.html',
  styleUrls: ['./sign-up-new-user.component.scss']
})
export class SignUpNewUserComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});
  userTypes: any[] = [];
  countryList: any[] = [];
  screenWidth: number = 0;
  signUpRequest: SignUpNewUserRequest = {};
  isGettingData: boolean = false;
  enterValidInput = enterValidInput;
  requiredField = requiredField;
  signUpSuccess = signUpSuccess;
  successMessageTitle = success;
  error = error;
  userId: number = -1;
  signupRequestDataVM: SignupRequestDataVM = {};
  selectedCountry: any = {}
  userType: string = '';
  parentId: number = -1;
  maskFront: string = '';
  contactNumberMinLength: number = -1;
  contactNumberLength: number = 0;
  isForeign: boolean = false;

  get contactNumberControl(): AbstractControl | null {
    const control = this.signUpForm.get('contactNumber');
    return control || null;
  }

  get frontMaskControl(): AbstractControl | null {
    const control = this.signUpForm.get('frontMask');
    return control || null;
  }

  get countryControl(): AbstractControl | null {
    const control = this.signUpForm.get('country');
    return control || null;
  }

  get userTypeControl(): AbstractControl | null {
    const control = this.signUpForm.get('userType');
    return control || null;
  }

  get organizationNameControl(): AbstractControl | null {
    const control = this.signUpForm.get('organizationName');
    return control || null;
  }

  get emailControl(): AbstractControl | null {
    const control = this.signUpForm.get('email');
    return control || null;
  }

  get nameControl(): AbstractControl | null {
    const control = this.signUpForm.get('name');
    return control || null;
  }

  get webSiteControl(): AbstractControl | null {
    const control = this.signUpForm.get('webSite');
    return control || null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private referenceDataService: ReferenceDataService,
    private adminService: AdminService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.userType = sessionStorage.getItem('userType')!;
    this.parentId = Number(sessionStorage.getItem('userId'));

    this.screenWidth = window.innerWidth;
    const userIdParam = this.route.snapshot.queryParamMap.get('childUserId');
    if (userIdParam !== null) {
      this.userId = +userIdParam;
    }

  }

  ngOnInit(): void {
    this.isGettingData = false;
    const urlRegex = urlPattern;

    this.signUpForm = this.formBuilder.group({
      frontMask: ['', Validators.required],
      userType: ['', Validators.required],
      organizationName: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.maxLength(17), Validators.pattern(/^[0-9-]*$/)]],
      name: ['', Validators.required],
      webSite: ['', Validators.pattern(urlRegex)]
    });
    this.subscribeRouterChange();
    this.getCountries();

    window.addEventListener('resize', this.onResize.bind(this));
    this.setUserTypesArray();
  }

  setUserTypesArray(): void {
    if (this.userType === 'admin') {
      this.userTypes = [
        {
          id: 0,
          name: "Customer",
          code: "CUS"
        },
        {
          id: 1,
          name: "Distributor",
          code: "DIS"
        }
      ];
    }
    else if (this.userType === 'distributor') {
      this.userTypes = [
        {
          id: 0,
          name: "Customer",
          code: "CUS"
        }
      ];
    }
  }

  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  onCountrySelect(event: any): void {
    this.signUpForm.get('contactNumber')?.setValue('');
    this.maskFront = '';
    if (event && event.value) {
      this.maskFront = this.pad(Number(event.value.code), 6);
      this.frontMaskControl?.setValue(this.maskFront);
      this.contactNumberMinLength = event.value.minlength;
    }
  }

  pad(number: any, width: number, char = '0') {
    number = number + '';
    return number.length >= width ? number : new Array(width - number.length + 1).join(char) + number;
  }

  saveForm(): void {
    this.createRequest();
    this.isGettingData = true;
    this.adminService.signUpNewUser(this.signUpRequest).subscribe((data) => {
      this.isGettingData = false;
      if (data && data.isSuccess && data.signupRequestResponseDataVM) {
        this.signUpForm.reset();
        this.messageService.add({ severity: 'success', summary: this.successMessageTitle, detail: data.signupRequestResponseDataVM.topic });
        // this.messageService.add({ severity: 'success', summary: this.successMessageTitle, detail: data.signupRequestResponseDataVM.message });
        this.router.navigate(['user-management/sign-up-new-user'])
      }
    });
  }

  resetForm(): void {
    if (this.userId !== -1) {
      this.getSignUpRequestDataByUserId(this.userId);
    }
    else {
      this.userId = -1;
      this.signUpForm.reset();
      this.signUpForm.get('email')?.enable();
    }
  }

  getCountries(): void {
    this.isGettingData = true;
    this.referenceDataService.getCountries().subscribe((data) => {
      this.isGettingData = false;
      if (data && data.countryDetails) {
        this.countryList = data.countryDetails;

        if (this.userId !== -1) {
          this.getSignUpRequestDataByUserId(this.userId);
        }
      }
    });
  }

  createRequest(): void {
    let contactNumber: string = this.frontMaskControl?.value + '-' + this.contactNumberControl?.value
    if (this.userId != -1) {
      this.signUpRequest = {
        userType: this.userTypeControl ? this.userTypeControl.value.name.toLowerCase() : '',
        organizationName: this.organizationNameControl ? this.organizationNameControl.value : '',
        country: this.countryControl ? this.countryControl.value.country : '',
        email: this.emailControl ? this.emailControl.value : '',
        contactNumber: contactNumber ? contactNumber : '',
        name: this.nameControl ? this.nameControl.value : '',
        website: this.webSiteControl ? this.webSiteControl.value : "",
        userId: this.userId,
        parentId: this.userType === 'admin' ? 0 : this.parentId
      }
    }
    else {
      this.signUpRequest = {
        userType: this.userTypeControl ? this.userTypeControl.value.name.toLowerCase() : '',
        organizationName: this.organizationNameControl ? this.organizationNameControl.value : '',
        country: this.countryControl ? this.countryControl.value.country : '',
        email: this.emailControl ? this.emailControl.value : '',
        contactNumber: contactNumber ? contactNumber : '',
        name: this.nameControl ? this.nameControl.value : '',
        website: this.webSiteControl ? this.webSiteControl.value : "",
        parentId: this.userType === 'admin' ? 0 : this.parentId
      }
    }
  }

  getSignUpRequestDataByUserId(userId: number): void {
    this.isGettingData = true;
    this.adminService.getSignUpRequestDataByUserId(userId).subscribe((data) => {
      this.isGettingData = false;
      if (data && data.isSuccess && data.signupRequestDataVM) {
        this.signupRequestDataVM = data.signupRequestDataVM;
        this.resetValues();
      }
    });
  }

  resetValues(): void {
    this.countryList.forEach(country => {
      if (country.country == this.signupRequestDataVM.country) {
        this.selectedCountry = country;
        this.contactNumberMinLength = country.minlength;
      }
    });
    if (this.countryControl && this.selectedCountry && this.userTypeControl) {
      this.signUpForm.patchValue(this.signupRequestDataVM);
      if (this.signupRequestDataVM && this.signupRequestDataVM.contactNumber) {
        this.splitFrontMask(this.signupRequestDataVM.contactNumber);
      }
      this.frontMaskControl?.setValue(this.maskFront)
      this.countryControl.setValue(this.selectedCountry);
      this.userTypeControl.setValue('');
      this.signUpForm.get('email')?.disable();
    }
  }

  subscribeRouterChange(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userId = -1;
        this.signUpForm.reset();
      }
    });
  }

  splitFrontMask(contactNumber: string): void {
    this.maskFront = contactNumber.substring(0, 6);
    this.contactNumberControl?.setValue(contactNumber.substring(7));
  }
}
