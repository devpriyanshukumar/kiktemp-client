import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  bearerToken = sessionStorage.getItem("bearerToken") as string;

  constructor(
    private router: Router
  ){ }

  canActivate(): boolean {
    
    if (this.bearerToken) {
      return true;

    } else {
      this.router.navigate(['home/login']);
      return false;
    }
  }

}
