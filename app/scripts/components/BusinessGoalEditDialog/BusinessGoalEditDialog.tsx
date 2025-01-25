import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from "react";
import { cancelActionContent, cancelDialogContent, cancelDialogTitle, deleteActionContent, deleteDialogContent, deleteDialogTitle, updateActionContent, updateDialogContent, updateDialogTitle } from "../../constant/InnovationMessages";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import BGEditDialog from "../../view/BGEditDialog";
import ConfirmationDialog from "../../view/ConfirmationDialog";
import BusinessGoalEditDialogModel from "./BusinessGoalEditDialogModel";
import { BusinessGoalEditDialogStyle } from "./BusinessGoalEditDialogStyles";

export function BusinessGoalEditDialog(businessGoalEditDialogProps: BusinessGoalEditDialogModel) {

    const businessGoalEditDialogStyleClasses = BusinessGoalEditDialogStyle();

    const lInnovationData = useContext(InnovationAppContext);

    const isUserAdmin: boolean = (-1 !== lInnovationData.currentUserInfo.groupMembership.indexOf("Administrators"));

    function DialogActionComponent() {
        return (
            <div>
                <Divider light className={businessGoalEditDialogStyleClasses.divider} />
                <DialogActions>
                    {/* Action Buttons for Edit Business Goal Delete, Cancel and Save */}
                    {businessGoalEditDialogProps.isBGDeletable || isUserAdmin ?
                        <Button color={"secondary"} className={businessGoalEditDialogStyleClasses.deleteButton}
                            onClick={() => businessGoalEditDialogProps.openConfirmationDialogFunction(deleteDialogTitle, deleteDialogContent, deleteActionContent, "delete")}
                        >Delete Business Goal</Button> : null
                    }
                    <Button color={"secondary"} className={businessGoalEditDialogStyleClasses.deleteButton}
                        onClick={() => businessGoalEditDialogProps.openConfirmationDialogFunction(cancelDialogTitle, cancelDialogContent, cancelActionContent, "cancel")}
                    >Cancel</Button>
                    <Button color="primary" className={businessGoalEditDialogStyleClasses.saveButton}
                        onClick={() => businessGoalEditDialogProps.openConfirmationDialogFunction(updateDialogTitle, updateDialogContent, updateActionContent, "save")}
                    >Save</Button>
                </DialogActions>
                <ConfirmationDialog
                    confirmationDialogTitle={businessGoalEditDialogProps.confirmationDialogTitle}
                    confirmationDialogContent={businessGoalEditDialogProps.confirmationDialogContent}
                    confirmationActionContent={businessGoalEditDialogProps.confirmationDialogActionContent}
                    open={businessGoalEditDialogProps.openConfirmationDialog}
                    closeConfirmationDialog={businessGoalEditDialogProps.closeConfirmationDialog}
                    handleSubmit={businessGoalEditDialogProps.handleSubmit}
                    loading={businessGoalEditDialogProps.loading}
                />
            </div>
        );
    }

    const holdActionDialogComponent = <DialogActionComponent />;


    return (
        <ThemeProvider theme={LightTheme}>
            <Dialog open={businessGoalEditDialogProps.isBusinessGoalDialogOpen} fullWidth maxWidth={'xl'} className={businessGoalEditDialogStyleClasses.dialog}>
                <DialogTitle className={businessGoalEditDialogStyleClasses.dialogTitle}>
                    <Typography className={businessGoalEditDialogStyleClasses.bgName}>{businessGoalEditDialogProps.businessGoalData.businessGoalName}</Typography>
                    <IconButton
                        onClick={() => businessGoalEditDialogProps.openConfirmationDialogFunction(cancelDialogTitle, cancelDialogContent, cancelActionContent, "cancel")}
                        className={businessGoalEditDialogStyleClasses.iconButton}>
                        <CloseIcon className={businessGoalEditDialogStyleClasses.closeIcon} />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={businessGoalEditDialogStyleClasses.dialogContent}>
                    <BGEditDialog
                        businessGoalData={businessGoalEditDialogProps.businessGoalData}
                        setBusinessGoalData={businessGoalEditDialogProps.setBusinessGoalData}
                        isFormInvalid={businessGoalEditDialogProps.isFormInvalid}
                        setIsFormInvalid={businessGoalEditDialogProps.setIsFormInvalid}
                        duplicateMilestoneIndices={businessGoalEditDialogProps.duplicateMilestoneIndices}
                        setDuplicateMilestoneIndices={businessGoalEditDialogProps.setDuplicateMilestoneIndices}
                        formValid={businessGoalEditDialogProps.formValid}
                        bgNodePath={businessGoalEditDialogProps.bgNodePath}
                        usersList={businessGoalEditDialogProps.usersList}
                        updateSlidesinBG={businessGoalEditDialogProps.updateSlidesinBG}
                        deleteSlidesInBG={businessGoalEditDialogProps.deleteSlidesInBG}
                        replaceSlidesInBG={businessGoalEditDialogProps.replaceSlidesInBG}
                    />
                </DialogContent>
                {holdActionDialogComponent}
            </Dialog>
        </ThemeProvider>
    )
}