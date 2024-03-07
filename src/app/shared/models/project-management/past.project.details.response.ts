import { BaseResponse } from "../common";
import { PastProjectDetailsResponseDataVM } from "./project.mgt.response.data.vm";

export interface PastProjectDetailsResponse extends BaseResponse {
    projectSearchResponseDataVM?: PastProjectDetailsResponseDataVM;
}
