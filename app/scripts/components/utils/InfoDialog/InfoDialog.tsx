import { Dialog, DialogTitle, Typography, IconButton, DialogContent, ListItem, List, Divider, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import InfoDialogProps from "./InfoDialogModel";
import { InfoDialogStyles } from "./InfoDialogStyles";

export default function InfoDialog(props: InfoDialogProps) {
    const InfoDialogStyleClasses = InfoDialogStyles();
    const [infoContent, setInfoContent] = useState<JSX.Element[]>([]);

    function prepareInfoContent(){
        const contentItem: JSX.Element[] = [];

        props.dialogContent.forEach((content: string) => {
            contentItem.push(
                <ListItem className={InfoDialogStyleClasses.listItem}>
                    <Typography className={InfoDialogStyleClasses.dialogContent}><Box fontWeight='bold' display='inline'>{content.slice(0, content.indexOf(':')+1)}</Box>
                        {content.slice(content.indexOf(':')+1, content.length)}
                    </Typography>
                </ListItem>)
        })

        setInfoContent(contentItem);
    }
    
    useEffect(() => {
        prepareInfoContent();
    }, [props.dialogContent])
    
    function handleClose() {
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} fullWidth maxWidth='sm'>
            <DialogTitle className={InfoDialogStyleClasses.layout}>
                <Typography className={InfoDialogStyleClasses.dialogTitle}>{props.dialogTitle}</Typography>
                <IconButton onClick={handleClose} className={InfoDialogStyleClasses.closeIconButton}>
                    <CloseIcon className={InfoDialogStyleClasses.closeIcon}/>
                </IconButton>
            </DialogTitle>
            <Divider light className={InfoDialogStyleClasses.divider}/>
            <DialogContent className={InfoDialogStyleClasses.layout}>
                <List className={InfoDialogStyleClasses.list}>
                    {infoContent}
                </List>
            </DialogContent>
        </Dialog>)
} 