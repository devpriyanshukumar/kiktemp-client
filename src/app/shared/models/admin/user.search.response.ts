import { BaseResponse } from "../common";
import { userSearchResponseDataVM } from "./admin.response.data.vm";

export interface UserSearchResponse extends BaseResponse {
    userSearchResponseDataVM?: userSearchResponseDataVM;
}