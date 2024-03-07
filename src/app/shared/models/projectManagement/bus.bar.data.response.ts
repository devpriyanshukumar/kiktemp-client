import { BaseResponse } from "../common";
import { BusBarDataVM } from "./bus.bar.data.vm";

export interface BusBarDataResponse extends BaseResponse {
    busBarDataVMs?: BusBarDataVM[];
}