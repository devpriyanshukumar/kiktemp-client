export interface TempRiseCalculationResponse {
    reportData?: ReportDataVM;
    linearGraph?: LinearGraphDataVM;
    curvedGraph?: CurvedGraphDataVM;
    finalTemp?: number;
}
export interface ReportDataVM {
    cubicleId?: number;
    createdDate?: string;
    customerName?: string;
    projectNo?: string;
    projectName?: string;
    cubiclePosition?: string;
    installationType?: string;
    horizontalPartitions?: number;
    height?: number;
    width?: number;
    depth?: number;
    effectiveCoolingSurface?: EffectiveCoolingSurfaceDataVM;
    effectiveArea?: number;
    f?: number;
    g?: number;
    airInletOpenings?: number;
    k?: number;
    d?: number;
    powerloss?: number;
    px?: number;
    t50?: number;
    c?: number;
    t100?: number;
}
export interface EffectiveCoolingSurfaceDataVM {
    top?: DimensionDataVM;
    left?: DimensionDataVM;
    right?: DimensionDataVM;
    back?: DimensionDataVM;
    front?: DimensionDataVM;
}
export interface DimensionDataVM {
    dimension?: string;
    area?: number;
    surfaceFactor?: number;
    effectiveArea?: number;
}
export interface TempRiseCalculationResponseDataVM {
    linearGraph?: LinearGraphDataVM;
    curvedGraph?: CurvedGraphDataVM;
    finalTemp?: number;
}

export interface CurvedGraphDataVM {
    gr?: number;
    b?: number;
    c?: number;
}

export interface LinearGraphDataVM {
    coefficients?: LinearCoefficientsDataVM;
    points?: LinearPointsDataVM;
}

export interface LinearCoefficientsDataVM {
    d?: number;
    e?: number;
}

export interface LinearPointsDataVM {
    xValues?: number[];
    yValues?: number[];
}
