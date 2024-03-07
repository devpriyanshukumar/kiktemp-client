import { BaseResponse } from "../common";
import { CubicleOverviewMasterDataVM } from "./cubicle.overview.master.data.vm";

export interface CubicleOverviewMasterDataResponse extends BaseResponse {
    cubicleOverviewMasterDataVM?: CubicleOverviewMasterDataVM;
}