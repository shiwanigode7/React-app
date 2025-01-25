
import { ListItem, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import React, { useState } from "react";
import { CommentNotesStyles } from "../../themes/CommentNotesTheme";
import { DropDownOptionsInterface } from "./CommentNotes";

declare interface DisplayNotesViewInterface {
    noteView: string,
    /**The list to be displayed in the dropdown */
    dropDownFields: DropDownOptionsInterface[],
    /**name of the user */
    userName: string,
    /**Name of the owner of the note */
    ownerName: string,
    /**Function to update the note view */
    updateNoteView: (notesView: string, businessGoalName: string, businessGoalNoteName: string) => void;
    /**Name of the note */
    noteName: string,
    /**Business Goal Name the note belongs to */
    businessGoalName?: string;
}

export function DisplayNotesView(displayNotesViewProps: DisplayNotesViewInterface) {

    /**Import the styles */
    const displayNotesStylesClasses = CommentNotesStyles();

    /**State to have the value of Note view */
    const [noteViewValue, setNoteViewValue] = useState<string>(undefined === displayNotesViewProps.noteView ? "Public" : displayNotesViewProps.noteView.toString())

    /**Function to handle change of data in the drop down */
    const handleNoteViewChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNoteViewValue(event.target.value as string);
        displayNotesViewProps.updateNoteView(event.target.value as string, displayNotesViewProps.businessGoalName ? displayNotesViewProps.businessGoalName.toString() : "", displayNotesViewProps.noteName.toString())
    };

    return (
        <div>
            <Select
                value={noteViewValue}
                onChange={handleNoteViewChange}
                variant="outlined"
                classes={{
                    iconOutlined: displayNotesStylesClasses.selectIcon,
                    outlined: displayNotesStylesClasses.selectOutlined,
                    icon: displayNotesStylesClasses.selctIconDisabled,
                    select: displayNotesStylesClasses.selectDisabled
                }}
                input={
                    <OutlinedInput
                        classes={{
                            notchedOutline: displayNotesStylesClasses.inputOutline,
                            root: displayNotesStylesClasses.selectRoot
                        }}
                    />
                }
                disabled={displayNotesViewProps.userName != displayNotesViewProps.ownerName}
            >
                {displayNotesViewProps.dropDownFields.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                        <ListItem className={displayNotesStylesClasses.listItem}>
                            <ListItemIcon className={displayNotesStylesClasses.listItemIconRoot}>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText primary={option.value} />
                        </ListItem>
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}