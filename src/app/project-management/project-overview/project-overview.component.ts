import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mobileWidth, tableRowsPerPage } from 'src/app/shared/global.constant';
import { ProjectDataVM } from 'src/app/shared/models';
import { ProjectManagementService } from 'src/app/shared/services';
import { QueryParmEnum } from 'src/app/shared/util/enumData';
import { ReferenceDataService } from 'src/app/shared/services/reference-data.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  isGettingData: boolean = false;
  addingCubicle: boolean = false;
  first: number = 0;
  pageNo: number = 0;
  tableRowsPerPage: number = tableRowsPerPage;
  totalRecords: any;
  projectId: number = -1;
  userId: number = -1;
  projectDataVM: ProjectDataVM = {};
  newProjectForm: FormGroup = new FormGroup({});
  projectNo: string = '';
  isEditingMainData: boolean = false;
  hasMainDataChanges: boolean = false;
  originalFormValues: { [key: string]: any } = {};
  categoryArray: any = '';
  isShowDeleteConfirmationPopup: boolean = false;
  cubicleList: any[] = [];
  queryParmEnum = QueryParmEnum;
  installationTypes: any = [];
  elevationArray: any[] = [];
  savingData: boolean = false;
  projectRequestData: ProjectDataVM = {};
  deleteCubicleId: number = -1;
  projectCreatedUserId: number = -1;
  screenWidth: number = 0;
  mobileWidth: number = mobileWidth;

  get projectNoControl(): AbstractControl | null {
    const control = this.newProjectForm.get('projectNo');
    return control || null;
  }
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
    private activatedRoute: ActivatedRoute,
    private refDataService: ReferenceDataService,
    private messageService: MessageService,
    private projectManagementService: ProjectManagementService,
    private router: Router
  ) {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.projectId]) {
      const projectId = atob(this.activatedRoute.snapshot.queryParams[this.queryParmEnum.projectId]);
      this.projectId = Number(projectId);
    }
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.userId]) {
      const projectCreatedUserId = atob(this.activatedRoute.snapshot.queryParams[this.queryParmEnum.userId]);
      this.projectCreatedUserId = Number(projectCreatedUserId);
    }
    this.buildForm();
    this.getReferenceData();
    this.loadProjectData(this.projectId)
  }

  buildForm(): void {
    this.newProjectForm = this.formBuilder.group({
      projectNo: [{ value: '', disabled: true }],
      projectName: ['', Validators.required],
      typeOfInstallation: ['', Validators.required],
      demandFactor: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      elevation: ['', Validators.required],
      ambientTemperature: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.tableRowsPerPage = event.rows;
  }

  loadProjectData(projectId: number): void {
    this.isGettingData = true;
    if (projectId || projectId == 0) {
      this.projectManagementService.getProjectDataByProjectIdAsync(projectId, this.projectCreatedUserId).subscribe(data => {
        this.isGettingData = false;
        if (data && data.isSuccess && data.projectDataVM) {
          this.projectDataVM = data.projectDataVM;
          this.cubicleList = (data.projectDataVM && data.projectDataVM.cubicles) ? data.projectDataVM.cubicles : [];
          this.newProjectForm.patchValue(this.projectDataVM);

          //store original values
          this.originalFormValues = { ...this.newProjectForm.value };
          this.generateProjectNo(this.projectDataVM.projectId ? this.projectDataVM.projectId : -1);
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: data.message });
        }
      });
    }
  }

  generateProjectNo(id: number): void {
    if ((id || id == 0) && id != -1) {
      const paddedNumber = (id).toString().padStart(4, "0");
      this.projectNo = `KIKTEMP_${paddedNumber}`;
    }
  }

  changeMainData(): void {
    // this.getReferenceData();
    this.setDropDownValues();
    this.isEditingMainData = true;
    this.subscribeValueChanges('projectName');
    this.subscribeValueChanges('typeOfInstallation');
    this.subscribeValueChanges('demandFactor');
    this.subscribeValueChanges('elevation');
    this.subscribeValueChanges('ambientTemperature');
  }

  subscribeValueChanges(controlName: string): void {
    let projectNameChanges = false;
    let typeOfInstallationChanges = false;
    let demandFactorChanges = false;
    let elevationChanges = false;
    let ambientTemperatureChanges = false;

    this.newProjectForm.get(controlName)?.valueChanges.subscribe((value) => {
      this.hasMainDataChanges = false;
      switch (controlName) {
        case 'projectName':
          projectNameChanges = false;
          if (value !== this.originalFormValues[controlName]) {
            projectNameChanges = true;
          }
          break;

        case 'typeOfInstallation':
          typeOfInstallationChanges = false;
          if (value.value !== this.originalFormValues[controlName]) {
            typeOfInstallationChanges = true;
          }
          break;

        case 'demandFactor':
          demandFactorChanges = false;
          if (Number(value) !== this.originalFormValues[controlName]) {
            demandFactorChanges = true;
          }
          break;

        case 'elevation':
          elevationChanges = false;
          if (Number(value.elevation) !== this.originalFormValues[controlName]) {
            elevationChanges = true;
          }
          break;

        case 'ambientTemperature':
          ambientTemperatureChanges = false;
          if (Number(value) !== this.originalFormValues[controlName]) {
            ambientTemperatureChanges = true;
          }
          break;

        default:
          break;
      }

      if (projectNameChanges || typeOfInstallationChanges || demandFactorChanges || elevationChanges || ambientTemperatureChanges) {
        this.hasMainDataChanges = true;
      }

    });
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

  setDropDownValues(): void {
    if (this.projectDataVM) {
      this.installationTypes.forEach((installationType: any) => {
        if (installationType.value === this.projectDataVM.typeOfInstallation) {
          this.typeOfInstallationControl?.setValue(installationType);
        }
      });

      this.elevationArray.forEach(elevation => {
        if (elevation.elevation == this.projectDataVM.elevation) {
          this.elevationControl?.setValue(elevation);
        }
      })
    }
  }

  resetForm(): void {
    this.newProjectForm.patchValue(this.projectDataVM);

  }

  updateData(): void {
    this.savingData = true;
    this.isGettingData = true;
    this.createUpdateProjectRequest();

    this.projectManagementService.updateProjectData(this.projectRequestData).subscribe(data => {
      this.savingData = false;
      this.isGettingData = false;
      if (data && data.isSuccess && data.projectDataVM) {
        this.projectDataVM = data.projectDataVM;
        this.isEditingMainData = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      }
    });

  }
  createUpdateProjectRequest(): void {
    this.projectRequestData = {
      userId: this.projectCreatedUserId,
      projectName: this.projectNameControl ? this.projectNameControl.value : null,
      projectNo: this.projectNoControl ? this.projectNoControl.value : null,
      installationTypeId: this.typeOfInstallationControl ? this.typeOfInstallationControl.value.id : null,
      demandFactor: this.demandFactorControl ? this.demandFactorControl.value : null,
      elevation: this.elevationControl ? this.elevationControl.value.elevation : null,
      ambientTemperature: this.ambientTemperatureControl ? this.ambientTemperatureControl.value : null,
      projectId: this.projectId
    }
  }

  updateCubicle(cubicle: any): void {
    if (cubicle) {
      this.router.navigate(['/cubicle-overview'],
        {
          queryParams: {
            cubicleId: btoa(cubicle.id.toLocaleString()),
            projectId: btoa(this.projectId.toLocaleString()),
            userId: btoa(this.userId.toLocaleString())
          }
        });
    }
  }

  addCubicle(id: number = -1): void {
    this.router.navigate(['/cubicle-overview'],
      {
        queryParams: {
          cubicleId: btoa(id.toLocaleString()),
          projectId: btoa(this.projectId.toLocaleString()),
          userId: btoa(this.userId.toLocaleString())
        }
      });
  }

  deleteCubicle() {
    this.isGettingData = true;
    this.projectManagementService.deleteCubicle(this.deleteCubicleId).subscribe(data => {
      this.isGettingData = false;
      if (data && data.isSuccess) {
        this.isShowDeleteConfirmationPopup = false;
        this.loadProjectData(this.projectId)
        this.messageService.add({ severity: data.message, summary: (data.message == 'success') ? 'Success' : 'Warning', detail: data.messageDetails });
      }
    });
  }

  showDeleteConfirm(cubicle: any) {
    this.isShowDeleteConfirmationPopup = true;
    this.deleteCubicleId = cubicle.id;
  }

  cancelDeleteData() {
    this.deleteCubicleId = -1;
    this.isShowDeleteConfirmationPopup = false;
  }

  navigateToViewReport(cubicle: any): void {
    if (cubicle) {
      const queryParams = {
        cubicleId: btoa(cubicle.id.toLocaleString())
      };

      // Construct the URL with query parameters
      this.router.navigate(['/report'], { queryParams });
    }
  }
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
