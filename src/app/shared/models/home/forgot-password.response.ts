import { BaseResponse } from "../common";
import { ForgotPasswordResponseDataVM } from "./forgot-password.response.data.vm";

export interface ForgotPasswordResponse extends BaseResponse {
  forgotPasswordResponseDataVM?: ForgotPasswordResponseDataVM;
}
