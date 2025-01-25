/**TSX file to define the reusable comments (notes) for a node */
import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Avatar, Grid, IconButton, ListItem, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, Tooltip, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import { NoteInterface } from "../../interfaces/InnovationInterface";
import { CommentNotesStyles } from "../../themes/CommentNotesTheme";
import { generateRandomUUID } from "../../utils/UUIDGenerator";

export declare interface DropDownOptionsInterface {
    id: any,
    value: any,
    icon: any
}

declare interface CommentNotesInterface {
    /**The list to be displayed in the dropdown */
    dropDownFields: DropDownOptionsInterface[],
    /**Function to save the value in repo */
    saveNotes: (notesData: NoteInterface, businessGoalName: string) => void,
    /**BusinessGoalName */
    businessGoalName?: string,
    /**name of the user */
    userName: string,
    notesList: NoteInterface[],
    setNotesList: React.Dispatch<React.SetStateAction<NoteInterface[]>>;
}

export function CommentNotes(inNotesProps: CommentNotesInterface) {

    /**State variable to have the default note data */
    const [defaultNote, setDefaultNote] = useState<NoteInterface>({
        noteName: "",
        data: "",
        owner: inNotesProps.userName,
        noteView: "Public",
        date: new Date('')
    })

    /**Update the userName to the state variables whenever the value is changed */
    useEffect(() => {
        setBusinessGoalNotedata((prevState: NoteInterface) => ({
            ...prevState,
            owner: inNotesProps.userName
        }))
        setDefaultNote((prevState: NoteInterface) => ({
            ...prevState,
            owner: inNotesProps.userName
        }))
    }, [inNotesProps.userName])

    /**State to save the values of the noteData */
    const [businessGoalNotedata, setBusinessGoalNotedata] = useState<NoteInterface>(defaultNote);
    /**State to disable the button if user has not entered anything in the note */
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    /**Import the styles */
    const CommentNotesStylesClasses = CommentNotesStyles();

    /**Function to register user typed value */
    const handleNoteValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        /**Whenever the user enters a value in text field set the value to businessGoalNotedata*/
        setBusinessGoalNotedata((prevState: NoteInterface) => ({
            ...prevState,
            data: event.target.value
        }))
    }

    /**Disable the post button if the user has not entered any characters */
    useEffect(() => {
        if (businessGoalNotedata.data.trim() === "") {
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);
        }
    }, [businessGoalNotedata.data])

    /**Function to handle change of data in the drop down */
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        /**Whenever the user changes the dropdown value set the value to businessGoalNotedata*/
        setBusinessGoalNotedata((prevState: NoteInterface) => ({
            ...prevState,
            noteView: event.target.value as string
        }))

    }

    /**Function to handle the note/comment submit event */
    const handleNoteSubmit = () => {
        /**Save the note to repo */
        let lBusinessGoalNoteData: NoteInterface = businessGoalNotedata;
        lBusinessGoalNoteData.noteName = generateRandomUUID();
        inNotesProps.saveNotes(lBusinessGoalNoteData, inNotesProps.businessGoalName ? inNotesProps.businessGoalName : "");
        setBusinessGoalNotedata(defaultNote);
        inNotesProps.setNotesList([])
    }

    /**Variable that stores the Month list to show it in date */
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    /**Variable to save the current Date and Time */
    const date: Date = new Date();

    return (
        <Grid container direction="column" spacing={1}>
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
                        title={inNotesProps.userName}
                        placement="right-start"
                        arrow
                    >
                        <Avatar
                            style={{
                                color: LightTheme.palette.getContrastText(LightTheme.palette.getUserColor ?
                                    LightTheme.palette.getUserColor(
                                        (
                                            inNotesProps.userName.split(", ")[1] !== undefined ?
                                                inNotesProps.userName.split(", ")[1].charAt(0) :
                                                ""
                                        ) +
                                        (
                                            inNotesProps.userName.split(", ")[0] !== undefined ?
                                                inNotesProps.userName.split(", ")[0].charAt(0) :
                                                ""
                                        )
                                    ) :
                                    LightTheme.palette.grey[400] || "#bdbdbd"
                                ),
                                height: "30px",
                                width: "30px",
                                fontSize: "13px",
                                backgroundColor: LightTheme.palette.getUserColor ?
                                    LightTheme.palette.getUserColor(
                                        (
                                            inNotesProps.userName.split(", ")[1] !== undefined ?
                                                inNotesProps.userName.split(", ")[1].charAt(0) :
                                                ""
                                        ) +
                                        (
                                            inNotesProps.userName.split(", ")[0] !== undefined ?
                                                inNotesProps.userName.split(", ")[0].charAt(0) :
                                                ""
                                        )
                                    ) :
                                    "#bdbdbd"
                            }}
                        >
                            {
                                (
                                    inNotesProps.userName.split(", ")[1] !== undefined ?
                                        inNotesProps.userName.split(", ")[1].charAt(0) :
                                        ""
                                ) +
                                (
                                    inNotesProps.userName.split(", ")[0] !== undefined ?
                                        inNotesProps.userName.split(", ")[0].charAt(0) :
                                        ""
                                )
                            }
                        </Avatar>
                    </Tooltip>
                </Grid>
                {/**Component to display the date the note is added */}
                <Grid item>
                    <Typography>
                        {date.getDate()} {monthNames[date.getMonth()]}, {date.getFullYear()}
                    </Typography>
                </Grid>
                {/**Component to display drop down */}
                <Grid item className={CommentNotesStylesClasses.dropDownContainer}>
                    <Select
                        value={businessGoalNotedata.noteView}
                        onChange={handleChange}
                        variant="outlined"
                        classes={{
                            iconOutlined: CommentNotesStylesClasses.selectIcon,
                            outlined: CommentNotesStylesClasses.selectOutlined,
                        }}
                        input={
                            <OutlinedInput
                                classes={{
                                    notchedOutline: CommentNotesStylesClasses.inputOutline,
                                    root: CommentNotesStylesClasses.selectRoot
                                }}
                            />
                        }
                    >
                        {inNotesProps.dropDownFields.map((option) => (
                            <MenuItem key={option.id} value={option.value}>
                                <ListItem style={{ padding: 0, margin: 0 }}>
                                    <ListItemIcon className={CommentNotesStylesClasses.listItemIconRoot}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.value} />
                                </ListItem>
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            {/**Component to display actual notes */}
            <Grid item>
                <OutlinedInput
                    multiline
                    rows={8}
                    onChange={handleNoteValueChange}
                    value={businessGoalNotedata?.data}
                    fullWidth
                    classes={{
                        root: CommentNotesStylesClasses.inputMultilineRoot,
                        notchedOutline: CommentNotesStylesClasses.inputOutline,
                    }}
                    endAdornment={
                        <Tooltip title={"Post Comment"} placement="top">
                            <IconButton
                                onClick={handleNoteSubmit}
                                disabled={isDisabled}
                                color={"primary"}
                                classes={{
                                    colorPrimary: CommentNotesStylesClasses.iconButton,
                                    disabled: CommentNotesStylesClasses.iconButtonDisabled
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </Grid>
        </Grid>
    );
}