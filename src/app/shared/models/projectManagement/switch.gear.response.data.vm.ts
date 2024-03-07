import { SwitchgearDataVM } from "./switchgear.data.vm";

export interface SwitchGearDataResponseDataVM {
    count ?: number;
    totalPowerLoss ?: number;
    switchgearDataVMs ?: SwitchgearDataVM[];
}