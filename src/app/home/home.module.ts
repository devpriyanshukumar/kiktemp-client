import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpRequestComponent } from './sign-up-request/sign-up-request.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TermsAndConditionsModalComponent } from './modal/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { SignupRequestSuccessModalComponent } from './modal/signup-request-success-modal/signup-request-success-modal.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuccessModalComponent } from './modal/success-modal/success-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const homeRouting: ModuleWithProviders<HomeModule> = RouterModule.forChild([
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up-request',
    component: SignUpRequestComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
]);

@NgModule({
  declarations: [
    LoginComponent,
    SignUpRequestComponent,
    TermsAndConditionsModalComponent,
    SignupRequestSuccessModalComponent,
    ForgotPasswordComponent,
    SuccessModalComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    homeRouting,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    DynamicDialogModule,
    DialogModule,
    CheckboxModule,
    MessagesModule,
    FormsModule,
    ToastModule,
    SharedModule,
    PasswordModule,
    
  ]
})
export class HomeModule { }
