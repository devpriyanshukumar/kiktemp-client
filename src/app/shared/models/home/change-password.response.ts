import { BaseResponse } from "../common";
import { ChangePasswordResponseDataVM } from "./change-password.response.data.vm";

export interface ChangePasswordResponse extends BaseResponse {
  changePasswordResponseDataVM?: ChangePasswordResponseDataVM;
}
