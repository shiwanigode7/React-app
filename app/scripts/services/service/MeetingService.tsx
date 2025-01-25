import axios from 'axios';
import { MeetingInterface, NoteInterface, ActionInterface } from "../../interfaces/InnovationInterface";
import { meetingUpdateUndefinedValues } from "../../utils/MeetingUtils";
import Service from "../../utils/util/Service";

function getNodePath(repoId: string, meetingName: string, meetingType: string) {
    return repoId + "/" + "InnovationSite/Settings/Meetings/" + meetingType + "/" + meetingName;
}

/**Function gets the meeting response and converts into MeetingsList data and returns the data
 * This function is defined in order to avoid duplication
 * Because it is common for both innovationGetMeetingsList and innovationGetUpcomingMeetingsList
 */
function sendUpdatedMeetingsList(meetingsResponse: any) {
    const lTempMeetingData: any[] = meetingsResponse.result.items;
    /**Variable to store the Meetings Data */
    const outMeetingData: MeetingInterface[] = [];
    lTempMeetingData.forEach((notesData: any) => {
        const lMeetingData: MeetingInterface = {
            meetingName: notesData["ec_s@meetingName"],
            meetingType: notesData["ec_s@meetingType"],
            date: notesData["ec_s@date"],
            fromTime: notesData["ec_s@fromTime"],
            toTime: notesData["ec_s@toTime"],
            discussionTopics: notesData["ec_nio@discussionTopics"],
            textSlides: notesData["ec_nio@textSlides"],
            openActionsFromOlderMeetings: notesData["ec_nio@openActionsFromOlderMeetings"]
        }
        outMeetingData.push(meetingUpdateUndefinedValues(lMeetingData));
    });

    return outMeetingData;
}

function getActions(actionsResponse: any) {
    const lTempActionData: any[] = actionsResponse.result.items;
    /**Variable to store the Actions Data */
    const outActionData: ActionInterface[] = [];
    if (undefined !== lTempActionData) {
        lTempActionData.forEach((action: any) => {
            const lActionData: ActionInterface = {
                nodeId: action["nodeId"] === undefined ? "" : action["nodeId"],
                actionName: action["ec_s@actionName"] === undefined ? "" : action["ec_s@actionName"],
                status: action["ec_s@status"] === undefined ? "" : action["ec_s@status"],
                owner: action["ec_s@owner"] === undefined ? "" : action["ec_s@owner"],
                discussionTopicId: action["ec_s@discussionTopicId"] === undefined ? "" : action["ec_s@discussionTopicId"],
                dueDate: action["ec_s@dueDate"] === undefined ? "" : action["ec_s@dueDate"],
                text: action["ec_s@text"] === undefined ? "" : action["ec_s@text"],
                comment: action["ec_s@comment"] === undefined ? "" : action["ec_s@comment"],
                meetingName: action["ec_s@meetingName"] === undefined ? "" : action["ec_s@meetingName"]
            }
            outActionData.push(lActionData);
        });
    }

    return outActionData;
}


export default class MeetingService extends Service {

    /**
     * Function to call Innovation API to get the list of upcoming PPG meetings in the specified repo-id
     * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
     * @returns 
     */
    public static innovationGetUpcomingPPGMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getUpcomingPPGMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }

    /**
     * Function to call Innovation API to get the list of all PPG meetings in the specified repo-id
     * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
     * @returns 
     */
    public static innovationGetAllPPGMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getPPGMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }
    /**
 * Function to call Innovation API to get the list of upcoming SIR meetings in the specified repo-id
 * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
 * @returns 
 */
    public static innovationGetUpcomingSIRMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getUpcomingSIRMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }
    /**
    * Function to call Innovation API to get the list of all SIR meetings in the specified repo-id
    * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
    * @returns 
    */
    public static innovationGetAllSIRMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getSIRMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }
    /**
 * Function to call Innovation API to get the list of all meetings in the specified repo-id
 * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
 * @returns 
 */
    public static innovationGetMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getAllMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }

    /**
    * Function to call innovation backend to create text notes in repo
    * @param inRepoId - The Repo location where the note is to be created
    * @param inTextName - The name of the text under which notes are created
    * @param intextNote - The data of the notes
    * @returns 
    */
    public static innovationCreateTextNotes(inRepoId: string, inMeeting: MeetingInterface, intextNote: NoteInterface) {
        let lNodePath: string = getNodePath(inRepoId, inMeeting.meetingName, inMeeting.meetingType);
        const lQueryParams: any = {
            nodePath: lNodePath
        }
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["notes", ""], intextNote, {}, lQueryParams)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })
    }

    /**
     * Function to call innovation backend to update the note view of a given note
     * @param inRepoId - The repo location where the note is saved
     * @param inTextNoteName - The name of note that has to be modified
     * @param inMeeting - The meetingData to build nodePath
     * @param inView - The View value to be set for the notes (Can be "Public" | "Private")
     * @returns 
     */
    public static innovationUpdateTextNotes(inRepoId: string, inTextNoteName: string, inView: string, inMeeting: MeetingInterface) {
        let lNodePath: string = getNodePath(inRepoId, inMeeting.meetingName, inMeeting.meetingType);
        const lQueryParam: any = {
            nodePath: lNodePath
        }
        const notesData: any = {
            "noteView": inView
        }
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(
                ["notes", inTextNoteName, ""],//url
                notesData,//json / request body
                {},//headers
                lQueryParam//query parameter
            )
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })
    }


    /**
     * Function to call the Innovation Backend to get the list of notes under a given text.
     * @param inRepoId - The repo location where the notes are stored
     * @param inTextName - The text name whose notes are  to be fetched
     * @param inMeeting - The meetingData to build nodePath 
    * @returns 
     */
    public static innovationGetTextNotes(inRepoId: string, inDiscussionTopicID: string) {
        const lQueryParam: any = {
            parentId: inDiscussionTopicID
        }
        console.log(inDiscussionTopicID)
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["notes", "getNotes", inRepoId, ""], lQueryParam)
                .then((response: any) => {
                    const lHoldNotesData: any[] = response.result;
                    const outNotesData: NoteInterface[] = [];
                    lHoldNotesData.forEach((notesData: any) => {
                        const lNoteData: NoteInterface = {
                            data: notesData["ec_s@data"] !== undefined ? notesData["ec_s@data"] : "",
                            date: notesData["creationDate"] !== undefined ? notesData["creationDate"] : "",
                            noteName: notesData["ec_s@noteName"] !== undefined ? notesData["ec_s@noteName"] : "",
                            noteView: notesData["ec_s@noteView"] !== undefined ? notesData["ec_s@noteView"] : "",
                            owner: notesData["ec_s@owner"] !== undefined ? notesData["ec_s@owner"] : "",
                            parentId: notesData["ec_s@parentId"] !== undefined ? notesData["ec_s@parentId"] : "",
                        }
                        outNotesData.push(lNoteData);
                    })
                    resolve(outNotesData);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })
    }

    /**
    * Function to call the Innovation Backend to get delete a  note under given text discussion topic.
    * @param inRepoId - The repo location where the notes are stored
    * @param inTextNoteName - The note name which need to be deleted
    * @param inMeeting - The meetingData to build nodePath
    * @returns 
    */

    public static innovationDeleteTextNote(inRepoId: string, inMeeting: MeetingInterface, inTextNoteName: string) {
        let lNodePath: string = getNodePath(inRepoId, inMeeting.meetingName, inMeeting.meetingType);
        const lQueryParams: any = {
            nodePath: lNodePath
        }
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["notes", inTextNoteName, ""], {}, {}, lQueryParams)
                .then((deleteBGNoteRespnse: any) => {
                    resolve(deleteBGNoteRespnse);
                })
                .catch((deleteBGNoteError: any) => {
                    reject(deleteBGNoteError);
                });
        });
    }

    /**
     * Function to call Innovation API to get the list of all meetings in the specified repo-id
     * @param inRepoId - Database/Repo-id where all the meetings data are to be fetched
     * @returns 
     */
    public static innovationGetUpcomingMeetingsList(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "getUpcomingMeetings", inRepoId, ""])
                .then((getResponse: any) => {
                    resolve(sendUpdatedMeetingsList(getResponse));
                })
                .catch((getError: any) => {
                    reject(getError);
                });
        });
    }

    /**
     * Function to call the Innovation API to create meeting in Repo.
     * @param inRepoId - The database/Repo Id for creating the meetings data
     * @param inMeetingName - The name of the meeting to be created
     * @param inMeetingData - The data of meeting to be created
     * @returns 
     */
    public static innovationCreateMeeting(inRepoId: string, inMeetingData: MeetingInterface) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["meetings", "create", inRepoId, ""], inMeetingData)
                .then((createResponse: any) => {
                    resolve(createResponse);
                })
                .catch((createError: any) => {
                    reject(createError);
                });
        });
    }

    /**
     * Function to call the Innovation API to delete Slide ID from existing meeting if it is deleted from Business Goal.
     * @param inSlideId - The slideId to be deleted from meetings
     * @returns 
     */
    public static innovationDeleteSlideIdinMeeting(inSlideId: string[], inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "deleteSlide", inRepoId, ""], inSlideId)
                .then((createResponse: any) => {
                    resolve(createResponse);
                })
                .catch((createError: any) => {
                    reject(createError);
                });
        });
    }

    /**
     * Function to call the Innovation API to delete the meeting in repo
     * @param inRepoId - Database/Repo id where the meeting data is stored
     * @param inMeetingName - The name of the meeting to be deleted
     * @returns 
     */
    public static innovationDeleteMeeting(inRepoId: string, inMeetingName: string, inMeetingType: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["meetings", "delete", inRepoId, inMeetingName, ""], inMeetingType)
                .then((deleteResponse: any) => {
                    resolve(deleteResponse);
                })
                .catch((deleteError: any) => {
                    reject(deleteError);
                });
        });
    }

    /**
     * Function to call innovation API to update the meeting details
     * @param inRepoId - Database/Repo id where the meeting data is stored
     * @param inMeetingName - The name of meeting to be updated
     * @param inMeetingData - The data to be updated
     * @returns 
     */
    public static innovationUpdateMeeting(inRepoId: string, inMeetingName: string, inMeetingData: any) {
        return new Promise((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "update", inRepoId, inMeetingName, ""], inMeetingData)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * Function to call innovation API to update the Discussion Topic on slide change
     * @param inRepoId - Database/Repo id where the meeting data is stored
     * @param inMeetingName - The name of meeting to be updated
     * @param inSlideId - Slide ID to be updated
     * @param inDiscussionTopicID - DiscussionTopic Id to which it should update
     * @returns 
     */
    public static innovationUpdateDiscussionTopicSlideId(inRepoId: string, inMeetingName: string, inSlideId: string, inDiscussionTopicID: string) {
        return new Promise((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "updateDiscussionTopicSlideId", inRepoId, inMeetingName],
                null,
                {},
                { "slideId": inSlideId, "discussionTopicID": inDiscussionTopicID })
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * Function to call innovation API to update the slides in meeting
     * @param inRepoId - Database/Repo id where the meeting data is stored
     * @param inMeetingName - The name of meeting to be updated
     * @param contentId - The content ID of data to be updated
     * @param fileBlob - The file to be uploaded
     * @returns 
     */
    public static innovationUpdateSlides(inRepoID: string, inMeetingName: string, contentId: string, fileBlob: File, inDiscussionTopicID: string) {
        const formData = new FormData();
        formData.append('file', fileBlob);
        const config = {
            headers: {
            },
            params: {
                slideId: contentId,
                fileName: fileBlob.name,
                discussionTopicID: inDiscussionTopicID
            }
        }
        const url = `${window.location.origin}/meetings/updateSlide/${inRepoID}/${inMeetingName}`
        return new Promise((resolve, reject) => {
            axios.post(url, formData, config).then((response: any) => {
                resolve(response);
            })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
    * Function to call innovation API to update the slides in meeting
    * @param inRepoId - Database/Repo id where the meeting data is stored
    * @param inMeetingData - The meeting data of meeting to be updated
    * @param inDiscussionTopicID - the discussion Topic ID where the slide has to be deleted
    * @returns 
    */
    public static innovationDeleteSlides(inRepoID: string, inMeetingData: MeetingInterface, inDiscussionTopicID: string) {
        return new Promise((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "deleteContent", inRepoID, inMeetingData.meetingName, inDiscussionTopicID, ""], inMeetingData)
                .then((response: any) => {
                    resolve(response);

                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationGetOpenActions(inRepoId: string, inMeetingType: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "action", "openActions", inRepoId], lQueryParam)
                .then((response: any) => {
                    resolve(getActions(response));
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationGetPreviousMeetingActions(inRepoId: string, inMeetingType: string, inMeetingName: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType,
            meetingName: inMeetingName
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "action", "previousMeeting", inRepoId], lQueryParam)
                .then((response: any) => {
                    resolve(getActions(response));
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationGetCurrentMeetingActions(inRepoId: string, inMeetingType: string, inMeetingName: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType,
            meetingName: inMeetingName
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["meetings", "action", "currentMeeting", inRepoId], lQueryParam)
                .then((response: any) => {
                    resolve(getActions(response));
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationGetActions(inRepoId: string, inMeetingType: string, inActionIdList: string[]) {
        const lQueryParam: any = {
            meetingType: inMeetingType
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["meetings", "action", "allActions", inRepoId], inActionIdList, {}, lQueryParam)
                .then((response: any) => {
                    resolve(getActions(response));
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationCreateAction(inRepoId: string, inMeetingType: string, inActionData: ActionInterface) {
        const lQueryParam: any = {
            meetingType: inMeetingType
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["meetings", "action", inRepoId], inActionData, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationUpdateAction(inActionId: string, inActionData: any) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "action", inActionId], inActionData, {})
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationUpdateOpenActionInMeeting(inRepoId: string, inMeetingType: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "openAction", inRepoId], {}, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationUpdateActionStatus(inRepoId: string, inMeetingType: string, inActionId: string,
        inPreviousStatus: string, inNewStatus: string, inMeetingName: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType,
            previousStatus: inPreviousStatus,
            newStatus: inNewStatus,
            meetingName: inMeetingName,
            actionId: inActionId
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["meetings", "action", "status", inRepoId], {}, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationDeleteAction(inRepoId: string, inMeetingType: string, inActionId: string,
        inMeetingName: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType,
            meetingName: inMeetingName,
            actionId: inActionId
        };
        return new Promise((resolve, reject) => {
            this.InnovationDELETECall(["meetings", "action", inRepoId], {}, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public static innovationDeleteActionWithTopicId(inRepoId: string, inMeetingType: string, inTopicId: string) {
        const lQueryParam: any = {
            meetingType: inMeetingType,
            discussionTopicId: inTopicId
        };
        return new Promise((resolve, reject) => {
            this.InnovationDELETECall(["meetings", "action", inRepoId, "topic"], {}, {}, lQueryParam)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}
