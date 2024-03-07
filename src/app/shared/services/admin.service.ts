import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { SignUpNewUserRequest, SignupRequestResponse, signupRequestListResponse } from '../models/admin';
import { Observable } from 'rxjs';
import { signupReqResponse } from '../models/home';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  getSignUpRequestList(pageNo: number): Observable<signupRequestListResponse> {
    return this.apiService.get<signupRequestListResponse>(`${this.getPath()}get-all-signup-requests?pageNo=${pageNo}`);
  }

  signUpNewUser(signUpRequest: SignUpNewUserRequest): Observable<signupReqResponse> {
    return this.apiService.post<signupReqResponse>(`${this.getPath()}signup-user`, signUpRequest)
  }

  getSignUpRequestDataByUserId(userId: number): Observable<SignupRequestResponse> {
    return this.apiService.get<SignupRequestResponse>(`${this.getPath()}get-signup-request-data-by-user-id?userId=${userId}`);
  }
}
