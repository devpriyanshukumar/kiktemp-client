import { BaseResponse } from "../common";
import { ProjectIdDataVM } from "./project.id.data.vm";

export interface ProjectIdResponse extends BaseResponse {
    projectIdDataVM?: ProjectIdDataVM
}