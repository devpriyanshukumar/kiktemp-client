import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { requiredField, enterValidInput, emailPattern, width40, zIndex10000 } from 'src/app/shared/global.constant';
import { HomeService } from 'src/app/shared/services/home.service';
import { SuccessModalComponent } from '../modal/success-modal/success-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ForgotPasswordRequest, ForgotPasswordResponse, ForgotPasswordResponseDataVM } from 'src/app/shared/models/home';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [DialogService]
})

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});
  requiredField: string = requiredField;
  enterValidInput: string = enterValidInput;
  emailPattern: string = emailPattern;
  submittingData: boolean = false;
  forgotPasswordResponseData!: ForgotPasswordResponseDataVM;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private homeService: HomeService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  forgotPassword() {
    this.submittingData = true;

    const requestData: ForgotPasswordRequest = {
      forgotPasswordRequestDataVM: {
        email: this.forgotPasswordForm.value.email
      }
    }

    this.homeService.forgotPassword(requestData).subscribe((forgotPasswordResponse: ForgotPasswordResponse) => {
      this.submittingData = false;
      
      if (forgotPasswordResponse.isSuccess && forgotPasswordResponse.forgotPasswordResponseDataVM) {
        this.forgotPasswordResponseData = forgotPasswordResponse.forgotPasswordResponseDataVM;

        const message = this.forgotPasswordResponseData.topic;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: message });

        this.dialogService.open(SuccessModalComponent, {
          header: this.forgotPasswordResponseData.topic,
          width: width40,
          baseZIndex: zIndex10000,
          closable: false,
          data: {
            message: this.forgotPasswordResponseData.message,
            route: '/home/login'
          },
        });
      }
    })
  }
}