import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BroadcastService } from '../../services/broadcast.service';
import { BroadcastEvents } from '../../util/broadcastEvents';
import { Observable, interval, map } from 'rxjs';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router, NavigationEnd } from '@angular/router';
import { dashboardRoute, userProfileRoute } from '../../global.constant';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent {
  items: MenuItem[] = [];
  userId: number = 1;
  currentDate!: Observable<Date>;
  showMobileSideMenu: boolean = false;
  matchedRoutesData: any;
  matchedRoutes: any;
  matchedRoutesArray: any;

  constructor(
    private broadcastService: BroadcastService,
    private dataSharingService: DataSharingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSharingService.showSideMenu$.subscribe((show) => {
      this.showMobileSideMenu = show;
    });

    // Get menu items from local storage
    const storedMenuItems = localStorage.getItem('kiktempMenuItems');
    if (storedMenuItems) {
      this.items = JSON.parse(storedMenuItems);
    }

    // Get allowed routes based on user type from data sharing service
    this.dataSharingService.getMatchedRouteResponse().subscribe((response) => {
      if (response && response.MatchedRouteResponseDataVM) {
        this.matchedRoutesData = response.MatchedRouteResponseDataVM;
        this.matchedRoutes = this.matchedRoutesData.matchedRoutes;

        if (this.matchedRoutes) {
          this.matchedRoutesArray = this.matchedRoutes.map((obj: { ROUTER_PATH: any; }) => obj.ROUTER_PATH);
        }

        this.createMenuItemsFromMatchedRoutes();

        // Store menu items in local storage and session storage
        localStorage.setItem('kiktempMenuItems', JSON.stringify(this.items));
        sessionStorage.setItem('matchedRoutes', JSON.stringify(this.matchedRoutesArray));
      }
    });

    this.currentDate = interval(1000).pipe(
      map(() => new Date())
    );

    // Catch current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        var currentRouteWithQueryParams = this.router.url;

        //remove query params
        var currentRouteWithoutQueryParams = currentRouteWithQueryParams.split('?')[0];

        if (currentRouteWithoutQueryParams === dashboardRoute) {
          this.navigateToDashboard();
        } else if (currentRouteWithoutQueryParams === userProfileRoute) {
          this.navigateToUserProfile();
        } else {
          //update the breadcrumb
          const currentRouteMenuItem = this.findMenuItemByRoute(this.items, currentRouteWithoutQueryParams);
          this.updateBreadcrumb({ item: currentRouteMenuItem });

          //expand the menu item
          this.updateMenuExpansion(currentRouteWithoutQueryParams, this.items);
        }
      }
    });
  }

  createMenuItemsFromMatchedRoutes() {
    this.items = [];

    // Create a map to store parent items by their labels
    const parentItemsMap: { [key: string]: MenuItem } = {};

    for (const route of this.matchedRoutes) {
      const parentFeature = route.PARENT_FEATURE;
      let menuItem = parentItemsMap[parentFeature];

      if (parentFeature !== null) {
        // Check if the parent item already exists in the map
        if (!menuItem) {
          menuItem = {
            label: parentFeature,
            items: [],
          };
          parentItemsMap[parentFeature] = menuItem;
          this.items.push(menuItem);
        }

        // Ensure menuItem.items is defined before pushing to it
        if (!menuItem.items) {
          menuItem.items = [];
        }

        // Create the child menu item
        const childMenuItem: MenuItem = {
          label: route.FEATURE,
          icon: route.ICON,
          routerLink: route.ROUTER_PATH,
          command: (event) => this.updateBreadcrumb(event),
        };

        menuItem.items.push(childMenuItem);
      }
    }
  }

  updateBreadcrumb(evt: any) {
    if (evt && evt.item) {
      this.broadcastService.broadcast(BroadcastEvents.BREADCRUMB, evt);
      localStorage.setItem('kiktemp-selected-menu', JSON.stringify(evt.item));
      this.hideShowSideMenuOnMobile();
    }
  }

  navigateToUserProfile() {
    const userProfileBreadcrumb = {
      label: 'User Profile',
      icon: 'fas fa-user',
      routerLink: '/user-profile'
    };

    this.updateBreadcrumb({ item: userProfileBreadcrumb });
  }

  navigateToDashboard() {
    const dashboardBreadcrumb = {
      label: 'Dashboard',
      icon: 'fas fa-chart-pie',
      routerLink: '/dashboard'
    };

    this.updateBreadcrumb({ item: dashboardBreadcrumb });
  }

  hideShowSideMenuOnMobile() {
    this.dataSharingService.hideShowSideMenu();
  }

  updateMenuExpansion(currentRoute: string, items: MenuItem[]) {
    items.forEach(item => {
      if (item.items) {
        this.updateMenuExpansion(currentRoute, item.items);
        item.expanded = item.items.some(childItem => childItem.expanded);
      } else {
        const menuItemRoute = item.routerLink || '';
        const normalizedCurrentRoute = currentRoute.replace(/^\/+/, '');

        if (menuItemRoute === normalizedCurrentRoute) {
          item.expanded = true;
        } else {
          item.expanded = false;
        }
      }
    });
  }

  findMenuItemByRoute(items: MenuItem[], route: string): MenuItem | undefined {
    for (const item of items) {
      const normalizedCurrentRoute = route.replace(/^\/+/, '');
      if (item.routerLink && item.routerLink === normalizedCurrentRoute) {
        return item;
      } else if (item.items) {
        const found = this.findMenuItemByRoute(item.items, route);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }
}