import { BaseResponse } from "../common";
import { ResetPasswordResponseDataVM } from "./reset-password.response.data.vm";

export interface ResetPasswordResponse extends BaseResponse {
  resetPasswordResponseDataVM?: ResetPasswordResponseDataVM;
}
