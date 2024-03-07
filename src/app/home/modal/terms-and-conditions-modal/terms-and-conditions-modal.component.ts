import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html',
  styleUrls: ['./terms-and-conditions-modal.component.scss']
})
export class TermsAndConditionsModalComponent implements OnInit {
  termsAccepted: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.termsAccepted = this.config.data.termsAccepted
  }

  ngOnInit(): void {
  }

  selectCheckbox(value: any) {
    this.termsAccepted = value.checked;
    this.ref.close(this.termsAccepted);
  }
}
