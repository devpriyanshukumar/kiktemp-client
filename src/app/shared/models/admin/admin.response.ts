import { BaseResponse } from "../common";
import { signupRequestListResponseDataVM } from "./admin.response.data.vm";

export interface signupRequestListResponse extends BaseResponse {
    signupRequestListResponseDataVM?: signupRequestListResponseDataVM;
}
