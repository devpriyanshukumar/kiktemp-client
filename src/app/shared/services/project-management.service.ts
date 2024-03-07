import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { BaseResponse, BusBarDataResponse, BusBarDataVM, CubicleOverViewDataResponse, CubicleOverViewGeneralDataVM, CubicleOverviewMasterDataResponse, CustomSwitchgearDataResponse, CustomSwitchgearDataVM, PowerCableDataResponse, PowerCableDataVM, ProjectDataVM, ProjectIdResponse, SwitchgearDataResponse, SwitchgearDataVM } from '../models';
import { Observable } from 'rxjs';
import { ProjectDataResponse } from '../models/projectManagement/project.data.response';
import { PastProjectDetailsResponse, RemoveProjectRequest, RemoveProjectResponse, TempRiseCalculationRequest, TempRiseCalculationResponse } from '../models/project-management';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  createNewProjectAsync(newProjectRequestDataVM: ProjectDataVM): Observable<ProjectIdResponse> {
    return this.apiService.post<ProjectIdResponse>(`${this.getPath()}create-new-project-async`, newProjectRequestDataVM);
  }

  getProjectDataByProjectIdAsync(projectId: number, userId: number): Observable<ProjectDataResponse> {
    return this.apiService.get<ProjectDataResponse>(`${this.getPath()}get-project-data-by-project-id-async?userId=${userId}&projectId=${projectId}`);
  }

  updateProjectData(projectData: ProjectDataVM): Observable<ProjectDataResponse> {
    return this.apiService.post<ProjectIdResponse>(`${this.getPath()}update-project-data-by-project-id-async`, projectData)
  }

  getCubicleDataByCubicleId(cubicleId: number): Observable<CubicleOverViewDataResponse> {
    return this.apiService.get<CubicleOverViewDataResponse>(`${this.getPath()}get-cubicle-data?cubicleId=${cubicleId}`)
    // return this.apiService.get<CubicleOverviewMasterDataResponse>(`${this.getPath()}get-cubicle-overview-data?cubicleId=${cubicleId}`);
  }

  getCubiclePowerCableDataByCubicleId(cubicleId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-cubicle-power-cables?cubicleId=${cubicleId}`)
    // return this.apiService.get<CubicleOverviewMasterDataResponse>(`${this.getPath()}get-cubicle-overview-data?cubicleId=${cubicleId}`);
  }

  getCubicleBusBarDataByCubicleId(cubicleId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-cubicle-bus-bars?cubicleId=${cubicleId}`)
    // return this.apiService.get<CubicleOverviewMasterDataResponse>(`${this.getPath()}get-cubicle-overview-data?cubicleId=${cubicleId}`);
  }

  getCubicleSwitchGearByCubicleId(cubicleId: number = 1): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-cubicle-switchgears?cubicleId=${cubicleId}`)
    // return this.apiService.get<CubicleOverviewMasterDataResponse>(`${this.getPath()}get-cubicle-overview-data?cubicleId=${cubicleId}`);
  }

  getCubicleCustomSwitchGearDataByCubicleId(cubicleId: number = 1): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-cubicle-custom-switchgears?cubicleId=${cubicleId}`)
    // return this.apiService.get<CubicleOverviewMasterDataResponse>(`${this.getPath()}get-cubicle-overview-data?cubicleId=${cubicleId}`);
  }

  getCubicleOverviewMasterData(): Observable<CubicleOverviewMasterDataResponse> {
    return this.apiService.get<PowerCableDataResponse>(`${window.location.origin}/assets/mocks/cubicleOverviewMasterData.json`);
  }

  createCubicleOverViewGeneralData(cubicleOverViewGeneralDataRequest: CubicleOverViewGeneralDataVM): Observable<any> {
    return this.apiService.post<any>(`${this.getPath()}create-cubicle`, cubicleOverViewGeneralDataRequest);
  }

  editCubicleOverViewGeneralData(cubicleOverViewGeneralDataRequest: CubicleOverViewGeneralDataVM): Observable<any> {
    return this.apiService.put<any>(`${this.getPath()}edit-cubicle`, cubicleOverViewGeneralDataRequest);
  }

  createCubicleOverViewPowerCable(powerCableDataRequest: PowerCableDataVM): Observable<PowerCableDataResponse> {
    return this.apiService.post<PowerCableDataResponse>(`${this.getPath()}create-cubicle-power-cable`, powerCableDataRequest);
  }

  editCubicleOverViewPowerCablelData(powerCableDataRequest: PowerCableDataVM): Observable<PowerCableDataResponse> {
    return this.apiService.put<PowerCableDataResponse>(`${this.getPath()}edit-cubicle-power-cable`, powerCableDataRequest);
  }

  createCubicleOverViewBusBarData(busBarDataRequest: BusBarDataVM): Observable<BusBarDataResponse> {
    return this.apiService.post<BusBarDataResponse>(`${this.getPath()}create-cubicle-bus-bar`, busBarDataRequest);
  }

  editCubicleOverViewBusBarData(busBarDataRequest: BusBarDataVM): Observable<BusBarDataResponse> {
    return this.apiService.put<BusBarDataResponse>(`${this.getPath()}edit-cubicle-bus-bar`, busBarDataRequest);
  }

  createCubicleOverViewSwitchgearData(switchgearDataRequest: SwitchgearDataVM): Observable<SwitchgearDataResponse> {
    return this.apiService.post<SwitchgearDataResponse>(`${this.getPath()}create-cubicle-switchgear`, switchgearDataRequest);
  }

  editCubicleOverViewSwitchgearData(switchgearDataRequest: SwitchgearDataVM): Observable<SwitchgearDataResponse> {
    return this.apiService.put<SwitchgearDataResponse>(`${this.getPath()}edit-cubicle-switchgear`, switchgearDataRequest);
  }

  createubicleOverViewCustomSwitchgearData(customSwitchgearDataRequest: CustomSwitchgearDataVM): Observable<CustomSwitchgearDataResponse> {
    return this.apiService.post<CustomSwitchgearDataResponse>(`${this.getPath()}create-cubicle-custom-switchgear`, customSwitchgearDataRequest);
  }

  editCubicleOverViewCustomSwitchgearData(customSwitchgearDataRequest: CustomSwitchgearDataVM): Observable<CustomSwitchgearDataResponse> {
    return this.apiService.put<CustomSwitchgearDataResponse>(`${this.getPath()}edit-cubicle-custom-switchgear`, customSwitchgearDataRequest);
  }

  deletePowerCablelData(dataId: number): Observable<BaseResponse> {
    return this.apiService.delete<BaseResponse>(`${this.getPath()}delete-cubicle-power-cable?cableId=${dataId}`);
  }

  deleteBusBarData(dataId: number, projectId: number): Observable<BaseResponse> {
    return this.apiService.delete<BaseResponse>(`${this.getPath()}delete-cubicle-bus-bar?busBarId=${dataId}&projectId=${projectId}`);
  }

  deleteSwitchgearData(dataId: number): Observable<BaseResponse> {
    return this.apiService.delete<BaseResponse>(`${this.getPath()}delete-cubicle-switchgear?switchGearId=${dataId}`);
  }

  deleteCustomSwitchgearData(dataId: number): Observable<BaseResponse> {
    return this.apiService.delete<BaseResponse>(`${this.getPath()}delete-cubicle-custom-switchgear?customSwitchGearId=${dataId}`);
  }

  getProjectDetails(userType: string, userId: number, tabName: string, pageNo: number, searchString: string): Observable<PastProjectDetailsResponse> {
    return this.apiService.get<PastProjectDetailsResponse>(`${this.getPath()}search-project?userType=${userType}&userId=${userId}&tabName=${tabName}&pageNo=${pageNo}&searchString=${searchString}`);
  }

  removeProject(removeProjectRequest: RemoveProjectRequest): Observable<RemoveProjectResponse> {
    return this.apiService.post<RemoveProjectResponse>(`${this.getPath()}remove-project`, removeProjectRequest);
  }

  calculateTempRise(tempRiseRequest: TempRiseCalculationRequest): Observable<TempRiseCalculationResponse> {
    return this.apiService.post<TempRiseCalculationResponse>(`${this.getPath()}calculate-temp-rise`, tempRiseRequest);
  }

  deleteCubicle(id: number): Observable<any> {
    return this.apiService.delete<any>(`${this.getPath()}delete-cubicle?CubicleId=${id}`);
  }
}
