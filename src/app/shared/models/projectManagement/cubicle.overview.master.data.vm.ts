import { BusBarMasterData } from "./bus.bar.master.data.vm";
import { CubicleOverviewGenaralDetailMasterDataVM } from "./cubicle.overview.general.detail.master.data.vm";
import { SwitchgearMasterDataVM } from "./switchgear.master.data.vm";

export interface CubicleOverviewMasterDataVM {
    cubicleOverviewGenaralDetailMasterDataVMs?: CubicleOverviewGenaralDetailMasterDataVM; 
    busBarMasterDataVMs?: BusBarMasterData;
    powerCableMasterDataVMs?: BusBarMasterData;
    switchgearMasterDataVMs?: SwitchgearMasterDataVM;
    customerSwitchgearDataVMs?: SwitchgearMasterDataVM;
}