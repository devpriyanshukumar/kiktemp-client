import { BaseRequest } from "../common";
import { ForgotPasswordRequestDataVM } from "./forgot-password.request.data.vm";

export interface ForgotPasswordRequest {
  forgotPasswordRequestDataVM?: ForgotPasswordRequestDataVM;
}
