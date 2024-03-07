import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, filter, interval } from 'rxjs';
import { BroadcastService } from './shared/services/broadcast.service';
import { DataSharingService } from './shared/services/data-sharing.service';
import { error, sessionExpiredMessage, sessionExpiredTopic, somethingWentWrong, tokenCheckInterval, width40, zIndex10000 } from './shared/global.constant';
import { TokenService } from './shared/services/token.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SuccessModalComponent } from './home/modal/success-modal/success-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent {
  title = 'kiktemp-client';
  hideLayout: boolean = false;
  message: string = '';
  error = error;
  somethingWentWrong = somethingWentWrong;
  tokenExpirationChecker: Subscription | undefined;
  currentDialogRef: DynamicDialogRef | null = null;
  sessionExpiredTopic: string = sessionExpiredTopic;
  sessionExpiredMessage: string = sessionExpiredMessage;
  homeRoute: string = '/home/login';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private broadcastService: BroadcastService,
    private messageService: MessageService,
    private dataSharingService: DataSharingService,
    private tokenService: TokenService,
    public dialogService: DialogService
  ) {
    // Subscribe to route events to update hideLayout
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideLayout = this.getHideLayoutValue(this.activatedRoute);
      });
  }

  private getHideLayoutValue(route: ActivatedRoute): boolean {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['hideLayout'] || false;
  }

  ngOnInit() {
    this.handleErrors();
    this.changeZIndexProperty();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        //Stop token expoiration check when in login component
        if (event.url === this.homeRoute) {
          this.stopTokenExpirationCheck();
        } else {
          this.startTokenExpirationCheck();
        }
      }
    });
    //Initialy start the token expiration check
    this.startTokenExpirationCheck();
  }

  startTokenExpirationCheck(): void {
    const intervalInMilliseconds = tokenCheckInterval;
    this.tokenExpirationChecker = interval(intervalInMilliseconds).subscribe(() => {
      if (this.tokenService.isTokenExpired()) {
        this.messageService.add({ severity: 'error', summary: this.sessionExpiredTopic, detail: this.sessionExpiredMessage });

        this.currentDialogRef = this.dialogService.open(SuccessModalComponent, {
          header: this.sessionExpiredTopic,
          width: width40,
          baseZIndex: zIndex10000,
          closable: false,
          data: {
            message: this.sessionExpiredMessage,
            route: this.homeRoute
          },
        });
      }
    });
  }

  stopTokenExpirationCheck(): void {
    this.tokenExpirationChecker!.unsubscribe();
  }

  handleErrors() {
    this.broadcastService.subscribe('SERVER_ERROR', (err: any) => {
      const messageTitle = this.error;

      if (err.status === 500) {
        this.message = this.somethingWentWrong;
      } else {
        this.message = err.error.message;
      }
      this.messageService.add({ severity: 'error', summary: messageTitle, detail: this.message });
    });
  }

  changeZIndexProperty() {
    this.dataSharingService.showSideMenu$.subscribe((show) => {
      const sideMenu = document.querySelector('.side-menu') as HTMLElement;
      const zIndexValue = show ? '3' : '0';

      if (sideMenu) {
        sideMenu.style.zIndex = zIndexValue;
      }
    });
  }
}
