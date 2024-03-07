import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { passwordLength, passwordMissmatch, requiredField, width40, zIndex10000 } from 'src/app/shared/global.constant';
import { HomeService } from 'src/app/shared/services/home.service';
import { SuccessModalComponent } from '../modal/success-modal/success-modal.component';
import { ResetPasswordRequest, ResetPasswordResponse, ResetPasswordResponseDataVM } from 'src/app/shared/models/home';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [DialogService]
})

export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  requiredField: string = requiredField;
  passwordMissmatch: string = passwordMissmatch;
  passwordLength: string = passwordLength;
  passwordStr: string = 'password';
  textStr: string = 'text';
  newPasswordFieldType: string = '';
  confirmPasswordFieldType: string = '';
  submittingData: boolean = false;
  token: string = '';
  resetPasswordResponseData!: ResetPasswordResponseDataVM;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private homeService: HomeService,
    private route: ActivatedRoute,
    public dialogService: DialogService
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.token = token;
      }
    });
  }

  ngOnInit(): void {
    this.newPasswordFieldType = this.passwordStr;
    this.confirmPasswordFieldType = this.passwordStr;
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', Validators.required]
    });
  }

  toggleNewPasswordVisibility(): void {
    this.newPasswordFieldType = this.newPasswordFieldType === this.passwordStr ? this.textStr : this.passwordStr;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === this.passwordStr ? this.textStr : this.passwordStr;
  }

  arePasswordsEqual(): boolean {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmedPassword = this.resetPasswordForm.get('confirmedPassword')?.value;
    return newPassword === confirmedPassword && newPassword !== '' && confirmedPassword !== '';
  }

  resetPassword() {
    this.submittingData = true;

    const requestData: ResetPasswordRequest = {
      resetPasswordRequestDataVM: {
        token: this.token,
        newPassword: this.resetPasswordForm.value.newPassword
      }
    }

    this.homeService.resetPassword(requestData).subscribe((resetPasswordResponse: ResetPasswordResponse) => {
      this.submittingData = false;
      
      if (resetPasswordResponse.isSuccess && resetPasswordResponse.resetPasswordResponseDataVM) {
        this.resetPasswordResponseData = resetPasswordResponse.resetPasswordResponseDataVM;

        const message = this.resetPasswordResponseData.topic;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: message });

        this.dialogService.open(SuccessModalComponent, {
          header: this.resetPasswordResponseData.topic,
          width: width40,
          baseZIndex: zIndex10000,
          closable: false,
          data: {
            message: this.resetPasswordResponseData.message,
            route: '/home/login'
          },
        });
      }
    })
  }
}