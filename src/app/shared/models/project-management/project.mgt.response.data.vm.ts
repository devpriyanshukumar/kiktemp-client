export interface PastProjectDetailsResponseDataVM {
    searchResultDataVM?: ProjectDetailsVM,
    totalResults?: number
}

export interface ProjectDetailsVM {
    CREATED_DATE?: string,
    PROJECT_ID?: number,
    PROJECT_NAME?: string,
    ELEVATION?: string,
    DEMAND_FACTOR?: string,
    AMBIENT_TEMP?: string,
    INSTALLATION_TYPE_ID?: number,
    INSTALLATION_TYPE?: string,
    USER_ID?: number,
    NAME?: string,
    USER_TYPE?: string,
    STATUS?: string,
    ORGANIZATION_NAME?: string,
    PARENT_ID?: number,
    PARENT_NAME?: string,
    PARENT_USER_TYPE?: string,
    PARENT_STATUS?: string,
    PARENT_ORGANIZATION_NAME?: string,
    COUNT?: number
}