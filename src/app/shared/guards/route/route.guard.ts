import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  matchedRoutesString = sessionStorage.getItem('matchedRoutes') as string;
  matchedRoutes: any[] = [];
  result: boolean = false;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var routerPath = '';
    this.matchedRoutes = JSON.parse(this.matchedRoutesString);

    if (this.matchedRoutes.length !== 0) {
      for (let i = 0; i < route.url.length; i++) {
        routerPath = routerPath + route.url[i].path + '/';
      }
      routerPath = routerPath.slice(0, -1);
      this.result = this.matchedRoutes.some(item => item.includes(routerPath));
    }

    if (this.result) {
      return true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Unauthorized!', detail: 'You are not authorized to access this page!' });
      this.router.navigate(['/']);
      return false;
    }
  }
}