import { Component } from '@angular/core';
import { BroadcastService } from '../../services/broadcast.service';
import { BroadcastEvents } from '../../util/broadcastEvents';
import { BREADCRUMB_HOME, BREADCRUMB_HOME_DASHBOARD, Dashboard, DashboardIcon, SelectedMenuItem, cubicleOverviewHeader, cubicleOverviewIcon, cubicleOverviewRoute, cubicleOverviewSubHeader, customerListHeader, customerListIcon, customerListRoute, customerListSubHeader, projectOverviewHeader, projectOverviewIcon, projectOverviewRoute, projectOverviewSubHeader, userOverviewHeader, userOverviewIcon, userOverviewRoute, userOverviewSubHeader, viewReportHeader, viewReportIcon, viewReportRoute, viewReportSubHeader } from '../../global.constant';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbHeader: string = Dashboard;
  breadcrumbSubHeader: string = BREADCRUMB_HOME_DASHBOARD;
  breadcrumbIcon: string = DashboardIcon;
  breadcrumbHome: string = BREADCRUMB_HOME;

  constructor(
    private broadcastService: BroadcastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBreadCrumb();

    if (this.router && this.router.events) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          var currentRouteWithQueryParams = this.router.url;
          var currentRouteWithoutQueryParams = currentRouteWithQueryParams.split('?')[0];

          if (currentRouteWithoutQueryParams === customerListRoute) {
            this.breadcrumbHeader = customerListHeader;
            this.breadcrumbSubHeader = customerListSubHeader;
            this.breadcrumbIcon = customerListIcon;
          } else if (currentRouteWithoutQueryParams === userOverviewRoute) {
            this.breadcrumbHeader = userOverviewHeader;
            this.breadcrumbSubHeader = userOverviewSubHeader;
            this.breadcrumbIcon = userOverviewIcon;
          } else if (currentRouteWithoutQueryParams === projectOverviewRoute) {
            this.breadcrumbHeader = projectOverviewHeader;
            this.breadcrumbSubHeader = projectOverviewSubHeader;
            this.breadcrumbIcon = projectOverviewIcon;
          } else if (currentRouteWithoutQueryParams === viewReportRoute) {
            this.breadcrumbHeader = viewReportHeader;
            this.breadcrumbSubHeader = viewReportSubHeader;
            this.breadcrumbIcon = viewReportIcon;
          } else if (currentRouteWithoutQueryParams === cubicleOverviewRoute) {
            this.breadcrumbHeader = cubicleOverviewHeader;
            this.breadcrumbSubHeader = cubicleOverviewSubHeader;
            this.breadcrumbIcon = cubicleOverviewIcon;
          }
        }
      })
    }
  }

  loadBreadCrumb(): void {
    //When user refresh the page
    let val: any = localStorage.getItem(SelectedMenuItem);
    if (val !== null) {
      val = JSON.parse(val);
    }
    if (val) {
      this.breadcrumbHeader = val.label ? val.label : this.breadcrumbHeader;
      this.breadcrumbIcon = val.icon ? val.icon : this.breadcrumbIcon;
      if (val.routerLink) {
        this.updateBreadcrumbHeader(val.routerLink);
      }
    }

    //When user click on a menu item
    this.broadcastService.subscribe(BroadcastEvents.BREADCRUMB,
      data => {
        if (data && data.item) {
          this.breadcrumbHeader = data.item.label ? data.item.label : this.breadcrumbHeader;
          this.breadcrumbIcon = data.item.icon ? data.item.icon : this.breadcrumbIcon;
          if (data.item.routerLink) {
            this.updateBreadcrumbHeader(data.item.routerLink);
          }
        }
      });
  }

  updateBreadcrumbHeader(routerLink: string) {
    if (routerLink === '/') {
      this.breadcrumbSubHeader = this.breadcrumbSubHeader;
    } else {
      const parts = routerLink.split('/').filter((part: any) => part.trim() !== '');

      //Capitalize first letter and remove '-'
      const formattedParts = parts.map((part: string) => {
        const words = part.split('-');
        const capitalizedWords = words.map((word: string) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
      });
      this.breadcrumbSubHeader = this.breadcrumbHome + formattedParts.join(' > ');
    }
  }
}
