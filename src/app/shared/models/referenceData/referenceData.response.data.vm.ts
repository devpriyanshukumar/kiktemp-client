export interface MatchedRouteResponseDataVM {
  matchedRoutes?: matchedRoutesVM
}

export interface matchedRoutesVM {
  map(arg0: (obj: any) => any): any[]
  id?: number, 
  FEATURE_ID?: number,
  FEATURE?: string, 
  ROUTER_PATH?: string, 
  PARENT_FEATURE?: string, 
  ICON?: string, 
  USER_TYPE_ID?: number, 
  USER_TYPE?: string, 
  USER_TYPE_STRING?: string
}

export interface InstallationTypesResponseDataVM {
  id?: number,
  installationType?: string
}
