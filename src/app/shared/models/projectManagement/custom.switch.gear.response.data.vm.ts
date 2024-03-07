import { CustomSwitchgearDataVM } from "./custom.switchgear.data.vm";

export interface CustomSwitchGearResponseDataVM {
    count ?: number;
    totalPowerLoss ?: number;
    customSwitchgearDataVMs ?: CustomSwitchgearDataVM[];
}