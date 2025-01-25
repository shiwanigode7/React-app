import { Grid, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import ReleaseModel from "../../../../settings/InnovationCadenceView/ReleaseModel";
import TextWithTooltip from "../../../../utils/TextWithTooltip/TextWithTooltip";
import Thumbnail from "../../../../utils/Thumbnail/Thumbnail";
import FTEModel from "../../../FTEModel";
import BusinessGoalRowModel from "./BusinessGoalRowModel";
import { BusinessGoalRowStyles } from "./BusinessGoalRowStyles";
import { AddCommentDialog } from "../../../../../view/dialog/AddCommentDialog/AddCommentDialog";
import BgRowTableCell from "./BGRowTableCell";

export default function BgRowForFTEView(bgRowProps: BusinessGoalRowModel) {
    const businessGoalRowStyleClasses = BusinessGoalRowStyles();
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
    const [notesValue, setNotesValue] = useState<string>("");
    const [fieldNameForComment, setFieldNameForComment] = useState<string>("");
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogActionTitle, setDialogActionTitle] = useState<string>("");

    function getTootlTipText() {
        let text: string = bgRowProps.name;
        if ("VFM" === bgRowProps.name) {
            text = "Value for Money";
        }
        return text;
    }

    function handleOpenCommentDialog(fieldName: string) {
        setOpenCommentDialog(true);
        const notes: string = getNotesValue(fieldName);
        if(0 === notes.length) {
            setDialogTitle("Add Notes");
            setDialogActionTitle("Add");
        } else {
            setDialogTitle("Edit Notes");
        setDialogActionTitle("Update");
        }
        setNotesValue(notes);
        setFieldNameForComment(fieldName);
    }

    /**Function called when the user types anything in the comment fieldS */
    const handleCommentInputEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNotesValue(event.target.value);
    };

    const handleDialogSubmit = () => {
        const notes: string = getNotesValue(fieldNameForComment);
        if(notes !== notesValue || 0 !== notesValue.length) {
            bgRowProps.handleAddNotes(fieldNameForComment, notesValue);
        }
        setOpenCommentDialog(false);
    };

    function getNotesValue(inputFieldName: string) {
        let notes: string = "";
        const splitedStrings: string[] = inputFieldName.split("-#&&*#-");
        const runwayNodeId: string = splitedStrings[0];
        const bgNodeId: string = splitedStrings[1];
        const releaseNodeId: string = splitedStrings[2];
        const foundFTE: FTEModel | undefined = bgRowProps.fteList?.find((fte: FTEModel) =>
            fte.runwayNodeId === runwayNodeId && fte.bgNodeId === bgNodeId && fte.releaseNodeId === releaseNodeId
        );
        if (undefined !== foundFTE) {
            notes= foundFTE.notes;
        }
        return notes;
    }

    function getFiveTableCellsWithInvisibleInputField() {
        return bgRowProps.releases?.map((release: ReleaseModel, index: number) => {
            const inputFieldName: string = getInputFieldName(release.nodeId);
            const defaultValue: string = getDefaultValue(inputFieldName);
            const notes: string = getNotesValue(inputFieldName);
            return (
                <BgRowTableCell
                    index={index}
                    defaultValue={defaultValue}
                    handleInputFieldBlurEvent={bgRowProps.handleInputFieldBlurEvent}
                    handleOpenCommentDialog={handleOpenCommentDialog}
                    inputFieldName={inputFieldName}
                    notes={notes}
                    isFTEEditable={bgRowProps.isFTEEditable}
                    isNotePresent={0 !== notes.length}
                    isPercentageView={false}
                />
            );
        });
    }

    function getInputFieldName(releaseNodeId: string) {
        return bgRowProps.runwayNodeId + "-#&&*#-" + bgRowProps.nodeId + "-#&&*#-" + releaseNodeId;
    }

    function getDefaultValue(inputFieldName: string) {
        let defaultValue: string = "";
        const splitedStrings: string[] = inputFieldName.split("-#&&*#-");
        const runwayNodeId: string = splitedStrings[0];
        const bgNodeId: string = splitedStrings[1];
        const releaseNodeId: string = splitedStrings[2];
        const foundFTE: FTEModel | undefined = bgRowProps.fteList?.find((fte: FTEModel) =>
            fte.runwayNodeId === runwayNodeId && fte.bgNodeId === bgNodeId && fte.releaseNodeId === releaseNodeId
        );
        if (undefined !== foundFTE) {
            defaultValue = foundFTE.number;
        }
        return defaultValue;
    }

    return (
        <>
            <TableRow>
                <TableCell className={businessGoalRowStyleClasses.bgNameCell}>
                    <Grid className={businessGoalRowStyleClasses.tableCellGridContainer} container direction="row" spacing={1}>

                        <Grid item className={businessGoalRowStyleClasses.emptySpaceBeforeBGThumbnail} />

                        <Grid item className={businessGoalRowStyleClasses.thumbnailGridItem}>
                            <Thumbnail altText="Business Goal Thumbnail" src={bgRowProps.thumbnail?.toString()} />
                        </Grid>

                        <Grid item className={businessGoalRowStyleClasses.bgNameGridItem}>
                            <TextWithTooltip
                                text={bgRowProps.name}
                                tooltipText={getTootlTipText()}
                                isTextBold={false}
                                textAlign={"left"}
                                tooltipPlacement="bottom-start" />
                        </Grid>

                    </Grid>
                </TableCell>
                {
                    getFiveTableCellsWithInvisibleInputField()?.map((tableCell: JSX.Element) => (
                        tableCell
                    ))
                }
            </TableRow>
            <AddCommentDialog 
            open={openCommentDialog}
            maxCharLimit={1000}
            handleChange={handleCommentInputEvent}
            handleOnSave={handleDialogSubmit}
            textFieldValue={notesValue}
            setOpen={setOpenCommentDialog}
            title={dialogTitle}
            actionButtonLabel={dialogActionTitle}
            />
        </>
    )
}
