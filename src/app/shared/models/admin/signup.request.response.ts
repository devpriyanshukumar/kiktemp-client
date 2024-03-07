import { BaseResponse } from "../common";
import { SignupRequestDataVM } from "./signup.request.data.vm";

export interface SignupRequestResponse extends BaseResponse{
    signupRequestDataVM ?: SignupRequestDataVM;
}