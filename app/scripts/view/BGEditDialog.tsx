import React, { useState } from "react";
import BusinessGoalChapter from "./BusinessGoalChapters";
import ScheduledandActiveChapters from "./chapters/ScheduledandActiveChapters";
import { BusinessGoalType } from "./MPLView";
import { InnovationStatus } from "../constant/InnovationEnums";
import { UserListWithEmailModel } from "../interfaces/InnovationInterface";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { AlertStyles } from "../themes/MeetingsTheme";
import { ALERT_SEVERITY } from "../constant/InnovationEnums";
import { FILE_NOT_SUPPORTED } from "../constant/MeetingViewTexts";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
/**Interface class to define the type of props*/
export interface EditDialogPropsModel {
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    isFormInvalid: boolean;
    setIsFormInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    duplicateMilestoneIndices: number[];
    setDuplicateMilestoneIndices: React.Dispatch<React.SetStateAction<number[]>>;
    formValid: () => void;
    usersList: UserListWithEmailModel[];
    bgNodePath: string;
    updateSlidesinBG: (slideId: string, fileName: string, fileBlob: File) => void;
    deleteSlidesInBG: (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => void;
    replaceSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
}

/**Component for Edit Business Goal Dialog */
export default function BGEditDialog(EditDialogProps: EditDialogPropsModel) {
    /**State to handle the snackback alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const AlertStyleClasses = AlertStyles();
    const ALERT_AUTO_HIDE_DURATION: number = 3000;
    const slideRejectedFilesCallback = () => {
        setOpenAlert(true);
        setAlertSeverity(ALERT_SEVERITY.ERROR);
        setAlertContent(FILE_NOT_SUPPORTED);
    };
    return (
        <div>
            {/* Chapters to be dislayed in Edit Business Goal */}
            <BusinessGoalChapter
                setIsFormInvalid={EditDialogProps.setIsFormInvalid}
                businessGoalData={EditDialogProps.businessGoalData}
                setBusinessGoalData={EditDialogProps.setBusinessGoalData}
                isFormInvalid={EditDialogProps.isFormInvalid}
                duplicateMilestoneIndices={EditDialogProps.duplicateMilestoneIndices}
                setDuplicateMilestoneIndices={EditDialogProps.setDuplicateMilestoneIndices}
                formValid={EditDialogProps.formValid}
                bgNodePath={EditDialogProps.bgNodePath}
                usersList={EditDialogProps.usersList}
                updateSlidesInBG={EditDialogProps.updateSlidesinBG}
                deleteSlidesInBG={EditDialogProps.deleteSlidesInBG}
                replaceSlidesInBG={EditDialogProps.replaceSlidesInBG}
                slideRejectedFilesCallback={slideRejectedFilesCallback}
            />
            <Snackbar
                open={openAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                key={'top' + 'center'}
                autoHideDuration={ALERT_AUTO_HIDE_DURATION}
                onClose={() => setOpenAlert(false)}>
                <Alert
                    icon={alertSeverity === ALERT_SEVERITY.SUCCESS ?
                        <CheckCircleOutlineIcon fontSize="medium" />
                        : <ErrorOutlineIcon fontSize="medium" />
                    }
                    severity={alertSeverity}
                    className={AlertStyleClasses.root}
                >
                    {alertContent}
                </Alert>
            </Snackbar>
            {(InnovationStatus.SCHEDULED === EditDialogProps.businessGoalData.status || InnovationStatus.ACTIVE === EditDialogProps.businessGoalData.status || InnovationStatus.COMPLETED === EditDialogProps.businessGoalData.status) &&
                <ScheduledandActiveChapters
                    businessGoal={EditDialogProps.businessGoalData}
                    setBusinessGoal={EditDialogProps.setBusinessGoalData}
                    usersList={EditDialogProps.usersList}
                    bgNodePath={EditDialogProps.bgNodePath}
                />
            }
        </div>
    );
}