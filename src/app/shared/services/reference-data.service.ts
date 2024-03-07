import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { InstallationTypesResponse } from '../models/referenceData';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  constructor(
    private apiService: ApiService,
    private configService: ConfigService
  ) { }

  getPath(): string {
    return this.configService.getConfig()['apiURL'];
  }

  getRefMasterData(categoryArray: any): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-ref-data?categoryArray=${categoryArray}`);
  }

  getBusBarMasterData(type: any): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-bus-bar-cross-section-list?busBarType=${type}`);
  }

  getSwitchGearManufactureMasterData(): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-switch-gear-data`);
  }

  getSwitchGearTypesMasterData(manufacture: string): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-switch-gear-data?manufacturer=${manufacture}`);
  }

  getSwitchGearRangeMasterData(manufacture: string, type: string): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-switch-gear-data?manufacturer=${manufacture}&type=${type}`);
  }

  getSwitchGearModalMasterData(manufacture: string, type: string, range: string): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-switch-gear-data?manufacturer=${manufacture}&type=${type}&range=${range}`);
  }

  getSwitchGearMasterDataId(manufacture: string, type: string, range: string, model: string): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-switch-gear-data?manufacturer=${manufacture}&type=${type}&range=${range}&model=${model}`);
  }

  getPowerCableMasterDataConductorTemp(): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data`);
  }

  getPowerCableMasterDataCableArrangement(conductorTemperature: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data?conductorTemperature=${conductorTemperature}`);
  }

  getPowerCableMasterDataCableInstallationType(conductorTemperature: number, cableArrangementId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data?conductorTemperature=${conductorTemperature}&cableArrangementId=${cableArrangementId}`);
  }

  getPowerCableMasterDataCableInstallationMethod(conductorTemperature: number, cableArrangementId: number, cableIstallationTypeId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data?conductorTemperature=${conductorTemperature}&cableArrangementId=${cableArrangementId}&cableIstallationTypeId=${cableIstallationTypeId}`);
  }

  getPowerCableMasterDataCrossSectionalArea(conductorTemperature: number, cableArrangementId: number, cableIstallationTypeId: number, cableIstallationMethodId: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data?conductorTemperature=${conductorTemperature}&cableArrangementId=${cableArrangementId}&cableIstallationTypeId=${cableIstallationTypeId}&cableIstallationMethodId=${cableIstallationMethodId}`);
  }

  getPowerCableMasterDataCurrentCarryingCapacity(conductorTemperature: number, cableArrangementId: number, cableIstallationTypeId: number, cableIstallationMethodId: number, crossSectionalArea: number): Observable<any> {
    return this.apiService.get<any>(`${this.getPath()}get-current-carrying-capacity-data?conductorTemperature=${conductorTemperature}&cableArrangementId=${cableArrangementId}&cableIstallationTypeId=${cableIstallationTypeId}&cableIstallationMethodId=${cableIstallationMethodId}&crossSectionalArea=${crossSectionalArea}`);
  }

  powerCablecalculateMaximumCurrent(maxCurrentRequest : any): Observable<any> {
    return this.apiService.post<any>(`${this.getPath()}calculate-maximum-current`, maxCurrentRequest)
  }
}