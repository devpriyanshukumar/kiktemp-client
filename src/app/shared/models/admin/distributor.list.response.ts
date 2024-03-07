import { BaseResponse } from "../common";
import { distributorListResponseDataVM } from "./admin.response.data.vm";

export interface DistributorListResponse extends BaseResponse {
    distributorListResponseDataVM?: distributorListResponseDataVM;
}