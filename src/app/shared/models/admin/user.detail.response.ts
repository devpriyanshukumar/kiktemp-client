import { BaseResponse } from "../common";
import { userDataVM } from "./admin.response.data.vm";

export interface userDetailResponse extends BaseResponse {
    userDetailVM?: userDataVM;
}