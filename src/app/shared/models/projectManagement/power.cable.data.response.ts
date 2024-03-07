import { BaseResponse } from "../common";
import { PowerCableDataVM } from "./power.cable.data.vm";

export interface PowerCableDataResponse extends BaseResponse {
    powerCableDataVMs?: PowerCableDataVM[];
}