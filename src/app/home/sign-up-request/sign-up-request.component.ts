import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TermsAndConditionsModalComponent } from '../modal/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { HomeService } from 'src/app/shared/services/home.service';
import { signupReqRequest, signupReqResponse, signupRequestResponseDataVM } from 'src/app/shared/models/home';
import { MessageService } from 'primeng/api';
import { SignupRequestSuccessModalComponent } from '../modal/signup-request-success-modal/signup-request-success-modal.component';
import { accessRequestSuccess, contactSlotChar, emailPattern, enterValidInput, foreignMask, foreignSlotChar, requiredField, sriLankaMask, sriLankaSlotChar, termsOfServiceHeader, urlPattern, width40, width50, zIndex10000 } from 'src/app/shared/global.constant';
import { ReferenceDataService } from 'src/app/shared/services';
@Component({
  selector: 'app-sign-up-request',
  templateUrl: './sign-up-request.component.html',
  styleUrls: ['./sign-up-request.component.scss'],
  providers: [DialogService]
})

export class SignUpRequestComponent implements OnInit {
  signupRequestForm: FormGroup = new FormGroup({});
  submittingRequest: boolean = false;
  loadingTerms: boolean = false;
  countries: any[] = [];
  selectedCountry: string | undefined;
  ref: DynamicDialogRef | undefined;
  termsAccepted: boolean = false;
  countrySelected: boolean = false;
  requestData: signupReqRequest = {}
  requiredField: string = requiredField;
  enterValidInput: string = enterValidInput;
  emailPattern: string = emailPattern;
  accessRequestSuccess = accessRequestSuccess;
  termsOfServiceHeader = termsOfServiceHeader;
  signupRequestResponseData!: signupRequestResponseDataVM;
  isGettingData: boolean = false;
  maskFront: string = '';
  contactNumberMinLength: number = -1;
  isForeign: boolean = false;

  get contactNumberControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('contactNumber');
    return control || null;
  }

  get countryControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('country');
    return control || null;
  }

  get organizationNameControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('organizationName');
    return control || null;
  }

  get contactPersonNameControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('contactPersonName');
    return control || null;
  }

  get websiteControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('website');
    return control || null;
  }

  get emailAddressControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('emailAddress');
    return control || null;
  }

  get frontMaskControl(): AbstractControl | null {
    const control = this.signupRequestForm.get('frontMask');
    return control || null;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    private homeService: HomeService,
    private messageService: MessageService,
    private referenceDataService: ReferenceDataService,
  ) { }

  ngOnInit(): void {
    this.isGettingData = false;
    this.getCountries();
    const urlRegex = urlPattern;
    this.signupRequestForm = this.formBuilder.group({
      organizationName: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      contactNumber: ['', [Validators.required, Validators.maxLength(17), Validators.pattern(/^[0-9-]*$/)]],
      frontMask: ['', Validators.required],
      country: ['', Validators.required],
      website: ['', Validators.pattern(urlRegex)]
    });
  }

  openTerms() {
    this.loadingTerms = true;
    this.ref = this.dialogService.open(TermsAndConditionsModalComponent, {
      header: this.termsOfServiceHeader,
      width: width50,
      baseZIndex: zIndex10000,
      data: {
        termsAccepted: this.termsAccepted
      },
      closable: false
    });

    this.ref.onClose.subscribe((result) => {
      this.termsAccepted = result === undefined ? false : result;
      this.loadingTerms = false;
    });
  }

  selectCountry(event: any) {
    this.contactNumberControl?.setValue('');
    this.countrySelected = this.signupRequestForm.value.country ? true : false;
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

  submitRequest() {
    this.submittingRequest = true;
    let contactNumber : string = this.maskFront + '-' + this.contactNumberControl?.value

    const requestData: signupReqRequest = {
      signupRequestRequestDataVM: {
        email: this.emailAddressControl?.value,
        name: this.contactPersonNameControl?.value,
        country: this.countryControl?.value.country,
        phoneNumber: contactNumber,
        organizationName: this.organizationNameControl?.value,
        website: this.websiteControl?.value
      }
    }

    this.homeService.requestSignupAccess(requestData).subscribe((signupReqResponse: signupReqResponse) => {
      this.submittingRequest = false;
      if (signupReqResponse.isSuccess && signupReqResponse.signupRequestResponseDataVM) {
        this.signupRequestResponseData = signupReqResponse.signupRequestResponseDataVM;

        const message = this.accessRequestSuccess;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: message });

        this.dialogService.open(SignupRequestSuccessModalComponent, {
          header: this.signupRequestResponseData.topic,
          width: width40,
          baseZIndex: zIndex10000,
          closable: false,
          data: {
            messageTopic: this.signupRequestResponseData.messageTopic,
            message: this.signupRequestResponseData.message
          },
        });
      }
    })
  }

  getCountries(): void {
    this.isGettingData = true;
    this.referenceDataService.getCountries().subscribe((data) => {
      if (data) {
        this.isGettingData = false;
        this.countries = data.countryDetails;
      }
    });
  }

  setCursorPosition(element: any, cursorPosition: number = 5) {
    setTimeout(() => {
      if (element && element.el && element.el.nativeElement && element.el.nativeElement.children && element.el.nativeElement.children[0]) {
        element.el.nativeElement.children[0].setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 50);
  }
}
