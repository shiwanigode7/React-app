import { SlidesModel } from "../../../interfaces/InnovationInterface"
import { BusinessGoalType } from "../../MPLView";
export interface SlidesChapterModel {
    businessGoalName: string;
    slides: SlidesModel[];
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    updateSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
    deleteSlidesInBG: (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => void;
    replaceSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
    slideRejectedFilesCallback: () => void;
}