import { BaseResponse } from "../common";
import { LoginResponseDataVM } from "./login.response.data.vm";

export interface LoginResponse extends BaseResponse {
  loginResponseDataVM?: LoginResponseDataVM;
}
