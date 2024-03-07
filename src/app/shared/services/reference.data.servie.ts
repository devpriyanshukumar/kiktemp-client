import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countryURL } from 'src/app/shared/global.constant';
import { MatchedRouteResponse, MatchedRouteRequest } from '../models/referenceData';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  countryApiUrl = countryURL;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private apiService: ApiService,
    ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  getCountries(): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-country-details`);
  }

  getMatchedRoutes(MatchedRouteRequest : MatchedRouteRequest): Observable<MatchedRouteResponse> {
    return this.apiService.get<MatchedRouteResponse>(`${this.getPath()}get-matched-routes?userType=${MatchedRouteRequest.MatchedRouteRequestDataVM?.userType}`);
  }
}
