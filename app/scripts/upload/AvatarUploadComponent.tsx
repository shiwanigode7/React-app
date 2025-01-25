/**TSX file for Avatar edit/upload */
import { Avatar, CircularProgress, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import images from "../../Icons/images";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { uploadAvatar } from "./UploaderFunction";
import { AvatarUploadStyles } from "./AvatarUploaderStyling";

declare interface AvatarUploadPropsType {
    /**Size of the avatar */
    sizeOfAvatar: "large" | "small" | "none",
    /**Default image to be displayed */
    defaultImageLink?: string,
    /**node path where the thumbnail has to be uploaded*/
    nodePath?: string,
    /**Call back function that replace the default upload function of 
     * the component.
     */
    callBackForAcceptedFiles?: (inData: any) => void,
    callBackForRejectedFiles?: () => void,
    /**Call back function when user does not replace the default
     * Upload function.
     * One function handles the success while the other 
     * handles failure scenario
     */
    callBackOnSuccess?: (response: any, nodePath: string) => void,
    callBackOnFailure?: (error: any, nodePath: string) => void
    versionNumber?: number;
}

/**
 * Function that return a avatar component that can be edited based
 * on user preference
 * @param inputProps - Props of the type AvatarUploadPropsType
 * @returns 
 */
export function AvatarUpload(inputProps: AvatarUploadPropsType) {

    /**State to hold the default/user selected image */
    const [avatarImage, setAvatarImage] = useState(images.EskoStarPng);
    /**Style component */
    const AvatarUploadStyleClasses = AvatarUploadStyles();
    /**To set the loading animation when image is being uploaded */
    const [loadingIcon, setLoadingIcon] = useState<boolean>(false);

    /**To update the image if the link is passed in the props */
    useEffect(() => {
        setAvatarImage(inputProps.defaultImageLink !== undefined ? inputProps.defaultImageLink.toString() : images.EskoStarPng);
    }, []);

    /**When the supported file is selected */
    const onAcceptedFileDrop = (fileData: File[]) => {
        setLoadingIcon(true)
        /**Save the image so that it can be used in the cropper */
        setAvatarImage(URL.createObjectURL(fileData[0]).toString());
        /**read the data as binary*/
        fileData[0].arrayBuffer().then((buffer: any) => {
            /**if user has passed any call back function pass the buffere data to the callback function */
            if (inputProps.callBackForAcceptedFiles !== undefined) {
                inputProps.callBackForAcceptedFiles(buffer);
                setLoadingIcon(false);
            }
            else {
                /**if no callback function is provided check if user has provided nodepath
                 * if yes directly upload to the given node path
                 */
                if (inputProps.nodePath !== undefined) {
                    uploadAvatar(inputProps.nodePath.toString(), buffer, uploadSuccessCallBack, uploadErrorCallBack, inputProps.versionNumber);
                }
            }
        });
    }

    /**when user selects files other than the supported file type */
    const onRejectedFileDrop = (_rejectFile: FileRejection[], _event: DropEvent) => {
        if (inputProps.callBackForRejectedFiles !== undefined) {
            inputProps.callBackForRejectedFiles()
        }
        else {
            console.log("File type not supported.");
        }
    }

    /**Instruction to be executed when the upload is successful
     * If default upload function is not replaced
     */
    const uploadSuccessCallBack = (response: any) => {
        if (inputProps.callBackOnSuccess !== undefined) {
            inputProps.callBackOnSuccess(response, inputProps.nodePath === undefined ? "" : inputProps.nodePath);
        }
        else {
            console.log(response);
        }
        /**Stop the loading animation*/
        setLoadingIcon(false);
    }
    /**Instruction to be executed when the upload fails
     * If default upload function is not replaced
     */
    const uploadErrorCallBack = (error: any) => {
        if (inputProps.callBackOnSuccess !== undefined) {
            inputProps.callBackOnSuccess(error, inputProps.nodePath === undefined ? "" : inputProps.nodePath);
        }
        else {
            console.log(error);
        }
        /**Stop the loading animation*/
        setLoadingIcon(false);
    }

    return (
            /**Code for the Avatar(User Badge) and the component that appears when hovered
            * over the Avatar (the overlay) 
            */
            <div className={AvatarUploadStyleClasses.container}>
                <Avatar 
                src={avatarImage} 
                className={inputProps.sizeOfAvatar === "large" ?
                    AvatarUploadStyleClasses.avatarLarge :
                    AvatarUploadStyleClasses.avatarSmall} 
                />
                {/**the Overlay component */}
                <div
                    className={
                        inputProps.sizeOfAvatar === "large" ?
                            AvatarUploadStyleClasses.overlayLarge :
                            (
                                inputProps.sizeOfAvatar === "small" ?
                                AvatarUploadStyleClasses.overlaySmall :
                                AvatarUploadStyleClasses.overlayNone
                            )
                    }
                >
                    <IconButton>
                        <Dropzone
                            onDropAccepted={onAcceptedFileDrop}
                            onDropRejected={onRejectedFileDrop}
                            accept={".jpg, .png, .gif, .jpeg"}
                            maxFiles={1}
                            multiple={false}
                            noDrag={true}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <EditRoundedIcon className={AvatarUploadStyleClasses.iconStyle} />
                                </div>
                            )}
                        </Dropzone>
                    </IconButton>
                </div>
                {/**Loading animation when the file is being uploaded */}
                {
                    loadingIcon && <div
                        className={
                            inputProps.sizeOfAvatar === "large" ?
                                AvatarUploadStyleClasses.overlayLarge :
                                (
                                    inputProps.sizeOfAvatar === "small" ?
                                        AvatarUploadStyleClasses.overlaySmall :
                                        AvatarUploadStyleClasses.overlayNone
                                )
                        }
                        style={{ opacity: 1 }}
                    >
                        <CircularProgress style={{ color: "#eef8ff" }} />
                    </div>
                }
            </div>
    );
}