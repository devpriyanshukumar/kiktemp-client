import { BusBarDataVM } from "./bus.bar.data.vm";
import { BusBarResponseDataVM } from "./bus.bar.response.data.vm";
import { CubicleOverViewGeneralDataVM } from "./cubicle.overview.general.data.vm";
import { CustomSwitchGearResponseDataVM } from "./custom.switch.gear.response.data.vm";
import { CustomSwitchgearDataVM } from "./custom.switchgear.data.vm";
import { PowerCableDataVM } from "./power.cable.data.vm";
import { PowerCableResponseDataVM } from "./power.cable.resonse.data.vm";
import { SwitchGearDataResponseDataVM } from "./switch.gear.response.data.vm";
import { SwitchgearDataVM } from "./switchgear.data.vm";

export interface CubicleOverviewDataVM {
    cubicleOverViewGeneralDataVM ?: CubicleOverViewGeneralDataVM;
    powerCabledData?: PowerCableResponseDataVM;
    busBarData?: BusBarResponseDataVM;
    switchgearData?: SwitchGearDataResponseDataVM;
    customSwitchgearData?: CustomSwitchGearResponseDataVM;
    projectId?: number;
    projectNo?: string;
    cubicleId?: number;
}