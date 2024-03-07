import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { MessageService } from 'primeng/api';
import { sessionExpiredMessage, sessionExpiredTopic } from '../../global.constant';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.tokenService.isTokenExpired()) {
      this.messageService.add({ severity: 'error', summary: sessionExpiredTopic, detail: sessionExpiredMessage });
      this.router.navigate(['home/login']);
      sessionStorage.removeItem('bearerToken');
      return false;
    }
    return true;
  }

}
