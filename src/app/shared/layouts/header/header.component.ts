import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';
import { BroadcastService } from '../../services';
import { BroadcastEvents } from '../../util/broadcastEvents';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isDropdownOpen: boolean = false;
  userName: string = sessionStorage.getItem('userName')!;

  constructor(
    private dataSharingService: DataSharingService,
    private elementRef: ElementRef,
    private router: Router,
    private broadcastService: BroadcastService
  ) { }

  ngOnInit(): void {
  }

  clickHamburgerIcon() {
    this.dataSharingService.hideShowSideMenu();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');

    // Check if the click target is outside of the dropdown
    if (!dropdown.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    sessionStorage.removeItem('bearerToken');
    this.router.navigate(['/home/login']);
  }

  navigateToUserProfile() {
    const userProfileBreadcrumb = {
      label: 'User Profile',
      icon: 'fas fa-user',
      routerLink: '/user-profile'
    };

    this.updateBreadcrumb({ item: userProfileBreadcrumb });
  }

  updateBreadcrumb(evt: any) {
    if (evt && evt.item) {
      this.broadcastService.broadcast(BroadcastEvents.BREADCRUMB, evt);
      localStorage.setItem('kiktemp-selected-menu', JSON.stringify(evt.item));
    }
  }
}
