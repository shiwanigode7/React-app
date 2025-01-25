import { UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import { BusinessGoalType } from "../../view/MPLView";

export default interface BusinessGoalEditDialogModel {
    isBusinessGoalDialogOpen: boolean;
    isBGDeletable: boolean;
    defaultBGGoal: BusinessGoalType;
    setDefaultBGGoal: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    prevValue: BusinessGoalType;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    isFormInvalid: boolean;
    setIsFormInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    openConfirmationDialog: boolean;
    confirmationDialogTitle: string;
    confirmationDialogContent: string;
    confirmationDialogActionContent: string;
    formValid: () => void;
    loading: boolean;
    openConfirmationDialogFunction: (dialogTitle: string, dialogContent: string, actionContent: string, actionClicked: string) => void;
    closeConfirmationDialog: () => void;
    handleSubmit: () => void;
    duplicateMilestoneIndices: number[];
    setDuplicateMilestoneIndices: React.Dispatch<React.SetStateAction<number[]>>;
    usersList: UserListWithEmailModel[];
    bgNodePath: string;
    updateSlidesinBG: (slideId: string, fileName: string, fileBlob: File) => void;
    deleteSlidesInBG: (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => void;
    replaceSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
}