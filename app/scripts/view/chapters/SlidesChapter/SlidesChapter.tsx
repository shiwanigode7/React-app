import { Button, LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Chip, Grid, ListItem, ListItemIcon, ThemeProvider, Tooltip } from "@material-ui/core";
import React, { createRef, useContext, useEffect, useState } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { SlidesChapterStlyes } from "./SlidesChapterStyle";
import { getBusinessGoalNodePath } from "../../../constant/InnovationAPI";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { PowerPointIcon } from "../../../components/Icons/PowerPointIcon";
import { SlidesChapterModel } from "./SlidesChapterModel"
import { generateRandomUUID } from "../../../utils/UUIDGenerator";
import ConfirmationDialog from "../../ConfirmationDialog";
import { SlidesModel } from "../../../interfaces/InnovationInterface";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

export default function SlidesChapter(slideChapterProps: SlidesChapterModel) {

    const slidesChapterStyles = SlidesChapterStlyes();
    const lInnovationData = useContext(InnovationAppContext);
    const lBGNodePath = getBusinessGoalNodePath(lInnovationData.eskoAccountDetail.repoid, slideChapterProps.businessGoalName);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [confirmationActionContent, setConfirmationActionContent] = useState<string>("");
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState<string>("");
    const [confirmationDialogContent, setConfirmationDialogContent] = useState<string>("");
    const [slides, setSlides] = useState<SlidesModel[]>([]);
    const [fileNameToReplace, setFileNameToReplace] = useState<string>("");
    const [fileBlobToReplace, setFileBlobToReplace] = useState<File[]>();
    const [slideIdToReplace, setSlideIdToReplace] = useState<string>();
    const dropzoneRef: any = createRef();

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
    };

    /*remove slides from repo CONTENT if already exists, otherwise remove ui changes only */
    /*TO DO: still some more changes will be done in my next PR to cover all test case for delete*/
    const removeSlides = (fileNameToDelete: string) => {
        const pptObjToDelete = slideChapterProps.slides.filter((pptObj) => {
            return fileNameToDelete === pptObj.pptName;
        })
        if (0 !== pptObjToDelete.length && undefined !== pptObjToDelete[0].slideId) {
            slideChapterProps.deleteSlidesInBG(lBGNodePath, pptObjToDelete[0].slideId, fileNameToDelete);
            let lSlides: SlidesModel[] = [];
            slides.forEach((slide) => {
                if (fileNameToDelete !== slide.pptName) {
                    lSlides.push(slide);
                }
            });
            setSlides(lSlides);
        }
        else if (0 == pptObjToDelete.length) {
            slideChapterProps.deleteSlidesInBG(lBGNodePath, "", fileNameToDelete);
            let lSlides: SlidesModel[] = []
            slides.forEach((slide) => {
                if (fileNameToDelete !== slide.pptName) {
                    lSlides.push(slide);
                }
            });
            setSlides(lSlides);
        } else {
            console.log("deleting ppt failed");
        }
    };

    const handleDeleteConfirmation = (fileNameToDelete: string) => {
        removeSlides(fileNameToDelete);
    }
    /*handle replace an existing ppt with new ppt content  */
    const handleReplaceConfirmation = () => {
        if (slideIdToReplace && undefined !== fileBlobToReplace) {
            slideChapterProps.replaceSlidesInBG(slideIdToReplace, fileNameToReplace, fileBlobToReplace[0]);
            setOpenConfirmationDialog(false);
        }

    }
    /*call back function which sent to Confirmation dialog box , if replace is confirmed , it calls handleDeleteConfirmation  */
    const handleConfirmationSubmit = () => {
        if ("Replace" === confirmationActionContent) {
            handleReplaceConfirmation();
        }
    }

    const handleDelete = (fileName: string) => {
        handleDeleteConfirmation(fileName);
    };

    const onUploadSuccess = (uniqueId: string, fileName: string, fileBlob: File) => {
        slideChapterProps.updateSlidesInBG(uniqueId, fileName, fileBlob);
    };

    const uploadSlides = (fileBlob: File, fileName: string, version: number = 1) => {
        const luniquePptId = generateRandomUUID();
        if ("" !== luniquePptId) {
            onUploadSuccess(luniquePptId, fileName, fileBlob);
            let newSlide: SlidesModel = {
                contentURI: "",
                slideId: luniquePptId,
                pptName: fileName
            };
            setSlides(prevSlides => [...prevSlides, newSlide]);
        } else {
            console.log("content id is empty");
        }
    };

    const ispptDuplicate = (fileNameToCheck: string) => {
        let isSlidesAlreadyPresent: boolean = false;
        slides.forEach((slideInfo) => {
            if (fileNameToCheck === slideInfo.pptName) {
                setSlideIdToReplace(slideInfo.slideId);
                isSlidesAlreadyPresent = true;
            }
        })
        return isSlidesAlreadyPresent;
    }

    const handleUpload = (fileData: File[], inOperation: string) => {
        fileData[0].arrayBuffer().then((buffer: any) => {

            if (undefined !== slideChapterProps.businessGoalName) {
                uploadSlides(buffer, fileData[0].name);
            }
            else {
                console.log("upload failed BG name is not defined");
            }
        });
    }

    const handleReplace = () => {
        setConfirmationActionContent("Replace");
        setConfirmationDialogTitle("Replace Presentation");
        setConfirmationDialogContent("Slide deck with this name already exists, do you wish to replace it?")
        setOpenConfirmationDialog(true);
    }

    const onRejectedFileDrop = (_rejectFile: FileRejection[], _event: DropEvent) => {
        slideChapterProps.slideRejectedFilesCallback();
    }

    /*to display name of ppt's already added in edit dialog box */
    useEffect(() => {
        let lSlides: Array<SlidesModel> = [];
        slideChapterProps.slides.forEach((slide) => {
            if (undefined !== slide.pptName)
                lSlides.push(slide);
        });
        setSlides(lSlides);
    }, []);

    return (
        <ThemeProvider theme={LightTheme}>
            <Grid container direction="column" className={slidesChapterStyles.slidesContainer}>
                <Grid item className={slidesChapterStyles.slidesGrid}>
                    {slides.map(slide => (
                        <ListItem className={slidesChapterStyles.listItem}>
                            <ListItemIcon className={slidesChapterStyles.listItemIcon}>
                                <PowerPointIcon
                                    className={slidesChapterStyles.icon} />
                            </ListItemIcon>
                            <Chip
                                label={slide.pptName}
                                variant="default"
                                deleteIcon={<Tooltip
                                    arrow
                                    title={"Delete Slide"}
                                    placement={"right"}
                                    className={slidesChapterStyles.chipDeleteIcon}
                                >
                                    <CancelRoundedIcon />
                                </Tooltip>}
                                className={slidesChapterStyles.slideChip}
                                onDelete={() => handleDelete(slide.pptName)}
                                classes={{
                                    label: slidesChapterStyles.chipLabel
                                }}
                            />
                        </ListItem>
                    ))}
                </Grid>
                <ConfirmationDialog
                    closeConfirmationDialog={handleConfirmationDialogClose}
                    confirmationActionContent={confirmationActionContent}
                    confirmationDialogContent={confirmationDialogContent}
                    confirmationDialogTitle={confirmationDialogTitle}
                    handleSubmit={handleConfirmationSubmit}
                    loading={false}
                    open={openConfirmationDialog}
                />
                <Dropzone
                    onDropAccepted={(fileData: File[]) => {
                        if (ispptDuplicate(fileData[0].name)) {
                            setFileBlobToReplace(fileData);
                            setFileNameToReplace(fileData[0].name);
                            handleReplace();
                        } else {
                            handleUpload(fileData, "Upload");
                        }
                    }}
                    onDropRejected={onRejectedFileDrop}
                    accept={".ppt, .pptx, .pptm"}
                    maxFiles={1}
                    multiple={false}
                    noDrag={true}
                    ref={dropzoneRef}
                    noKeyboard
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{ paddingLeft: "17px", paddingBottom: "11px" }}>
                            <input {...getInputProps()} />
                            <Button children={"Add Slides..."} className={slidesChapterStyles.addButton} startIcon={undefined} endIcon={undefined} pullDown={undefined} color={'primary'} />
                        </div>
                    )
                    }
                </Dropzone>
            </Grid>
        </ThemeProvider>
    )
}