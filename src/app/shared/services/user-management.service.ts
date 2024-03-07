import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuspendRemoveUserRequest, SuspendRemoveUserResponse, UserSearchRequest, UserSearchResponse, userDetailResponse } from '../models/admin';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  suspendOrRemoveUser(suspendRemoveUserRequest: SuspendRemoveUserRequest): Observable<SuspendRemoveUserResponse> {
    return this.apiService.post<SuspendRemoveUserResponse>(`${this.getPath()}suspend-remove-user`, suspendRemoveUserRequest);
  }

  userSearch(userSearchRequest: UserSearchRequest): Observable<UserSearchResponse> {
    return this.apiService.post<UserSearchResponse>(`${this.getPath()}user-search`, userSearchRequest.UserSearchRequestDataVM);
  }

  getUserDetail(childId: number): Observable<userDetailResponse> {
    return this.apiService.get<userDetailResponse>(`${this.getPath()}get-user-detail?childId=${childId}`);
  }

  getUserProjectsByUserId(userId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-user-by-user-id?userId=${userId}`);
  }
}
