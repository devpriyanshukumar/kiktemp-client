import { BaseRequest } from "../common";
import { UserSearchRequestDataVM } from "./user.search.request.data.vm";

export interface UserSearchRequest extends BaseRequest {
  UserSearchRequestDataVM?: UserSearchRequestDataVM;
}
