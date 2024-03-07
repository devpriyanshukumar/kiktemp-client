import { BusBarDataVM } from "./bus.bar.data.vm";

export interface BusBarResponseDataVM {
    count ?: number;
    totalPowerLoss ?: number;
    busBarDataVMs ?: BusBarDataVM[];
}