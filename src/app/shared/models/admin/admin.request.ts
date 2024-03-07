import { BaseRequest } from "../common";
import { signupRequestListRequestDataVM } from "./admin.request.data.vm";

export interface signupRequestListRequest extends BaseRequest {
  signupRequestListRequestDataVM?: signupRequestListRequestDataVM;
}
