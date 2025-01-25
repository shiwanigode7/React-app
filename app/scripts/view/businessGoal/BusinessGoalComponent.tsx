/**TSX file for all the business goal related component */
import { service } from "@esko/cloud-service-utils";
import { Snackbar } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { BusinessGoalEditDialog } from "../../components/BusinessGoalEditDialog/BusinessGoalEditDialog";
import { getBGThumbnailPath, getBusinessGoalNodePath } from "../../constant/InnovationAPI";
import { ALERT_SEVERITY, BG_DIALOG_VIEW_CHANGE_ACTIONS, BUSINESS_GOAL_DIALOG_ACTIONS, BUSINESS_GOAL_DISPLAY_MODE } from "../../constant/InnovationEnums";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { MPLViewContext } from "../../context/MPLViewContext";
import { NodeEventContext } from "../../context/NodeEventContext";
import { NoteInterface, BusinessGoalTableType, DropDownInterface, MeetingsListWithDiscussionType, MeetingTopicInterface, MilestoneModel, SlidesModel, SlidesUploadModel, UserListWithEmailModel, ReleaseTimelineModel } from "../../interfaces/InnovationInterface";
import { repoUpdateThumbnail } from "../../services/RepoService";
import SearchService from "../../services/SearchService";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import MeetingService from "../../services/service/MeetingService";
import ProductService from "../../services/service/ProductService";
import UserService from "../../services/UserService";
import { removeContent, uploadAvatar, uploadContent } from "../../upload/UploaderFunction";
import { defaultBusinessGoalInitializer, defaultBusinessNoteInitializer } from "../../utils/MPLViewUtils";
import BusinessGoalDialog from "../BusinessGoalDialog";
import { BusinessGoalType, ResponseFromServer } from "../MPLView";
import { BusinessGoalDialogComponent } from "./BusinessGoalDialogComponent";

//creating innovation service
// TODO: To remove this declaration to call backend with a function that will be 
// define in the InnovationService.tsx once the backend refactoring based on the 
// Control, logic and persistent layer is done
const INNOVATION = new service("innovation");

declare interface BusinessGoalComponentProps {
    // TODO: To make the add dialog props optional and make sure it doesn't break anything in the code
    openAddDialog: boolean;
    lastBusinessGoal: any;
    setOpenAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
    /**The business goal to be displayed */
    businessGoalSelected: BusinessGoalType;
    /**State to managet the object view of business goal */
    openObjectView: boolean;
    setOpenObjectView: React.Dispatch<React.SetStateAction<boolean>>;
    /**State to hold the information of list of business goals in given view. */
    listOfBusinessGoals: BusinessGoalTableType[];
    setBusinessGoalSelected: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    showCreateActionButton?: boolean;
    onCreateActionButtonClick?: () => void;
    closeBGObjectView?: boolean;
}

export function BusinessGoalComponent(inputProps: BusinessGoalComponentProps) {

    /**CONTEXT RELATED VARIABLES and functions*/
    const lInnovationData = useContext(InnovationAppContext);
    const lMPLViewData = useContext(MPLViewContext);
    const REPO = new service("repo");

    /**Using local variable for updating the notes list.
     * Reason: State variable is taking some time to get updated, and the search is
     * called immediately within the same function which causes the switch statements to be skipped.
     * Note: State Variable taking time to update is not a bug, it is the default 
     * behaviour of state variable in react
     */
    let lBusinessNoteOperation: string = "NONE";
    let lModifiedBusinessGoalNote: NoteInterface = defaultBusinessNoteInitializer();

    /*whenever eskoAccountDetail changes close the object view*/
    useEffect(() => {
        closeObjectView();
    }, [lInnovationData.eskoAccountDetail]);

    /**Function to modify the search response of business goal notes based on the operation performed */
    const handleBGNotesChange = (inNotesList: NoteInterface[]) => {
        if ("ADD" === lBusinessNoteOperation) {
            if (lMPLViewData.totalBusinessNotes === inNotesList.length || notesList.length === inNotesList.length) {
                /**To set the current time */
                lModifiedBusinessGoalNote.date = new Date();
                /**Should push the latest notes at the top of the list */
                inNotesList.splice(0, 0, lModifiedBusinessGoalNote);
            }
        }
        lBusinessNoteOperation = "NONE";
        lModifiedBusinessGoalNote = defaultBusinessNoteInitializer();
        lMPLViewData.setTotalBusinessNotes(inNotesList.length);
        return inNotesList;
    };

    useEffect(() => {
        if (inputProps.closeBGObjectView) {
            if (inputProps.closeBGObjectView === true) {
                closeObjectView();
            }
        }
    }, [inputProps.closeBGObjectView])

    // Duration of the the alert message to be displayed
    const ALERT_DURATION: number = 3000;
    let lSlideIdToBeDeleted: string[] = [];
    /**STATE VARIABLES */

    const lNodeEventData = useContext(NodeEventContext);

    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [isBGDeletable, setIsBGDeletable] = useState<boolean>(false);
    // State to assign default values to the the Business Goal
    const [defaultBGGoal, setDefaultBGGoal] = useState<BusinessGoalType>(defaultBusinessGoalInitializer());
    // State to save the business goal changes made in the add dialog 
    const [businessGoalData, setBusinessGoalData] = useState<BusinessGoalType>(JSON.parse(JSON.stringify(defaultBGGoal)));
    // State to save defaultThumbnailData
    const [defaultThumbnailData, setDefaultThumbnailData] = useState<any>(images.EskoStarPng);
    // State to check if a form is valid or not, This state is used for both the Add dialog and the edit dialog
    const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
    // State to manage the opening and closing of Conformation Dialog
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    // State to maintain the contents of confirmation Dialog
    const [confirmationDialogTitle, setconfirmationDialogTitle] = useState<string>("");
    const [confirmationDialogContent, setconfirmationDialogContent] = useState<string>("");
    const [confirmationDialogActionContent, setconfirmationDialogActionContent] = useState<string>("");
    // State to manage the enable/disable the loading component
    const [loading, setLoading] = useState<boolean>(false);
    // State to check whether Create Business Goal Button is clicked or not
    const [actionClicked, setActionClicked] = useState<string>("");
    // State to have the previous value of business goal before updating
    const [prevBGValue, setPrevBGValue] = useState<BusinessGoalType>(defaultBGGoal);
    /** State to manage opening and closing of the edit / sir / ppg dialog */
    const [isBusinessGoalDialogOpen, setIsBusinessGoalDialogOpen] = useState<boolean>(false);
    /**State to open the dialog hold the object view */
    const [openCompleteDialog, setOpenCompleteDialog] = useState<boolean>(false);
    /**State to hold the business goal data to be edited */
    const [editBusinessGoalData, setEditBusinessGoalData] = useState<BusinessGoalType>(defaultBGGoal);
    const [notesList, setNotesList] = useState<NoteInterface[]>([]);
    /**State to set the circular loading icon visible or not while getting the notesList data */
    const [loadingNotesCircularIcon, setLoadingNotesCircularIcon] = useState<boolean>(false);
    /**State to hold the Meetings List with name and Discussion Topics */
    const [meetingsListwithDiscussionTopics, setMeetingsListwithDiscussionTopics] = useState<MeetingsListWithDiscussionType[]>([]);
    /**State to manage Alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertContent, setAlertContent] = useState<string>("");
    const [alertSeverity, setAlertSeverity] = useState<any>(ALERT_SEVERITY.SUCCESS.trim());
    // State to hold the mode selected by user
    const [displayMode, setDisplayMode] = useState<string>(BUSINESS_GOAL_DISPLAY_MODE.NONE);
    /**State to hold the business goal list for the drop down */
    const [businessGoalDropDownList, setBusinessGoalDropDownList] = useState<DropDownInterface[]>([]);
    /**State to hold the z-index value for the object view */
    const [currentBGName, setCurrentBGSelected] = useState<string>(inputProps.businessGoalSelected.businessGoalName.toString().toLowerCase());
    /**State to handle whether the Show notes is selected or not  */
    const [showNotes, setShowNotes] = useState<boolean>(false);
    /**State to hold what action is performed for the view change */
    const [viewChange, setViewChange] = useState<string>(BG_DIALOG_VIEW_CHANGE_ACTIONS.NONE);
    const [holdBGIndex, setHoldBGIndex] = useState<number>(-1);
    const [duplicateMilestoneIndices, setDuplicateMilestoneIndices] = useState<number[]>([]);
    /**State to hold the users list for a given organization */
    const [usersList, setUsersList] = useState<UserListWithEmailModel[]>([]);
    /**Variable to hold the node path of the business goal selected (note in future it will be removed when we start using node-id for update) */
    const [bgNodePath, setBgNodePath] = useState<string>("");
    const [isSlideAdded, setIsSlideAdded] = useState<boolean>(false);
    const [listOfSlidesUploaded, setListOfSlidesUploaded] = useState<SlidesUploadModel[]>([]);
    const [bgNodePathForPpt, setBgNodePathForPpt] = useState<string>("");
    const [slidesIdToDelete, setSlidesIdToDelete] = useState<string[]>([]);
    const [prevReleaseTimelineValue, setPrevReleaseTimeLineValue] = useState<ReleaseTimelineModel[]>([]);
    /** ALL ARROW, NORMAL, EVENT HANDLE FUNCTIONS */
    // Check if the Business Goal name field is empty or not
    const validateAddForm = () => {
        let isFormValid: boolean = false;
        if ("" !== businessGoalData?.businessGoalName) {
            setIsFormInvalid(false);
            isFormValid = true;
            if (businessGoalData.potentialIp && 0 !== businessGoalData.potentialIpDescription.trim().length) {
                setIsFormInvalid(false);
            }
            if (!businessGoalData.potentialIp) {
                setIsFormInvalid(false);
            }
            if (businessGoalData.potentialIp && 0 === businessGoalData.potentialIpDescription.trim().length) {
                setIsFormInvalid(true);
                isFormValid = false;
            }
            if (businessGoalData.milestones.length > 1) {
                const duplicateMilestonesIndices: number[] = getDuplicateMilestonesIndices(businessGoalData.milestones);
                if (duplicateMilestonesIndices.length > 0) {
                    setIsFormInvalid(true);
                    isFormValid = false;
                    setDuplicateMilestoneIndices(duplicateMilestonesIndices);
                } else {
                    setDuplicateMilestoneIndices([]);
                    setIsFormInvalid(false);
                }
            }
        } else {
            setIsFormInvalid(true);
        }
        return isFormValid;
    };

    function getDuplicateMilestonesIndices(allMilestones: MilestoneModel[]) {
        const duplicateMilestones: MilestoneModel[] = [...allMilestones];
        const duplicateIndices: number[] = [];
        let isfirstTime: boolean = true;
        duplicateMilestones.forEach((duplicateMilestone: MilestoneModel) => {
            allMilestones.forEach((milestone: MilestoneModel, index: number) => {
                if (duplicateMilestone.milestoneName.toLowerCase() === milestone.milestoneName.toLowerCase()) {
                    if (!isfirstTime) {
                        duplicateIndices.push(index);
                    }
                    isfirstTime = false;
                }
            });
            isfirstTime = true;
        });
        return [... new Set(duplicateIndices)];
    }

    // To handle closing of Add dialog
    const closeAddDialog = () => {
        inputProps.setOpenAddDialog(false);
    };

    // Function to close the Conformation Dialog
    const closeConfirmationDialog = () => {
        setDuplicateMilestoneIndices([]);
        setOpenConfirmationDialog(false);
    };

    // Function checks for the props to open Confirmation Dialog and set the contents for Confirmation Dialog
    // TODO: To update the type of the parameter from String to string in the following function and also in 
    // the components that use this functions
    const openConfirmationDialogFunction = (inDialogTitle: string, inDialogContent: string, inActionContent: string, inActionClicked: string) => {
        setActionClicked(inActionClicked);
        /**Checks whether the user changes any value, if not closes the Dialog(MPLDialog) */
        if (
            (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === inActionClicked) &&
            (
                (JSON.stringify(businessGoalData) == JSON.stringify(defaultBGGoal)) ||
                (JSON.stringify(businessGoalData) == JSON.stringify(prevBGValue))
            )
        ) {
            closeAddDialog();
            closeEditDialog();
            setIsFormInvalid(false);
        }
        /**Checks whether Create Business Goal is clicked and the form is valid or not to show the Confirmation Dialog */
        else if (
            ((BUSINESS_GOAL_DIALOG_ACTIONS.CREATE === inActionClicked || BUSINESS_GOAL_DIALOG_ACTIONS.SAVE === inActionClicked) && validateAddForm()) ||
            (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === inActionClicked) ||
            (BUSINESS_GOAL_DIALOG_ACTIONS.DELETE === inActionClicked)
        ) {
            setconfirmationDialogTitle(inDialogTitle.toString());
            setconfirmationDialogContent(inDialogContent.toString());
            setconfirmationDialogActionContent(inActionContent.toString());
            setOpenConfirmationDialog(true);
        }
    };

    //To get the default thumbnail
    const getDefaultThumbnail = () => {
        fetch(images.EskoStarPng).then((response) => {
            response.blob().then((data) => {
                setDefaultThumbnailData(data);
            });
        });
    }

    /**
     * The following functions takes in the businessgoal data and saves it in database
     * @param inBusinessGoalData - Business Goal Names and other fields as Object
     */
    const saveBGValue = (inBusinessGoalData: BusinessGoalType) => {
        const emptyElementsCount = inBusinessGoalData.milestones.filter((milestone: MilestoneModel) => "" === milestone.milestoneName).length;
        if (inBusinessGoalData.milestones.length > 1 && emptyElementsCount > 0) {
            inBusinessGoalData.milestones = inBusinessGoalData.milestones.filter((milestone: MilestoneModel) => milestone.milestoneName);
        }

        let lastBGPriority: string = undefined === inputProps.lastBusinessGoal ? "" : inputProps.lastBusinessGoal.MPLPriority;
        const params = {
            lastBGPriority: lastBGPriority
        }

        inBusinessGoalData.businessGoalName = inBusinessGoalData.businessGoalName.trim();
        // Getting the repo id
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        /**Declaring the url path as an array elements */
        const content = ["api", "v0", "businessGoal", repoId, inBusinessGoalData.businessGoalName, ""];
        //TODO: To replace the Innovation service call with a function in Innovation Service to add BG
        // Call to innovation backend
        INNOVATION.put(content, inBusinessGoalData, {}, params)
            .then((saveBGResponse: ResponseFromServer) => {
                //NodePath where Thumbnail should be updated
                const lNodePathBG = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, inBusinessGoalData.businessGoalName.toString());

                const lCloseDialog = () => {
                    const lUrl = window.location.origin;
                    const lThumbnail = `${lUrl.replace("innovation", "repo")}/CONTENT/v0/${lNodePathBG}?contentid=thumbnail`;
                    lMPLViewData.setBusinessGoalOperation("ADD");
                    inBusinessGoalData.thumbnail = lThumbnail;
                    lMPLViewData.setModifiedBusinessGoal(inBusinessGoalData);
                    inputProps.setOpenAddDialog(false);
                    setOpenAlert(true);
                    setLoading(false);
                    setOpenConfirmationDialog(false);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(saveBGResponse.message);
                    lInnovationData.renderVarUpdateFunction();
                    setDuplicateMilestoneIndices([]);
                    if (isSlideAdded) {
                        const version: number = 1;
                        if (0 !== listOfSlidesUploaded.length) {
                            listOfSlidesUploaded.forEach((slideInfo) => {
                                if (null !== slideInfo.pptFileBlob) {
                                    const lOnUploadSuccess = () => {
                                        onUploadSuccess(slideInfo.slideId, slideInfo.pptName)
                                    }
                                    uploadContent(bgNodePathForPpt, slideInfo.slideId, slideInfo.pptFileBlob, lOnUploadSuccess, null, version, slideInfo.pptName);
                                }
                            })
                        } else {
                            console.log("No files to upload");
                        }
                    }
                    setIsSlideAdded(false);
                    setListOfSlidesUploaded([]);
                }
                const onUploadSuccess = (luniqueId: string, lpptName: string) => {
                    createPayloadForUpdateSlidesInBG(luniqueId, lpptName);
                };
                // When creating Thumbnail first time, the version of the file would be 1
                const lThumbNailVersion: number = 1;
                const updateThumbnailInRepo = () => {
                    repoUpdateThumbnail(lNodePathBG, lThumbNailVersion)
                        .then(() => {
                            lCloseDialog();
                        });
                }
                if (images.EskoStarPng === inBusinessGoalData.thumbnail) {
                    uploadAvatar(lNodePathBG, defaultThumbnailData, updateThumbnailInRepo, null, lThumbNailVersion);
                }
                else {
                    uploadAvatar(lNodePathBG, inBusinessGoalData.thumbnail, updateThumbnailInRepo, null, lThumbNailVersion);
                }
            })
            .catch((error: ResponseFromServer) => {
                console.log(error);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                if (error.status == "409") {
                    setAlertContent("Business Goal with name \"" + inBusinessGoalData.businessGoalName + "\" already exists");
                }
                else if (error.status === "403") {
                    setAlertContent("You are not Authorized to perform this Action.");
                }
                else {
                    setAlertContent("Internal Server error");
                }
                setOpenAlert(true);
                setLoading(false);
                setOpenConfirmationDialog(false);
                inputProps.setOpenAddDialog(false);
            })
    };

    /**Function to save value or to close the Dialog after confirmation */
    const handleAddSubmit = () => {
        setDuplicateMilestoneIndices([]);
        /**Checks Create Business Goal is clicked and save the value*/
        if (BUSINESS_GOAL_DIALOG_ACTIONS.CREATE === actionClicked) {
            setLoading(true);
            saveBGValue(businessGoalData);
        }
        /**Close the MPLDialog and set the default value to the state */
        if (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === actionClicked) {
            setOpenConfirmationDialog(false);
            closeAddDialog();
        }
        setIsFormInvalid(false);
        setBusinessGoalData(defaultBGGoal);
        setActionClicked("");
    };

    /**closes Object View */
    const closeObjectView = () => {
        inputProps.setOpenObjectView(false);
        setShowNotes(false);
        if (!isBusinessGoalDialogOpen) {
            setOpenCompleteDialog(false);
        }
    };

    /**
     * The following functions takes in the businessgoalNotes data and send to the function to save it in repo
     * @param notesData - Business Goal Notes data as Object
     * @param businessGoalName - Business Goal Name as String
     */
    const saveBGNotes = (notesData: NoteInterface, businessGoalName: string) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        setLoadingNotesCircularIcon(true);
        BusinessGoalService.innovationCreateBusinessNotes(repoId, businessGoalName, notesData)
            .then((_createResponse: any) => {
                /**To set the operation performed on business goal and the 
                 * new data that was added.
                 */
                lBusinessNoteOperation = "ADD";
                lModifiedBusinessGoalNote = notesData;
                getBusinessGoalNotes(businessGoalName.toString());
            })
            .catch((error: ResponseFromServer) => {
                setLoadingNotesCircularIcon(false)
                console.log(error);
            })
    };

    /**
     * The following functions takes in the businessgoal notesView data and send to the function to update it in repo
     * @param notesView - changed Notes View value as String
     * @param businessGoalName - Business Goal Name as String
     * @param businessGoalNoteName - Business Goal Note Name as String
     */
    const updateNoteView = (notesView: string, businessGoalName: string, businessGoalNoteName: string) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        BusinessGoalService.innovationUpdateBusinessNotes(repoId, businessGoalName.toString(), businessGoalNoteName.toString(), notesView.toString())
            .then((response: any) => {
                console.log(response);
            })
            .catch((error: any) => {
                console.log(error);
            })
    };

    /**Replicating above two function for the following reason
     * - In order to avoid the Add Dialog being influenced by Object View
     * we added separate variable to track the businessGoalData changed in add
     * dialog and edit dialog, making the above two function invalid for edit dialog
     * - We did not combine edit and add in same function because, 
     *      1. It would increase the number argument, meaning we have to make the update
     *      in all the Chapters and Dialog.
     *      2. Adding another if-block for edit might cause the application not
     *      to behave as expected because buisnessGoalData value
     *      will be different from editBusinessGoalData irrespective of the order of 
     *      check.
     * - Plus in future if we have to handle form validation for other field
     * that are specific to edit or add it will be easier, since there is a chance
     * that the form validation check for add might not be applicable for edit.
    */
    /**Check the Business Goal of edit form is empty or not */
    const validateEditForm = () => {
        let isFormValid: boolean = false;
        if ("" !== editBusinessGoalData.businessGoalName) {
            setIsFormInvalid(false);
            isFormValid = true;
            if (editBusinessGoalData.potentialIp && 0 !== editBusinessGoalData.potentialIpDescription.trim().length) {
                setIsFormInvalid(false);
            }
            if (!editBusinessGoalData.potentialIp) {
                setIsFormInvalid(false);
            }
            if (editBusinessGoalData.potentialIp && 0 === editBusinessGoalData.potentialIpDescription.trim().length) {
                setIsFormInvalid(true);
                isFormValid = false;
            }
            if (editBusinessGoalData.milestones.length > 1) {
                const duplicateMilestonesIndices: number[] = getDuplicateMilestonesIndices(editBusinessGoalData.milestones);
                if (duplicateMilestonesIndices.length > 0) {
                    setIsFormInvalid(true);
                    isFormValid = false;
                    setDuplicateMilestoneIndices(duplicateMilestonesIndices);
                } else {
                    setDuplicateMilestoneIndices([]);
                    setIsFormInvalid(false);
                }
            }
        } else {
            setIsFormInvalid(true);
        }
        return isFormValid;
    };

    useEffect(() => {
        setLoadingNotesCircularIcon(true);
        getBusinessGoalNotes(inputProps.businessGoalSelected.businessGoalName.toString());
    }, [lNodeEventData.businessGoalsUpdated]);

    const getBusinessGoalNotes = (inBusinessGoalName: string) => {
        BusinessGoalService.innovationGetBusinessGoalNotes(lInnovationData.eskoAccountDetail.repoid, inBusinessGoalName)
            .then((getResponse: NoteInterface[]) => {
                setNotesList(handleBGNotesChange(getResponse));
                setLoadingNotesCircularIcon(false);
                lMPLViewData.setTotalBusinessNotes(getResponse.length);
            })
            .catch((error: any) => {
                console.log(error);
                setLoadingNotesCircularIcon(false)
            })
    };

    /**closes Edit Business Goal Dialog */
    const closeEditDialog = () => {
        setIsBusinessGoalDialogOpen(false);
        setShowNotes(false);
        setIsSlideAdded(false);
        // If object view was also closed, then close the entire dialog
        if (!inputProps.openObjectView) {
            setOpenCompleteDialog(false);
        }
        /**Check if the user canceled the changes made
         * If yes update the Object View with the existing business
         * goal value
         */
        if (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === actionClicked) {
            setEditBusinessGoalData(prevBGValue);
        }
        setOpenEditDialog(false);
    };

    /**closes Presentation  Dialog */
    const closePresentationDialog = () => {
        setIsBusinessGoalDialogOpen(false);
        // If object view was also closed, then close the entire dialog, because Objectview is also the part of the Dialog
        // When the user tries to close the dialog by closing the Object view via show shotes, close the entire dialog
        if (!inputProps.openObjectView) {
            setOpenCompleteDialog(false);
        }
    }

    /**Function checks for the props to open Confirmation Dialog of edit dialog and set the contents for Confirmation Dialog */
    const editOpenConfirmationDialogFunction = (inDialogTitle: string, inDialogContent: string, inActionContent: string, inActionClicked: string) => {
        setActionClicked(inActionClicked);
        /**Checks whether the user changes any value, if not closes the Edit Dialog(MPLDialog) */
        if (
            (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === inActionClicked) &&
            (
                (JSON.stringify(editBusinessGoalData) === JSON.stringify(defaultBGGoal)) ||
                (JSON.stringify(editBusinessGoalData) === JSON.stringify(prevBGValue))
            )
        ) {
            closeAddDialog();
            closeEditDialog();
            setIsFormInvalid(false);
        }
        /**Checks whether Create Business Goal is clicked and the form is valid or not to show the Confirmation Dialog */
        else if (
            ((BUSINESS_GOAL_DIALOG_ACTIONS.CREATE === inActionClicked || BUSINESS_GOAL_DIALOG_ACTIONS.SAVE === inActionClicked) && validateEditForm()) ||
            (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === inActionClicked) ||
            (BUSINESS_GOAL_DIALOG_ACTIONS.DELETE === inActionClicked) ||
            (BUSINESS_GOAL_DIALOG_ACTIONS.VIEW_CHANGE === inActionClicked)
        ) {
            setconfirmationDialogTitle(inDialogTitle.toString());
            setconfirmationDialogContent(inDialogContent.toString());
            setconfirmationDialogActionContent(inActionContent.toString());
            setOpenConfirmationDialog(true);
        }
    };

    /**This functions checks for the deleted Business Goal's nodeId with the Meetings list
     * If the nodeId is present anywhere it will remove from the list and save the updated list to repo
     * @param nodeId - nodeId of Delted Business Goal
     */
    const deleteDiscussionTopics = (deletedBGnodeID: string) => {
        meetingsListwithDiscussionTopics.forEach((meetingsList: MeetingsListWithDiscussionType) => {
            let tempDiscussionTopics: MeetingTopicInterface[] = [];
            meetingsList.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
                if ("Text" === discussionTopic.topicType || ("Business Goal" === discussionTopic.topicType && discussionTopic.topic !== deletedBGnodeID)) {
                    tempDiscussionTopics = tempDiscussionTopics.concat(discussionTopic);
                }
            });
            if (meetingsList.discussionTopics.length !== tempDiscussionTopics.length) {
                const meetingData: any = {
                    discussionTopics: tempDiscussionTopics
                }
                /**Save the updated data in repo */
                MeetingService.innovationUpdateMeeting(lInnovationData.eskoAccountDetail.repoid, meetingsList.meetingName, meetingData)
                    .then((meetingUpdateResponse: any) => {
                        console.log(meetingUpdateResponse);
                    })
                    .catch((meetingUpdateError: any) => {
                        console.log(meetingUpdateError);
                    });
            }
        });
    };

    const deleteBGNote = (inBusinessGoalName: string, inBusinessNoteName: string) => {
        BusinessGoalService.innovationDeleteBusinessNote(lInnovationData.eskoAccountDetail.repoid, inBusinessGoalName, inBusinessNoteName)
            .then((deleteBGNoteResponse: ResponseFromServer) => {
                setNotesList(notesList.filter(notes => {
                    return notes.noteName !== inBusinessNoteName
                }));
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(deleteBGNoteResponse.message);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    /**
    * The following functions Deletes the Business Goal
    * @param businessGoalName - Business Goal name as String to delete the particular Business Goal
     */
    const deleteBG = (businessGoalName: string, businessGoalId: string) => {
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        /**Declaring the url path as an array elements */
        const content = ["api", "v0", "businessGoal", repoId, businessGoalName, ""];
        /**Call to innovation backend */
        INNOVATION.delete(content)
            .then((deleteBGResponse: ResponseFromServer) => {
                lMPLViewData.setBusinessGoalOperation("DELETE");
                lMPLViewData.setModifiedBusinessGoal({
                    ...lMPLViewData.modifiedBusinessGoal,
                    businessGoalName: businessGoalName
                });
                setIsBusinessGoalDialogOpen(false);
                setShowNotes(false);
                setLoading(false);
                /**Delete Discussion Topics which has this deleted Business Goal nodeId */
                deleteDiscussionTopics(businessGoalId);
                setOpenAlert(true);
                setOpenConfirmationDialog(false);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(deleteBGResponse.message);
                lInnovationData.renderVarUpdateFunction();
            })
            .catch((error: ResponseFromServer) => {
                console.log(error);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                if ("403" === error.status) {
                    setAlertContent("You are not Authorized to perform this Action.");
                }
                else {
                    setAlertContent("Internal Server error");
                }
                setOpenAlert(true);
                setLoading(false);
                setOpenConfirmationDialog(false);
                setIsBusinessGoalDialogOpen(false);
                setShowNotes(false);
            })
    };
    const handleMilestonedeletion = (inBusinessGoalData: any, businessGoalName: string) => {
        if (undefined !== inBusinessGoalData.milestones) {
            let lCurrentMilestonesList: string[] = [];
            let prevMilestoneList: string[] = [];
            inBusinessGoalData.milestones.forEach((milestone: MilestoneModel) => {
                lCurrentMilestonesList.push(milestone.milestoneId)
            });
            if (undefined !== prevBGValue) {
                prevBGValue.milestones.forEach((milestone: MilestoneModel) => {
                    prevMilestoneList.push(milestone.milestoneId)
                });
            }
            prevMilestoneList.forEach((prevMilestoneID: string) => {
                if (lCurrentMilestonesList.indexOf(prevMilestoneID) < 0) {
                    ProductService.deleteHerofeatures(prevMilestoneID, lInnovationData.eskoAccountDetail.repoid, "")
                        .then((deleteHerofeatureResponse: ResponseFromServer) => {
                            console.log(deleteHerofeatureResponse);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        })
                }
            });
        }
    }

    const hanldeMilestinedeletionInRelease = (inBusinessGoalData: any, inPrevReleaseTimelineValue: ReleaseTimelineModel[]) => {
        if (undefined !== inBusinessGoalData.releaseTimelineData && 0 !== inPrevReleaseTimelineValue.length) {
            inBusinessGoalData.releaseTimelineData.forEach((releaseData: ReleaseTimelineModel, index: number) => {
                let lCurrentMilestonesList: string[] = releaseData.milestones;
                let prevMilestoneList: string[] = [];
                if(undefined !== inPrevReleaseTimelineValue[index]) {
                    prevMilestoneList = inPrevReleaseTimelineValue[index].milestones
                }
                prevMilestoneList.forEach((prevMilestoneID: string) => {
                    if (lCurrentMilestonesList.indexOf(prevMilestoneID) < 0) {
                        ProductService.deleteHerofeatures(prevMilestoneID, lInnovationData.eskoAccountDetail.repoid, releaseData.releaseNodeId)
                            .then((deleteHerofeatureResponse: ResponseFromServer) => {
                                console.log(deleteHerofeatureResponse);
                            })
                            .catch((error: any) => {
                                console.log(error);
                            })
                    }
                });
            });
        }
    }

    /**
    * The following functions takes in the updated businessgoal data (Only changes values)
    * @param inBusinessGoalData - Changed/Updated fields with values as object
    * @param businessGoalName - Business Goal name as String
    * @param businessGoalId - Business Goal Node Id as String
     */
    const updateBG = (inBusinessGoalData: any, businessGoalName: string, businessGoalId: string, updatedBGName: string) => {
        if (undefined !== inBusinessGoalData.milestones) {
            const emptyElementsCount = inBusinessGoalData.milestones.filter((milestone: MilestoneModel) => "" === milestone.milestoneName).length;
            if (inBusinessGoalData.milestones.length > 1 && emptyElementsCount > 0) {
                inBusinessGoalData.milestones = inBusinessGoalData.milestones.filter((milestone: MilestoneModel) => milestone.milestoneName);
            }
        }
        handleMilestonedeletion(inBusinessGoalData, businessGoalName);
        hanldeMilestinedeletionInRelease(inBusinessGoalData, prevReleaseTimelineValue);
        /**Getting the repo id */
        const repoId: string = lInnovationData.eskoAccountDetail.repoid;
        /**Declaring the url path as an array elements */
        BusinessGoalService.innovationUpdateBusinessGoal(repoId, businessGoalName, businessGoalId, inBusinessGoalData)
            .then((updateBGResponse: ResponseFromServer) => {
                //NodePath where Thumbnail should be updated
                const lNodePathBG = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, updatedBGName.toString());
                const lCurrentThumbnail: string = prevBGValue.thumbnail;
                const myArray = lCurrentThumbnail.split("&version=");
                const lCurrentVersionNumber: number = Number.parseInt(myArray[1]);

                const lVersionNumber: number = (lCurrentVersionNumber && lCurrentVersionNumber < 20 ? lCurrentVersionNumber + 1 : 2);

                const onUploadSuccess = (luniqueId: string, lpptName: string) => {
                    createPayloadForUpdateSlidesInBG(luniqueId, lpptName);
                };
                //slide upload
                if (isSlideAdded) {
                    const version: number = 1;
                    if (0 !== listOfSlidesUploaded.length) {
                        listOfSlidesUploaded.forEach((slideInfo) => {
                            if (null !== slideInfo.pptFileBlob) {
                                const lOnUploadSuccess = () => {
                                    onUploadSuccess(slideInfo.slideId, slideInfo.pptName);
                                }
                                uploadContent(bgNodePathForPpt, slideInfo.slideId, slideInfo.pptFileBlob, lOnUploadSuccess, null, version, slideInfo.pptName);
                            }
                        })
                    } else {
                        console.log("No files to upload");
                    }
                } else {
                    console.log("slide is not added");
                }
                if (0 !== slidesIdToDelete.length) {
                    slidesIdToDelete.forEach((slideIdToDelete) => {
                        const lOnRemoveSuccess = () => {
                            onRemoveSuccess(slideIdToDelete);
                        }
                        removeContent(bgNodePathForPpt, slideIdToDelete, lOnRemoveSuccess, null);
                    });
                }
                setSlidesIdToDelete([]);
                setIsSlideAdded(false);
                setListOfSlidesUploaded([]);
                const modalClose = () => {
                    let inBGlThumbnail = inBusinessGoalData.thumbnail;
                    let lThumbnail = prevBGValue.thumbnail;
                    if (undefined != inBGlThumbnail) {
                        lThumbnail = getBGThumbnailPath(lInnovationData.eskoAccountDetail.repoid, updatedBGName.toString(), lVersionNumber);
                    }
                    /**Save the data for list view update */
                    lMPLViewData.setBusinessGoalOperation("UPDATE");
                    lMPLViewData.setPreviousBGName(businessGoalName.toString());
                    /**Get the current value and replace it with the edited value */
                    lMPLViewData.setModifiedBusinessGoal({
                        ...editBusinessGoalData,//get the current value of business goal
                        ...inBusinessGoalData, //replace the values of business goal with the updated value
                        thumbnail: lThumbnail, //thumbnail URL remains the same
                        businessGoalName: updatedBGName //replace the name with the new business goal name
                    });
                    setIsBusinessGoalDialogOpen(false);
                    setShowNotes(false);
                    setOpenAlert(true);
                    setLoading(false);
                    setOpenConfirmationDialog(false);
                    setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                    setAlertContent(updateBGResponse.message);
                    lInnovationData.renderVarUpdateFunction();
                    setDuplicateMilestoneIndices([]);
                    setBgNodePathForPpt("");
                };

                const updateThumbnailInRepo = () => {
                    repoUpdateThumbnail(lNodePathBG, lVersionNumber)
                        .then(() => {
                            modalClose();
                        });
                };

                //Update thumbnail if change in BusinessGoal name
                if (undefined !== inBusinessGoalData.thumbnail) {
                    uploadAvatar(lNodePathBG, inBusinessGoalData.thumbnail, updateThumbnailInRepo, null, lVersionNumber);
                } else if (businessGoalName !== updatedBGName && undefined === inBusinessGoalData.thumbnail) {
                    repoUpdateThumbnail(lNodePathBG, lCurrentVersionNumber)
                        .then(() => {
                            modalClose();
                        });
                } else {
                    modalClose();
                }
            })
            .catch((error: ResponseFromServer) => {
                console.log(error);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                if ("409" === error.status) {
                    setAlertContent("Business Goal with name \"" + updatedBGName + "\" already exists");
                }
                else if ("403" === error.status) {
                    setAlertContent("You are not Authorized to perform this Action.");
                }
                else {
                    setAlertContent("Internal Server error");
                }
                setOpenAlert(true);
                setLoading(false);
                setOpenConfirmationDialog(false);
                setIsBusinessGoalDialogOpen(false);
                setShowNotes(false);
            })
    };

    /**Function to return the difference between two JSON objects for update Business Goal */
    const findDiff = (prevValue: any, inBusinessGoalData: any) => {
        const result: any = {};
        if (Object.is(prevValue, inBusinessGoalData)) {
            return undefined;
        }
        if (!inBusinessGoalData || ("object" !== typeof (inBusinessGoalData))) {
            return inBusinessGoalData;
        }
        Object.keys(prevValue || {}).concat(Object.keys(inBusinessGoalData || {})).forEach((key => {
            if (inBusinessGoalData[key] !== prevValue[key] && !Object.is(prevValue[key], inBusinessGoalData[key])) {
                result[key] = inBusinessGoalData[key];
            }
        }));
        return result;
    };

    /**Function to call the function to update value/Delete BG or to close the Dialog after confirmation */
    const handleEditSubmit = () => {
        setDuplicateMilestoneIndices([]);
        setOpenConfirmationDialog(false);
        if (editBusinessGoalData.businessGoalName) {
            editBusinessGoalData.businessGoalName = editBusinessGoalData.businessGoalName.trim();
        }
        const value = findDiff(prevBGValue, editBusinessGoalData);
        if (BUSINESS_GOAL_DIALOG_ACTIONS.SAVE === actionClicked) {
            setLoading(true);
            updateBG(value, prevBGValue.businessGoalName.toString(), prevBGValue.nodeId ? prevBGValue.nodeId : "",
                editBusinessGoalData.businessGoalName.toString().trim());
            closeEditDialog();
        }
        if (BUSINESS_GOAL_DIALOG_ACTIONS.DELETE === actionClicked) {
            setLoading(true);
            deleteBG(prevBGValue.businessGoalName.toString(), prevBGValue.nodeId ? prevBGValue.nodeId : "");
            setEditBusinessGoalData(defaultBGGoal);
            /**When the goal is deleted there is no need to keep the 
             * object view open
             */
            inputProps.setOpenObjectView(false);
            setShowNotes(false);
            setOpenCompleteDialog(false);
            closeEditDialog();
        }
        if (BUSINESS_GOAL_DIALOG_ACTIONS.VIEW_CHANGE === actionClicked) {
            setEditBusinessGoalData(prevBGValue);
        }
        if (BUSINESS_GOAL_DIALOG_ACTIONS.CANCEL === actionClicked) {
            closeEditDialog();
        }
        setIsFormInvalid(false);
        setActionClicked(BUSINESS_GOAL_DIALOG_ACTIONS.NONE);
    };


    /**opens Object View and sets the current value to the fields*/
    const openObjectViewPanel = () => {
        if (inputProps.openObjectView || isBusinessGoalDialogOpen) {
            setLoadingNotesCircularIcon(true);
            setNotesList([]);
            setOpenCompleteDialog(true);
            /**Get the notesList for a particular business goal and set it to the state variable */
            getBusinessGoalNotes(inputProps.businessGoalSelected.businessGoalName.toString());
            /**Setting values to prevValue state to compare*/
            setPrevBGValue(inputProps.businessGoalSelected);
            const tempReleaseData: ReleaseTimelineModel[] = JSON.parse(JSON.stringify(inputProps.businessGoalSelected.releaseTimelineData.slice()));
            setPrevReleaseTimeLineValue(tempReleaseData);
            /**Setting values to businessGoalData state to display the data in Edit View*/
            setEditBusinessGoalData(inputProps.businessGoalSelected);
            /**Updating the business goal selected for the view*/
            setCurrentBGSelected(inputProps.businessGoalSelected.businessGoalName.toString().toLowerCase());
        }
    };

    // Functions to handle drop down value change for the display mode
    const handleDisplayModeDropDownChange = (inKeyName: string) => {
        setDisplayMode(inKeyName.trim());
    };

    /**Function to get the current index of a business goal name in a given list */
    const getBusinessGoalIndex = (inBusinessGoalName: string) => {
        let lHoldBusinessGoalIndex: number = -1;
        inputProps.listOfBusinessGoals.forEach((businessGoal, index) => {
            if (inBusinessGoalName.toLowerCase() === businessGoal.businessGoalName.toLowerCase()) {
                lHoldBusinessGoalIndex = index;
            }
        });
        return lHoldBusinessGoalIndex;
    };

    /** Function to be called when user clicks on the forward arrow icon*/
    const forwardArrowClick = (inBusinessGoalName: string) => {
        setHoldBGIndex(getBusinessGoalIndex(inBusinessGoalName) + 1);
        inputProps.setBusinessGoalSelected({
            ...inputProps.listOfBusinessGoals[getBusinessGoalIndex(inBusinessGoalName) + 1]
        });
    };
    const removeSlidesinBG = (slideIdToDelete: string) => {
        /**building the request body */
        const lSlides: SlidesModel[] = inputProps.businessGoalSelected.slides;
        const lIndex = lSlides.findIndex((slide: SlidesModel) => slide.slideId === slideIdToDelete);
        if (lIndex >= 0) {
            lSlides.splice(lIndex, 1);
        }
        lSlideIdToBeDeleted.push(slideIdToDelete);
        console.log(lSlideIdToBeDeleted)
        patchSlidesinBGNode(bgNodePathForPpt, lSlides);
    };

    const onRemoveSuccess = (slideIdToDelete: string) => {
        removeSlidesinBG(slideIdToDelete);
    }
    /*function to check before set the slide id to delete based on create - don't set as slide is not present or in edit dialog - set the slide id to delete */
    const isSlideAlreadyPresentInBG = (slideNameToDelete: string) => {
        let isSlideNameExistsInBG = false;
        inputProps.businessGoalSelected.slides.forEach((slide) => {
            if (slide.pptName === slideNameToDelete)
                isSlideNameExistsInBG = true;
        });
        return isSlideNameExistsInBG;
    }

    /*function handle delete slides in BG */
    const deleteSlidesInBG = (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => {
        if (isSlideAlreadyPresentInBG(slideNameToDeleteInPptLstToUpload) && "" !== slideIdToDelete) {
            setSlidesIdToDelete(prevSlidesToDelete => [...prevSlidesToDelete, slideIdToDelete]);
        }
        // update the lst of slides to upload whenever user deletes a slide from slide chapter. 
        const lIndex = listOfSlidesUploaded.findIndex((slide: SlidesUploadModel) => slide.pptName === slideNameToDeleteInPptLstToUpload);
        if (lIndex >= 0) {
            listOfSlidesUploaded.splice(lIndex, 1);
        }
        setListOfSlidesUploaded(listOfSlidesUploaded);
        setBgNodePathForPpt(bgNodePathToDeleteSlide);
    }

    /* patch the slides added via slide chapter to BG node*/
    const patchSlidesinBGNode = (inNodePath: string, inSlides: SlidesModel[]) => {
        /**Split the node path based on / */
        const lNodePath = inNodePath.split("/");
        const lUpdatedObject: Object = {
            "properties": {
                "slides": inSlides
            }
        };

        /**Return a promise of the update call to repo */
        return new Promise((resolve, reject) => {
            REPO.patch(["NODE", "v1", ...lNodePath], lUpdatedObject)
                .then((response: any) => {
                    //delete slide ID from the meeting node
                    if (lSlideIdToBeDeleted.length !== 0) {
                        MeetingService.innovationDeleteSlideIdinMeeting(lSlideIdToBeDeleted, lNodePath[0])
                            .then((meetingUpdateResponse: any) => {
                                console.log(meetingUpdateResponse);
                            })
                            .catch((meetingUpdateError: any) => {
                                console.log(meetingUpdateError);
                            });
                    }
                    lSlideIdToBeDeleted = [];
                    resolve(response);
                })
                .catch((error: any) => {
                    console.log(error);
                    reject(error);
                })
        });
    }
    /*function to replace slides in BG */
    const replaceSlidesInBG = (slideIdToReplace: string, fileName: string, fileBlobToReplace: File) => {
        let pptInfoToReplace: SlidesUploadModel = {
            pptName: fileName,
            slideId: slideIdToReplace,
            pptFileBlob: fileBlobToReplace
        };
        setListOfSlidesUploaded(prevlistOfSlidesUploaded => [...prevlistOfSlidesUploaded, pptInfoToReplace]);
        setIsSlideAdded(true);
        let lbgNodePath = null;
        if (null !== inputProps.businessGoalSelected.businessGoalName && "" !== inputProps.businessGoalSelected.businessGoalName) {
            lbgNodePath = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, inputProps.businessGoalSelected.businessGoalName);
        }
        else {
            lbgNodePath = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, businessGoalData.businessGoalName);
        }
        setBgNodePathForPpt(lbgNodePath);
    }

    /*function sets props for the payload for patching the slide to the bg node which is going to be created*/
    const updateSlidesinBG = (slideId: string, fileName: string, fileBlob: File) => {
        /**building the request body */
        if ("" !== slideId) {
            let currentFileUploadData: SlidesUploadModel = {
                pptName: fileName,
                slideId: slideId,
                pptFileBlob: fileBlob
            };
            setListOfSlidesUploaded(prevlistOfSlidesUploaded => [...prevlistOfSlidesUploaded, currentFileUploadData]);
            setIsSlideAdded(true);
            let lbgNodePath = null;
            if (null !== inputProps.businessGoalSelected.businessGoalName && "" !== inputProps.businessGoalSelected.businessGoalName) {
                lbgNodePath = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, inputProps.businessGoalSelected.businessGoalName);
            }
            else {
                lbgNodePath = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, businessGoalData.businessGoalName);
            }
            setBgNodePathForPpt(lbgNodePath);
        } else {
            console.log("ppt id is empty");
        }

    };
    /*function to check whether  */
    const checkIfSlidesAlreadyInBG = (lCurrentSlide: SlidesModel, lSlides: SlidesModel[]) => {
        let isPptAlreadyExists = false;
        lSlides.forEach((slideInfo) => {
            if (lCurrentSlide.pptName === slideInfo.pptName)
                isPptAlreadyExists = true;
        })
        return isPptAlreadyExists;
    }
    /*function to update */
    const createPayloadForUpdateSlidesInBG = (luniqueId: string, lpptName: string, version: number = 1) => {
        const lUrl = window.location.origin;
        const lRepoUrl = `${lUrl.replace("innovation", "repo")}/CONTENT/v0/${bgNodePathForPpt}?contentid=${luniqueId}&useFilename=true`;
        const lSlideURI: string = lRepoUrl + (undefined === version ? "" : `&version=${version}`);
        const lCurrentSlide: SlidesModel = {
            slideId: luniqueId,
            contentURI: lSlideURI,
            pptName: lpptName
        };
        let lSlides: SlidesModel[];
        if (inputProps.businessGoalSelected.businessGoalName === "") {
            lSlides = businessGoalData.slides;
        } else {
            lSlides = inputProps.businessGoalSelected.slides;
        }
        if (false === checkIfSlidesAlreadyInBG(lCurrentSlide, lSlides)) {
            lSlides.push(lCurrentSlide);
            patchSlidesinBGNode(bgNodePathForPpt, lSlides);
        }
    }

    /* */
    // Function to be called when user clicks on the backward arrow icons
    const backwardArrowClick = (inBusinessGoalName: string) => {
        setHoldBGIndex(getBusinessGoalIndex(inBusinessGoalName) - 1);
        inputProps.setBusinessGoalSelected({
            ...inputProps.listOfBusinessGoals[getBusinessGoalIndex(inBusinessGoalName) - 1]
        });
    };

    /**Function to call when user selects a different business goal from the drop down list */
    const businessGoalDropDownChange = (inBusinessGoalName: string) => {
        setHoldBGIndex(getBusinessGoalIndex(inBusinessGoalName));
        inputProps.setBusinessGoalSelected({
            ...inputProps.listOfBusinessGoals[getBusinessGoalIndex(inBusinessGoalName)]
        });
    };

    /** Function to disable the forward arrow icons if the business goal currently selected in the last in the list */
    const isForwardArrowDisabled = (inBusinessGoalName: string) => {
        // If the index of current business goal is the last then disable the forward arrow icon
        return getBusinessGoalIndex(inBusinessGoalName) === inputProps.listOfBusinessGoals.length - 1;
    };

    /** Function to disable the backward arrow icons if the business goal currently selected in the first in the list*/
    const isBackwardArrowDisabled = (inBusinessGoalName: string) => {
        // If the index of current business goal is the last then disable the forward arrow icon
        return 0 === getBusinessGoalIndex(inBusinessGoalName);
    };

    /**Function to open the dialog modal in the mentioned view, either edit, SIR or PPG */
    const onObjectViewButtonClick = (inView: BUSINESS_GOAL_DISPLAY_MODE) => {
        setDisplayMode(inView.trim().toString());
        setIsBusinessGoalDialogOpen(true);
    };

    /**Function to create business goal list for the drop down */
    const createBusinessGoalDropDownList = (inBusinessGoalList: BusinessGoalTableType[]) => {
        const lHoldBGDropDownList: DropDownInterface[] = [];
        inBusinessGoalList.forEach((businessGoal: BusinessGoalTableType) => {
            const lHoldBGOption: DropDownInterface = {
                dataKey: businessGoal.businessGoalName.toString().toLowerCase(),
                displayName: businessGoal.businessGoalName.toString()
            };
            lHoldBGDropDownList.push(lHoldBGOption);
        });
        setBusinessGoalDropDownList(lHoldBGDropDownList);
    };

    /**Function to display notes when in dialog mode */
    const onShowNotesClick = () => {
        setShowNotes(true);
        inputProps.setOpenObjectView(true);
        openObjectViewPanel();
    };

    /**Function to change the business goal based on the index number passed */
    const changeBGBasedOnIndex = (inIndex: number) => {
        inputProps.setBusinessGoalSelected({
            ...inputProps.listOfBusinessGoals[inIndex]
        });
    };

    /**USE EFFECTS USED */
    useEffect(() => {
        /**Get the latest Meetings List from search and store it in a variable */
        SearchService.searchGetMeetingsListWithDiscussionTopics(lInnovationData.eskoAccountDetail.repoid)
            .then((response: any) => {
                setMeetingsListwithDiscussionTopics(response);
            })
            .catch((error: any) => {
                console.log(error);
            });
        getDefaultThumbnail();
    }, []);

    useEffect(() => {
        if (!inputProps.openAddDialog) {
            openObjectViewPanel();
            setBgNodePath(
                getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, inputProps.businessGoalSelected.businessGoalName.toString())
            );
        }
        UserService.getAdminAndProjectManagerUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersList(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [inputProps.businessGoalSelected, inputProps.openAddDialog]);

    useEffect(() => {
        createBusinessGoalDropDownList(inputProps.listOfBusinessGoals);
    }, [inputProps.listOfBusinessGoals]);

    useEffect(() => {
        if (openEditDialog) {
            BusinessGoalService.canEditAndDeleteBG(lInnovationData.currentUserInfo.groupMembership,
                editBusinessGoalData.owner, lInnovationData.currentUserInfo.email)
                .then((response: any) => {
                    setIsBGDeletable(response);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [openEditDialog])

    useEffect(() => {
        if (BG_DIALOG_VIEW_CHANGE_ACTIONS.NONE !== viewChange) {
            switch (viewChange) {
                case BG_DIALOG_VIEW_CHANGE_ACTIONS.BG_CHANGE:
                    changeBGBasedOnIndex(holdBGIndex);
                    break;
                case BG_DIALOG_VIEW_CHANGE_ACTIONS.SIR_VIEW_CHANGE:
                    handleDisplayModeDropDownChange(BUSINESS_GOAL_DISPLAY_MODE.SIR_PRESENTATION);
                    break;
                case BG_DIALOG_VIEW_CHANGE_ACTIONS.PPG_VIEW_CHANGE:
                    handleDisplayModeDropDownChange(BUSINESS_GOAL_DISPLAY_MODE.PPG_PRESENTATION);
                    break;
            }
            setViewChange(BG_DIALOG_VIEW_CHANGE_ACTIONS.NONE);
        }

    }, [editBusinessGoalData]);

    return (
        <div>
            {/* Dialog Components Every state and functions are sent as props to be accessible to these Dialog components*/}
            <BusinessGoalDialog
                open={inputProps.openAddDialog}
                closeDialog={closeAddDialog}
                defaultBGGoal={defaultBGGoal}
                setDefaultBGGoal={setDefaultBGGoal}
                businessGoalData={businessGoalData}
                setBusinessGoalData={setBusinessGoalData}
                isFormInvalid={isFormInvalid}
                setIsFormInvalid={setIsFormInvalid}
                openCofirmationDialog={openConfirmationDialog}
                setOpenConfirmationDialog={setOpenConfirmationDialog}
                confirmationDialogTitle={confirmationDialogTitle}
                setconfirmationDialogTitle={setconfirmationDialogTitle}
                confirmationDialogContent={confirmationDialogContent}
                setconfirmationDialogContent={setconfirmationDialogContent}
                confirmationDialogActionContent={confirmationDialogActionContent}
                setconfirmationDialogActionContent={setconfirmationDialogActionContent}
                formValid={validateAddForm}
                loading={loading}
                openConfirmationDialogFunction={openConfirmationDialogFunction}
                closeConfirmationDialog={closeConfirmationDialog}
                handleSubmit={handleAddSubmit}
                duplicateMilestoneIndices={duplicateMilestoneIndices}
                setDuplicateMilestoneIndices={setDuplicateMilestoneIndices}
                bgNodePath={bgNodePath}
                usersList={usersList}
                updateSlidesinBG={updateSlidesinBG}
                deleteSlidesInBG={deleteSlidesInBG}
                replaceSlidesInBG={replaceSlidesInBG}
            />
            <BusinessGoalEditDialog
                isBusinessGoalDialogOpen={openEditDialog}
                isBGDeletable={isBGDeletable}
                defaultBGGoal={defaultBGGoal}
                setDefaultBGGoal={setDefaultBGGoal}
                prevValue={prevBGValue}
                openConfirmationDialogFunction={editOpenConfirmationDialogFunction}
                businessGoalData={editBusinessGoalData}
                setBusinessGoalData={setEditBusinessGoalData}
                isFormInvalid={isFormInvalid}
                setIsFormInvalid={setIsFormInvalid}
                usersList={usersList}
                duplicateMilestoneIndices={duplicateMilestoneIndices}
                setDuplicateMilestoneIndices={setDuplicateMilestoneIndices}
                bgNodePath={bgNodePath}
                formValid={validateEditForm}
                confirmationDialogTitle={confirmationDialogTitle}
                confirmationDialogActionContent={confirmationDialogActionContent}
                confirmationDialogContent={confirmationDialogContent}
                openConfirmationDialog={openConfirmationDialog}
                closeConfirmationDialog={closeConfirmationDialog}
                handleSubmit={handleEditSubmit}
                loading={loading}
                updateSlidesinBG={updateSlidesinBG}
                deleteSlidesInBG={deleteSlidesInBG}
                replaceSlidesInBG={replaceSlidesInBG}
            />

            <BusinessGoalDialogComponent
                isBusinessGoalDialogOpen={isBusinessGoalDialogOpen}
                setOpenEditDialog={setOpenEditDialog}
                businessGoalData={editBusinessGoalData}
                loading={loading}
                closeDialog={closePresentationDialog}
                displayMode={displayMode}
                backwardArrowClick={backwardArrowClick}
                businessGoalDropDownChange={businessGoalDropDownChange}
                forwardArrowClick={forwardArrowClick}
                handleDisplayModeDropDownChange={handleDisplayModeDropDownChange}
                handleDeleteBGNote={deleteBGNote}
                isBackwardArrowDisabled={isBackwardArrowDisabled}
                isForwardArrowDisabled={isForwardArrowDisabled}
                businessGoalDropDownList={businessGoalDropDownList}
                currentBGName={currentBGName}
                onShowNotesClick={onShowNotesClick}
                // Object View props
                openBusinessGoalObjectView={inputProps.openObjectView}
                closeObjectView={closeObjectView}
                saveBGNotes={saveBGNotes}
                updateNoteView={updateNoteView}
                loadingNotesCircularIcon={loadingNotesCircularIcon}
                notesList={notesList}
                setNotesList={setNotesList}
                onObjectViewButtonClick={onObjectViewButtonClick}
                showNotes={showNotes}
                openCompleteDialog={openCompleteDialog}
                showCreateActionButton={inputProps.showCreateActionButton}
                onCreateActionButtonClick={inputProps.onCreateActionButtonClick}
            />

            {/* Snackbar to display the success/error popup */}
            <Snackbar
                open={openAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                key={'top' + 'center'}
                autoHideDuration={ALERT_DURATION}
                onClose={() => setOpenAlert(false)}>
                <Alert
                    icon={
                        ALERT_SEVERITY.SUCCESS === alertSeverity ?
                            <CheckCircleOutlineIcon fontSize="medium" /> :
                            <ErrorOutlineIcon fontSize="medium" />
                    }
                    severity={alertSeverity}
                    style={{ width: "500px" }}
                >
                    {alertContent}
                </Alert>
            </Snackbar>
        </div>
    );
}
