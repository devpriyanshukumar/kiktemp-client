import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { requiredField } from 'src/app/shared/global.constant';
import { RemoveProjectResponse } from 'src/app/shared/models/project-management';
import { ProjectManagementService } from 'src/app/shared/services/project-management.service';

@Component({
  selector: 'app-remove-project-modal',
  templateUrl: './remove-project-modal.component.html',
  styleUrls: ['./remove-project-modal.component.scss']
})
export class RemoveProjectModalComponent implements OnInit {
  topic: string = '';
  content: string = '';
  loggedInUserId: number = 0;
  requiredField: string = requiredField;
  passwordStr: string = 'password';
  textStr: string = 'text';
  passwordFieldType: string = '';
  passwordForm: FormGroup = new FormGroup({});
  isGettingData: boolean = false;
  selectedProjectId: number = 0;

  get currentPasswordControl(): AbstractControl | null {
    const control = this.passwordForm.get('password');
    return control || null;
  }

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private projectManagementService: ProjectManagementService
  ) {
    this.content = this.config.data.content;
    this.topic = this.config.data.topic;
    this.loggedInUserId = this.config.data.loggedInUserId;
    this.selectedProjectId = this.config.data.selectedProjectId;
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

  deleteProject() {
    const actionRequest = {
      loggedInUserId: this.loggedInUserId,
      selectedProjectId: this.selectedProjectId,
      password: this.currentPasswordControl?.value
    }

    this.isGettingData = true;
    this.projectManagementService.removeProject(actionRequest).subscribe((data: RemoveProjectResponse) => {
      this.isGettingData = false;
      if (data && data.isSuccess && data.removeProjectResponseDataVM) {
        this.messageService.add({ severity: 'success', summary: data.removeProjectResponseDataVM.topic, detail: data.removeProjectResponseDataVM.message });
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
