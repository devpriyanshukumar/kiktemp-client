import { PowerCableDataVM } from "./power.cable.data.vm";

export interface PowerCableResponseDataVM {
    count ?: number;
    totalPowerLoss ?: number;
    powerCabledDataVMs ?: PowerCableDataVM[];
}