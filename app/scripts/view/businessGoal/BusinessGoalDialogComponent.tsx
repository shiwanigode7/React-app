/**TSX file for the full screen dialog  */
import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Button as MUIButton, Dialog, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, ThemeProvider, Tooltip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import CloudDownloadRoundedIcon from "@material-ui/icons/CloudDownloadRounded";
import MessageIcon from "@material-ui/icons/Message";
import React, { useContext, useEffect, useState } from "react";
import { DialogViewSwitchButton } from "../../components/DialogViewSwitchButton";
import ObjectViewComponent from "../../components/ObjectView";
import { BG_DISPLAY_MODE_DROP_DOWN } from "../../constant/BusinessGoalTexts";
import { BUSINESS_GOAL_DISPLAY_MODE } from "../../constant/InnovationEnums";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { NoteInterface, DropDownInterface, SlidesModel } from "../../interfaces/InnovationInterface";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import { BusinessGoalDialogComponentStyles } from "../../themes/BusinessGoalDialogComponentTheme";
import { BusinessGoalType } from "../MPLView";
import { PPGPresentation } from "../presentation/PPGPresentation";
import { SIRPresentation } from "../presentation/SIRPresentation";
import { EditOutlinedInputTheme } from "../theme";

declare interface BusinessGoalDialogComponentPropsModel {
    /**State to open the dialog for SIR/PPG/Edit */
    isBusinessGoalDialogOpen: boolean;
    setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
    /**State to hold the business goal data with the latest changes */
    businessGoalData: BusinessGoalType;
    /**State to set the loading animation when the data is being updated */
    loading: boolean;
    /**Function to open and close the confirmation dialog */
    closeDialog: () => void;
    /**State to hold the selected view */
    displayMode: string;
    /**Functions to handle the business goal name change */
    handleDisplayModeDropDownChange: (inKeyName: string) => void;
    handleDeleteBGNote: (inBusinessGoalName: string, inBusinessNoteName: string) => void;
    forwardArrowClick: (inBusinessGoalName: string) => void;
    backwardArrowClick: (inBusinessGoalName: string) => void;
    /**Function to handle the view drop down value change */
    businessGoalDropDownChange: (inBusinessGoalName: string) => void;
    /**Function to check if the icons are to be disabled or enabled based on the current business goal name */
    isForwardArrowDisabled: (inBusinessGoalName: string) => boolean;
    isBackwardArrowDisabled: (inBusinessGoalName: string) => boolean;
    /**List of business goal list to be displayed in the drop down */
    businessGoalDropDownList: DropDownInterface[];
    /**State to hold the name of the current business goal selected */
    currentBGName: string;
    /**Call back function for the show notes button */
    onShowNotesClick: () => void;
    /**State to decide upon the opening and closing of the object view */
    openBusinessGoalObjectView: boolean;
    /**Callback function called when the object view is closed */
    closeObjectView: () => void;
    /**Call back for saving the notes when user clicks on the post button */
    saveBGNotes: (notesData: NoteInterface, businessGoalName: string) => void;
    /**Function to update the view of the notes */
    updateNoteView: (notesView: string, businessGoalName: string, businessGoalNoteName: string) => void;
    /**State to list all the notes added for a given business goal */
    notesList: NoteInterface[];
    setNotesList: React.Dispatch<React.SetStateAction<NoteInterface[]>>;
    /**State to enable or disabled the loading animation when the notes data/list is being fetched */
    loadingNotesCircularIcon: boolean;
    /**Call back function for the View related UI button (SIR, PPG, Edit) */
    onObjectViewButtonClick: (inView: BUSINESS_GOAL_DISPLAY_MODE) => void;
    /**State to change the z-index value of object view */
    showNotes: boolean;
    /**State to show the overall dialog*/
    openCompleteDialog: boolean;
    showCreateActionButton?: boolean;
    onCreateActionButtonClick?: () => void;
}

export function BusinessGoalDialogComponent(BGDialogComponentProps: BusinessGoalDialogComponentPropsModel) {

    const showOnlyObjectView: boolean = !BGDialogComponentProps.isBusinessGoalDialogOpen && BGDialogComponentProps.openBusinessGoalObjectView && !BGDialogComponentProps.showNotes;
    const disableShowNotes: boolean = BGDialogComponentProps.isBusinessGoalDialogOpen && !BGDialogComponentProps.showNotes;
    /**Importing styles */
    const BusinessGoalDialogStyleClasses = BusinessGoalDialogComponentStyles({
        showOnlyObjectView: showOnlyObjectView,
        disableShowNotes: disableShowNotes,
        isBusinessGoalDialogOpen: BGDialogComponentProps.isBusinessGoalDialogOpen,
        openCompleteDialog: BGDialogComponentProps.openCompleteDialog
    });
    /**Getting the Cloud account data, current user info and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);
    const [isEditable, setIsEditable] = useState<boolean>(lInnovationData.userPermission.businessGoal.isAllBGEditable);

    /**State variable to handle Menu */
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const [isSlidesListEmpty, setIsSlidesListEmpty] = useState<boolean>(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = (lSlideUrl: string) => {
        window.open(lSlideUrl);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (!isEditable) {
            BusinessGoalService.canEditAndDeleteBG(lInnovationData.currentUserInfo.groupMembership,
                BGDialogComponentProps.businessGoalData.owner, lInnovationData.currentUserInfo.email)
                .then((response: any) => {
                    setIsEditable(response);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }

        /**Checking slides list and setting the value for "isSlidesListEmpty" */
        setIsSlidesListEmpty(0 === BGDialogComponentProps.businessGoalData.slides.length);
    }, [BGDialogComponentProps.businessGoalData])

    /**Dialog Action component which is displayed only for the edit business goal dialog */
    /**Constant to hold the dialog content to be displayed. */
    let holdDialogContent = null;
    switch (BGDialogComponentProps.displayMode) {
        case BUSINESS_GOAL_DISPLAY_MODE.SIR_PRESENTATION: holdDialogContent = <SIRPresentation businessGoalDetails={BGDialogComponentProps.businessGoalData} />; break;
        case BUSINESS_GOAL_DISPLAY_MODE.PPG_PRESENTATION: holdDialogContent = <PPGPresentation businessGoalDetails={BGDialogComponentProps.businessGoalData} />; break;
    }

    const DOWNLOAD_SLIDE_DECK_COMPONENT = <div>
        <Tooltip
            title={isSlidesListEmpty ? "No slides are available" : ""}
            placement="left"
            arrow>
            <div>
                <MUIButton
                    variant="outlined"
                    startIcon={<CloudDownloadRoundedIcon />}
                    className={BusinessGoalDialogStyleClasses.button}
                    onClick={handleClick}
                    disabled={isSlidesListEmpty}
                >
                    Download Slide Deck
                </MUIButton>
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    style={{
                        top: "35px",
                    }}
                    classes={{
                        paper: BusinessGoalDialogStyleClasses.menu
                    }}
                >
                    {BGDialogComponentProps.businessGoalData.slides.map((slide: SlidesModel) => (
                        <MenuItem onClick={() => handleDownload(slide.contentURI)}>
                            {slide.pptName}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </Tooltip>
    </div>;

    return (
        <ThemeProvider theme={LightTheme}>
            <Dialog
                open={BGDialogComponentProps.openCompleteDialog}
                fullScreen
                classes={{
                    paperFullScreen: BusinessGoalDialogStyleClasses.dialogPaperFullScreen,
                    root: BusinessGoalDialogStyleClasses.dialogRoot
                }}
                // Note: The position and zIndex of the property by default are set to 
                // the element directly rather than the css classes. So to achieve the condition
                // without inline styling was too hard. Since position field doesn't take
                // string as input forcing the state with "!important" always threw error.
                // Hence inline styling had to be done.
                style={{
                    position: showOnlyObjectView ? "unset" : "fixed"
                }}
                BackdropProps={{
                    classes: {
                        root: BusinessGoalDialogStyleClasses.dialogBackdropRoot
                    }
                }}
            >
                {
                    !BGDialogComponentProps.isBusinessGoalDialogOpen ? null :
                        <DialogTitle className={BusinessGoalDialogStyleClasses.dialogTitle}>
                            <ThemeProvider theme={EditOutlinedInputTheme}>
                                {/* Grid to display the Dialog Header Buttons popup */}
                                <Grid container direction="row"

                                    className={BusinessGoalDialogStyleClasses.gridRoot}
                                >
                                    {/* Arrow Icon and the Drop down for the business goal and the display mode */}
                                    <Grid item>
                                        <Grid container direction='row' spacing={2} className={BusinessGoalDialogStyleClasses.dropDownAndButtonGrid}>
                                            {/* Backward arrow */}
                                            <Grid item>
                                                <IconButton
                                                    onClick={() => { BGDialogComponentProps.backwardArrowClick(BGDialogComponentProps.currentBGName) }}
                                                    disabled={BGDialogComponentProps.isBackwardArrowDisabled(BGDialogComponentProps.currentBGName)}
                                                    classes={{
                                                        disabled: BusinessGoalDialogStyleClasses.iconDisabled
                                                    }}
                                                >
                                                    <ArrowBackIosIcon fontSize="medium" style={{ color: "white" }} />
                                                </IconButton>
                                            </Grid>
                                            {/* Business Goal Drop down */}
                                            <Grid item>
                                                <DialogViewSwitchButton
                                                    defaultValue={BGDialogComponentProps.currentBGName}
                                                    menuList={BGDialogComponentProps.businessGoalDropDownList}
                                                    onChangeCallBack={BGDialogComponentProps.businessGoalDropDownChange}
                                                    variant={"wide"}
                                                />
                                            </Grid>
                                            {/* Display Mode drop down */}
                                            <Grid item>
                                                <DialogViewSwitchButton
                                                    defaultValue={BGDialogComponentProps.displayMode}
                                                    menuList={BG_DISPLAY_MODE_DROP_DOWN}
                                                    onChangeCallBack={BGDialogComponentProps.handleDisplayModeDropDownChange}
                                                    variant={"narrow"}
                                                />
                                            </Grid>
                                            {/* Forward arrow */}
                                            <Grid item >
                                                <IconButton
                                                    onClick={() => { BGDialogComponentProps.forwardArrowClick(BGDialogComponentProps.currentBGName) }}
                                                    disabled={BGDialogComponentProps.isForwardArrowDisabled(BGDialogComponentProps.currentBGName)}
                                                    classes={{
                                                        disabled: BusinessGoalDialogStyleClasses.iconDisabled
                                                    }}
                                                >
                                                    <ArrowForwardIosIcon fontSize="medium" style={{ color: "white" }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* Grid containing show notes UI button and close icon */}
                                    <Grid item>
                                        <Grid
                                            container
                                            direction='row'
                                            spacing={2}
                                            className={BusinessGoalDialogStyleClasses.header}
                                        >
                                            {/* Download Slide button */}
                                            <Grid item>
                                                {DOWNLOAD_SLIDE_DECK_COMPONENT}
                                            </Grid>
                                            {/* Show Notes button */}
                                            <Grid item>
                                                <MUIButton
                                                    variant="outlined"
                                                    startIcon={<MessageIcon />}
                                                    className={BusinessGoalDialogStyleClasses.button}
                                                    onClick={BGDialogComponentProps.onShowNotesClick}
                                                >
                                                    Show Notes
                                                </MUIButton>
                                            </Grid>
                                            {/* Close Icon */}
                                            <Grid item>
                                                <IconButton
                                                    onClick={BGDialogComponentProps.closeDialog}
                                                >
                                                    <CloseIcon fontSize="medium" className={BusinessGoalDialogStyleClasses.iconColor} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </DialogTitle>
                }
                <DialogContent className={BusinessGoalDialogStyleClasses.dialogContentRoot}>
                    {holdDialogContent}
                </DialogContent>
                {/* Business Goal Object view component */}
                <div className={BusinessGoalDialogStyleClasses.objectViewRootDiv}>
                    <ObjectViewComponent
                        openObjectView={BGDialogComponentProps.openBusinessGoalObjectView}
                        closeObjectView={BGDialogComponentProps.closeObjectView}
                        setOpenEditDialog={BGDialogComponentProps.setOpenEditDialog}
                        businessGoalData={BGDialogComponentProps.businessGoalData}
                        saveNotes={BGDialogComponentProps.saveBGNotes}
                        updateNoteView={BGDialogComponentProps.updateNoteView}
                        loadingNotesCircularIcon={BGDialogComponentProps.loadingNotesCircularIcon}
                        notesList={BGDialogComponentProps.notesList}
                        setNotesList={BGDialogComponentProps.setNotesList}
                        onObjectViewButtonClick={BGDialogComponentProps.onObjectViewButtonClick}
                        showNotes={BGDialogComponentProps.showNotes}
                        isEditable={isEditable}
                        handleDeleteBGNote={BGDialogComponentProps.handleDeleteBGNote}
                        showCreateActionButton={BGDialogComponentProps.showCreateActionButton}
                        onCreateActionButtonClick={BGDialogComponentProps.onCreateActionButtonClick}
                    />
                </div>
            </Dialog>
        </ThemeProvider>
    );

}
