/**TSX file for listing all the components required for RunwayView.tsx */
import { service } from "@esko/cloud-service-utils";
import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { FormControlLabel, Grid, IconButton, Snackbar, Switch, Tooltip, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Alert } from "@material-ui/lab";
import { ThemeProvider } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { defaultRunwayError, deleteRunwayConfirmation, forbiddenToRunwayMessages } from "../../constant/InnovationMessages";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayViewContext } from "../../context/RunwayViewContext";
import { RunwaysListType, RunwayModel, UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import SearchService from "../../services/SearchService";
import RunwayService from "../../services/service/RunwayService";
import UserService from "../../services/UserService";
import { RunwaySwitchTheme } from "../../themes/RunwayTheme";
import { defaultRunwayInitializer, runwayListSorter } from "../../utils/RunwayViewUtils";
import ConfirmationDialog from "../ConfirmationDialog";
import { RunwayDialog } from "../dialog/RunwayDialog";
import { ResponseFromServer } from "../MPLView";
import { RunwayListView } from "../tables/RunwayListView";

//creating innovation service
const INNOVATION = new service("innovation");

export function RunwayView() {

    /**Define variables for context */
    const [modifiedRunway, setModifiedRunway] = useState<RunwayModel>(defaultRunwayInitializer());
    const [totalRunways, setTotalRunways] = useState<number>(0);
    const [runwayOperationPerformed, setRunwayOperationPerformed] = useState<string>("NONE");
    const [previousRunwayName, setPreviousRunwayName] = useState<string>("");

    /**Function to update the response from search based on the operation performed. */
    const handleRunwaysDataModification = (inRunwaysList: RunwayModel[]) => {
        switch (runwayOperationPerformed) {
            case "ADD":
                /**If the runway count has not increased add the runway to the list */
                if (totalRunways === inRunwaysList.length && modifiedRunway.runwayName !== "") {
                    inRunwaysList.push(modifiedRunway);
                    inRunwaysList = runwayListSorter(inRunwaysList);
                }
                break;
            case "UPDATE_STATUS":
                /**Find the index of the data to be updated */
                for (let runwayIndex = 0; runwayIndex < totalRunways; ++runwayIndex) {
                    if (inRunwaysList[runwayIndex].runwayName === modifiedRunway.runwayName) {
                        inRunwaysList[runwayIndex].isActive = modifiedRunway.isActive;
                        break;
                    }
                }
                break;
            case "UPDATE_NAME":
                /**Find the index of the data to be updated */
                for (let runwayIndex = 0; runwayIndex < totalRunways; ++runwayIndex) {
                    if (inRunwaysList[runwayIndex].runwayName.toString() === previousRunwayName) {
                        inRunwaysList[runwayIndex].runwayName = modifiedRunway.runwayName;
                        break;
                    }
                }
                inRunwaysList = runwayListSorter(inRunwaysList);
                break;
            case "UPDATE_MANAGER":
                /**Find the index of the data to be updated */
                let lRunwayIndex: number = 0;
                let lRunwayModified: RunwayModel | undefined = inRunwaysList.find((runway: RunwayModel, index: number) => {
                    if (runway.runwayName.toString() === modifiedRunway.runwayName.toString()) {
                        lRunwayIndex = index;
                        return true;
                    }
                });
                if (undefined !== lRunwayModified) {
                    lRunwayModified.managerName = modifiedRunway.managerName;
                    inRunwaysList.splice(lRunwayIndex, 1, lRunwayModified);
                    inRunwaysList = runwayListSorter(inRunwaysList);
                }
                break;
            case "DELETE":
                if (totalRunways === inRunwaysList.length && modifiedRunway.runwayName !== "") {
                    let dIndex = -1;
                    /**Find the index of the data to be deleted */
                    for (let runwayIndex = 0; runwayIndex < totalRunways; ++runwayIndex) {
                        if (inRunwaysList[runwayIndex].runwayName === modifiedRunway.runwayName) {
                            dIndex = runwayIndex;
                            break;
                        }
                    }
                    inRunwaysList.splice(dIndex, 1);
                }
                break;
        }
        /**Reset the values */
        setPreviousRunwayName("");
        setRunwayOperationPerformed("NONE");
        setModifiedRunway(defaultRunwayInitializer());
        return inRunwaysList;
    }

    const contextSettings = {
        "modifiedRunway": modifiedRunway,
        "setModifiedRunway": setModifiedRunway,
        "totalRunways": totalRunways,
        "setTotalRunways": setTotalRunways,
        "runwayOperationPerformed": runwayOperationPerformed,
        "setRunwayOperationPerformed": setRunwayOperationPerformed,
        "handleRunwaysDataModification": handleRunwaysDataModification,
        "previousRunwayName": previousRunwayName,
        "setPreviousRunwayName": setPreviousRunwayName
    }

    /**Variable to tell the table that the component has rendered */
    const [triggerTable, setTriggerTable] = useState<boolean>(false);
    useEffect(() => {
        setTriggerTable(!triggerTable);
    }, []);

    /**State to open and close runway dialog */
    const [openRunwayDialog, setOpenRunwayDialog] = useState<boolean>(false);
    /**State to handle displaying of loader */
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    /**State to open and close the confirmation dialog for delete alone */
    const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState<boolean>(false);
    /**State to set the confirmation dialog content for Delete  */
    const [confirmationContent, setConfirmationContent] = useState<string>("");
    /**get the context data */
    const lInnovationData = useContext(InnovationAppContext);
    /**Variable to trigger the updating of table */
    const [updateTable, setUpdateTable] = useState<boolean>(false);

    /**State to open alert  */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    /**State to set the content of the alert */
    const [alertContent, setAlertContent] = useState<string>("");
    /**State to define the type of alert, success or error */
    const [alertSeverity, setAlertSeverity] = useState<any>("success");
    /**State to monitor the toggling of switch button*/
    const [showInActiveRunway, setShowInActiveRunway] = useState<boolean>(false);
    /**Array of businessGoals with runwaysList */
    const [businessGoalRunwayList, setBusinessGoalRunwayList] = useState<RunwaysListType[]>([]);
    /**Array for users list */
    const [usersList, setUsersList] = useState<string[]>([]);

    /**
    * The following functions takes in the updated businessgoal data (Only runwaysList values)
    * @param updatedRunwaysList - Changed/Updated runwaysList with values as object
    * @param businessGoalName - Business Goal name as String
     */
    const updateRunWaysList = (updatedRunwaysList: Object, businessGoalName: string) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        /**Declaring the url path as an array elements */
        const content = ["api", "v0", "businessGoal", repoId, businessGoalName, ""]
        /**Call to innovation backend */
        INNOVATION.patch(content, updatedRunwaysList)
            .then((_response: ResponseFromServer) => {
                setUpdateTable(!updateTable);
            })
            .catch((error: ResponseFromServer) => {
                console.log(error);
            })
    };

    /**Checks whether the deleted Runways nodeId is used in any businessGoal or not and deletes the nodeId if it is used */
    const deleteRunwayInBG = (nodeId: string) => {
        businessGoalRunwayList.forEach((businessGoalData) => {
            /**Check whether every runways are available in Database if not filter it */
            if (businessGoalData["runwaysList"] !== undefined) {
                let BGRunwaysList: string[] = businessGoalData["runwaysList"];
                BGRunwaysList = BGRunwaysList.filter((val) => val != nodeId);
                if (businessGoalData["runwaysList"] != BGRunwaysList) {
                    let updatedRunwaysList: Object = {
                        runwaysList: BGRunwaysList
                    }
                    /**Update the runwayList in repo */
                    updateRunWaysList(updatedRunwaysList, businessGoalData["businessGoalName"].toString());
                    businessGoalData["runwaysList"] = BGRunwaysList;
                }

            }
        })
    };

    /**Function to close the delete dialog on cancel */
    const handleCloseDeleteDialog = () => {
        setDeleteConfirmationDialog(false);
    };

    /**State to hold the runway data to be deleted */
    const [tempRunway, setTempRunway] = useState<RunwayModel>({
        isActive: false,
        managerName: "",
        runwayName: "",
        thumbnail: "none",
        nodeId: ""
    });

    /**Function to be called when delete icon is clicked */
    const handleDeleteIconClick = (runwayData: RunwayModel) => {
        setTempRunway(runwayData);
        setConfirmationContent(deleteRunwayConfirmation(runwayData.runwayName.toString()));
        setDeleteConfirmationDialog(true);
    };

    /**Callback function when user confirm deletion of a runway */
    const handleDeleteConfirmation = () => {
        /**Enable the loading animation while the call is made to
         * delete runway
         */
        setDeleteLoading(true);
        /**Calling innovation backend to delete the runway*/
        RunwayService.innovationDeleteRunway(tempRunway.nodeId)
            .then((deleteRunwayResponse: any) => {
                /**Setting the snackbar alert */
                setRunwayOperationPerformed("DELETE");
                setModifiedRunway(tempRunway);
                setDeleteLoading(false);
                handleCloseDeleteDialog();
                setUpdateTable(!updateTable);
                setOpenAlert(true);
                setAlertSeverity("success");
                setAlertContent("Runway Deleted Successfully.");
                setTempRunway(defaultRunwayInitializer());
                deleteRunwayInBG(deleteRunwayResponse);
            })
            .catch((error: any) => {
                /**Setting the snackbar alert */
                setOpenAlert(true);
                setAlertSeverity("error");
                if (403 === error.status) {
                    setAlertContent(forbiddenToRunwayMessages("Delete"));
                } else {
                    setAlertContent(defaultRunwayError);
                }
                setTempRunway({
                    isActive: false,
                    managerName: "",
                    runwayName: "",
                    thumbnail: "none",
                    nodeId: ""
                });
                setDeleteLoading(false);
                handleCloseDeleteDialog();
            });
    };

    /**Event handler for Add icon click */
    const handleAddIconClick = () => {
        /**Setting the default value to be passed to 
         * the RunwayDialog.
         * Note: By default Runway will be active
         * and no thumbnail will be assigned.
         */
        setTempRunway({
            isActive: true,
            managerName: "",
            runwayName: "",
            thumbnail: "none",
            nodeId: ""
        });
        /**Open add runway dialog  */
        setOpenRunwayDialog(true);
    };

    /**Function that tracks the changes in switch button
     * and saves it in a state variable
     */
    const handleShowInActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowInActiveRunway(event.target.checked);
    };

    /**Gets the List of businessGoal present in the database */
    useEffect(() => {
        SearchService.searchRunwaysListInBusinessGoal(lInnovationData.eskoAccountDetail.repoid)
            .then((response: any) => {
                setBusinessGoalRunwayList(response);
            })
            .catch((error: any) => {
                console.log(error);
            });
        setTriggerTable(!triggerTable);
    }, []);

    /**Get the users list on organization change */
    useEffect(() => {
        UserService.getGroupUsers(lInnovationData.eskoAccountDetail.organizationID.toString(), "R&D Directors")
            .then((getUserResponse: UserListWithEmailModel[]) => {
                setUsersList(getUserResponse.map(user => user.displayName));
            })
            .catch((getUserError: any) => {
                console.log(getUserError);
            });
    }, [lInnovationData]);

    return (
        <RunwayViewContext.Provider value={contextSettings}>
            <ThemeProvider theme={LightTheme}>
                <div>
                    {/* Grid for the title and the add button */}
                    <Grid container spacing={2} alignContent="center" style={{ flexWrap: "nowrap" }}>
                        {/**Title of the page */}
                        <Grid item>
                            <Typography
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: "#22262A",
                                    paddingLeft: "18px"
                                }}
                            >
                                {"Runways"}
                            </Typography>
                        </Grid>
                        {/**Add icon */}
                        <Grid item>
                            <Tooltip title="Create Runway" placement="right" arrow>
                                <IconButton onClick={handleAddIconClick} style={{ padding: '0px' }}>
                                    <Typography>
                                        <img src={images.AddButton}></img>
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        {/**Switch button */}
                        <Grid item
                            style={{
                                marginLeft: "auto",
                                paddingTop: "12px",
                                whiteSpace: "nowrap",
                                marginRight: "7px"
                            }}
                        >
                            <ThemeProvider theme={RunwaySwitchTheme}>
                                <FormControlLabel
                                    control={<Switch
                                        onChange={handleShowInActive}
                                        disableRipple={true}
                                        color={"primary"}
                                    />}
                                    label={"Show Inactive Runways"}
                                />
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                    {/**Runway List view componenet */}
                    <RunwayListView
                        inputDeleteRunwayFunction={handleDeleteIconClick}
                        showInActiveRunway={showInActiveRunway}
                        parentComponentRendered={triggerTable}
                        setAlertContent={setAlertContent}
                        setAlertSeverity={setAlertSeverity}
                        setOpenAlert={setOpenAlert}
                        updateTable={updateTable}
                        setUpdateTable={setUpdateTable}
                        usersList={usersList}
                    />
                    {/**Runway add dialog */}
                    <RunwayDialog
                        existingData={tempRunway}
                        openDialog={openRunwayDialog}
                        setOpenDialog={setOpenRunwayDialog}
                        setAlertContent={setAlertContent}
                        setAlertSeverity={setAlertSeverity}
                        setOpenAlert={setOpenAlert}
                        updateTable={updateTable}
                        setUpdateTable={setUpdateTable}
                        usersList={usersList}
                    />
                    {/**Confirmation dialog for delete */}
                    <ConfirmationDialog
                        closeConfirmationDialog={handleCloseDeleteDialog}
                        confirmationActionContent={"Delete"}
                        confirmationDialogContent={confirmationContent}
                        confirmationDialogTitle={"Delete Runway"}
                        handleSubmit={handleDeleteConfirmation}
                        loading={deleteLoading}
                        open={deleteConfirmationDialog}
                    />
                </div>
                {/**Snackbar to display all the success/error messages */}
                <Snackbar
                    open={openAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={'top' + 'center'}
                    autoHideDuration={3000}
                    onClose={() => { setOpenAlert(false) }}
                >
                    <Alert
                        icon={
                            alertSeverity === "success" ?
                                <CheckCircleOutlineIcon fontSize="medium" /> :
                                <ErrorOutlineIcon fontSize="medium" />
                        }
                        severity={alertSeverity}
                        style={{ width: "500px" }}
                    >
                        {alertContent}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </RunwayViewContext.Provider>
    );
}