import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { SignUpNewUserRequest, SignupRequestResponse, signupRequestListResponse } from '../models/admin';
import { Observable } from 'rxjs';
import { LoginRequestDataVM, signupReqResponse } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  confirmCurrentPasswordAsync(passwordRequest: LoginRequestDataVM): Observable<signupReqResponse> {
    return this.apiService.post<signupReqResponse>(`${this.getPath()}confirm-current-password-async`,passwordRequest);
  }

  updatePasswordAsync(passwordRequest: LoginRequestDataVM): Observable<signupReqResponse> {
    return this.apiService.post<signupReqResponse>(`${this.getPath()}update-password-async`,passwordRequest);
  }

  updateProfiledAsync(profileRequest: LoginRequestDataVM): Observable<SignupRequestResponse> {
    return this.apiService.post<SignupRequestResponse>(`${this.getPath()}update-profile-async`,profileRequest);
  }

  getSignUpRequestDataByUserIdAsync(userId: number): Observable<SignupRequestResponse> {
    return this.apiService.get<SignupRequestResponse>(`${this.getPath()}manage-user-profile-get-user-data-async?userId=${userId}`);
  }

}
