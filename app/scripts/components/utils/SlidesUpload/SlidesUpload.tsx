
import { IconButton, Tooltip } from "@material-ui/core";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import React, { useState } from "react";
import { NO_PERMISSION_TO_ADD_DT, ADD_PRESENTATION, EDIT_PAST_MEETING_TEXT } from "../../../constant/MeetingViewTexts";
import SlidesUploadModel from "./SlidesUploadModel";
import { SlidesUploadStyles } from "./SlidesUploadStyles";
import UploadDialog from "./UploadDialog";

export default function SlidesUpload(slidesUploadProps: SlidesUploadModel) {

    const slidesUploadStyleClasses = SlidesUploadStyles();
    const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);
    const [uploadActionContent, setUploadActionContent] = useState<string>("");
    const [uploadDialogTitle, setUploadDialogTitle] = useState<string>("");
    const [openSlidesDropdown, setOpenSlidesDropdown] = useState<boolean>(false);

    const handleIconClick = () => {
        if ((slidesUploadProps.isOldMeetingEditable !== undefined ? slidesUploadProps.isOldMeetingEditable : true) && slidesUploadProps.isSlidesEditable) {
            setUploadActionContent("Upload...");
            setUploadDialogTitle("Add Slides");
            setOpenUploadDialog(true);
        }
    }

    const handleUploadSubmit = () => {
        setOpenSlidesDropdown(false);
        setOpenUploadDialog(false);
    }

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
    };

    const getToolTipOfPlusIcon = () => {
        return slidesUploadProps.isSlidesEditable ? (slidesUploadProps.isOldMeetingEditable ? ADD_PRESENTATION : EDIT_PAST_MEETING_TEXT) : NO_PERMISSION_TO_ADD_DT;
    }

    return (
        <>
            {
                slidesUploadProps.isBGDiscussionType && !slidesUploadProps.isSlidePresent &&
                <Tooltip
                    title={getToolTipOfPlusIcon()}
                    placement="bottom"
                    arrow>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        disabled={!slidesUploadProps.isSlidesEditable || !(slidesUploadProps.isOldMeetingEditable !== undefined ? slidesUploadProps.isOldMeetingEditable : true)}
                        className={slidesUploadStyleClasses.iconButton}
                    >
                        <AddRoundedIcon
                            color={slidesUploadProps.isSlidesEditable ? "inherit" : "disabled"}
                            className={slidesUploadProps.isSlidesEditable ? ((slidesUploadProps.isOldMeetingEditable !== undefined ? slidesUploadProps.isOldMeetingEditable : true) ? slidesUploadStyleClasses.iconButton : slidesUploadStyleClasses.disabledAddIconButton) : slidesUploadStyleClasses.disabledAddIconButton}
                            onClick={handleIconClick}>
                        </AddRoundedIcon>
                    </IconButton>
                </Tooltip>
            }
            <UploadDialog
                closeUploadDialog={handleUploadDialogClose}
                uploadActionContent={uploadActionContent}
                uploadDialogTitle={uploadDialogTitle}
                setUploadActionContent={setUploadActionContent}
                handleSubmit={handleUploadSubmit}
                setOpenSlidesDropDown={setOpenSlidesDropdown}
                openSlidesDropDown={openSlidesDropdown}
                loading={false}
                discussionTopicId={slidesUploadProps.discussionTopicId}
                refreshTable={slidesUploadProps.refreshTable}
                setRefreshTable={slidesUploadProps.setRefreshTable}
                setOpenUploadDialog={setOpenUploadDialog}
                slidesUploadProps={slidesUploadProps}
                open={openUploadDialog}
                businessGoalData={slidesUploadProps.businessGoalData} />
        </>
    )
}