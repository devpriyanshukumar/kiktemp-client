import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatchedRouteResponse } from '../models/referenceData';

@Injectable({
  providedIn: 'root'
})

export class DataSharingService {
  private showSideMenuSubject = new BehaviorSubject<boolean>(false);
  showSideMenu$ = this.showSideMenuSubject.asObservable();
  private matchedRouteResponseSubject = new BehaviorSubject<MatchedRouteResponse | null>(null);

  constructor() { }

  hideShowSideMenu() {
    this.showSideMenuSubject.next(!this.showSideMenuSubject.value);
  }

  setMatchedRouteResponse(response: MatchedRouteResponse): void {
    this.matchedRouteResponseSubject.next(response);
  }

  getMatchedRouteResponse(): Observable<MatchedRouteResponse | null> {
    return this.matchedRouteResponseSubject.asObservable();
  }
}
