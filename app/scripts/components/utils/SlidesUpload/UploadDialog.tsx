import { Button } from "@esko/cloud-ui-components/dist/esm/components/Button";
import { LightTheme } from '@esko/cloud-ui-components/dist/esm/themes/index';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, ListItemIcon, Menu, MenuItem, Radio, RadioGroup, Select, ThemeProvider, Tooltip, Typography } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import React, { createRef, useContext, useEffect, useState } from 'react';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { getMeetingsNodePath } from '../../../constant/InnovationAPI';
import { ADD_PRESENTATION, ALERT_DELETE_FAILED, ALERT_SLIDE_ADD_SUCCESS, ALERT_SLIDE_DELETE_SUCCESS, ALERT_SLIDE_REPLACE_SUCCESS, ALERT_SLIDE_UPLOAD_SUCCESS, EDIT_PAST_MEETING_TEXT, NO_PERMISSION_TO_ADD_DT } from '../../../constant/MeetingViewTexts';
import { InnovationAppContext } from '../../../context/InnovationAppContext';
import { BusinessGoalTableType, MeetingTopicInterface, SlidesModel } from '../../../interfaces/InnovationInterface';
import { deleteContent, uploadContentinRepo } from '../../../upload/UploaderFunction';
import { generateRandomUUID } from "../../../utils/UUIDGenerator";
import ConfirmationDialog from '../../../view/ConfirmationDialog';
import { ConfirmationDialogTheme, OutlinedInputTheme } from '../../../view/theme';
import { PowerPointIcon } from '../../Icons/PowerPointIcon';
import SlidesUploadModel from './SlidesUploadModel';
import { SlidesUploadStyles } from './SlidesUploadStyles';
import { UploadDialogStyle } from './UploadDialogStyle';

/**Interface class to define the type of props*/
export interface DialogTitleProps {
    open: boolean
    closeUploadDialog: () => void;
    handleSubmit: () => void;
    uploadDialogTitle: string;
    setUploadActionContent: React.Dispatch<React.SetStateAction<string>>;
    uploadActionContent: string;
    loading: boolean;
    setOpenSlidesDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    openSlidesDropDown: boolean;
    setOpenUploadDialog: React.Dispatch<React.SetStateAction<boolean>>;
    businessGoalData?: BusinessGoalTableType;
    setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
    refreshTable: boolean;
    discussionTopicId: string;
    slidesUploadProps: SlidesUploadModel;
}

/**Confirmation Dialog functional component to return the Dialog Titles and contents  */
export default function UploadDialog(props: DialogTitleProps) {

    const slidesUploadStyleClasses = SlidesUploadStyles();
    const uploadDialogClasses = UploadDialogStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const lInnovationData = useContext(InnovationAppContext);
    let repoId = lInnovationData.eskoAccountDetail.repoid;
    let lMeetingNodePath = getMeetingsNodePath(lInnovationData.eskoAccountDetail.repoid, props.slidesUploadProps.currentMeetingData ? props.slidesUploadProps.currentMeetingData.meetingType : "", props.slidesUploadProps.currentMeetingData ? props.slidesUploadProps.currentMeetingData.meetingName : "");
    const open = Boolean(anchorEl);
    const dropzoneRef: any = createRef();
    let operation: string = "";
    const [value, setValue] = React.useState('upload');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [confirmationActionContent, setConfirmationActionContent] = useState<string>("");
    const [confirmationDialogContent, setConfirmationDialogContent] = useState<string>("");
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState<string>("");
    const [selectedSlideId, setSelectedSlideId] = useState<string>("");
    const [slideIdToBeReplaced, setSlideIdToBeReplaced] = useState<string>("");
    const [fileToBeReplaced, setFileToBeReplaced] = useState<File>();
    const UPLOAD: string = "Upload";
    const REPLACE: string = "Replace";

    useEffect(() => {
        repoId = lInnovationData.eskoAccountDetail.repoid;
    }, [lInnovationData.eskoAccountDetail])

    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point 
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };

    const handleChange = (event: any) => {
        if (event.target.value === "upload") {
            props.setUploadActionContent("Upload...");
            setValue("upload");
            props.setOpenSlidesDropDown(false);
        }
        else {
            props.setUploadActionContent("Add");
            setValue("select")
            props.setOpenSlidesDropDown(true);
        }
    }

    const handleAddSlides = () => {
        setValue("upload");
        if (props.uploadActionContent !== "Upload...") {
            props.slidesUploadProps.callBackToAddSlides && props.slidesUploadProps.callBackToAddSlides(selectedSlideId, props.discussionTopicId, ALERT_SLIDE_ADD_SUCCESS);
        }
        props.handleSubmit();
        if (props.businessGoalData) {
            setSelectedSlideId(props.businessGoalData.slides[0] ? props.businessGoalData.slides[0].slideId : "");
        }
    };

    const closeUploadDialog = () => {
        props.closeUploadDialog();
        setValue("upload");
        if (props.businessGoalData) {
            setSelectedSlideId(props.businessGoalData.slides[0] ? props.businessGoalData.slides[0].slideId : "");
        }
        props.setOpenSlidesDropDown(false);
    }

    /**Changes the value of topic if a Business Goal is selected */
    const handleSlidesDropDownValueChange = (event: any) => {
        setSelectedSlideId(event.target.value);
    };

    const onUploadFailure = (error: string) => {
        props.slidesUploadProps.callBackOnFailure && props.slidesUploadProps.callBackOnFailure(error, ALERT_DELETE_FAILED);
    }

    const onUploadSuccess = () => {
        if (UPLOAD === operation) {
            props.slidesUploadProps.callBackOnSuccess && props.slidesUploadProps.callBackOnSuccess(ALERT_SLIDE_UPLOAD_SUCCESS);

        }
        else {
            props.slidesUploadProps.callBackOnSuccess && props.slidesUploadProps.callBackOnSuccess(ALERT_SLIDE_REPLACE_SUCCESS);
        }
    };

    const onReplaceSuccess = () => {
        props.slidesUploadProps.callBackOnSuccess && props.slidesUploadProps.callBackOnSuccess(ALERT_SLIDE_REPLACE_SUCCESS);
    }

    const uploadSlides = (fileBlob: File, fileName: string, version: number = 1) => {
        const lSlidesId = generateRandomUUID();
        const lOnUploadSuccess = () => {
            onUploadSuccess();
        }
        if (props.businessGoalData) {
            uploadContentinRepo(repoId, props.slidesUploadProps.currentMeetingData.meetingName, lOnUploadSuccess, onUploadFailure, lSlidesId, fileBlob, props.discussionTopicId);
        }
        else {
            if (UPLOAD === operation) {
                uploadContentinRepo(repoId, props.slidesUploadProps.currentMeetingData.meetingName, lOnUploadSuccess, onUploadFailure, lSlidesId, fileBlob, props.discussionTopicId);
            }
            else if (REPLACE === operation) {
                props.slidesUploadProps.currentMeetingData.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
                    if (props.discussionTopicId === discussionTopic.discussionTopicId) {
                        setSlideIdToBeReplaced(discussionTopic.slideId);
                    }
                })
            }
            uploadContentinRepo(repoId, props.slidesUploadProps.currentMeetingData.meetingName, lOnUploadSuccess, onUploadFailure, slideIdToBeReplaced, fileBlob, props.discussionTopicId);
        }
    };

    const replaceSlide = (version: number = 1) => {
        const lOnReplaceSucess = () => {
            onReplaceSuccess();
        }
        if (undefined !== fileToBeReplaced) {
            uploadContentinRepo(repoId, props.slidesUploadProps.currentMeetingData.meetingName, lOnReplaceSucess, null, slideIdToBeReplaced, fileToBeReplaced, props.discussionTopicId);
        }
    }

    const handleUpload = (fileData: File[], inOperation: string) => {
        if (props.businessGoalData?.nodeId !== undefined || lMeetingNodePath !== undefined) {
            operation = inOperation;
            uploadSlides(fileData[0], fileData[0].name);
        }
        setAnchorEl(null);
        props.handleSubmit();
    }

    const onRejectedFileDrop = (_rejectFile: FileRejection[], _event: DropEvent) => {
        if (props.slidesUploadProps.callBackForRejectedFiles !== undefined) {
            props.slidesUploadProps.callBackForRejectedFiles()
        }
        else {
            console.log("File type not supported.");
        }
    }

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        props.setOpenUploadDialog(false);
        setAnchorEl(null);
    };

    const getSlidesUrl = (): string => {
        let lSlideId: string = "";
        let lSlideUrl: string = "";
        props.slidesUploadProps.currentMeetingData.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
            if (discussionTopic.discussionTopicId === props.discussionTopicId) {
                lSlideId = discussionTopic.slideId;
            }
        })
        if (props.businessGoalData) {
            props.businessGoalData.slides.forEach((slide: SlidesModel) => {
                if (slide.slideId === lSlideId) {
                    lSlideUrl = slide.contentURI;
                }
            })
        }
        else {
            props.slidesUploadProps.currentMeetingData.textSlides.forEach((slide: SlidesModel) => {
                if (slide.slideId === lSlideId) {
                    lSlideUrl = slide.contentURI;
                }
            })
        }
        return lSlideUrl;
    }

    const handleDownload = () => {
        let lSlideUrl = getSlidesUrl();
        window.open(lSlideUrl);
        setAnchorEl(null);
    }

    const handleReplaceConfirmation = () => {
        setOpenConfirmationDialog(false);
        openDialog();
    }

    const handleSlideReplaceConfirmation = () => {
        setOpenConfirmationDialog(false);
        setAnchorEl(null);
        replaceSlide();
    }

    const handleReplace = () => {
        setConfirmationActionContent("Replace");
        setConfirmationDialogTitle("Replace Presentation");
        setConfirmationDialogContent("Do you wish to replace the current presentation?")
        setOpenConfirmationDialog(true);
    }

    const handleDelete = () => {
        setConfirmationActionContent("Delete");
        setConfirmationDialogTitle("Delete Presentation");
        setConfirmationDialogContent("Are you sure you want to delete the presentation?")
        setOpenConfirmationDialog(true);
    }

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
    };

    const removeSlides = () => {
        if (!props.slidesUploadProps.isBGDiscussionType) {
            const lSlides: SlidesModel[] = [];
            let lSlideId: string;
            props.slidesUploadProps.currentMeetingData.discussionTopics.forEach((discussionTopic: MeetingTopicInterface) => {
                if (discussionTopic.discussionTopicId === props.discussionTopicId) {
                    lSlideId = discussionTopic.slideId;
                }
            })
            props.slidesUploadProps.currentMeetingData.textSlides.forEach((slideData: SlidesModel) => {
                if (slideData.slideId !== lSlideId) {
                    lSlides.push(slideData);
                }
            })
            props.slidesUploadProps.currentMeetingData.textSlides = lSlides;
            deleteContent(props.slidesUploadProps.currentMeetingData, repoId, props.discussionTopicId);
            props.slidesUploadProps.callBackOnTextSlideDelete && props.slidesUploadProps.callBackOnTextSlideDelete(ALERT_SLIDE_DELETE_SUCCESS);
        }
        else {
            props.slidesUploadProps.callBackOnDelete && props.slidesUploadProps.callBackOnDelete(props.discussionTopicId, ALERT_SLIDE_DELETE_SUCCESS);
        }
    }

    const handleDeleteConfirmation = () => {
        removeSlides();
        setAnchorEl(null);
        setOpenConfirmationDialog(false);
    }

    /**Call the respective function based on the option selected */
    const handleConfirmationSubmit = () => {
        if ("Slide deck with this name already exists, do you wish to replace it?" === confirmationDialogContent) {
            handleSlideReplaceConfirmation();
        }
        else if ("Delete" === confirmationActionContent) {
            handleDeleteConfirmation();
        }
        else if ("Replace" === confirmationActionContent) {
            handleReplaceConfirmation();
        }
    }

    const handleReplaceSlide = () => {
        props.setOpenUploadDialog(false);
        setConfirmationActionContent("Replace");
        setConfirmationDialogTitle("Replace Presentation");
        setConfirmationDialogContent("Slide deck with this name already exists, do you wish to replace it?")
        setOpenConfirmationDialog(true);
    }

    const slideExist = (fileName: string) => {
        let lSlideExist: boolean = false;
        let lSlides: SlidesModel[] = props.businessGoalData ? props.businessGoalData.slides : props.slidesUploadProps.currentMeetingData.textSlides;
        lSlides.forEach((slide: SlidesModel) => {
            if (slide.pptName === fileName) {
                lSlideExist = true;
                setSlideIdToBeReplaced(slide.slideId);
            }
        })
        return lSlideExist;
    }

    const getTooltipText = (inDiscussionTopicId: string) => {
        let lSlideId: string = "";
        let lSlideName: string = "";
        props.slidesUploadProps.currentMeetingData.discussionTopics.forEach((discussionTopics: MeetingTopicInterface) => {
            if (inDiscussionTopicId === discussionTopics.discussionTopicId) {
                lSlideId = discussionTopics.slideId;
            }
        })
        if (props.businessGoalData) {
            props.businessGoalData.slides.forEach((slidesData: SlidesModel) => {
                if (lSlideId === slidesData.slideId) {
                    lSlideName = slidesData.pptName;
                }
            })
        }
        else {
            props.slidesUploadProps.currentMeetingData.textSlides.forEach((slidesData: SlidesModel) => {
                if (lSlideId === slidesData.slideId) {
                    lSlideName = slidesData.pptName;
                }
            })
        }
        return lSlideName;

    }

    useEffect(() => {
        let lSlideId: string = props.businessGoalData?.slides[0] ? props.businessGoalData.slides[0].slideId : "";
        if (lSlideId === "undefined") {
            lSlideId = "";
        }
        setSelectedSlideId(lSlideId);
    }, [props.businessGoalData?.slides])

    return (
        <div>
            <ThemeProvider theme={ConfirmationDialogTheme}>
                <Dialog open={props.open} fullWidth={true} maxWidth="xs">
                    <DialogTitle className={uploadDialogClasses.titleRoot}>
                        <Typography className={uploadDialogClasses.typographyStyles}>{props.uploadDialogTitle}</Typography>
                        <IconButton onClick={closeUploadDialog} className={uploadDialogClasses.closeButton}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent style={{ height: props.openSlidesDropDown ? "150px" : "80px" }} >
                        <RadioGroup value={value} onChange={handleChange} >
                            <FormControlLabel classes={{ label: uploadDialogClasses.label }} value="upload" control={<Radio color="primary" />} label="Upload Slides" />
                            <FormControlLabel classes={{ label: uploadDialogClasses.label }} value="select" control={<Radio color="primary" />} label="Select from current Business Goal" />
                        </RadioGroup>
                        {
                            props.openSlidesDropDown &&
                            <Grid item>
                                <Typography className={uploadDialogClasses.slidesTypography}>Slides</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    {
                                        props.businessGoalData?.slides.length !== 0 ?
                                            <Select
                                                className={uploadDialogClasses.selectStyles}
                                                variant={"outlined"}
                                                labelId="demo-multiple-name-label"
                                                IconComponent={ArrowDropDownRoundedIcon}
                                                value={selectedSlideId}
                                                onChange={handleSlidesDropDownValueChange}
                                            >
                                                {props.businessGoalData?.slides.map((option: SlidesModel) => (
                                                    <MenuItem key={option.slideId}
                                                        value={option.slideId}>
                                                        {option.pptName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            :
                                            <Select
                                                className={uploadDialogClasses.selectStyles}
                                                variant={"outlined"}
                                                IconComponent={ArrowDropDownRoundedIcon}
                                                disabled
                                            >
                                            </Select>
                                    }
                                </ThemeProvider>
                            </Grid>
                        }
                    </DialogContent>
                    <Divider light className={uploadDialogClasses.divider} />
                    <DialogActions>
                        <ThemeProvider theme={LightTheme} >
                            <Button color={"secondary"} onClick={closeUploadDialog} className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>Cancel</Button>
                            {
                                props.uploadActionContent === "Upload..." &&
                                <Dropzone
                                    onDropAccepted={(fileData: File[]) => {
                                        if (slideExist(fileData[0].name)) {
                                            setFileToBeReplaced(fileData[0]);
                                            handleReplaceSlide();
                                        }
                                        else
                                            handleUpload(fileData, UPLOAD)
                                    }}
                                    onDropRejected={onRejectedFileDrop}
                                    accept={".ppt, .pptx, .pptm"}
                                    disabled={!props.slidesUploadProps.isSlidesEditable}
                                    maxFiles={1}
                                    multiple={false}
                                    noDrag={true}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Button color="primary" disabled={props.loading} className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>
                                                {props.uploadActionContent}
                                                {/* Check for Loading props, if true then the loading icon will be displayed */}
                                                {props.loading ? <CircularProgress size={15} className={uploadDialogClasses.loadingIcon} /> : <></>}
                                            </Button>
                                        </div>
                                    )}
                                </Dropzone>
                            }
                            {
                                props.uploadActionContent !== "Upload..." &&
                                <Button color="primary" disabled={props.loading || (props.businessGoalData?.slides.length === 0)} onClick={handleAddSlides} className={undefined} startIcon={undefined} endIcon={undefined} pullDown={undefined}>
                                    {props.uploadActionContent}
                                    {/* Check for Loading props, if true then the loading icon will be displayed */}
                                    {props.loading ? <CircularProgress size={15} className={uploadDialogClasses.loadingIcon} /> : <></>}
                                </Button>
                            }
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
            {
                props.slidesUploadProps.isSlidePresent &&
                <>
                    <Tooltip
                        title={getTooltipText(props.slidesUploadProps.discussionTopicId)}
                        placement="bottom"
                        arrow>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className={slidesUploadStyleClasses.iconButton}
                        >
                            <PowerPointIcon
                                className={slidesUploadStyleClasses.icon} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        style={{
                            top: "45px",
                        }}
                        classes={{
                            paper: slidesUploadStyleClasses.menuPaper
                        }}
                    >
                        <MenuItem onClick={handleDownload}>
                            <ListItemIcon className={slidesUploadStyleClasses.listItem}>
                                <GetAppRoundedIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Download</Typography>
                        </MenuItem>
                        {props.slidesUploadProps.isSlidesEditable && props.slidesUploadProps.isOldMeetingEditable ?
                            <>
                                <MenuItem onClick={handleReplace}>
                                    <ListItemIcon className={slidesUploadStyleClasses.listItem}>
                                        <RefreshRoundedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Replace</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleDelete}>
                                    <ListItemIcon className={slidesUploadStyleClasses.listItem}>
                                        <DeleteForeverRoundedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit" noWrap>Delete</Typography>
                                </MenuItem>
                            </> : null
                        }
                    </Menu>
                    <Dropzone
                        onDropAccepted={(fileData: File[]) => {
                            if (slideExist(fileData[0].name)) {
                                setFileToBeReplaced(fileData[0]);
                                handleReplaceSlide();
                            }
                            else
                                handleUpload(fileData, REPLACE)
                        }}
                        onDropRejected={onRejectedFileDrop}
                        accept={".ppt, .pptx, .pptm"}
                        disabled={!props.slidesUploadProps.isSlidesEditable}
                        maxFiles={1}
                        multiple={false}
                        noDrag={true}
                        ref={dropzoneRef}
                        noKeyboard
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>
                </>
            }
            <ConfirmationDialog
                closeConfirmationDialog={handleConfirmationDialogClose}
                confirmationActionContent={confirmationActionContent}
                confirmationDialogContent={confirmationDialogContent}
                confirmationDialogTitle={confirmationDialogTitle}
                handleSubmit={handleConfirmationSubmit}
                loading={false}
                open={openConfirmationDialog}
            />
            {
                !props.slidesUploadProps.isBGDiscussionType && !props.slidesUploadProps.isSlidePresent &&
                <Dropzone
                    onDropAccepted={(fileData: File[]) => {
                        handleUpload(fileData, "Upload")
                    }}
                    onDropRejected={onRejectedFileDrop}
                    accept={".ppt, .pptx, .pptm"}
                    disabled={!props.slidesUploadProps.isSlidesEditable || !(props.slidesUploadProps.isOldMeetingEditable !== undefined ? props.slidesUploadProps.isOldMeetingEditable : true)}
                    maxFiles={1}
                    multiple={false}
                    noDrag={true}
                    ref={dropzoneRef}
                    noKeyboard
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Tooltip
                                title={props.slidesUploadProps.isSlidesEditable ? (props.slidesUploadProps.isOldMeetingEditable ? ADD_PRESENTATION : EDIT_PAST_MEETING_TEXT) : NO_PERMISSION_TO_ADD_DT}
                                placement="bottom"
                                arrow>
                                <AddRoundedIcon
                                    color={props.slidesUploadProps.isSlidesEditable && props.slidesUploadProps.isOldMeetingEditable ? "inherit" : "disabled"}
                                    className={props.slidesUploadProps.isSlidesEditable ? ((props.slidesUploadProps.isOldMeetingEditable !== undefined ? props.slidesUploadProps.isOldMeetingEditable : true) ? slidesUploadStyleClasses.iconButton : slidesUploadStyleClasses.disabledAddIconButton) : slidesUploadStyleClasses.disabledAddIconButton} />
                            </Tooltip>
                        </div>
                    )}
                </Dropzone>
            }
        </div>
    )
}