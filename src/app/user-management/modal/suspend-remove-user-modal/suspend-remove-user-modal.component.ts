import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { requiredField } from 'src/app/shared/global.constant';
import { UserManagementService } from 'src/app/shared/services/user-management.service';

@Component({
  selector: 'app-suspend-remove-user-modal',
  templateUrl: './suspend-remove-user-modal.component.html',
  styleUrls: ['./suspend-remove-user-modal.component.scss']
})

export class SuspendRemoveUserModalComponent implements OnInit {
  topic: string = '';
  content: string = '';
  selectedUserId: number = 0;
  loggedInUserId: number = 0;
  btnText: string = '';
  requiredField: string = requiredField;
  passwordStr: string = 'password';
  textStr: string = 'text';
  passwordFieldType: string = '';
  passwordForm: FormGroup = new FormGroup({});
  actionType: string = '';
  isGettingData: boolean = false;
  selectedUserName: string = '';

  get currentPasswordControl(): AbstractControl | null {
    const control = this.passwordForm.get('password');
    return control || null;
  }

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private messageService: MessageService
  ) {
    this.content = this.config.data.content;
    this.topic = this.config.data.topic;
    this.selectedUserId = this.config.data.selectedUserId;
    this.loggedInUserId = this.config.data.loggedInUserId;
    this.selectedUserName = this.config.data.selectedUserName;
    this.btnText = this.config.data.btnText;
  }

  ngOnInit(): void {
    this.passwordFieldType = this.passwordStr;
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ["", Validators.required]
    })
  }

  close() {
    this.ref.close();
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === this.passwordStr ? this.textStr : this.passwordStr;
  }

  userAction(btnText: string) {
    this.actionType = (btnText === 'SUSPEND USER') ? 'suspended' : (btnText === 'UNSUSPEND USER') ? 'verified' : 'removed';

    const actionRequest = {
      loggedInUserId: this.loggedInUserId,
      actionType: this.actionType,
      selectedUserId: this.selectedUserId,
      selectedUserName: this.selectedUserName,
      password: this.currentPasswordControl?.value
    }

    this.isGettingData = true;
    this.userManagementService.suspendOrRemoveUser(actionRequest).subscribe(data => {
      this.isGettingData = false;
      if (data && data.isSuccess && data.suspendRemoveUserResponseDataVM) {
        this.messageService.add({ severity: 'success', summary: data.suspendRemoveUserResponseDataVM.topic, detail: data.suspendRemoveUserResponseDataVM.message });
        const updatedData = {
          refreshTable: true
        };
        this.ref.close(updatedData);
      } else {
        this.close();
      }
    });
  }
}
