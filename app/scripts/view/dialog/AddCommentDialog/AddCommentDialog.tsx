import { Dialog, DialogTitle, Grid, Typography, IconButton, DialogContent, TextField, Divider, DialogActions } from "@material-ui/core"
import React from "react"
import { AddCommentDialogStyles } from "./AddCommentDialogStyles";
import { Button } from "@esko/cloud-ui-components/dist/esm";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { AddCommentDialogProps } from "./AddCommentDialogModel";

export function AddCommentDialog(dialogProps : AddCommentDialogProps){
    const AddCommentDialogClasses = AddCommentDialogStyles();

    const handleCloseCommentDialog = () => {
        dialogProps.setOpen(false);
    }

    return (
        <Dialog
                open={dialogProps.open}
                classes={{
                    paper: AddCommentDialogClasses.commentDialog
                }}
            >
                <DialogTitle className={AddCommentDialogClasses.commentDialogTitle}>
                    {/**Using grid to align the dialog title text and the x button */}
                    <Grid container spacing={0} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                        {/**Title of the dialog */}
                        <Grid item >
                            <Typography className={AddCommentDialogClasses.commentTitleText}>
                                {dialogProps.title}
                            </Typography>
                        </Grid>
                        {/**the close icon */}
                        <Grid item >
                            <IconButton
                                onClick={() => { handleCloseCommentDialog() }}
                                className={AddCommentDialogClasses.commentDialogCrossIconButton}
                            >
                                <CloseRoundedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    {/**Comment field */}
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        error={dialogProps.maxCharLimit === dialogProps.textFieldValue.length}
                        InputProps={{
                            classes: {
                                notchedOutline: AddCommentDialogClasses.commentFieldNotchedOutline,
                                root: AddCommentDialogClasses.commentFieldOutlineRoot,
                                inputMultiline: AddCommentDialogClasses.commentMultiline,
                                error: AddCommentDialogClasses.commentFieldOutLineError
                            },
                        }}
                        inputProps={{
                            maxLength: dialogProps.maxCharLimit,
                            className: AddCommentDialogClasses.commentFieldDragStyle
                        }}
                        FormHelperTextProps={{
                            classes: {
                                contained: AddCommentDialogClasses.commentHelperText
                            }
                        }}
                        helperText={(dialogProps.maxCharLimit === dialogProps.textFieldValue.length && "Maximum limit is "+ dialogProps.maxCharLimit.toString() + " characters")}
                        value={dialogProps.textFieldValue}
                        onChange={dialogProps.handleChange}
                    />
                </DialogContent>
                {/**Dialog Action button components */}
                <Divider light />
                {/**Cancel button to close the dialog */}
                <DialogActions >
                    <Button
                        color={"secondary"}
                        onClick={() => { handleCloseCommentDialog() }}
                        className={AddCommentDialogClasses.commentCancelButton}
                        startIcon={undefined}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {"Cancel"}
                    </Button>
                    {/**Action button which calls two different function based on 
                     * whether the dialog is opened for add operation or update operation
                     */}
                    <Button
                        color={"primary"}
                        disabled={dialogProps.maxCharLimit < dialogProps.textFieldValue.trim().length}
                        onClick={dialogProps.handleOnSave}
                        className={AddCommentDialogClasses.commentSubmitButton}
                        startIcon={undefined}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {dialogProps.actionButtonLabel}
                    </Button>
                </DialogActions>
            </Dialog>
    )
}