import { ObjectView } from "@esko/cloud-ui-components/dist/esm";
import { Avatar, Button, Divider, Grid, ThemeProvider, Tooltip, Typography } from "@material-ui/core";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CreateIcon from '@material-ui/icons/Create';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import React, { useContext, useEffect, useState } from "react";
import { BG_EDIT_NO_PERMISSION } from "../constant/BusinessGoalTexts";
import { COLOR_AMBER_2, COLOR_AZURE_2, COLOR_GRAPHITE_4 } from "../constant/Colors";
import { BUSINESS_GOAL_DISPLAY_MODE } from "../constant/InnovationEnums";
import { InnovationAppContext } from "../context/InnovationAppContext";
import { NoteInterface, MeetingTopicInterface } from "../interfaces/InnovationInterface";
import { ObjectViewStyle, ObjectViewTheme, ShowNotesStyle } from "../themes/ObjectViewTheme";
import { BusinessGoalType } from "../view/MPLView";
import { CommentNotes, DropDownOptionsInterface } from "./notesComponent/CommentNotes";
import { NotesList } from "./notesComponent/NotesList";

/**Interface class to define the type of props*/
export interface ObjectViewProps {
    /**State to decide upon the opening and closing of the object view */
    openObjectView: boolean;
    setOpenEditDialog?: React.Dispatch<React.SetStateAction<boolean>>;
    /**Callback function called when the object view is closed */
    closeObjectView: () => void;
    /**The buisness goal data to be displayed */
    businessGoalData?: BusinessGoalType;
    textData?: MeetingTopicInterface;
    /**Call back for saving the notes when user clicks on the post button */
    saveNotes: (notesData: NoteInterface, businessGoalName: string) => void;
    /**Function to update the view of the notes */
    updateNoteView: (notesView: string, businessGoalName: string, businessGoalNoteName: string) => void;
    /**State to list all the notes added for a given business goal */
    notesList: NoteInterface[];
    setNotesList: React.Dispatch<React.SetStateAction<NoteInterface[]>>;
    /**State to enable or disabled the loading animation when the notes data/list is being fetched */
    loadingNotesCircularIcon: boolean;
    /**Call back function for the View related UI button (SIR, PPG, Edit) */
    handleDeleteBGNote: (inBusinessGoalName: string, inBusinessNoteName: string) => void;
    onObjectViewButtonClick?: (inView: BUSINESS_GOAL_DISPLAY_MODE) => void;
    /**State to change the z-index value of object view */
    showNotes: boolean;
    isEditable: boolean;
    /**Create Action */
    showCreateActionButton?: boolean;
    onCreateActionButtonClick?: () => void;
}

export default function ObjectViewComponent(props: ObjectViewProps) {

    /**Getting the Cloud account data, current user info and saving it in a local constant */
    const lInnovationData = useContext(InnovationAppContext);
    /**State to hold the User name */
    const [userName, setUserName] = useState<string>(lInnovationData.currentUserInfo.displayName.toString());

    /**Whenever the username changes update the state */
    useEffect(() => {
        setUserName(lInnovationData.currentUserInfo.displayName.toString());
    }, [lInnovationData.currentUserInfo])

    /**Get the styles */
    const ObjectViewStyleClass = ObjectViewStyle();
    const ShowNotesStyleClass = ShowNotesStyle({ showNotes: props.showNotes })

    /**Drop down field */
    const dropDownFields: DropDownOptionsInterface[] = [
        {
            id: "Public",
            value: "Public",
            icon: <PeopleRoundedIcon />
        },
        {
            id: "Private",
            value: "Private",
            icon: <AccountCircleRoundedIcon />
        }
    ]

    return (
        <ThemeProvider theme={ObjectViewTheme}>
            <ObjectView
                properties={{}}
                DrawerProps={{
                    open: props.openObjectView,
                    className: ShowNotesStyleClass.objectViewIndex
                }}
                headerTitle={props.businessGoalData ? props.businessGoalData.businessGoalName : (undefined !== props.textData ? props.textData.topic : "")}
                headerIcon={
                    props.businessGoalData &&
                    <Avatar
                        src={props.businessGoalData.thumbnail}
                        className={ObjectViewStyleClass.thumbnail}
                    />
                }
                onClose={props.closeObjectView}
                width={500}
                objectId={""}
            >
                {() => {
                    return (
                        <div>
                            <Grid container direction='column' spacing={2}>
                                {/**UI Buttons */}
                                {
                                    props.businessGoalData &&
                                    <Grid item container
                                        direction='row'
                                        spacing={2}
                                        style={{ marginLeft: "-2px" }}
                                    >
                                        {/* SIR Presentation button */}
                                        <Grid item>
                                            <Button
                                                startIcon={<OnDemandVideoIcon />}
                                                style={{ width: "140px", height: "35px", backgroundColor: COLOR_AMBER_2 }}
                                                onClick={() => { props.onObjectViewButtonClick && (props.onObjectViewButtonClick(BUSINESS_GOAL_DISPLAY_MODE.SIR_PRESENTATION)) }}
                                            >
                                                SIR
                                            </Button>
                                        </Grid>
                                        {/* PPG Presentation button */}
                                        <Grid item>
                                            <Button
                                                startIcon={<OnDemandVideoIcon />}
                                                style={{ width: "140px", height: "35px", backgroundColor: COLOR_AZURE_2, color: "white" }}
                                                onClick={() => { props.onObjectViewButtonClick && (props.onObjectViewButtonClick(BUSINESS_GOAL_DISPLAY_MODE.PPG_PRESENTATION)) }}
                                            >
                                                PPG
                                            </Button>
                                        </Grid>
                                        {/* Edit Business Goal button */}
                                        <Tooltip
                                            title={props.isEditable ? "" : BG_EDIT_NO_PERMISSION}
                                            placement="bottom-start"
                                        >
                                            <Grid item>
                                                <Button
                                                    startIcon={<CreateIcon style={{ color: "white" }} />} variant="outlined"
                                                    disabled={!props.isEditable}
                                                    className={ObjectViewStyleClass.editButton}
                                                    onClick={() => { props.setOpenEditDialog && props.setOpenEditDialog(true) }}
                                                >
                                                    Edit...
                                                </Button>
                                            </Grid>
                                        </Tooltip>
                                    </Grid>
                                }
                                {
                                    props.showCreateActionButton && lInnovationData.userPermission.meetingModel.isActionEditable &&
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            className={ObjectViewStyleClass.actionButton}
                                            onClick={props.onCreateActionButtonClick}
                                        >
                                            + Create Action...
                                        </Button>
                                    </Grid>
                                }
                                {/**Divider between the UI Button and Definitions */}
                                <Grid item>
                                    <Divider light style={{ marginLeft: "4px", marginRight: "14px", backgroundColor: COLOR_GRAPHITE_4 }} />
                                </Grid>
                                {/**Grid for the description */}
                                {
                                    props.businessGoalData &&
                                    <Grid container item
                                        spacing={2}
                                        direction="column" className={ObjectViewStyleClass.descriptionRootContainer}
                                    >
                                        {/* Problem Definition grid */}
                                        <Grid item className={ObjectViewStyleClass.descriptionRootItem}>
                                            <Typography noWrap className={ObjectViewStyleClass.descriptionHeading}>
                                                Problem Definition:
                                            </Typography>
                                            <Tooltip
                                                title={props.businessGoalData.problemDefinition}
                                                placement="bottom-start"
                                                classes={{ tooltip: ObjectViewStyleClass.descriptionTooltip }}
                                            >
                                                <Typography className={ObjectViewStyleClass.descriptionContent}>
                                                    {
                                                        props.businessGoalData.problemDefinition.length === 0 ?
                                                            "Yet to be added..." :
                                                            props.businessGoalData.problemDefinition
                                                    }
                                                </Typography>
                                            </Tooltip>
                                        </Grid>
                                        {/* Brief Description Grid */}
                                        <Grid item className={ObjectViewStyleClass.descriptionRootItem}>
                                            <Typography className={ObjectViewStyleClass.descriptionHeading}>
                                                Brief Description:
                                            </Typography>
                                            <Tooltip
                                                title={props.businessGoalData.briefDescription}
                                                placement="bottom-start"
                                                classes={{ tooltip: ObjectViewStyleClass.descriptionTooltip }}
                                            >
                                                <Typography className={ObjectViewStyleClass.descriptionContent}>
                                                    {
                                                        props.businessGoalData.briefDescription.length === 0 ?
                                                            "Yet to be added..." :
                                                            props.businessGoalData.briefDescription
                                                    }
                                                </Typography>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                }
                                {/**Divider between UI button and definitions */}
                                <Grid item>
                                    <Divider light style={{ marginLeft: "4px", marginRight: "14px", backgroundColor: COLOR_GRAPHITE_4 }} />
                                </Grid>
                            </Grid>
                            {/**Place holder for notes */}
                            <Grid item style={{ marginRight: "13px", marginLeft: "4px" }}>
                                <CommentNotes
                                    dropDownFields={dropDownFields}
                                    userName={userName}
                                    businessGoalName={props.businessGoalData ? props.businessGoalData.businessGoalName : props.textData?.topic}
                                    saveNotes={props.saveNotes}
                                    setNotesList={props.setNotesList}
                                    notesList={props.notesList}
                                />
                            </Grid>
                            {/* Grid for the list of business goal notes */}
                            <Grid item style={{ marginRight: "13px", marginLeft: "4px", marginTop: "4px" }}>
                                <NotesList
                                    dropDownFields={dropDownFields}
                                    onDropDownValueChange={(changedValue: any) => {
                                        console.log(changedValue);
                                    }}
                                    isBusinessGoalNotes={undefined !== props.businessGoalData}
                                    userName={userName}
                                    handleDeleteBGNote={props.handleDeleteBGNote}
                                    notesList={props.notesList}
                                    loadingNotesCircularIcon={props.loadingNotesCircularIcon}
                                    updateNoteView={props.updateNoteView}
                                    businessGoalName={props.businessGoalData?.businessGoalName.toString()}
                                />
                            </Grid>
                        </div>
                    )
                }}
            </ObjectView>
        </ThemeProvider>
    )
}
