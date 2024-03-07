import { BaseResponse } from "../common";
import { SwitchgearDataVM } from "./switchgear.data.vm";

export interface SwitchgearDataResponse extends BaseResponse {
    switchgearDataVMs?: SwitchgearDataVM[];
}