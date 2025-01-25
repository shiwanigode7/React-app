import { Button } from "@esko/cloud-ui-components/dist/esm/components/Button";
import { LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Snackbar, ThemeProvider, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from 'react';
import { ALERT_SEVERITY } from "../constant/InnovationEnums";
import { cancelActionContent, cancelDialogContent, cancelDialogTitle, saveDialogContent, saveDialogTitle } from '../constant/InnovationMessages';
import { FILE_NOT_SUPPORTED } from "../constant/MeetingViewTexts";
import { InnovationAppContext } from '../context/InnovationAppContext';
import { UserListWithEmailModel } from "../interfaces/InnovationInterface";
import BusinessGoalChapter from './BusinessGoalChapters';
import ConfirmationDialog from './ConfirmationDialog';
import { BusinessGoalType } from './MPLView';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { AlertStyles } from "../themes/MeetingsTheme";

/**Interface class to define the type of props*/
export interface DialogTitleProps {
    open: boolean
    closeDialog: () => void;
    defaultBGGoal: BusinessGoalType;
    setDefaultBGGoal: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    isFormInvalid: boolean;
    setIsFormInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    openCofirmationDialog: boolean;
    setOpenConfirmationDialog: React.Dispatch<React.SetStateAction<boolean>>;
    confirmationDialogTitle: string;
    setconfirmationDialogTitle: React.Dispatch<React.SetStateAction<string>>;
    confirmationDialogContent: string;
    setconfirmationDialogContent: React.Dispatch<React.SetStateAction<string>>;
    confirmationDialogActionContent: string;
    setconfirmationDialogActionContent: React.Dispatch<React.SetStateAction<string>>;
    formValid: () => void;
    loading: boolean;
    openConfirmationDialogFunction: (dialogTitle: string, dialogContent: string, actionContent: string, actionClicked: string) => void;
    closeConfirmationDialog: () => void;
    handleSubmit: () => void;
    duplicateMilestoneIndices: number[];
    setDuplicateMilestoneIndices: React.Dispatch<React.SetStateAction<number[]>>;
    bgNodePath: string;
    usersList: UserListWithEmailModel[];
    updateSlidesinBG: (slideId: string, fileName: string, fileBlob: File) => void;
    replaceSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
    deleteSlidesInBG: (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => void
}

/**BusinessGoal Dialog functional component to return the Dialog Titles and contents  */
export default function BusinessGoalDialog(props: DialogTitleProps) {

    /**Getting the Cloud account data, current user info and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);
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

    /**Setting the value of owner to Current user display name */
    useEffect(() => {
        /**The display name will be Set to the state defaultBGGoal to reuse */
        props.setDefaultBGGoal((prevState: BusinessGoalType) => ({
            ...prevState,
            owner: lInnovationData.currentUserInfo.email.toString()
        }));
        /**The display name will be Set to the state businessGoalData */
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            owner: lInnovationData.currentUserInfo.email.toString()
        }));
    }, [lInnovationData.currentUserInfo, props.usersList])

    return (
        <ThemeProvider theme={LightTheme}>
            <Dialog open={props.open} fullWidth maxWidth={'xl'} style={{ height: '100vh' }}>
                <DialogTitle style={{ backgroundColor: "#F8F8F9" }}>
                    <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>Create New Business Goal</Typography>
                    <IconButton
                        onClick={() => props.openConfirmationDialogFunction(cancelDialogTitle, cancelDialogContent, cancelActionContent, "cancel")}
                        style={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ height: '700px' }}>
                    <BusinessGoalChapter
                        setIsFormInvalid={props.setIsFormInvalid}
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData}
                        isFormInvalid={props.isFormInvalid}
                        duplicateMilestoneIndices={props.duplicateMilestoneIndices}
                        setDuplicateMilestoneIndices={props.setDuplicateMilestoneIndices}
                        formValid={props.formValid}
                        bgNodePath={props.bgNodePath}
                        usersList={props.usersList}
                        updateSlidesInBG={props.updateSlidesinBG}
                        deleteSlidesInBG={props.deleteSlidesInBG}
                        replaceSlidesInBG={props.replaceSlidesInBG}
                        slideRejectedFilesCallback={slideRejectedFilesCallback} />
                    <Snackbar
                        open={openAlert}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        key={'top' + 'center'}
                        autoHideDuration={ALERT_AUTO_HIDE_DURATION}
                        onClose={() => setOpenAlert(false)}>
                        <Alert
                            icon={alertSeverity === ALERT_SEVERITY.SUCCESS ?
                                <CheckCircleOutlineIcon fontSize="medium" />
                                : <ErrorOutlineIcon fontSize="medium" />}
                            severity={alertSeverity}
                            className={AlertStyleClasses.root}
                        >
                            {alertContent}
                        </Alert>
                    </Snackbar>
                </DialogContent>
                <Divider light style={{ margin: '0' }} />
                <DialogActions>
                    <Button color={"secondary"}
                        onClick={() => props.openConfirmationDialogFunction(cancelDialogTitle, cancelDialogContent, cancelActionContent, "cancel")}
                        className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>Cancel</Button>
                    <Button color="primary"
                        onClick={() => props.openConfirmationDialogFunction(saveDialogTitle.toString(), saveDialogContent.toString(), saveDialogTitle.toString(), "create")}
                        className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>
                        Create Business Goal
                    </Button>
                </DialogActions>
                <ConfirmationDialog
                    confirmationDialogTitle={props.confirmationDialogTitle}
                    confirmationDialogContent={props.confirmationDialogContent}
                    confirmationActionContent={props.confirmationDialogActionContent}
                    open={props.openCofirmationDialog}
                    closeConfirmationDialog={props.closeConfirmationDialog}
                    handleSubmit={props.handleSubmit}
                    loading={props.loading} />
            </Dialog>
        </ThemeProvider>
    )
}