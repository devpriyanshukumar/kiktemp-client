import { BaseResponse } from "../common";
import { CustomSwitchgearDataVM } from "./custom.switchgear.data.vm";

export interface CustomSwitchgearDataResponse extends BaseResponse {
    customSwitchgearDataVMs?: CustomSwitchgearDataVM[];
}