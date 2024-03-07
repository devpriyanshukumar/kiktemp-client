import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { enterValidInput, foreignMask, foreignSlotChar, passwordLengthError, passwordMissmatch, requiredField, sriLankaMask, sriLankaSlotChar, urlPattern } from '../shared/global.constant';
import { AdminService, ReferenceDataService } from '../shared/services';
import { UserProfileService } from '../shared/services/user.profile.service';
import { LoginRequestDataVM } from '../shared/models/home';
import { MessageService } from 'primeng/api';
import { SignupRequestDataVM } from '../shared/models/admin';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  isGettingData: boolean = false;
  contactMask = '';
  contactSlotChar = '';
  screenWidth: number = 0;
  countryList: any[] = [];
  enterValidInput = enterValidInput;
  requiredField = requiredField;
  isShowCurrentPasswordModal: boolean = false;
  isShowPasswordChangeModal: boolean = false;
  isShowPasswordChangeSuccessModal: boolean = false;
  userId : number = -1;
  passwordRequest: LoginRequestDataVM = {};
  userData: SignupRequestDataVM = {};
  userDataRequest: SignupRequestDataVM = {};
  selectedCountry: any;
  originalFormValues: { [key: string]: any } = {};
  hasNameChanges: boolean = false;
  hasCompanyChanges: boolean = false;
  hasWebSiteChanges: boolean = false;
  hasCountryChanges: boolean = false;
  hasContactChanges: boolean = false;
  isDisableUpdateButton: boolean = true;
  isPasswordMissMatch: boolean = false;
  passwordMissmatch = passwordMissmatch;
  validPasswordLength : boolean = true;
  contactNumberMinLength: number = -1;
  maskFront: string = '';
  passwordLengthError: string = passwordLengthError;
  

  get nameControl(): AbstractControl | null {
    const control = this.userProfileForm.get('name');
    return control || null;
  }

  get organizationNameControl(): AbstractControl | null {
    const control = this.userProfileForm.get('organizationName');
    return control || null;
  }

  get emailControl(): AbstractControl | null {
    const control = this.userProfileForm.get('email');
    return control || null;
  }

  get webSiteControl(): AbstractControl | null {
    const control = this.userProfileForm.get('webSite');
    return control || null;
  }

  get countryControl(): AbstractControl | null {
    const control = this.userProfileForm.get('country');
    return control || null;
  }

  get contactNumberControl(): AbstractControl | null {
    const control = this.userProfileForm.get('contactNumber');
    return control || null;
  }  

  get contactNumberFrontMaskControl(): AbstractControl | null {
    const control = this.userProfileForm.get('frontMask');
    return control || null;
  }  
  
  get currentPasswordControl(): AbstractControl | null {
    const control = this.passwordForm.get('currentPassword');
    return control || null;
  }

  get newPasswordControl(): AbstractControl | null {
    const control = this.passwordForm.get('newPassword');
    return control || null;
  }

  get reEnteredPasswordControl(): AbstractControl | null {
    const control = this.passwordForm.get('reEnteredPassword');
    return control || null;
  }
  
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private referenceDataService: ReferenceDataService,
    private userProfileService : UserProfileService
    ) { 
      this.screenWidth = window.innerWidth;
      this.userId = Number(sessionStorage.getItem('userId'));
    }

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    this.buildForm();
    this.getCountries();
  }

  buildForm(): void {
    const urlRegex = urlPattern;

    this.userProfileForm = this.formBuilder.group({
      name: ["", Validators.required],
      organizationName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      webSite: ["",Validators.pattern(urlRegex)],
      country: ["", Validators.required],
      contactNumber: ["", [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      frontMask: ["", [Validators.required, Validators.pattern(/^[0-9-]*$/)]]
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      reEnteredPassword: ["", [Validators.required, Validators.minLength(6)]]
    })

  }

  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  getCountries(): void {
    this.isGettingData = true;
    this.referenceDataService.getCountries().subscribe((data) => {
      if(data) {
        this.isGettingData = false;
        this.countryList = data.countryDetails;

        this.loadProfileDataAsync();
      }
    });
  }

  onCountrySelect(event: any): void {
    this.userProfileForm.get('contactNumber')?.setValue('');
    if(event && event.value) {
      this.contactNumberMinLength= event.value.minlength;
      this.maskFront = this.pad(Number(event.value.code), 6);
      this.contactNumberFrontMaskControl?.setValue(this.maskFront);
    }
  }

  pad(number: any, width: number, char = '0') {
    number = number + '';
    return number.length >= width ? number : new Array(width - number.length + 1).join(char) + number;
  }

  saveForm(): void {
    this.isGettingData = true;
    this.setProfileUpdateRequest();
    this.userProfileService.updateProfiledAsync(this.userDataRequest).subscribe(data => {
      if(data && data.isSuccess && data.signupRequestDataVM) {
        this.isGettingData = false;
        this.userData = data.signupRequestDataVM;
        this.formatUserData(this.userData);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data?.message });
        this.setChangeStatus();
      }
    });
  }

  resetForm(): void {
    this.contactSlotChar = '';
    this.userProfileForm.patchValue(this.userData);
    this.countryControl?.setValue(this.selectedCountry);
    this.userProfileForm.get('email')?.disable();
    this.setChangeStatus();
  }

  changePassword(): void {
    if(this.isDisableUpdateButton) {
      this.isShowCurrentPasswordModal = true;
      this.isShowPasswordChangeModal = false;
      this.isShowPasswordChangeSuccessModal = false;
    }
    else {
      this.messageService.add({ severity: 'warn', summary: "Warning", detail: "You have to update your profile data changes !" });
    }
  }

  validateCurrentPassword(): void {
    this.createPasswordRequest();
    this.isGettingData = true;
    this.userProfileService.confirmCurrentPasswordAsync(this.passwordRequest).subscribe(data => {
      this.isGettingData = false;
      if(data && data.isSuccess && data.signupRequestResponseDataVM) {
        if(data.signupRequestResponseDataVM.message) {
          this.messageService.add({ severity: 'error', summary: "Error", detail: data.signupRequestResponseDataVM.message });
        }
        else {
          this.isShowCurrentPasswordModal = false;
          this.isShowPasswordChangeModal = true;
          this.isShowPasswordChangeSuccessModal = false;
        }
      }
    });
  }

  createPasswordRequest(): void {
    this.passwordRequest = {
      userId : this.userId,
      password : this.isShowCurrentPasswordModal ? this.currentPasswordControl?.value : this.newPasswordControl?.value
    }
  }

  updatePassword(): void {
    this.createPasswordRequest();
    this.isGettingData = true;
    this.userProfileService.updatePasswordAsync(this.passwordRequest).subscribe(data => {
      this.isGettingData = false;
      if(data && data.isSuccess) {
          this.messageService.add({ severity: 'success', summary: "Success", detail: data?.signupRequestResponseDataVM?.message });
          this.isShowCurrentPasswordModal = false;
          this.isShowPasswordChangeModal = false;
          this.isShowPasswordChangeSuccessModal = true;
      }
      else {
        if(data.signupRequestResponseDataVM?.message) {
          this.messageService.add({ severity: 'error', summary: "Error", detail: data.signupRequestResponseDataVM.message });
        }
      }
    });
  }

  onClose(): void {
    this.isShowCurrentPasswordModal = false;
    this.isShowPasswordChangeModal = false;
    this.isShowPasswordChangeSuccessModal = false;
    this.isPasswordMissMatch = true;
    this.validPasswordLength = true;
  }

  loadProfileDataAsync(): void {
    this.isGettingData = true;
    this.userProfileService.getSignUpRequestDataByUserIdAsync(this.userId).subscribe((data) => {
      this.isGettingData = false;
      if(data && data.isSuccess && data.signupRequestDataVM) {
        this.userData = data.signupRequestDataVM;
        this.formatUserData(this.userData);
      }
    });
  }

  subscribeValueChanges(controlName: string): void {
    this.userProfileForm.get(controlName)?.valueChanges.subscribe((value) => {
      this.isDisableUpdateButton = true;
      switch (controlName) {
        case 'name' :
          this.hasNameChanges = false;
          if (value !== this.originalFormValues[controlName]) {
            this.hasNameChanges = true;
          }
          break;

        case 'organizationName' :
          this.hasCompanyChanges = false;
          if (value !== this.originalFormValues[controlName]) {
            this.hasCompanyChanges = true;
          }
          break;
        
        case 'webSite' :
          this.hasWebSiteChanges = false;
          if (value !== this.originalFormValues[controlName]) {
            this.hasWebSiteChanges = true;
          }
          break;

        case 'country' :
          this.hasCountryChanges = false;
          if (value !== this.originalFormValues[controlName].name) {
            this.hasCountryChanges = true;
          }
          break;
          
        case 'contactNumber' :
          this.hasContactChanges = false;
          if (value !== this.originalFormValues[controlName]) {
            this.hasContactChanges = true;
          }
          break;

        default :
          break;
      }

      if(this.hasCompanyChanges || this.hasContactChanges || this.hasCountryChanges || this.hasNameChanges || this.hasWebSiteChanges) {
        this.isDisableUpdateButton = false;
      }

    });
  }

  setProfileUpdateRequest(): void {
    let contactNumber: string = this.contactNumberFrontMaskControl?.value + '-' + this.contactNumberControl?.value
    this.userDataRequest = {
      name : this.nameControl?.value,
      country : this.countryControl?.value.country,
      contactNumber : contactNumber,
      organizationName : this.organizationNameControl?.value,
      webSite : this.webSiteControl?.value,
      userId : this.userId
    }
  }

  formatUserData(userData: SignupRequestDataVM): void {
    this.countryList.forEach(country => {
      if(country.country == userData.country) {
        this.selectedCountry = country;
      }
    });
  
    this.contactNumberMinLength = this.selectedCountry.minlength;
    if(this.countryControl && this.selectedCountry) {
      this.userProfileForm.patchValue(userData);
      this.countryControl.setValue(this.selectedCountry);
      this.userProfileForm.get('email')?.disable();
      this.splitFrontMask((userData && userData.phoneNumber) ? userData.phoneNumber : '');

      //store original values
      this.originalFormValues = { ...this.userProfileForm.value };

      // Subscribe to individual form control changes
      this.subscribeValueChanges('name');
      this.subscribeValueChanges('email');
      this.subscribeValueChanges('webSite');
      this.subscribeValueChanges('country');
      this.subscribeValueChanges('contactNumber');
      this.subscribeValueChanges('organizationName');
    }
  }

  setChangeStatus(): void {
    this.hasNameChanges= false;
    this.hasCompanyChanges= false;
    this.hasWebSiteChanges= false;
    this.hasCountryChanges= false;
    this.hasContactChanges= false;
    this.isDisableUpdateButton= true;
  }

  arePasswordsEqual(): void {
    if(this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['reEnteredPassword'].value) {
      this.isPasswordMissMatch = true;
    }
    else{
      this.isPasswordMissMatch = false;
    }
  }

  validatePasswordLength(): void {
    if(this.newPasswordControl?.value.length >= 7) {
      this.validPasswordLength = true;
    }
    else {
      this.validPasswordLength = false;
    }
  }

  onHide(): void {
    this.passwordForm.reset();
    this.isPasswordMissMatch = true;
    this.validPasswordLength = true;
  }

  splitFrontMask(contactNumber: string): void {
    this.maskFront = contactNumber.substring(0, 6);
    this.contactNumberFrontMaskControl?.setValue(this.maskFront)
    this.contactNumberControl?.setValue(contactNumber.substring(7));
}

}
