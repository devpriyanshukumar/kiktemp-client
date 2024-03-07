import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  token: string | null | undefined;

  constructor() { }

  isTokenExpired(): boolean {
    this.token = sessionStorage.getItem('bearerToken');
    if (this.token) {
      const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
      const expirationDateInSeconds = decodedToken.exp;
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
      return expirationDateInSeconds < currentTimestampInSeconds;
    }
    return false
  }
}
