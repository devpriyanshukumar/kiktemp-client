import { BaseResponse, CommonResponseDataVM } from "../common";

export interface SuspendRemoveUserResponse extends BaseResponse{
    suspendRemoveUserResponseDataVM ?: CommonResponseDataVM;
}