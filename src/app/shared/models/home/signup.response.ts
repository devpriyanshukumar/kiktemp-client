import { BaseResponse } from "../common";
import { signupRequestResponseDataVM } from "./signup.response.data.vm";

export interface signupReqResponse extends BaseResponse {
  signupRequestResponseDataVM?: signupRequestResponseDataVM;
}
