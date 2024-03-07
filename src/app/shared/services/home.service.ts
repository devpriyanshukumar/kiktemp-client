import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { signupReqRequest, signupReqResponse, LoginResponse, LoginRequest, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from '../models/home';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  requestSignupAccess(signupRequestRequest: signupReqRequest): Observable<signupReqResponse> {
    return this.apiService.post<signupReqResponse>(`${this.getPath()}signup-request`, signupRequestRequest.signupRequestRequestDataVM);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>(`${this.getPath()}login`, loginRequest.loginRequestDataVM);
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.apiService.post<ForgotPasswordResponse>(`${this.getPath()}forgot-password`, forgotPasswordRequest.forgotPasswordRequestDataVM);
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.apiService.post<ResetPasswordResponse>(`${this.getPath()}reset-password`, resetPasswordRequest.resetPasswordRequestDataVM);
  }
}
