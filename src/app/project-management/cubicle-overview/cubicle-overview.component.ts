import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { enterValidInput, requiredField } from 'src/app/shared/global.constant';
import {
  BusBarDataVM,
  CubicleOverViewGeneralDataVM,
  CubicleOverviewMasterDataVM,
  CustomSwitchgearDataVM,
  MultiPurposeDataVM,
  PowerCableDataVM,
  SwitchgearDataVM,
} from 'src/app/shared/models';
import { ProjectManagementService } from 'src/app/shared/services';
import { QueryParmEnum } from 'src/app/shared/util/enumData';
import { ReferenceDataService } from 'src/app/shared/services/reference-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cubicle-overview',
  templateUrl: './cubicle-overview.component.html',
  styleUrls: ['./cubicle-overview.component.scss'],
})
export class CubicleOverviewComponent implements OnInit {
  cubicleMainDataForm: FormGroup = new FormGroup({});
  powerCableDataForm: FormGroup = new FormGroup({});
  busBarDataForm: FormGroup = new FormGroup({});
  switchgearDataForm: FormGroup = new FormGroup({});
  customSwitchgearDataForm: FormGroup = new FormGroup({});

  isGettingData: boolean = false;
  cubicleId: number = -1;
  addingCubicle: boolean = true;
  cubicleOverViewDataVm: any = {};
  hasCubicleMainData: boolean = false;
  showCubicleOverView: boolean = false;
  projectId: number = -1;
  enterValidInput = enterValidInput;
  requiredField = requiredField;
  busBarData: any[] = [];
  deleteText: string = '';
  isShowDeleteConfirmationPopup: boolean = false;
  activeIndex: number = -1;
  referenceId: number = -1;
  cubicleType: string = '';
  isShowAddPowerCableModel: boolean = false;
  isShowAddBusBarModel: boolean = false;
  isShowAddSwitchgearModel: boolean = false;
  isShowAddCustomSwitchgearModel: boolean = false;
  cubicleOverviewMasterDataVM: CubicleOverviewMasterDataVM = {};
  projectNo: string = '';
  cubicleNo: string = '';
  cubicleOverViewGeneralDataVM: CubicleOverViewGeneralDataVM = {};
  powerCableDataVMs: any[] = [];
  busBarDataVMs: any[] = [];
  switchgearDataVMs: SwitchgearDataVM[] = [];
  customSwitchgearDataVMs: CustomSwitchgearDataVM[] = [];
  horizontalSeperationList: MultiPurposeDataVM[] = [];
  cubicleOverViewGeneralDataRequest: CubicleOverViewGeneralDataVM = {};
  busBarDataRequest: BusBarDataVM = {};
  powerCableDataRequest: PowerCableDataVM = {};
  switchgearDataRequest: SwitchgearDataVM = {};
  customSwitchgearDataRequest: CustomSwitchgearDataVM = {};
  editDataId: number = -1;
  installationMethodList: MultiPurposeDataVM[] = [];
  subInstallationMethodList: MultiPurposeDataVM[] = [];
  conductorTemperatureList: MultiPurposeDataVM[] = [];
  powerCableConductorTemperatureList: MultiPurposeDataVM[] = [];
  insulationList: MultiPurposeDataVM[] = [];
  busBarTypeList: MultiPurposeDataVM[] = [];
  hightAndThicknessList: MultiPurposeDataVM[] = [];
  targetTemperatureList: MultiPurposeDataVM[] = [];
  positionList: MultiPurposeDataVM[] = [];
  coolingSystemList: any[] = [];
  busBarTotalPowerLoss: number = 0;
  powerCableTotalPowerLoss: number = 0;
  switchGearTotalPowerLoss: number = 0;
  customSwitchGearTotalPowerLoss: number = 0;
  manufactureList: MultiPurposeDataVM[] = [];
  switchGearTypeList: MultiPurposeDataVM[] = [];
  switchGearRangeList: MultiPurposeDataVM[] = [];
  switchGearModalList: MultiPurposeDataVM[] = [];
  i30: number = 1;
  k1: number = 1;
  iMax: number = 0;
  switchGearRefDataId: number = -1;
  projectCreatedUserId: number = -1;
  queryParmEnum = QueryParmEnum;
  cableArrangementList: MultiPurposeDataVM[] = [];
  cableInstallationTypesList: MultiPurposeDataVM[] = [];
  cableInstallationMethodsList: MultiPurposeDataVM[] = [];
  cableCrossSectionalAreaList: any = [];
  currentCarryingCapacityId: number = -1;
  hideInsallationMethodDropdown: boolean = false;
  currentCarryingCapacity: number = 0;
  insulationCorrectionFactorId: number = -1;
  targetTemp: any;
  cableId: any;
  cubicleTotalPowerLoss: number = 0;

  get getCoolingSystemControl() {
    return this.cubicleMainDataForm.get('coolingSystem');
  }
  get getHorizontalSeparationControl() {
    return this.cubicleMainDataForm.get('horizontalSeparation');
  }
  get getPositionControl() {
    return this.cubicleMainDataForm.get('position');
  }
  get getLouverAreaControl() {
    return this.cubicleMainDataForm.get('louverArea');
  }
  get getHeightControl() {
    return this.cubicleMainDataForm.get('height');
  }
  get getWidthControl() {
    return this.cubicleMainDataForm.get('width');
  }
  get getDepthControl() {
    return this.cubicleMainDataForm.get('depth');
  }
  get getTargetTemperatureControl() {
    return this.cubicleMainDataForm.get('targetTemperature');
  }

  get getPowerCableConductorTemperatureControl() {
    return this.powerCableDataForm.get('conductorTemperature');
  }
  get getArrangementTypeControl() {
    return this.powerCableDataForm.get('arrangementType');
  }
  get getInstallationTypeControl() {
    return this.powerCableDataForm.get('installationType');
  }
  get getInstallationMethodControl() {
    return this.powerCableDataForm.get('installationMethod');
  }
  get getPowerCableInsulationControl() {
    return this.powerCableDataForm.get('insulation');
  }
  get getPowerCableDescriptionControl() {
    return this.powerCableDataForm.get('description');
  }
  get getPowerCableInputCurrentControl() {
    return this.powerCableDataForm.get('inputCurrent');
  }
  get getPowerCableLengthControl() {
    return this.powerCableDataForm.get('length');
  }
  get getPowerCableCrossSectionalAreaControl() {
    return this.powerCableDataForm.get('crossSectionalArea');
  }
  get getPowerCableIMaxControl() {
    return this.powerCableDataForm.get('iMaxValue');
  }

  get getBusBarDataCrossSectionalTypeControl() {
    return this.busBarDataForm.get('busBarType');
  }
  get getBusBarDataSizeControl() {
    return this.busBarDataForm.get('heightAndThickness');
  }
  get getBusBarDataDescriptionControl() {
    return this.busBarDataForm.get('description');
  }
  get getBusBarDataInputCurrentControl() {
    return this.busBarDataForm.get('inputCurrent');
  }
  get getBusBarDataLengthControl() {
    return this.busBarDataForm.get('busBarlength');
  }
  get getBusBarDataConductorTemperatureControl() {
    return this.busBarDataForm.get('conductorTemperature');
  }

  get getSwitchgearDataModalNameControl() {
    return this.switchgearDataForm.get('modalName');
  }
  get getSwitchgearDataTypeControl() {
    return this.switchgearDataForm.get('type');
  }
  get getSwitchgearDataRangeControl() {
    return this.switchgearDataForm.get('range');
  }
  get getSwitchgearDataManufactureControl() {
    return this.switchgearDataForm.get('manufacture');
  }
  get getSwitchgearDataQuantityControl() {
    return this.switchgearDataForm.get('quantity');
  }
  get getSwitchgearDataRatingControl() {
    return this.switchgearDataForm.get('rating');
  }
  get getSwitchgearDataOperatingCurrentControl() {
    return this.switchgearDataForm.get('operatingCurrent');
  }

  get getCustomSwitchgearDataFormModalNameControl() {
    return this.customSwitchgearDataForm.get('model');
  }
  get getCustomSwitchgearDataFormManufactureControl() {
    return this.customSwitchgearDataForm.get('manufacturer');
  }
  get getCustomSwitchgearDataFormQuantityControl() {
    return this.customSwitchgearDataForm.get('quantity');
  }
  get getCustomSwitchgearDataFormRatingControl() {
    return this.customSwitchgearDataForm.get('rating');
  }
  get getCustomSwitchgearDataFormUnitPowerLossControl() {
    return this.customSwitchgearDataForm.get('unitPowerLoss');
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private projectManagementService: ProjectManagementService,
    private router: Router,
    private messageService: MessageService,
    private refDataService: ReferenceDataService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.cubicleId]) {
      const cubicleId = atob(
        this.activatedRoute.snapshot.queryParams[this.queryParmEnum.cubicleId]
      );
      this.cubicleId = Number(cubicleId);
    }
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.projectId]) {
      const projectId = atob(
        this.activatedRoute.snapshot.queryParams[this.queryParmEnum.projectId]
      );
      this.projectId = Number(projectId);
      this.generateProjectNo(this.projectId);
    }
    if (this.activatedRoute.snapshot.queryParams[QueryParmEnum.userId]) {
      const projectCreatedUserId = atob(
        this.activatedRoute.snapshot.queryParams[this.queryParmEnum.userId]
      );
      this.projectCreatedUserId = Number(projectCreatedUserId);
    }

    this.generateData();
    this.buildForm();
    this.getCubicleData(this.cubicleId).subscribe();
  }

  generateData(): void {
    this.horizontalSeperationList = [
      {
        id: 0,
        description: '0',
      },
      {
        id: 1,
        description: '1',
      },
      {
        id: 2,
        description: '2',
      },
      {
        id: 3,
        description: '3',
      },
    ];

    this.subInstallationMethodList = [
      {
        id: 0,
        description: 'trefoll',
      },
      {
        id: 1,
        description: 'touching',
      },
    ];

    this.conductorTemperatureList = [
      {
        id: 0,
        temperature: 70,
      },
      {
        id: 1,
        temperature: 90,
      },
    ];

    this.busBarTypeList = [
      {
        id: 0,
        label: 'One Bar',
        description: 'oneBar',
      },
      {
        id: 1,
        label: 'Two Bar',
        description: 'twoBars',
      },
    ];

    this.targetTemperatureList = [
      {
        id: 0,
        temperature: 30,
      },
      {
        id: 1,
        temperature: 35,
      },
      {
        id: 2,
        temperature: 40,
      },
      {
        id: 3,
        temperature: 45,
      },
      {
        id: 4,
        temperature: 50,
      },
      {
        id: 5,
        temperature: 55,
      },
      {
        id: 6,
        temperature: 60,
      },
    ];
  }

  buildForm(): void {
    this.cubicleMainDataForm = this.formBuilder.group({
      coolingSystem: ['', Validators.required],
      horizontalSeparation: ['', Validators.required],
      position: ['', Validators.required],
      louverArea: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      height: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      width: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      depth: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      targetTemperature: [
        '',
        [Validators.required, Validators.pattern(/^[0-9-]*$/)],
      ],
    });

    this.powerCableDataForm = this.formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      conductorTemperature: ['', Validators.required],
      arrangementType: ['', Validators.required],
      installationType: ['', Validators.required],
      installationMethod: ['', Validators.required],
      insulation: ['', Validators.required],
      crossSectionalArea: ['', Validators.required],
      inputCurrent: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)],
      ],
      length: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)],
      ],
      iMaxValue: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)],
      ],
    });

    this.busBarDataForm = this.formBuilder.group({
      id: ['', Validators.required],
      busBarType: ['', Validators.required],
      heightAndThickness: ['', Validators.required],
      description: ['', Validators.required],
      inputCurrent: [
        '',
        [Validators.required, Validators.pattern(/^[0-9-]*$/)],
      ],
      busBarlength: [
        '',
        [Validators.required, Validators.pattern(/^[0-9-]*$/)],
      ],
      conductorTemperature: ['', Validators.required],
    });

    this.switchgearDataForm = this.formBuilder.group({
      id: ['', Validators.required],
      manufacture: ['', Validators.required],
      type: ['', Validators.required],
      range: ['', Validators.required],
      modalName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      rating: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      operatingCurrent: [
        '',
        [Validators.required, Validators.pattern(/^[0-9-]*$/)],
      ],
    });

    this.customSwitchgearDataForm = this.formBuilder.group({
      id: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      rating: ['', [Validators.required, Validators.pattern(/^[0-9-]*$/)]],
      unitPowerLoss: [
        '',
        [Validators.required, Validators.pattern(/^[0-9-]*$/)],
      ],
    });
  }

  getCubicleData(cubicleId: number): Observable<boolean> {
    // this.isGettingData = true;
    return new Observable<boolean>((observer) => {
      this.projectManagementService
        .getCubicleDataByCubicleId(cubicleId)
        .subscribe((data) => {
          if (data && data.isSuccess) {
            if (data.cubicleDataVM) {
              this.cubicleOverViewDataVm = data.cubicleDataVM;
              this.cubicleTotalPowerLoss =
                this.cubicleOverViewDataVm.cubicleOverViewGeneralDataVM.cubiclePowerLoss;
            }

            if (this.cubicleOverViewDataVm.cubicleOverViewGeneralDataVM) {
              this.cubicleOverViewGeneralDataVM =
                this.cubicleOverViewDataVm.cubicleOverViewGeneralDataVM;
              this.k1 = this.cubicleOverViewGeneralDataVM.targetTemperature!;
              this.targetTemp = this.k1;
              this.hasCubicleMainData = true;
              this.generateCubicleId(this.projectNo, this.cubicleId);
              this.cubicleMainDataForm.patchValue(
                this.cubicleOverViewDataVm.cubicleOverViewGeneralDataVM
              );
            } else {
              this.showCubicleOverView = true;
              this.hasCubicleMainData = false;
            }

            if (
              this.cubicleOverViewDataVm.powerCableDataVMs &&
              (this.cubicleOverViewDataVm.powerCableDataVMs.totalPowerLoss ||
                this.cubicleOverViewDataVm.powerCableDataVMs.totalPowerLoss ==
                  0) &&
              this.cubicleOverViewDataVm.powerCableDataVMs.powerCabledDataVMs
            ) {
              this.powerCableDataVMs =
                this.cubicleOverViewDataVm.powerCableDataVMs.powerCabledDataVMs;
              this.powerCableTotalPowerLoss =
                this.cubicleOverViewDataVm.powerCableDataVMs.totalPowerLoss;
            }
            if (
              this.cubicleOverViewDataVm.busBarDataVMs &&
              (this.cubicleOverViewDataVm.busBarDataVMs.totalPowerLoss ||
                this.cubicleOverViewDataVm.busBarDataVMs.totalPowerLoss == 0) &&
              this.cubicleOverViewDataVm.busBarDataVMs.busBarDataVMs
            ) {
              this.busBarDataVMs =
                this.cubicleOverViewDataVm.busBarDataVMs.busBarDataVMs;
              this.busBarTotalPowerLoss =
                this.cubicleOverViewDataVm.busBarDataVMs.totalPowerLoss;
            }
            if (
              this.cubicleOverViewDataVm.switchgearDataVMs &&
              (this.cubicleOverViewDataVm.switchgearDataVMs.totalPowerLoss ||
                this.cubicleOverViewDataVm.switchgearDataVMs.totalPowerLoss ==
                  0) &&
              this.cubicleOverViewDataVm.switchgearDataVMs.switchgearDataVMs
            ) {
              this.switchgearDataVMs =
                this.cubicleOverViewDataVm.switchgearDataVMs.switchgearDataVMs;
              this.switchGearTotalPowerLoss =
                this.cubicleOverViewDataVm.switchgearDataVMs.totalPowerLoss;
            }
            if (
              this.cubicleOverViewDataVm.customSwitchgearDataVMs &&
              (this.cubicleOverViewDataVm.customSwitchgearDataVMs
                .totalPowerLoss ||
                this.cubicleOverViewDataVm.customSwitchgearDataVMs
                  .totalPowerLoss == 0) &&
              this.cubicleOverViewDataVm.customSwitchgearDataVMs
                .customSwitchgearDataVMs
            ) {
              this.customSwitchgearDataVMs =
                this.cubicleOverViewDataVm.customSwitchgearDataVMs.customSwitchgearDataVMs;
              this.customSwitchGearTotalPowerLoss =
                this.cubicleOverViewDataVm.customSwitchgearDataVMs.totalPowerLoss;
            }

            this.getCubicleOverviewMasterData();
            this.isGettingData = false;

            // Check there is at least 1 power cable, busbar, switchgear data
            const canGenerateReport =
              // this.powerCableTotalPowerLoss > 0 &&
              // this.busBarTotalPowerLoss > 0 &&
              // this.switchGearTotalPowerLoss > 0
              this.cubicleTotalPowerLoss > 0;

            // Emit the result to the observer
            observer.next(canGenerateReport);
            observer.complete();
          } else {
            this.isGettingData = false;
            this.showCubicleOverView = true;
            this.hasCubicleMainData = false;

            // Emit false
            observer.next(false);
            observer.complete();
          }
        });
    });
  }

  closeCubicleOverview() {
    if (!this.hasCubicleMainData) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please add cubicle main details or go back to Project Overview page',
      });
      this.showCubicleOverView = true;
    }
    this.onCloseEditModal();
  }

  backToProjectOverview(): void {
    this.router.navigate(['/project-overview'], {
      queryParams: {
        projectId: btoa(this.projectId.toLocaleString()),
        userId: btoa(this.projectCreatedUserId.toLocaleString()),
      },
    });
  }

  editAccordianData(index: number, dataId: number, editDataId: number): void {
    this.activeIndex = index;
    this.editDataId = editDataId;
    switch (index) {
      case 0:
        this.cableId = editDataId;
        this.isShowAddPowerCableModel = true;
        if (this.powerCableDataVMs && this.powerCableDataVMs.length) {
          this.powerCableDataForm.patchValue(this.powerCableDataVMs[dataId]);

          if (this.getPowerCableIMaxControl) {
            this.getPowerCableIMaxControl?.setValue(
              this.powerCableDataVMs[dataId].MAXIMUM_CURRENT
            );
          }
          this.patchDropDownValues(1, this.powerCableDataVMs[dataId]);
        }
        break;
      case 1:
        this.isShowAddBusBarModel = true;
        if (this.busBarDataVMs && this.busBarDataVMs.length) {
          this.busBarDataForm.patchValue(this.busBarDataVMs[dataId]);
          this.patchDropDownValues(2, this.busBarDataVMs[dataId]);
        }
        break;
      case 2:
        this.isShowAddSwitchgearModel = true;
        if (this.switchgearDataVMs && this.switchgearDataVMs.length) {
          this.switchgearDataForm.patchValue(this.switchgearDataVMs[dataId]);
          this.patchDropDownValues(3, this.switchgearDataVMs[dataId]);
        }
        break;
      case 3:
        this.isShowAddCustomSwitchgearModel = true;
        if (
          this.customSwitchgearDataVMs &&
          this.customSwitchgearDataVMs.length
        ) {
          this.customSwitchgearDataForm.patchValue(
            this.customSwitchgearDataVMs[dataId]
          );
          this.patchDropDownValues(4, this.customSwitchgearDataVMs[dataId]);
        }
        break;
      default:
        break;
    }
  }

  deleteAccordianData(index: number, dataId: number): void {
    this.activeIndex = index;
    this.referenceId = dataId;
    this.isShowDeleteConfirmationPopup = true;

    switch (index) {
      case 0:
        this.deleteText = 'Power Cable';
        this.cubicleType = 'PC';
        break;
      case 1:
        this.deleteText = 'Bus Bar';
        this.cubicleType = 'BB';
        break;
      case 2:
        this.deleteText = 'Switchgear';
        this.cubicleType = 'SG';
        break;
      case 3:
        this.deleteText = 'Custom Switchgear';
        this.cubicleType = 'CSG';
        break;
      default:
        break;
    }
  }

  confirmDeleteData(id: number, activeIndex: number): void {
    this.isGettingData = true;
    switch (activeIndex) {
      case 0:
        this.projectManagementService
          .deletePowerCablelData(id)
          .subscribe((data) => {
            this.isGettingData = false;
            if (data && data.isSuccess && data.messageDetails && data.message) {
              this.messageService.add({
                severity: data.message,
                summary: data.message == 'success' ? 'Success ' : 'Warning',
                detail: data.messageDetails,
              });
              this.isShowDeleteConfirmationPopup = false;
              this.getPowerCableData();
            }
          });
        break;
      case 1:
        this.projectManagementService
          .deleteBusBarData(id, this.projectId)
          .subscribe((data) => {
            this.isGettingData = false;
            if (data && data.isSuccess && data.messageDetails && data.message) {
              this.messageService.add({
                severity: data.message,
                summary: data.message == 'success' ? 'Success ' : 'Warning',
                detail: data.messageDetails,
              });
              this.isShowDeleteConfirmationPopup = false;
              this.getBusBarData();
            }
          });
        break;
      case 2:
        this.projectManagementService
          .deleteSwitchgearData(id)
          .subscribe((data) => {
            this.isGettingData = false;
            if (data && data.isSuccess && data.messageDetails && data.message) {
              this.messageService.add({
                severity: data.message,
                summary: data.message == 'success' ? 'Success ' : 'Warning',
                detail: data.messageDetails,
              });
              this.isShowDeleteConfirmationPopup = false;
              this.getSwitchGearData();
            }
          });
        break;
      case 3:
        this.projectManagementService
          .deleteCustomSwitchgearData(id)
          .subscribe((data) => {
            this.isGettingData = false;
            if (data && data.isSuccess && data.messageDetails && data.message) {
              this.messageService.add({
                severity: data.message,
                summary: data.message == 'success' ? 'Success ' : 'Warning',
                detail: data.messageDetails,
              });
              this.isShowDeleteConfirmationPopup = false;
              this.getCustomSwitchGearData();
            }
          });
        break;
      default:
        break;
    }
  }

  cancelDeleteData(): void {
    this.isShowDeleteConfirmationPopup = false;
    this.cubicleType = '';
    this.activeIndex = -1;
    this.referenceId = -1;
  }

  getCubicleOverviewMasterData(): void {
    this.isGettingData = true;

    let categoryArray =
      '["CUBICLE_COOLING_SYSTEM", "CUBICLE_POSITION", "CUBICLE_INSTALLATION_TYPE", "CABLE_INSULATION", "CABLE_ARRANGEMENT", "CABLE_INSTALLATION_TYPE", "CABLE_INSTALLATION_METHOD"]';
    this.refDataService.getRefMasterData(categoryArray).subscribe((data) => {
      if (data.refData) {
        this.installationMethodList = data.refData.CUBICLE_INSTALLATION_TYPE;
        this.positionList = data.refData.CUBICLE_POSITION;
        this.insulationList = data.refData.CABLE_INSULATION;
        this.coolingSystemList = data.refData.CUBICLE_COOLING_SYSTEM;

        //Disable forced ventilation dropdown item
        this.coolingSystemList[1].disabled = true;
        this.cableArrangementList = data.refData.CABLE_ARRANGEMENT;
        this.cableInstallationTypesList = data.refData.CABLE_INSTALLATION_TYPE;
        this.cableInstallationMethodsList =
          data.refData.CABLE_INSTALLATION_METHOD;

        this.getSwitchGearMasterData(1);
      }
    });
  }

  editGeneralData(): void {
    if (this.cubicleOverViewGeneralDataVM) {
      this.cubicleMainDataForm.patchValue(this.cubicleOverViewGeneralDataVM);
      this.patchDropDownValues(0, this.cubicleOverViewGeneralDataVM);
      this.showCubicleOverView = true;
    }
  }

  generateProjectNo(id: number): void {
    if ((id || id == 0) && id != -1) {
      const paddedNumber = id.toString().padStart(3, '0');
      this.projectNo = `KIKBLOX_TR_${paddedNumber}`;

      this.generateCubicleId(this.projectNo, this.cubicleId);
    }
  }

  generateCubicleId(projectNo: string, id: number): void {
    const paddedNumber = id.toString().padStart(2, '0');
    this.cubicleNo = `${projectNo}_CUB_${paddedNumber}`;
  }

  addCubicleOverviewData(activeTabIndex: number): void {
    this.editDataId = -1;
    switch (activeTabIndex) {
      case 0:
        this.isShowAddPowerCableModel = true;
        break;
      case 1:
        this.isShowAddBusBarModel = true;
        break;
      case 2:
        this.isShowAddSwitchgearModel = true;
        break;
      case 3:
        this.isShowAddCustomSwitchgearModel = true;
        break;
      default:
        break;
    }
  }

  patchDropDownValues(modalIndex: number, selectedData: any): void {
    if ((modalIndex || modalIndex == 0) && selectedData) {
      switch (modalIndex) {
        case 0:
          //set coolingSystemList value
          if (this.coolingSystemList && this.coolingSystemList.length) {
            this.coolingSystemList.forEach((coolingSystem) => {
              if (
                coolingSystem.id == selectedData.coolingSystemId &&
                this.getCoolingSystemControl
              ) {
                this.getCoolingSystemControl.setValue(coolingSystem);
              }
            });
          }

          if (
            this.horizontalSeperationList &&
            this.horizontalSeperationList.length
          ) {
            this.horizontalSeperationList.forEach((horizontalSeperation) => {
              if (
                Number(horizontalSeperation.description) ==
                  selectedData.horizontalSeparation &&
                this.getHorizontalSeparationControl
              ) {
                this.getHorizontalSeparationControl.setValue(
                  horizontalSeperation
                );
              }
            });
          }

          if (this.positionList && this.positionList.length) {
            this.positionList.forEach((position) => {
              if (
                position.id == selectedData.positionId &&
                this.getPositionControl
              ) {
                this.getPositionControl.setValue(position);
              }
            });
          }

          if (this.targetTemperatureList && this.targetTemperatureList.length) {
            this.targetTemperatureList.forEach((targetTemperature) => {
              if (
                targetTemperature.temperature ==
                  selectedData.targetTemperature &&
                this.getTargetTemperatureControl
              ) {
                this.getTargetTemperatureControl.setValue(targetTemperature);
                this.targetTemp =
                  this.getTargetTemperatureControl.value.temperature;
              }
            });
          }
          break;
        case 1:
          this.isGettingData = true;
          if (this.insulationList && this.insulationList.length) {
            //Populate insulation type
            this.insulationList.forEach((insulation) => {
              if (
                insulation.id == selectedData.CABLE_INSULATION_ID &&
                this.getPowerCableInsulationControl
              ) {
                this.getPowerCableInsulationControl.setValue(insulation);

                if (
                  this.powerCableConductorTemperatureList &&
                  this.powerCableConductorTemperatureList.length
                ) {
                  //Populate conductor temperature
                  this.powerCableConductorTemperatureList.forEach(
                    (temperature) => {
                      if (
                        temperature.value ==
                          selectedData.CONDUCTOR_TEMPERATURE &&
                        this.getPowerCableConductorTemperatureControl
                      ) {
                        this.getPowerCableConductorTemperatureControl.setValue(
                          temperature
                        );

                        //Populate arrangement type
                        this.refDataService
                          .getPowerCableMasterDataCableArrangement(
                            selectedData.CONDUCTOR_TEMPERATURE
                          )
                          .subscribe((data) => {
                            this.cableArrangementList =
                              data.cableArrangementArray;
                            this.cableArrangementList.forEach((arrangement) => {
                              if (
                                arrangement.refId ==
                                  selectedData.CABLE_ARRANGEMENT_ID &&
                                this.getArrangementTypeControl
                              ) {
                                this.getArrangementTypeControl.setValue(
                                  arrangement
                                );

                                //Populate installation type
                                this.refDataService
                                  .getPowerCableMasterDataCableInstallationType(
                                    selectedData.CONDUCTOR_TEMPERATURE,
                                    arrangement.refId!
                                  )
                                  .subscribe((data) => {
                                    this.cableInstallationTypesList =
                                      data.cableIstallationTypeArray;
                                    this.cableInstallationTypesList.forEach(
                                      (installation) => {
                                        if (
                                          installation.refId ==
                                            selectedData.CABLE_INSTALLATION_TYPE_ID &&
                                          this.getInstallationTypeControl
                                        ) {
                                          this.getInstallationTypeControl.setValue(
                                            installation
                                          );

                                          //Populate installation method
                                          this.refDataService
                                            .getPowerCableMasterDataCableInstallationMethod(
                                              selectedData.CONDUCTOR_TEMPERATURE,
                                              arrangement.refId!,
                                              installation.refId!
                                            )
                                            .subscribe((data) => {
                                              this.cableInstallationMethodsList =
                                                data.cableIstallationMethodArray;
                                              this.cableInstallationMethodsList.forEach(
                                                (installationMethod) => {
                                                  if (
                                                    installationMethod.refId ==
                                                      selectedData.CABLE_INSTALLATION_METHOD_ID &&
                                                    this
                                                      .getInstallationMethodControl
                                                  ) {
                                                    if (
                                                      this
                                                        .cableInstallationMethodsList[0]
                                                        .value === ''
                                                    ) {
                                                      this.hideInsallationMethodDropdown =
                                                        true;

                                                      //Populate cross sectional area - when installation method value is 0
                                                      this.refDataService
                                                        .getPowerCableMasterDataCrossSectionalArea(
                                                          selectedData.CONDUCTOR_TEMPERATURE,
                                                          arrangement.refId!,
                                                          installation.refId!,
                                                          0
                                                        )
                                                        .subscribe((data) => {
                                                          this.cableCrossSectionalAreaList =
                                                            data.crossSectionalAreaArray;
                                                          this.cableCrossSectionalAreaList.forEach(
                                                            (
                                                              crossSection: any
                                                            ) => {
                                                              if (
                                                                crossSection.value ==
                                                                  selectedData.CROSS_SECTIONAL_AREA &&
                                                                this
                                                                  .getPowerCableCrossSectionalAreaControl
                                                              ) {
                                                                this.getPowerCableCrossSectionalAreaControl.setValue(
                                                                  crossSection
                                                                );

                                                                this.refDataService
                                                                  .getPowerCableMasterDataCurrentCarryingCapacity(
                                                                    selectedData.CONDUCTOR_TEMPERATURE,
                                                                    arrangement.refId!,
                                                                    installation.refId!,
                                                                    0,
                                                                    crossSection.value
                                                                  )
                                                                  .subscribe(
                                                                    (data) => {
                                                                      this.currentCarryingCapacityId =
                                                                        data.currentCarryingCapacity.id;
                                                                      this.currentCarryingCapacity =
                                                                        data.currentCarryingCapacity.CURRENT_CARRYING_CAPACITY;
                                                                      if (
                                                                        this
                                                                          .getPowerCableInsulationControl
                                                                          ?.value !=
                                                                        null
                                                                      ) {
                                                                        this.calculateMaxCurrent();
                                                                      }
                                                                      this.isGettingData =
                                                                        false;
                                                                    }
                                                                  );
                                                              }
                                                            }
                                                          );
                                                        });
                                                    } else {
                                                      this.hideInsallationMethodDropdown =
                                                        false;
                                                      this.getInstallationMethodControl.setValue(
                                                        installationMethod
                                                      );

                                                      //Populate cross sectional area - when installation method value is not equal to 0
                                                      this.refDataService
                                                        .getPowerCableMasterDataCrossSectionalArea(
                                                          selectedData.CONDUCTOR_TEMPERATURE,
                                                          arrangement.refId!,
                                                          installation.refId!,
                                                          installationMethod.refId!
                                                        )
                                                        .subscribe((data) => {
                                                          this.cableCrossSectionalAreaList =
                                                            data.crossSectionalAreaArray;
                                                          this.cableCrossSectionalAreaList.forEach(
                                                            (
                                                              crossSection: any
                                                            ) => {
                                                              if (
                                                                crossSection.value ==
                                                                  selectedData.CROSS_SECTIONAL_AREA &&
                                                                this
                                                                  .getPowerCableCrossSectionalAreaControl
                                                              ) {
                                                                this.getPowerCableCrossSectionalAreaControl.setValue(
                                                                  crossSection
                                                                );

                                                                this.refDataService
                                                                  .getPowerCableMasterDataCurrentCarryingCapacity(
                                                                    selectedData.CONDUCTOR_TEMPERATURE,
                                                                    arrangement.refId!,
                                                                    installation.refId!,
                                                                    installationMethod.refId!,
                                                                    crossSection.value!
                                                                  )
                                                                  .subscribe(
                                                                    (data) => {
                                                                      this.currentCarryingCapacityId =
                                                                        data.currentCarryingCapacity.id;
                                                                      this.currentCarryingCapacity =
                                                                        data.currentCarryingCapacity.CURRENT_CARRYING_CAPACITY;
                                                                      if (
                                                                        this
                                                                          .getPowerCableInsulationControl
                                                                          ?.value !=
                                                                        null
                                                                      ) {
                                                                        this.calculateMaxCurrent();
                                                                      }
                                                                      this.isGettingData =
                                                                        false;
                                                                    }
                                                                  );
                                                              }
                                                            }
                                                          );
                                                        });
                                                    }
                                                  }
                                                }
                                              );
                                            });
                                        }
                                      }
                                    );
                                  });
                              }
                            });
                          });
                      }
                    }
                  );
                }
              }
            });
          }

          //Populate input current, cable length, description
          this.getPowerCableDescriptionControl?.setValue(
            selectedData.DESCRIPTION
          );
          this.getPowerCableLengthControl?.setValue(selectedData.CABLE_LENGTH);
          this.getPowerCableInputCurrentControl?.setValue(
            selectedData.INPUT_CURRENT
          );
          break;
        case 2:
          if (this.busBarTypeList && this.busBarTypeList.length) {
            this.busBarTypeList.forEach((busBarType) => {
              if (
                busBarType.description == selectedData.busBarType &&
                this.getBusBarDataCrossSectionalTypeControl
              ) {
                this.getBusBarDataCrossSectionalTypeControl.setValue(
                  busBarType
                );

                this.isGettingData = true;
                this.refDataService
                  .getBusBarMasterData(busBarType.description)
                  .subscribe((data) => {
                    this.isGettingData = false;
                    this.hightAndThicknessList = data.sizeList;

                    if (
                      this.hightAndThicknessList &&
                      this.hightAndThicknessList.length
                    ) {
                      this.hightAndThicknessList.forEach(
                        (heightAndThickness) => {
                          if (
                            heightAndThickness.value ==
                              selectedData.heightAndThickness &&
                            this.getBusBarDataSizeControl
                          ) {
                            this.getBusBarDataSizeControl.setValue(
                              heightAndThickness
                            );
                          }
                        }
                      );
                    }
                  });
              }
            });
          }

          if (
            this.conductorTemperatureList &&
            this.conductorTemperatureList.length
          ) {
            this.conductorTemperatureList.forEach((conductorTemperature) => {
              if (
                conductorTemperature.temperature ==
                  selectedData.conductortemperature &&
                this.getBusBarDataConductorTemperatureControl
              ) {
                this.getBusBarDataConductorTemperatureControl.setValue(
                  conductorTemperature
                );
              }
            });
          }
          break;

        // patch switchgear dropdown
        case 3:
          // set manufacture value
          if (this.manufactureList && this.manufactureList.length) {
            this.manufactureList.forEach((manufacture) => {
              if (manufacture.value == selectedData.manufacture) {
                this.getSwitchgearDataManufactureControl?.setValue(manufacture);

                this.isGettingData = true;
                this.refDataService
                  .getSwitchGearTypesMasterData(selectedData.manufacture)
                  .subscribe((data) => {
                    this.isGettingData = false;
                    this.switchGearTypeList = data.typeArray;

                    if (
                      this.switchGearTypeList &&
                      this.switchGearTypeList.length
                    ) {
                      this.switchGearTypeList.forEach((type) => {
                        if (type.value == selectedData.type) {
                          this.getSwitchgearDataTypeControl?.setValue(type);

                          this.isGettingData = true;
                          this.refDataService
                            .getSwitchGearRangeMasterData(
                              selectedData.manufacture,
                              selectedData.type
                            )
                            .subscribe((data) => {
                              this.isGettingData = false;
                              this.switchGearRangeList = data.rangeArray;
                              if (
                                this.switchGearRangeList &&
                                this.switchGearRangeList.length
                              ) {
                                this.switchGearRangeList.forEach((range) => {
                                  if (range.value == selectedData.range) {
                                    this.getSwitchgearDataRangeControl?.setValue(
                                      range
                                    );

                                    this.isGettingData = true;
                                    this.refDataService
                                      .getSwitchGearModalMasterData(
                                        selectedData.manufacture,
                                        selectedData.type,
                                        selectedData.range
                                      )
                                      .subscribe((data) => {
                                        this.isGettingData = false;
                                        this.switchGearModalList =
                                          data.modelArray;
                                        if (
                                          this.switchGearModalList &&
                                          this.switchGearModalList.length
                                        ) {
                                          this.switchGearModalList.forEach(
                                            (modal) => {
                                              if (
                                                modal.value ==
                                                selectedData.modalName
                                              ) {
                                                this.getSwitchgearDataModalNameControl?.setValue(
                                                  modal
                                                );

                                                this.isGettingData = true;
                                                this.refDataService
                                                  .getSwitchGearMasterDataId(
                                                    selectedData.manufacture,
                                                    selectedData.type,
                                                    selectedData.range,
                                                    selectedData.modalName
                                                  )
                                                  .subscribe((data) => {
                                                    this.isGettingData = false;
                                                    this.switchGearRefDataId =
                                                      data.refDataSwitchgear.id;
                                                  });
                                              }
                                            }
                                          );
                                        }
                                      });
                                  }
                                });
                              }
                            });
                        }
                      });
                    }
                  });
              }
            });
          }
          break;
        case 4:
          if (
            this.cubicleOverviewMasterDataVM &&
            this.cubicleOverviewMasterDataVM.customerSwitchgearDataVMs
          ) {
            // set getCustomerSwitchgearDataFormModalNameControl value
            if (
              this.cubicleOverviewMasterDataVM.customerSwitchgearDataVMs
                .modalList &&
              this.cubicleOverviewMasterDataVM.customerSwitchgearDataVMs
                .modalList.length
            ) {
              this.cubicleOverviewMasterDataVM.customerSwitchgearDataVMs.modalList.forEach(
                (modalOption) => {
                  if (
                    modalOption.description == selectedData.model &&
                    this.customSwitchgearDataForm
                  ) {
                    this.customSwitchgearDataForm.setValue(modalOption);
                  }
                }
              );
            }
          }
          break;
        default:
          break;
      }
    }
  }

  updateData(index: number): void {
    this.isGettingData = true;
    switch (index) {
      case 0:
        this.createCubicleOverviewGeneralDataRequest();
        if (this.cubicleId == -1) {
          this.projectManagementService
            .createCubicleOverViewGeneralData(
              this.cubicleOverViewGeneralDataRequest
            )
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess && data.cubicleDataVM) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.router.navigate(['/cubicle-overview'], {
                  queryParams: {
                    cubicleId: btoa(data.cubicleDataVM.id.toLocaleString()),
                    projectId: btoa(this.projectId.toLocaleString()),
                    userId: btoa(this.projectCreatedUserId.toLocaleString()),
                  },
                });
                this.cubicleId = data.cubicleDataVM.id;
                this.hasCubicleMainData = true;
                this.showCubicleOverView = false;
                this.generateCubicleId(this.projectNo, this.cubicleId);
                this.getCubicleData(this.cubicleId).subscribe();
              }
            });
        } else {
          this.projectManagementService
            .editCubicleOverViewGeneralData(
              this.cubicleOverViewGeneralDataRequest
            )
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.showCubicleOverView = false;
                this.getCubicleData(this.cubicleId).subscribe();
              }
            });
        }
        break;

      case 1:
        this.createPowerCableRequest();
        //Create new power cable
        if (this.editDataId == -1) {
          this.projectManagementService
            .createCubicleOverViewPowerCable(this.powerCableDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddPowerCableModel = false;
                this.getPowerCableData();
              }
            });
        }
        //Edit cable
        else {
          const powerCableDataRequest = {
            cableId: this.cableId,
            description: this.getPowerCableDescriptionControl?.value,
            maximumCurrent: this.getPowerCableIMaxControl?.value,
            conductorTemperature:
              this.getPowerCableConductorTemperatureControl?.value.value,
            insulationCorrectionFactorId: this.insulationCorrectionFactorId,
            inputCurrent: this.getPowerCableInputCurrentControl?.value,
            cableLength: this.getPowerCableLengthControl?.value,
            currentCarryingCapacityId: this.currentCarryingCapacityId,
          };

          this.projectManagementService
            .editCubicleOverViewPowerCablelData(powerCableDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddPowerCableModel = false;
                this.getPowerCableData();
              }
            });
        }
        break;

      case 2:
        this.createBusBarDataRequest();
        if (this.editDataId == -1) {
          this.projectManagementService
            .createCubicleOverViewBusBarData(this.busBarDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddBusBarModel = false;
                this.getBusBarData();
              }
            });
        } else {
          this.projectManagementService
            .editCubicleOverViewBusBarData(this.busBarDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddBusBarModel = false;
                this.getBusBarData();
              }
            });
        }
        break;

      case 3:
        this.createSwitchgearDataRequest();
        if (this.editDataId == -1) {
          this.projectManagementService
            .createCubicleOverViewSwitchgearData(this.switchgearDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddSwitchgearModel = false;
                this.getSwitchGearData();
              }
            });
        } else {
          this.projectManagementService
            .editCubicleOverViewSwitchgearData(this.switchgearDataRequest)
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddSwitchgearModel = false;
                this.getSwitchGearData();
              }
            });
        }
        break;

      case 4:
        this.createCustomSwitchgearDataRequest();
        if (this.editDataId == -1) {
          this.projectManagementService
            .createubicleOverViewCustomSwitchgearData(
              this.customSwitchgearDataRequest
            )
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddCustomSwitchgearModel = false;
                this.getCustomSwitchGearData();
              }
            });
        } else {
          this.projectManagementService
            .editCubicleOverViewCustomSwitchgearData(
              this.customSwitchgearDataRequest
            )
            .subscribe((data) => {
              this.isGettingData = false;
              if (data && data.isSuccess) {
                this.messageService.add({
                  severity: data.message,
                  summary: data.message == 'success' ? 'Success ' : 'Warning',
                  detail: data.messageDetails,
                });
                this.isShowAddCustomSwitchgearModel = false;
                this.getCustomSwitchGearData();
              }
            });
        }
        break;

      default:
        break;
    }
  }

  createCubicleOverviewGeneralDataRequest(): void {
    this.cubicleOverViewGeneralDataRequest = {
      cubicleId: this.cubicleId,
      coolingSystem: this.getCoolingSystemControl?.value.description,
      horizontalSeparation: Number(
        this.getHorizontalSeparationControl?.value.description
      ),
      position: this.getPositionControl?.value.description,
      louverArea: Number(this.getLouverAreaControl?.value),
      height: Number(this.getHeightControl?.value),
      width: Number(this.getWidthControl?.value),
      depth: Number(this.getDepthControl?.value),
      targetTemperature: this.getTargetTemperatureControl?.value.temperature,
      projectId: this.projectId,
      coolingSystemId: this.getCoolingSystemControl?.value.id,
      positionId: this.getPositionControl?.value.id,
    };
  }

  createPowerCableRequest(): void {
    this.powerCableDataRequest = {
      projectId: this.projectId,
      cubicleId: this.cubicleId,
      description: this.getPowerCableDescriptionControl?.value,
      maximumCurrent: this.getPowerCableIMaxControl?.value,
      conductorTemperature:
        this.getPowerCableConductorTemperatureControl?.value.value,
      insulationCorrectionFactorId: this.insulationCorrectionFactorId,
      inputCurrent: this.getPowerCableInputCurrentControl?.value,
      cableLength: this.getPowerCableLengthControl?.value,
      currentCarryingCapacityId: this.currentCarryingCapacityId,
    };
  }

  createBusBarDataRequest(): void {
    this.busBarDataRequest = {
      busBarId: this.editDataId,
      description: this.getBusBarDataDescriptionControl?.value,
      busBarType:
        this.getBusBarDataCrossSectionalTypeControl?.value.description,
      inputCurrent: this.getBusBarDataInputCurrentControl?.value,
      busBarlength: Number(this.getBusBarDataLengthControl?.value),
      heightAndThickness: this.getBusBarDataSizeControl?.value.value,
      projectId: this.projectId,
      cubicleId: this.cubicleId,
      conductorTemperature:
        this.getBusBarDataConductorTemperatureControl?.value.temperature,
    };
  }

  createSwitchgearDataRequest(): void {
    this.switchgearDataRequest = {
      id: this.editDataId,
      manufacture: this.getSwitchgearDataManufactureControl?.value,
      type: this.getSwitchgearDataTypeControl?.value,
      range: this.getSwitchgearDataRangeControl?.value,
      modalName: this.getSwitchgearDataModalNameControl?.value,
      quantity: this.getSwitchgearDataQuantityControl?.value,
      rating: this.getSwitchgearDataRatingControl?.value,
      projectId: this.projectId,
      cubicleId: this.cubicleId,
      refSwitchGearId: this.switchGearRefDataId,
      operatingCurrent: this.getSwitchgearDataOperatingCurrentControl?.value,
    };
  }

  createCustomSwitchgearDataRequest(): void {
    this.customSwitchgearDataRequest = {
      customSwitchGearId: this.editDataId,
      manufacturer: this.getCustomSwitchgearDataFormManufactureControl?.value,
      model: this.getCustomSwitchgearDataFormModalNameControl?.value,
      quantity: this.getCustomSwitchgearDataFormQuantityControl?.value,
      rating: this.getCustomSwitchgearDataFormRatingControl?.value,
      unitPowerLoss:
        this.getCustomSwitchgearDataFormUnitPowerLossControl?.value,
      projectId: this.projectId,
      cubicleId: this.cubicleId,
    };
  }

  onCloseEditModal(): void {
    this.editDataId = -1;
    this.cubicleMainDataForm.reset();
    this.powerCableDataForm.reset();
    this.busBarDataForm.reset();
    this.switchgearDataForm.reset();
    this.customSwitchgearDataForm.reset();
  }

  onInsulationTypeChange(): void {
    if (
      this.currentCarryingCapacity != undefined &&
      this.getTargetTemperatureControl?.value != undefined
    ) {
      this.calculateMaxCurrent();
    }
  }

  getCubicleGeneralData(): void {
    this.isGettingData = true;
    this.projectManagementService
      .getCubicleDataByCubicleId(this.cubicleId)
      .subscribe((data) => {
        this.isGettingData = false;
        if (data && data.isSuccess && data.cubicleDataVM) {
          this.cubicleOverViewDataVm = data.cubicleDataVM;
        }
      });
  }

  getPowerCableData(): void {
    this.isGettingData = true;
    this.projectManagementService
      .getCubiclePowerCableDataByCubicleId(this.cubicleId)
      .subscribe((data) => {
        this.isGettingData = false;
        if (data && data.isSuccess) {
          this.powerCableDataVMs = data.cabledResponseDataVM.cableDataVMs;
          this.powerCableTotalPowerLoss =
            data.cabledResponseDataVM.totalPowerLoss;
        }
      });
  }

  getBusBarData(): void {
    this.isGettingData = true;
    this.projectManagementService
      .getCubicleBusBarDataByCubicleId(this.cubicleId)
      .subscribe((data) => {
        this.isGettingData = false;
        if (data && data.isSuccess) {
          this.busBarDataVMs = data.busbarResponseDataVM.busBarDataVMs;
          this.busBarTotalPowerLoss = data.busbarResponseDataVM.totalPowerLoss;
        }
      });
  }

  getSwitchGearData(): void {
    this.isGettingData = true;
    this.projectManagementService
      .getCubicleSwitchGearByCubicleId(this.cubicleId)
      .subscribe((data) => {
        this.isGettingData = false;
        if (data && data.isSuccess) {
          this.switchgearDataVMs =
            data.switchgearResponseDataVM.switchgearDataVMs;
          this.switchGearTotalPowerLoss =
            data.switchgearResponseDataVM.totalPowerLoss;
        }
      });
  }

  getCustomSwitchGearData(): void {
    this.isGettingData = true;
    this.projectManagementService
      .getCubicleCustomSwitchGearDataByCubicleId(this.cubicleId)
      .subscribe((data) => {
        this.isGettingData = false;
        if (data && data.isSuccess) {
          this.customSwitchgearDataVMs =
            data.customSwitchgearResponseDataVM.customSwitchgearDataVMs;
          this.customSwitchGearTotalPowerLoss =
            data.customSwitchgearResponseDataVM.totalPowerLoss;
        }
      });
  }

  getSizeListByBusbarType(event: any): void {
    this.hightAndThicknessList = [];
    if (event && event.value) {
      this.isGettingData = true;
      this.refDataService
        .getBusBarMasterData(event.value.description)
        .subscribe((data) => {
          this.isGettingData = false;
          this.hightAndThicknessList = data.sizeList;
        });
    }
  }

  getSwitchGearMasterData(step: number, event: any = null): void {
    this.switchGearRefDataId = -1;
    switch (step) {
      case 1:
        this.switchGearRefDataId = -1;
        this.switchGearModalList = [];
        this.switchGearRangeList = [];
        this.switchGearRangeList = [];
        this.isGettingData = true;
        this.refDataService
          .getSwitchGearManufactureMasterData()
          .subscribe((data) => {
            this.manufactureList = data.manufacturerArray;
            this.getPowerCableMasterData(1);
          });
        break;
      case 2:
        if (event && event.value) {
          this.switchGearRefDataId = -1;
          this.switchGearModalList = [];
          this.switchGearRangeList = [];
          this.isGettingData = true;
          this.refDataService
            .getSwitchGearTypesMasterData(event.value.value)
            .subscribe((data) => {
              this.isGettingData = false;
              this.switchGearTypeList = data.typeArray;
            });
        }
        break;
      case 3:
        if (event && event.value) {
          this.switchGearRefDataId = -1;
          this.switchGearModalList = [];
          this.isGettingData = true;
          this.refDataService
            .getSwitchGearRangeMasterData(
              this.getSwitchgearDataManufactureControl &&
                this.getSwitchgearDataManufactureControl.value
                ? this.getSwitchgearDataManufactureControl.value.value
                : null,
              event.value.value
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.switchGearRangeList = data.rangeArray;
            });
        }
        break;
      case 4:
        if (event && event.value) {
          this.switchGearRefDataId = -1;
          this.isGettingData = true;
          this.refDataService
            .getSwitchGearModalMasterData(
              this.getSwitchgearDataManufactureControl &&
                this.getSwitchgearDataManufactureControl.value
                ? this.getSwitchgearDataManufactureControl.value.value
                : null,
              this.getSwitchgearDataTypeControl &&
                this.getSwitchgearDataTypeControl.value
                ? this.getSwitchgearDataTypeControl.value.value
                : null,
              event.value.value
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.switchGearModalList = data.modelArray;
            });
        }
        break;
      case 5:
        if (event && event.value) {
          this.isGettingData = true;
          this.refDataService
            .getSwitchGearMasterDataId(
              this.getSwitchgearDataManufactureControl &&
                this.getSwitchgearDataManufactureControl.value
                ? this.getSwitchgearDataManufactureControl.value.value
                : null,
              this.getSwitchgearDataTypeControl &&
                this.getSwitchgearDataTypeControl.value
                ? this.getSwitchgearDataTypeControl.value.value
                : null,
              this.getSwitchgearDataRangeControl &&
                this.getSwitchgearDataRangeControl.value
                ? this.getSwitchgearDataRangeControl.value.value
                : null,
              event.value.value
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.switchGearRefDataId = data.refDataSwitchgear.id;
            });
        }
        break;
      default:
        break;
    }
  }

  getPowerCableMasterData(step: number, event: any = null): void {
    this.currentCarryingCapacityId = -1;
    switch (step) {
      case 1:
        this.powerCableConductorTemperatureList = [];
        this.cableArrangementList = [];
        this.cableInstallationTypesList = [];
        this.cableInstallationMethodsList = [];
        this.cableCrossSectionalAreaList = [];
        this.isGettingData = true;
        this.refDataService
          .getPowerCableMasterDataConductorTemp()
          .subscribe((data) => {
            this.isGettingData = false;
            this.powerCableConductorTemperatureList = data.conductorTempArray;
          });
        break;
      //when Conductor Temperature changes
      case 2:
        if (event && event.value) {
          this.powerCableDataForm.value.iMaxValue = '';
          this.cableArrangementList = [];
          this.cableInstallationTypesList = [];
          this.cableInstallationMethodsList = [];
          this.cableCrossSectionalAreaList = [];
          this.isGettingData = true;
          this.refDataService
            .getPowerCableMasterDataCableArrangement(event.value.value)
            .subscribe((data) => {
              this.isGettingData = false;
              this.cableArrangementList = data.cableArrangementArray;
            });
        }
        break;
      //when Arrangement Type changes
      case 3:
        if (event && event.value) {
          this.powerCableDataForm.value.iMaxValue = '';
          this.cableInstallationTypesList = [];
          this.cableInstallationMethodsList = [];
          this.cableCrossSectionalAreaList = [];
          this.isGettingData = true;
          this.refDataService
            .getPowerCableMasterDataCableInstallationType(
              this.getPowerCableConductorTemperatureControl &&
                this.getPowerCableConductorTemperatureControl.value
                ? this.getPowerCableConductorTemperatureControl.value.value
                : null,
              event.value.refId
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.cableInstallationTypesList = data.cableIstallationTypeArray;
            });
        }
        break;
      //when Installation Type changes
      case 4:
        if (event && event.value) {
          this.powerCableDataForm.value.iMaxValue = '';
          this.cableInstallationMethodsList = [];
          this.cableCrossSectionalAreaList = [];
          this.isGettingData = true;
          this.refDataService
            .getPowerCableMasterDataCableInstallationMethod(
              this.getPowerCableConductorTemperatureControl &&
                this.getPowerCableConductorTemperatureControl.value
                ? this.getPowerCableConductorTemperatureControl.value.value
                : null,
              this.getArrangementTypeControl &&
                this.getArrangementTypeControl.value
                ? this.getArrangementTypeControl.value.refId
                : null,
              event.value.refId
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.cableInstallationMethodsList =
                data.cableIstallationMethodArray;

              if (this.cableInstallationMethodsList[0].value === '') {
                this.hideInsallationMethodDropdown = true;
                this.cableCrossSectionalAreaList = [];
                this.isGettingData = true;
                this.refDataService
                  .getPowerCableMasterDataCrossSectionalArea(
                    this.getPowerCableConductorTemperatureControl &&
                      this.getPowerCableConductorTemperatureControl.value
                      ? this.getPowerCableConductorTemperatureControl.value
                          .value
                      : null,
                    this.getArrangementTypeControl &&
                      this.getArrangementTypeControl.value
                      ? this.getArrangementTypeControl.value.refId
                      : null,
                    this.getInstallationTypeControl &&
                      this.getInstallationTypeControl.value
                      ? this.getInstallationTypeControl.value.refId
                      : null,
                    0
                  )
                  .subscribe((data) => {
                    this.isGettingData = false;
                    this.cableCrossSectionalAreaList =
                      data.crossSectionalAreaArray;
                  });
              } else {
                this.hideInsallationMethodDropdown = false;
              }
            });
        }
        break;
      //when Installation Method changes
      case 5:
        if (event && event.value) {
          this.powerCableDataForm.value.iMaxValue = '';
          this.cableCrossSectionalAreaList = [];
          this.isGettingData = true;
          this.refDataService
            .getPowerCableMasterDataCrossSectionalArea(
              this.getPowerCableConductorTemperatureControl &&
                this.getPowerCableConductorTemperatureControl.value
                ? this.getPowerCableConductorTemperatureControl.value.value
                : null,
              this.getArrangementTypeControl &&
                this.getArrangementTypeControl.value
                ? this.getArrangementTypeControl.value.refId
                : null,
              this.getInstallationTypeControl &&
                this.getInstallationTypeControl.value
                ? this.getInstallationTypeControl.value.refId
                : null,
              event.value.refId
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.cableCrossSectionalAreaList = data.crossSectionalAreaArray;
            });
        }
        break;
      //when Cross section changes
      case 6:
        if (event && event.value) {
          this.powerCableDataForm.value.iMaxValue = '';
          this.isGettingData = true;
          this.refDataService
            .getPowerCableMasterDataCurrentCarryingCapacity(
              this.getPowerCableConductorTemperatureControl &&
                this.getPowerCableConductorTemperatureControl.value
                ? this.getPowerCableConductorTemperatureControl.value.value
                : null,
              this.getArrangementTypeControl &&
                this.getArrangementTypeControl.value
                ? this.getArrangementTypeControl.value.refId
                : null,
              this.getInstallationTypeControl &&
                this.getInstallationTypeControl.value
                ? this.getInstallationTypeControl.value.refId
                : null,
              this.getInstallationMethodControl &&
                this.getInstallationMethodControl.value
                ? this.getInstallationMethodControl.value.refId
                : 0,
              event.value.value
            )
            .subscribe((data) => {
              this.isGettingData = false;
              this.currentCarryingCapacityId = data.currentCarryingCapacity.id;
              this.currentCarryingCapacity =
                data.currentCarryingCapacity.CURRENT_CARRYING_CAPACITY;

              this.calculateMaxCurrent();
            });
        }
        break;
      default:
        break;
    }
  }

  calculateMaxCurrent(): void {
    if (
      this.getPowerCableInsulationControl?.value.id &&
      this.targetTemp != null
    ) {
      const maximumCurrentRequest = {
        cableInsulationId: this.getPowerCableInsulationControl?.value.id,
        targetTemperature: this.targetTemp,
        currentCarryingCapacity: this.currentCarryingCapacity,
      };
      this.refDataService
        .powerCablecalculateMaximumCurrent(maximumCurrentRequest)
        .subscribe((data) => {
          if (this.getPowerCableIMaxControl) {
            if (this.powerCableDataForm.value.iMaxValue === '') {
              this.getPowerCableIMaxControl.setValue(data.maxCurrent);
            }
            this.insulationCorrectionFactorId =
              data.insulationCorrectionFactor?.id;
          }
        });
    }
  }

  navigateToViewReport(): void {
    this.getCubicleData(this.cubicleId).subscribe((canGenerateReport) => {
      if (canGenerateReport) {
        const queryParams = {
          cubicleId: btoa(this.cubicleId.toLocaleString()),
        };
        this.router.navigate(['/report'], { queryParams });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error !',
          detail:
            'Please ensure that you include data for at least one of the following: Power cable, Busbar or Switchgear, in order to generate the report.',
        });
      }
    });
  }

  addAnotherCubicle(): void {
    const id: number = -1;
    const queryParams = {
      cubicleId: btoa(id.toLocaleString()),
      projectId: btoa(this.projectId.toLocaleString()),
      userId: btoa(this.projectCreatedUserId.toLocaleString())
    };
  
    // Combine current URL with the updated query parameters
    const urlWithParams = this.router.createUrlTree(['/cubicle-overview'], {
      queryParams,
      queryParamsHandling: 'merge'
    }).toString();
  
    // Refresh the page
    window.location.href = urlWithParams;
  }
  
}
