import ReleaseModel from "../../../settings/InnovationCadenceView/ReleaseModel";
import FTEModel from "../../FTEModel";
import RunwayRowModel from "./RunwayRow/RunwayRowModel";

export default interface RRMTableModel {
    runwayRowList: RunwayRowModel[];
    releases: ReleaseModel[];
    handleClick: any;
    showBGList: string[];
    showRunwayList: string[];
    handleInputFieldBlurEvent: any;
    fteList: FTEModel[];
    isFTEEditable: boolean;
    isPercentageView: boolean;
    isRunwayOverAllocated: boolean;
    handleAddNotes: any;
}