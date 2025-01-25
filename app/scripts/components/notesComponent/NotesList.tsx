/**TSX file to define the reusable comments (notes) for a node */
import { Avatar, CircularProgress, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { DELETE_BUSINESSGOAL_NOTE_CONTENT, DELETE_BUSINESS_GOAL_NOTE_TITLE } from "../../constant/InnovationMessages";
import { NoteInterface } from "../../interfaces/InnovationInterface";
import { CommentNotesStyles } from "../../themes/CommentNotesTheme";
import { NotesViewScrollBarTheme, ObjectViewStyle } from "../../themes/ObjectViewTheme";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../utils/UserAvatarColorFunction";
import ConfirmationDialog from "../../view/ConfirmationDialog";
import { DropDownOptionsInterface } from "./CommentNotes";
import { DisplayNotesData } from "./DisplayNotesData";
import { DisplayNotesView } from "./DisplayNotesView";

/**declaring types for the props */
declare interface NotesListInterface {
    /**Call back Function to be called when the dropdown value is changed  */
    onDropDownValueChange: (newValue: any) => void,
    /**The list to be displayed in the dropdown */
    dropDownFields: DropDownOptionsInterface[],
    /**name of the user */
    userName: string,
    handleDeleteBGNote: (inBusinessGoalName: string, inBusinessNoteName: string) => void,
    /**List of Notes data */
    notesList: NoteInterface[],
    /**Function to update the note view */
    updateNoteView: (notesView: string, businessGoalName: string, businessGoalNoteName: string) => void;
    /**Business Goal Name the note belongs to */
    businessGoalName?: string;
    loadingNotesCircularIcon: boolean;
    isBusinessGoalNotes: boolean;
}

export function NotesList(inNotesProps: NotesListInterface) {

    /**Get the styles */
    const ObjectViewStyleClass = ObjectViewStyle();
    /**Styling declaration */
    const NotesViewScrollBarThemeClass = NotesViewScrollBarTheme();
    /**Import the styles */
    const CommentNotesStylesClasses = CommentNotesStyles();

    /**Variable that stores the Month list to show it in date */
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /**Parse single digit time values ex: 3-30 to 03-30 */
    const parseSingleDigit = (value: { toString: () => string; }) => {
        var val = "0" + value.toString();
        return val.slice(-2);
    }

    /**Function to provide the Display date which finds the difference between today's date/time with the date/time added */
    const getDisplayDate = (date: string | number | Date) => {
        const today = new Date();
        let compDate = new Date(date);
        const diff = today.getTime() - compDate.getTime();
        let timeDiff = "";
        if ((compDate.getDate() == today.getDate()) && (compDate.getMonth() == today.getMonth())) {
            if (diff / 3600000 > 1) {
                timeDiff = (today.getHours() - compDate.getHours() + " hours ago")
            }
            else {
                timeDiff = (Math.floor(diff / 60000) + " minutes ago")
            }
        }
        else if (diff <= (2 * 24 * 60 * 60 * 1000)) {
            timeDiff = "Yesterday at " + parseSingleDigit(compDate.getUTCHours()) + ":" + parseSingleDigit(compDate.getUTCMinutes());
        }
        else {
            timeDiff = parseSingleDigit(compDate.getUTCDate()) + " " + months[compDate.getUTCMonth()] + ", " + compDate.getUTCFullYear() + " at " + parseSingleDigit(compDate.getUTCHours()) + ":" + parseSingleDigit(compDate.getUTCMinutes()); // or format it what ever way you want
        }
        return timeDiff
    }

    /**State variable to have the notes List (Don't want to change the original data so creating a duplicate variable to store and use the data)*/
    const [duplicateNotesData, setDuplicateNotesData] = useState<NoteInterface[]>([]);
    /**State variable to have the List of notes data to be Displayes */
    const [displayNotesData, setDisplayNotesData] = useState<NoteInterface[]>([]);
    /**State variable to say Extra notes available to load for infinite scrolling */
    const [hasExtraNotes, setHasExtraNotes] = useState<boolean>(false);
    const [openConfirmationDialog, setOpenCompleteDialog] = useState<boolean>(false);
    const [businessNoteName, setBusinessNoteName] = useState<string>("");

    /**Whenever the notesList gets updated set the values for duplicateNotesData and displayNotesData */
    useEffect(() => {
        setDuplicateNotesData(inNotesProps.notesList.slice(7, inNotesProps.notesList.length));
        setDisplayNotesData(inNotesProps.notesList.slice(0, 7));
        if (inNotesProps.notesList.length > 7) {
            setHasExtraNotes(true);
        }
        else {
            setHasExtraNotes(false);
        }
    }, [inNotesProps.notesList])

    /**Whenever the displayNotesData is changed update the duplicateNotesData */
    useEffect(() => {
        setDuplicateNotesData(duplicateNotesData);
    }, [displayNotesData])

    /**Function to Load next set of data to display data */
    const onInfiniteLoad = () => {
        /**If there is no data left stop the infinite scrolling */
        if (duplicateNotesData.length == 0) {
            setHasExtraNotes(false);
        }
        /**load the next set of data to displayNotesData */
        if (duplicateNotesData.length < 7) {
            setDisplayNotesData(displayNotesData.concat(duplicateNotesData.splice(0, duplicateNotesData.length)));
        }
        else {
            setDisplayNotesData(displayNotesData.concat(duplicateNotesData.splice(0, 7)));
        }
    }

    const closeConfirmationDialog = () => {
        setOpenCompleteDialog(false);
    }

    const handleConfirmation = () => {
        inNotesProps.handleDeleteBGNote(inNotesProps.businessGoalName ? inNotesProps.businessGoalName : "", businessNoteName);
        closeConfirmationDialog();
    }

    return (

        <div style={{ height: inNotesProps.isBusinessGoalNotes ? "257px" : "455px", overflowX: "hidden" }} className={NotesViewScrollBarThemeClass.ScrollBarClass}>
            {
                /**Check for the loadingNotesCircularIcon props and show the loading icon while getting the data */
                inNotesProps.loadingNotesCircularIcon ? <CircularProgress style={{ color: "white", marginLeft: "205px" }} /> :
                    /**If there is no vaue display the message */
                    !inNotesProps.loadingNotesCircularIcon && inNotesProps.notesList.length == 0 ?
                        <h5 style={{ marginLeft: "65px" }}>No notes available for this particular Business Goal</h5> :
                        /**If there are values display the notes List  */
                        <InfiniteScroll
                            initialLoad={false}
                            style={{ maxHeight: "100vh" }}
                            pageStart={0}
                            loadMore={onInfiniteLoad}
                            hasMore={hasExtraNotes} loader={<CircularProgress style={{ color: "white", height: "20px", width: "20px", marginLeft: "205px" }} />}
                            useWindow={false}
                        >
                            {displayNotesData.map((note: NoteInterface) => (
                                <Grid container direction="column" style={{ paddingRight: "4px" }} spacing={1}>
                                    <Grid
                                        item container
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {/**User Logo to be displayed */}
                                        <Grid item>
                                            <Tooltip
                                                title={note.owner}
                                                placement="right-start"
                                                arrow>
                                                <Avatar
                                                    style={{
                                                        color: userAvatarTextColor(note.owner.toString()),
                                                        height: "30px",
                                                        width: "30px",
                                                        fontSize: "13px",
                                                        backgroundColor: userAvatarBackgroundColor(note.owner.toString())
                                                    }}
                                                >
                                                    {
                                                        (
                                                            note.owner.split(", ")[1] !== undefined ?
                                                                note.owner.split(", ")[1].charAt(0) :
                                                                ""
                                                        ) +
                                                        (
                                                            note.owner.split(", ")[0] !== undefined ?
                                                                note.owner.split(", ")[0].charAt(0) :
                                                                ""
                                                        )
                                                    }
                                                </Avatar>
                                            </Tooltip>
                                        </Grid>
                                        {/**Component to display the date the note is added */}
                                        <Grid item>
                                            <Typography>
                                                {getDisplayDate(note.date)}
                                            </Typography>
                                        </Grid>
                                        {/**Component to display drop down */}
                                        <Grid item className={CommentNotesStylesClasses.dropDownContainer}>
                                            <DisplayNotesView
                                                noteName={note.noteName}
                                                businessGoalName={inNotesProps.businessGoalName}
                                                updateNoteView={inNotesProps.updateNoteView}
                                                ownerName={note.owner} userName={inNotesProps.userName}
                                                dropDownFields={inNotesProps.dropDownFields}
                                                noteView={note.noteView} />
                                        </Grid>
                                        {
                                            inNotesProps.userName === note.owner &&
                                            <Grid item>
                                                <Tooltip title="Delete Note" placement="right" arrow>
                                                    <IconButton
                                                        className={ObjectViewStyleClass.deleteIconButton}
                                                        onClick={() => {
                                                            setBusinessNoteName(note.noteName);
                                                            setOpenCompleteDialog(true);
                                                        }}>
                                                        <DeleteForeverRoundedIcon
                                                            className={ObjectViewStyleClass.deleteIcon}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid item className={ObjectViewStyleClass.descriptionRootItem}>
                                        <DisplayNotesData notesData={note.data} />
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                </Grid>
                            ))}
                        </InfiniteScroll>
            }
            <ConfirmationDialog
                confirmationDialogTitle={DELETE_BUSINESS_GOAL_NOTE_TITLE}
                confirmationDialogContent={DELETE_BUSINESSGOAL_NOTE_CONTENT}
                confirmationActionContent={"Delete Note"}
                open={openConfirmationDialog}
                closeConfirmationDialog={closeConfirmationDialog}
                handleSubmit={handleConfirmation}
                loading={false}
            />
        </div>
    );
}