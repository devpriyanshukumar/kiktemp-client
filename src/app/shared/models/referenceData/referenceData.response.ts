import { BaseResponse } from "../common";
import { MatchedRouteResponseDataVM } from "./referenceData.response.data.vm";
import { InstallationTypesResponseDataVM } from "./referenceData.response.data.vm";

export interface MatchedRouteResponse extends BaseResponse {
  MatchedRouteResponseDataVM?: MatchedRouteResponseDataVM;
}

// Blueprint
export interface InstallationTypesResponse extends BaseResponse{
  InstallationTypesResponseDataVM?: InstallationTypesResponseDataVM;
}
