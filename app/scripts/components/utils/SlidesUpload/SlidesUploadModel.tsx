import React from "react";
import { BusinessGoalTableType, MeetingInterface, SlidesModel } from "../../../interfaces/InnovationInterface";

export default interface SlidesUploadModel {
    isSlidePresent: boolean;
    discussionTopicId: string;
    businessGoalData?: BusinessGoalTableType;
    businessGoalName?: string;
    refreshTable: boolean;
    setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
    slides?: SlidesModel[];
    isBGDiscussionType: boolean;
    currentMeetingData: MeetingInterface
    setCurrentMeetingData: React.Dispatch<React.SetStateAction<MeetingInterface>>;
    isSlidesEditable: boolean;
    isOldMeetingEditable?: boolean;
    /**Call back function that replace the default upload function of 
    * the component.
    */
    callBackForAcceptedFiles?: (inData: any) => void,
    callBackForRejectedFiles?: () => void;
    /**Call back function when user does not replace the default
     * Upload function.
     * One function handles the success while the other 
     * handles failure scenario
     */
    callBackToAddSlides?: (slideId: string, discussionTopicId: string, message: string) => void;
    callBackOnSuccess?: (message: string) => void;
    callBackOnFailure?: (error: any, message: string) => void;
    callBackOnDelete?: (discussionTopicId: string, message: string, inTextSlides?: SlidesModel[]) => void;
    callBackOnTextSlideUploadSuccess?: (message: string) => void;
    callBackOnTextSlideDelete?: (message: string) => void;
}