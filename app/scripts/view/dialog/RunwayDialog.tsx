/**TSX file dialog for Add and edit */
import { Button, LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { ThemeProvider } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { Autocomplete } from "../../components/utils/Autocomplete/Autocomplete";
import { getRunwayNodePath, getRunwayThumbnailPath } from "../../constant/InnovationAPI";
import { conflictingRunway, defaultRunwayError, forbiddenToRunwayMessages } from "../../constant/InnovationMessages";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayViewContext } from "../../context/RunwayViewContext";
import { RunwayModel } from "../../interfaces/InnovationInterface";
import { repoUpdateThumbnail } from "../../services/RepoService";
import RunwayService from "../../services/service/RunwayService";
import { RunwayDialogTheme } from "../../themes/RunwayTheme";
import { AvatarUpload } from "../../upload/AvatarUploadComponent";
import { uploadAvatar } from "../../upload/UploaderFunction";
import ConfirmationDialog from "../ConfirmationDialog";
import { OutlinedInputTheme } from "../theme";

declare interface RunwayDialogPropsType {
    /**The default data that is displayed in the dialog */
    existingData: RunwayModel;
    /**Boolean state variable that handles opening and closing of the dialog */
    openDialog: boolean;
    /**Setter for the booelan state variable that opens the Runway Dialog*/
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    /**Setter to open the alert message in "Snackbar" component */
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
    /**Setter to set the message to be displayed in the "Snackbar" component */
    setAlertContent: React.Dispatch<React.SetStateAction<string>>;
    /**Setter to set whether the status is "success" or not */
    setAlertSeverity: React.Dispatch<React.SetStateAction<any>>;
    /**Variable to refresh the table */
    updateTable: boolean;
    setUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
    usersList: string[];
}

/**
 * Function that returns the Add Dialog for Runway
 * @param inputProps - Props of the RunwayDialogPropsType
 * @returns - React component of Add Runway
 */
export function RunwayDialog(inputProps: RunwayDialogPropsType) {
    /**To save the user/manager of a business goal
     * For add - it is the current user
     */
    const [managerName, setManagerName] = useState<string>("");
    /**State that handles whether the confirmation dialog should be displayed or not */
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    /**State to check if the form is valid for creation of Runway */
    const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
    /**State to save business goal name */
    const [runwayName, setRunwayName] = useState<string>("");
    /**State to hold the thumbnail data */
    const [thumbnailData, setThumbnailData] = useState<any>(images.EskoStarPng);
    /**State to hold the default thumbnail data */
    const [defaultThumbnailData, setDefaultThumbnailData] = useState<any>();
    /**To handle loading  animation*/
    const [loading, setLoading] = useState<boolean>(false);
    /**Getting the Cloud account data, current user info and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);
    const lRunwayViewData = useContext(RunwayViewContext);

    /**Function to close the dialog */
    const handleCloseDialog = () => {
        if ("" !== runwayName || thumbnailData !== images.EskoStarPng ||
            lInnovationData.currentUserInfo.displayName.toString() !== managerName.toString()
        ) {
            setOpenConfirmationDialog(true);
        } else {
            inputProps.setOpenDialog(false);
        }
    };

    /**Function to close the confirmation dialog */
    const handleCloseConfirmationDialog = () => {
        /**Reset the values */
        setIsFormInvalid(false);
        /**Empty the text field */
        setRunwayName("");
        /**Reset the thumbnail */
        setThumbnailData(images.EskoStarPng);
        /**Close the confirmation */
        setOpenConfirmationDialog(false);
        /**Close the dialog */
        inputProps.setOpenDialog(false);
    };

    /**To get the png from the innovation service */
    const getDefaultThumbnail = () => {
        fetch(images.EskoStarPng).then((response) => {
            response.blob().then((data) => {
                setDefaultThumbnailData(data);
            });
        });
    };

    /**Make request to create runway */
    const handleCreateRunway = () => {
        /**If user tried to submit empty TextField */
        if ("" === runwayName) {
            /**Display error message */
            setIsFormInvalid(true);
            return;
        }
        /**value to the entered runway data */
        let lHoldRunway: RunwayModel = {
            isActive: true,
            managerName: managerName,
            runwayName: runwayName,
            thumbnail: getRunwayThumbnailPath(lInnovationData.eskoAccountDetail.repoid, runwayName.toString()),
            nodeId: ""
        }
        /**Enable the loading animation in button to indicate addition 
         * of runway to the database
         */
        setLoading(true);

        RunwayService.innovationCreateRunway(lInnovationData.eskoAccountDetail.repoid, lHoldRunway)
            .then((createRunwayResponse: any) => {
                /**The node path where the thumbnail has to be uploaded */
                const holdNodePath = getRunwayNodePath(lInnovationData.eskoAccountDetail.repoid, runwayName.toString());
                /**Function to display the message when runway creation(and upload) is done */
                const dialogClose = () => {
                    lHoldRunway.nodeId = createRunwayResponse.result[0].id;
                    /**set the operation performed and save the added runway in context*/
                    lRunwayViewData.setModifiedRunway(JSON.parse(JSON.stringify(lHoldRunway)))
                    lRunwayViewData.setRunwayOperationPerformed("ADD");
                    setLoading(false);
                    /**Close the dialog */
                    setIsFormInvalid(false);
                    setRunwayName("");
                    setThumbnailData(images.EskoStarPng);
                    inputProps.setOpenDialog(false);
                    inputProps.setUpdateTable(!inputProps.updateTable);
                    /**Set the alert message */
                    inputProps.setOpenAlert(true);
                    inputProps.setAlertSeverity("success");
                    inputProps.setAlertContent(createRunwayResponse.message);
                }
                /**Call back function to update thumbnail link after upload */
                const updateThumbnailInRepo = () => {
                    repoUpdateThumbnail(holdNodePath)
                        .then(() => {
                            setTimeout(() => { dialogClose() }, 500)
                        })
                }
                /**Upload the thumbnail, 
                 * if user has uploaded any image then the user selected image will be uploaded, 
                 * if user has not selected any image - default Esko image will be uploaded
                 */
                if (thumbnailData === images.EskoStarPng) {
                    uploadAvatar(holdNodePath, defaultThumbnailData, updateThumbnailInRepo, null);
                }
                else {
                    uploadAvatar(holdNodePath, thumbnailData, updateThumbnailInRepo, null);
                }

            })
            .catch((error: any) => {
                setLoading(false);
                /**Set the alert message */
                inputProps.setOpenAlert(true);
                inputProps.setAlertSeverity("error");
                switch (error.status) {
                    case 403: inputProps.setAlertContent(forbiddenToRunwayMessages("Create")); break;
                    case 409: inputProps.setAlertContent(conflictingRunway(runwayName)); break;
                    default: inputProps.setAlertContent(defaultRunwayError);
                }
                /**Close the dialog */
                setIsFormInvalid(false);
                setRunwayName("");
                inputProps.setOpenDialog(false);
            });
    };

    /**Function to handle change in runway name */
    const handleRunwayNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        /**check for error in the changes in the textfield */
        if ("" !== event.target.value || event.target.value.length < 140) {
            setIsFormInvalid(false);
        }
        /**If no error found, display the new value in the textfield */
        setRunwayName(event.target.value);
    };

    /**Function to handle change in the manager drop down */
    const getNewManagerName = (inNewManagerName: string, _inFieldValue: string) => {
        if ("" !== inNewManagerName) {
            setManagerName(inNewManagerName);
        }
    };

    /**Function to handle thumbnail updates */
    const handleThumbnailChange = (data: any) => {
        /**Save the selected image/thumbnail data */
        setThumbnailData(data);
    };

    /**Function to display error when user selects unsupported
     * file for thumbnail
     */
    const handleInvalidFile = () => {
        /**Set the alert message */
        inputProps.setOpenAlert(true);
        inputProps.setAlertSeverity("error");
        inputProps.setAlertContent("File type not Supported.");
    };

    /**On load get the current user information */
    useEffect(() => {
        getDefaultThumbnail();
    }, []);

    /**Setting the value of Current user to Current user display name */
    useEffect(() => {
        setRunwayName("");
        setManagerName(lInnovationData.currentUserInfo.displayName.toString());
    }, [lInnovationData.currentUserInfo, inputProps.usersList]);

    return (
        <ThemeProvider theme={RunwayDialogTheme}>
            <Dialog open={inputProps.openDialog} maxWidth={"xs"} fullWidth={true}>
                <DialogTitle >
                    {/**Using grid to align the dialog title text and the x button */}
                    <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                        {/**Title of the dialog */}
                        <Grid item xs={6} md={8}  >
                            {"Create Runway"}
                        </Grid>
                        {/**the close icon */}
                        <Grid item xs={6} md={4} style={{ flexBasis: "auto" }}>
                            <IconButton onClick={handleCloseDialog}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent style={{ paddingRight: "12px" }}>
                    <Grid container direction="row" spacing={2} style={{ flexWrap: "nowrap" }}>
                        <Grid item xs={8} >
                            {/**Runway Name field related components */}
                            <Typography>Runway Name <span style={{ color: "#DB2436", display: "inline", fontSize: "12px" }}>*</span></Typography>
                            <ThemeProvider theme={OutlinedInputTheme}>
                                <TextField
                                    variant="outlined"
                                    style={{ width: "100%", paddingBottom: "8px" }}
                                    required
                                    error={isFormInvalid}
                                    value={runwayName}
                                    helperText={(isFormInvalid && "This field is required") || (runwayName.length === 140 && "Maximum limit is 140 characters")}
                                    onChange={handleRunwayNameChange}
                                    inputProps={{ maxLength: 140 }}
                                />
                            </ThemeProvider>
                            {/**Manager select field related components */}
                            <Typography> Manager <span style={{ color: "#DB2436", display: "inline", fontSize: "12px" }}>*</span></Typography>
                            <Autocomplete
                                dataList={
                                    lInnovationData.currentUserInfo.displayName.toLowerCase() === managerName.toLowerCase() &&
                                    -1 === inputProps.usersList.indexOf(lInnovationData.currentUserInfo.displayName) ?
                                    [...inputProps.usersList, lInnovationData.currentUserInfo.displayName]:
                                    inputProps.usersList
                                }
                                keyValue={"managerName"}
                                noOptionText={"User not found"}
                                onChange={getNewManagerName}
                                selectedValue={managerName}
                            />
                        </Grid>
                        {/**Uploader component */}
                        <Grid item xs={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <AvatarUpload
                                sizeOfAvatar={"large"}
                                callBackForRejectedFiles={handleInvalidFile}
                                callBackForAcceptedFiles={handleThumbnailChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                {/**Dialog Action button components */}
                <Divider light style={{ margin: '0' }} />
                <ThemeProvider theme={LightTheme}>
                    {/**Cancel button to close the dialog */}
                    <DialogActions>
                        <Button
                            color={"secondary"}
                            onClick={handleCloseDialog}
                            className={undefined}
                            startIcon={undefined}
                            endIcon={undefined}
                            pullDown={undefined}
                        >
                            Cancel
                        </Button>
                        {/**Action button which calls two different function based on 
                         * whether the dialog is opened for add operation or update operation
                         */}
                        <Button
                            color="primary"
                            onClick={handleCreateRunway}
                            className={undefined}
                            startIcon={undefined}
                            endIcon={undefined}
                            pullDown={undefined}
                        >
                            {"Create Runway"}
                            {/**To display loading when user clicks on create */}
                            {loading ? <CircularProgress size={15} style={{ color: "white", marginLeft: "8px" }} /> : null}
                        </Button>
                    </DialogActions>
                    {/**Confirmation for close dialog if user has entered any value in the form */}
                    <ConfirmationDialog
                        closeConfirmationDialog={() => { setOpenConfirmationDialog(false) }}
                        confirmationActionContent={"Close Without Saving"}
                        confirmationDialogContent={"There are unsaved changes. Are you sure you want to close this window without saving those changes?"}
                        confirmationDialogTitle={"Unsaved Changes"}
                        handleSubmit={handleCloseConfirmationDialog}
                        loading={false}
                        open={openConfirmationDialog}
                    />
                </ThemeProvider>
            </Dialog>
        </ThemeProvider>
    );
}