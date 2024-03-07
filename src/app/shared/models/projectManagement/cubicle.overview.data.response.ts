import { BaseResponse } from "../common";
import { CubicleOverviewDataVM } from "./cubicle.overview.data.vm";

export interface CubicleOverViewDataResponse extends BaseResponse {
    cubicleDataVM?: CubicleOverviewDataVM;
}