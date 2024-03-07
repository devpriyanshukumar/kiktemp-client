import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { SideMenuComponent } from './layouts/side-menu/side-menu.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { BroadcastService } from './services/broadcast.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ReferenceDataService } from './services';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    AvatarModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    DialogModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    BadgeModule,
    DropdownModule,
    ToastModule,
    OverlayPanelModule,
    TableModule,
    RadioButtonModule,
    InputTextareaModule,
    ScrollPanelModule,
    PanelMenuModule,
    MenubarModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    PaginatorModule,
    AccordionModule,
    ToastModule,
    PasswordModule,
    ConfirmDialogModule,
    TabViewModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    SideMenuComponent,
    MenuModule,
    ButtonModule,
    AvatarModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    DialogModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    BadgeModule,
    DropdownModule,
    ToastModule,
    OverlayPanelModule,
    TableModule,
    RadioButtonModule,
    InputTextareaModule,
    ScrollPanelModule,
    PanelMenuModule,
    MenubarModule,
    InputTextModule,
    InputMaskModule,
    PaginatorModule,
    AccordionModule,
    ToastModule,
    PasswordModule,
    ConfirmDialogModule,
    TabViewModule
  ],
  providers: [
    BroadcastService,
    MessageService,
    ReferenceDataService
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        BroadcastService,
        MessageService,
        ReferenceDataService
      ]
    };
  }
}
