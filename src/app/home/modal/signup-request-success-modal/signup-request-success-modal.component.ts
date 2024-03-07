import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-signup-request-success-modal',
  templateUrl: './signup-request-success-modal.component.html',
  styleUrls: ['./signup-request-success-modal.component.scss']
})
export class SignupRequestSuccessModalComponent implements OnInit {
  messageTopic: string = '';
  message: string = '';

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.message = this.config.data.message;
    this.messageTopic = this.config.data.messageTopic;
  }

  ngOnInit(): void {
  }

  continue() {
    this.ref.close();
  }
}
