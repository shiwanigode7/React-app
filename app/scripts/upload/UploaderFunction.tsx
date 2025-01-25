/**TSX File with all the function to upload the file to repo */
import { service } from "@esko/cloud-service-utils";
import Fetch from '@esko/cloud-ui-components/dist/esm/data/requests/fetch';
import { MeetingInterface } from "../interfaces/InnovationInterface";
import MeetingService from "../services/service/MeetingService";
const REPO = service("repo");

/**
 * Function to remove the avatar from a given ndoe path
 * @param nodePath - the node location in repo
 * @param onSuccess - call back function when deletion is success
 * @param onError - call back function when deletion fails 
 */
export const removeAvatar = (nodePath: string, onSuccess: any, onError: any) => {
    removeContent(nodePath, "thumbnail", onSuccess, onError);
};

/**
 * Function to upload a given image to the specified nodepath
 * @param nodePath - node location in repo
 * @param fileBlob - the file data
 * @param onSuccess - callback function when upload is successful
 * @param onError - callback function when upload fails
 */
export const uploadAvatar = (nodePath: string, fileBlob: File, onSuccess: any, onError: any, inVersion: number = 1) => {
    uploadContent(nodePath, "thumbnail", fileBlob, onSuccess, onError, inVersion);
};

/**
 * Function to remove the content from a given node path
 * @param nodePath - the node location in repo
 * @param onSuccess - call back function when deletion is success
 * @param onError - call back function when deletion fails 
 */
export const removeContent = (nodePath: string, contentId: string, onSuccess: any, onError: any) => {
    REPO.fetch("DELETE", ["CONTENT", "v0", ...nodePath.split("/")], { contentid: contentId }).
        then((data: any) => {
            /**If user passed any function, call that function */
            typeof onSuccess === "function" ? onSuccess(data) : console.log(data);
        }, (error: any) => {
            typeof onError === "function" ? onError(error) : console.log(error);
        });
};

/**
 * Function to upload a given file to the specified repoID in repo
 * @param repoID - repoID to upload content
 * @param meetingName - name of the meeting where to save
 * @param contentId - content ID of the file in repo
 * @param fileBlob - the file data
 * @param onSuccess - callback function when upload is successful
 * @param onError - callback function when upload fails
 */

export const uploadContentinRepo = (repoId: string, meetingName: string, onSuccess: any, onError: any, contentId: string, fileBlob: File, discussionTopicId: string) => {
    return new Promise(() => {
        MeetingService.innovationUpdateSlides(repoId, meetingName, contentId, fileBlob, discussionTopicId)
            .then((updateMeetingResponse: any) => {
                typeof onSuccess === "function" ? onSuccess("complete") : console.log(updateMeetingResponse);
            })
            .catch((updateMeetingError: any) => {
                typeof onError === "function" ? onError(updateMeetingError.response.data.message) : console.log(updateMeetingError);
            });
    })
}

/**
 * Function to upload a given file to the specified repoID in repo
 * @param repoID - repoID to upload content
 * @param meetingData - data of meeting where to delete
 * @param discussionTopicID - discussionTopic ID of the where the slide is present
 */

export const deleteContent = (meetingData: MeetingInterface, repoId: string, discussionTopicID: string) => {
    return new Promise((resolve,reject) => {
        MeetingService.innovationDeleteSlides(repoId, meetingData, discussionTopicID)
            .then((updateMeetingResponse: any) => {
                resolve(updateMeetingResponse);
            })
            .catch((updateMeetingError: any) => {
                reject(updateMeetingError);
            });
    })
}

/**
 * Function to upload a given file to the specified nodepath
 * @param nodePath - node location in repo
 * @param contentId - content ID of the file in repo
 * @param fileBlob - the file data
 * @param onSuccess - callback function when upload is successful
 * @param onError - callback function when upload fails
 */
export const uploadContent = (nodePath: string, contentId: string, fileBlob: File, onSuccess: any, onError: any, inVersion: number = 1, inFileName: string = "custom") => {
    const file = fileBlob;
    let timer: any;
    const currentApp = window.location.host.split(".").splice(0, 1).join("");

    /**Make the upload request to repo */
    REPO.post(["CONTENT", "v0", ...nodePath.split("/")], null, null, {
        contentid: contentId,
        s3uri: true,
        overwrite: true,
        version: inVersion,
        originalFileName: inFileName
    }).then(function (uploadContentResponse: any) {
        /**On success create methods to setup the websocket */
        /**function to keep the websocket for timing out */
        function ping() {
            ws.send(JSON.stringify({ "status": 102, "path": "", "contentId": "", "progress": 0, "versionId": "", "eTag": "" }));
        }
        function pong() {
            clearTimeout(timer);
        }
        /**Create a websocket */
        let ws = new WebSocket(window.location.origin.replace(currentApp, "repo").replace('http', 'ws') + "/" + uploadContentResponse.statusUri);
        if ("WebSocket" in window) {
            // Let us open a web socket
            ws.onopen = function () {
                // Web Socket is connected, send data using send()
                timer = setInterval(ping, 30000);
                const headers = {
                    contentType: "binary/octet-stream",
                };
                /**Keep checking the status of upload, once done call the success callback function */
                Fetch.put({ url: uploadContentResponse.contentUri, body: file, headers: headers, blob: true, query: undefined }).then(function (_value: any) {
                    ws.send(JSON.stringify({ "status": 200, "path": "", "contentId": "", "progress": 0, "versionId": "", "eTag": "" }));
                    typeof onSuccess === "function" ? onSuccess("complete") : console.log('Content Uploaded');
                }, function (data: any) {
                    ws.send(JSON.stringify({ "status": 500, "path": "", "contentId": "", "progress": 0, "versionId": "", "eTag": "" }));
                    typeof onError === "function" ? onError(data) : console.log(data);
                });
            };
        }
        ws.onmessage = function (evt: any) {
            if ("inProgress" !== evt.data) {
                pong();
            }
        };
        ws.onclose = function () {
            pong();
        };
    }, function (error: any) {
        typeof onError === "function" ? onError(error) : console.log(error);
    });
};