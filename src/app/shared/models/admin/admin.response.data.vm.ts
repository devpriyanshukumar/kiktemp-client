export interface signupRequestListResponseDataVM {
  signupRequests?: signupRequestsVM,
  totalRequests?: number,
}

export interface signupRequestsVM {
  REQUESTED_DATE?: string,
  USER_ID?: number,
  EMAIL?: string,
  NAME?: string,
  USER_TYPE?: string,
  STATUS?: string,
  COUNTRY?: string,
  PHONE_NUMBER?: string,
  ORGANIZATION_NAME?: string,
  WEBSITE?: string,
  COUNT?: number
}
export interface userSearchResponseDataVM {
  searchResultDataVM?: userDataVM,
  totalResults?: number,
}
export interface userDataVM {
  JOINED_DATE?: string,
  CHILD_USER_ID?: number,
  CHILD_EMAIL?: string,
  CHILD_NAME?: string,
  CHILD_USER_TYPE?: string,
  CHILD_STATUS?: string,
  CHILD_COUNTRY?: string,
  CHILD_PHONE_NUMBER?: string,
  CHILD_ORGANIZATION?: string,
  CHILD_WEBSITE?: string,
  PARENT_USER_ID?: number,
  PARENT_EMAIL?: string,
  PARENT_NAME?: string,
  PARENT_USER_TYPE?: string,
  PARENT_STATUS?: string,
  PARENT_COUNTRY?: string,
  PARENT_PHONE_NUMBER?: string,
  PARENT_ORGANIZATION?: string,
  PARENT_WEBSITE?: string,
  COUNT?: number
}