import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})

export class SuccessModalComponent implements OnInit {
  topic: string = '';
  message: string = '';
  route: string = '';

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.message = this.config.data.message;
    this.topic = this.config.data.topic;
    this.route = this.config.data.route;
  }

  ngOnInit(): void {
  }

  close() {
    this.ref.close();
  }
}