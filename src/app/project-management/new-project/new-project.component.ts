import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceDataService } from 'src/app/shared/services/reference-data.service';
import { InstallationTypesResponse } from 'src/app/shared/models/referenceData';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectDataVM } from 'src/app/shared/models';
import { ProjectManagementService } from 'src/app/shared/services';
import { MessageService } from 'primeng/api';
import { enterValidInput, requiredField } from 'src/app/shared/global.constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  providers: [DialogService]
})
export class NewProjectComponent implements OnInit {
  newProjectForm: FormGroup = new FormGroup({});
  isGettingData: boolean = false;
  savingData: boolean = false;
  screenWidth: number = 0;
  elevationNumbers: string[] = [];
  installationTypes: any = [];
  elevationArray: any[] = [];
  newProjectRequestDataVM: ProjectDataVM = {};
  userId: number = -1;
  projectId: number = -1;
  enterValidInput = enterValidInput;
  isShowConfirm: boolean = false;
  categoryArray: any = '';

  get projectNameControl(): AbstractControl | null {
    const control = this.newProjectForm.get('projectName');
    return control || null;
  }
  get typeOfInstallationControl(): AbstractControl | null {
    const control = this.newProjectForm.get('typeOfInstallation');
    return control || null;
  }
  get demandFactorControl(): AbstractControl | null {
    const control = this.newProjectForm.get('demandFactor');
    return control || null;
  }
  get elevationControl(): AbstractControl | null {
    const control = this.newProjectForm.get('elevation');
    return control || null;
  }
  get ambientTemperatureControl(): AbstractControl | null {
    const control = this.newProjectForm.get('ambientTemperature');
    return control || null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private refDataService: ReferenceDataService,
    private projectManagementService: ProjectManagementService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.screenWidth = window.innerWidth;
    this.userId = Number(sessionStorage.getItem('userId'));
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    this.getReferenceData();

    this.newProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      typeOfInstallation: ['', Validators.required],
      demandFactor: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      elevation: ['', Validators.required],
      ambientTemperature: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  getReferenceData() {
    this.isGettingData = false;
    this.generateElevationArray();

    this.categoryArray = '["CUBICLE_INSTALLATION_TYPE"]';
    this.refDataService.getRefMasterData(this.categoryArray).subscribe((refDataResponse: any) => {
      this.isGettingData = false;
      if (refDataResponse.refData) {
        this.installationTypes = refDataResponse.refData.CUBICLE_INSTALLATION_TYPE;
      }
    });
  }

  generateElevationArray() {
    let elevation = 0;
    while (elevation <= 5000) {
      var elevationObj = {
        elevation: elevation.toString()
      }
      this.elevationArray.push(elevationObj);
      elevation += 500;
    }
  }

  submitRequest() {
    this.savingData = true;
    this.isGettingData = true;
    this.createNewProjectRequest();

    this.projectManagementService.createNewProjectAsync(this.newProjectRequestDataVM).subscribe(data => {
      this.savingData = false;
      this.isGettingData = false;
      if (data && data.isSuccess && data.projectIdDataVM && data.projectIdDataVM.projectId) {
        this.projectId = data.projectIdDataVM.projectId;
        this.messageService.add({ severity: data.message, summary: 'Success', detail: data.messageDetails });
        this.isShowConfirm = true;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.messageDetails });
      }
    });
  }

  createNewProjectRequest(): void {
    this.newProjectRequestDataVM = {
      userId: this.userId,
      projectName: this.projectNameControl ? this.projectNameControl.value : null,
      typeOfInstallation: this.typeOfInstallationControl ? this.typeOfInstallationControl.value.id : null,
      demandFactor: this.demandFactorControl ? this.demandFactorControl.value : null,
      elevation: this.elevationControl ? this.elevationControl.value.elevation : null,
      ambientTemperature: this.ambientTemperatureControl ? this.ambientTemperatureControl.value : null
    }
  }

  cancelCubicleCreation(): void {
    if (this.projectId || this.projectId === 0) {
      this.router.navigate(['/past-projects']);
    }
  }

  navigateCubicleCreation(): void {
    if (this.projectId || this.projectId === 0) {
      this.router.navigate(['/project-overview'],
        {
          queryParams: {
            projectId: btoa(this.projectId.toLocaleString()),
            userId: btoa(this.userId.toLocaleString())
          }
        });
    }
  }

  closeConfirmPopup(): void {
    this.projectId = -1;
    this.newProjectForm.reset();
    this.isShowConfirm = false;
  }

  resetForm(): void {
    this.newProjectForm.reset();
  }

}
