import React from 'react';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ThemeProvider, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {Button} from "@esko/cloud-ui-components/dist/esm/components/Button";
import { LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';

import { ConfirmationDialogTheme } from './theme';

/**Interface class to define the type of props*/
export interface DialogTitleProps {
    open: boolean
    closeConfirmationDialog: () => void;
    handleSubmit: () => void;
    confirmationDialogTitle: string;
    confirmationDialogContent: string;
    confirmationActionContent: string;
    loading: boolean;
}

/**Confirmation Dialog functional component to return the Dialog Titles and contents  */
export default function ConfirmationDialog(props: DialogTitleProps){

    return (
        <ThemeProvider theme={ConfirmationDialogTheme}>
            <Dialog open={props.open} fullWidth maxWidth='xs'>
                <DialogTitle style={{backgroundColor:"#F8F8F9"}}>
                    <Typography style={{fontSize:'16px', fontWeight: 'bold', color:"#22262A"}}>{props.confirmationDialogTitle}</Typography>
                    <IconButton onClick={props.closeConfirmationDialog} style={{position: 'absolute', right: 8, top: 8}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{height:'70px'}}>
                    <Typography style={{fontSize:'14px', color:"#22262A"}}>{props.confirmationDialogContent }</Typography>
                </DialogContent>
                <Divider light style={{margin:'0'}}/>
                <DialogActions>
                    <ThemeProvider theme={LightTheme} >
                    <Button color={"secondary"} onClick={props.closeConfirmationDialog} className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>Cancel</Button>
                    <Button color="primary" onClick={props.handleSubmit} disabled={props.loading} className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>
                        {props.confirmationActionContent}
                        {/* Check for Loading props, if true then the loading icon will be displayed */}
                        {props.loading ? <CircularProgress size={15} style={{color:"white", marginLeft:"8px"}}/>: <></>}
                    </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}