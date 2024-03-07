import { BaseResponse } from "../common";
import { ProjectDataVM } from "./project.data.vm";

export interface ProjectDataResponse extends BaseResponse {
    projectDataVM ?: ProjectDataVM;
}