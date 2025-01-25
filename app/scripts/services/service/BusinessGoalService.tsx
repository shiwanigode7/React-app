import { BusinessGoalTableParser } from "../../components/utils/Parser/BusinessGoalTableParser";
import { NoteInterface, BusinessGoalTableType, IPVNodeModel, YealryIPVModel } from "../../interfaces/InnovationInterface";
import Service from "../../utils/util/Service";

export default class BusinessGoalService extends Service {

    public static getAllBusinessGoals(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "getAllBGs", repoId, ""])
                .then((getAllBusinessGoalsResponse: any) => {
                    if ("Success" === getAllBusinessGoalsResponse.status) {
                        const lBusinessGoalResponseArray: any[] = getAllBusinessGoalsResponse.result.items;
                        const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalResponseArray);
                        resolve(lBusinessGoalList);
                    } else {
                        resolve(null);
                    }
                })
                .catch((getBGsError: any) => {
                    reject(getBGsError);
                });
        });
    }

    public static getNotCompleteBG(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "get-not-completed-bg", repoId, ""])
                .then((getNotCompletedBGResponse: any) => {
                    const lBusinessGoalResponseArray: any[] = getNotCompletedBGResponse.result.items;
                    const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalResponseArray);
                    resolve(lBusinessGoalList);
                })
                .catch((getBGsError: any) => {
                    reject(getBGsError);
                });
        });
    }

    public static canEditAndDeleteBG(groupMembership: string[], owner: string, userMailID: string) {
        return new Promise<any>((resolve, reject) => {
            const requestBody = {
                groupMembership: groupMembership,
                ownerOfBG: owner,
                userMailID: userMailID
            };

            this.InnovationPOSTCall(["api", "v0", "businessGoal", "canEditAndDeleteBG", ""], requestBody)
                .then((canEditAndDeleteBGResponse: any) => {
                    const lCanEditAndDeleteBGResponse: boolean = canEditAndDeleteBGResponse.result;
                    resolve(lCanEditAndDeleteBGResponse);
                })
                .catch((canEditBGError: any) => {
                    reject(canEditBGError);
                });
        });
    }
    /**
     * Function to call innovation backend to get the Business Goal data for MPL view
     * @param inRepoId - Repo id of the database
     * @returns - List of Business Goals
     */
    public static innovationGetBusinessGoalList(inRepoId: string) {
        return new Promise<BusinessGoalTableType | any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", inRepoId, ""])
                .then((response: any) => {
                    /**Save the response in a local constand */
                    const lBusinessGoalResponseArray: any[] = response.result.items;
                    /**Array to hold the business goals that is returned back */
                    const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalResponseArray);
                    /**Iterate over each each element in the response array saved in the constant */
                    resolve(lBusinessGoalList);
                })
                .catch((error: any) => {
                    console.log(error);
                    reject([]);
                });
        });
    }

    /**
     * Function to call innovation backend to get the Business Goal data for PPL view
     * @param inRepoId - Repo id of the database
     * @returns - List of Business Goals
     */
    public static getBusinessGoalListForPPLView(inRepoId: string) {
        return new Promise<BusinessGoalTableType | any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "getBGsForPPL", inRepoId, ""])
                .then((response: any) => {
                    const lBusinessGoalResponseArray: any[] = response.result.items;
                    const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalResponseArray);
                    resolve(lBusinessGoalList);
                })
                .catch((error: any) => {
                    console.log(error)
                    reject([]);
                });
        });
    }
    /**
     * Function to call innovation backend to get the Business Goal data of required status
     * @param inRepoId - Repo id of the database
     * @returns - List of Business Goals
     */
    public static innovationGetBusinessGoalListofStatus(inRepoId: string, inStatus: string) {

        const lQueryParam: any = {
            status: inStatus.trim()
        }
        return new Promise<BusinessGoalTableType | any>((resolve, reject) => {
            this.InnovationGETCall(
                ["api", "v0", "businessGoal", "getBGofStatus", inRepoId, ""], lQueryParam)
                .then((businessGoalofStatusResponse: any) => {
                    const lBusinessGoalofStatusResponseArray: any[] = businessGoalofStatusResponse.result.items;
                    /**Array to hold the business goals that is returned back */
                    const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalofStatusResponseArray);
                    /**Iterate over each each element in the response array saved in the constant */
                    resolve(lBusinessGoalList);
                })
                .catch((error: any) => {
                    console.log(error);
                    reject([]);
                });
        });
    }

    /**
     * Function to call innovation backend to update business goal in repo
     * @param inRepoId - The Repo location where the goal is to be updated
     * @param inBusinessGoalName - The name of the business goal which needs to be updated
     * @param inBusinessGoalId - The Node Id of the business goal which needs to be updated
     * @param inUpdatedFields - The data to be updated
     * @returns
     */
    public static innovationUpdateBusinessGoal(inRepoId: string, inBusinessGoalName: string, inBusinessGoalId: string, inUpdatedFields: any) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(
                ["api", "v0", "businessGoal", inRepoId, inBusinessGoalId], //url
                inUpdatedFields, //json request body
                {}, //headers
                { "businessGoalName": inBusinessGoalName } //query parameter
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
     * Function to call innovation backend to create business goal notes in repo
     * @param inRepoId - The Repo location where the note is to be created
     * @param inBusinessGoalName - The name of the business goal under which notes are created
     * @param inBusinessGoalNote - The data of the notes
     * @returns 
     */
    public static innovationCreateBusinessNotes(inRepoId: string, inBusinessGoalName: string, inBusinessGoalNote: NoteInterface) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPUTCall(["businessGoalNotes", "create", inRepoId, inBusinessGoalName, ""], inBusinessGoalNote)
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
     * @param inBusinessGoalName - The business goal name under which the note is saved
     * @param inBusinessGoalNoteName - the name of the note whose view is to be updated
     * @param inView - The View value to be set for the notes (Can be "Public" | "Private")
     * @returns 
     */
    public static innovationUpdateBusinessNotes(inRepoId: string, inBusinessGoalName: string, inBusinessGoalNoteName: string, inView: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(
                ["businessGoalNotes", "update", inRepoId, inBusinessGoalName, inBusinessGoalNoteName],//url
                {},//json / request body
                {},//headers
                { "NoteView": inView.trim() }//query parameter
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
     * Function to call the Innovation Backend to get the list of notes under a given business goal name.
     * @param inRepoId - The repo location where the notes are stored
     * @param inBusinessGoalName - The business goal name whose notes are  to be fetched
     * @returns 
     */
    public static innovationGetBusinessGoalNotes(inRepoId: string, inBusinessGoalName: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["businessGoalNotes", "get", inRepoId, inBusinessGoalName, ""])
                .then((response: any) => {
                    const lHoldNotesData: any[] = response.result.items;
                    const outNotesData: NoteInterface[] = [];
                    lHoldNotesData.forEach((notesData: any) => {
                        const lNoteData: NoteInterface = {
                            data: notesData["ec_s@data"] !== undefined ? notesData["ec_s@data"] : "",
                            date: notesData["creationDate"] !== undefined ? notesData["creationDate"] : "",
                            noteName: notesData["ec_s@noteName"] !== undefined ? notesData["ec_s@noteName"] : "",
                            noteView: notesData["ec_s@noteView"] !== undefined ? notesData["ec_s@noteView"] : "",
                            owner: notesData["ec_s@owner"] !== undefined ? notesData["ec_s@owner"] : ""
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
     * Function to call the Innovation Backend to get delete a business goal note under given business goal name.
     * @param inRepoId - The repo location where the notes are stored
     * @param inBusinessGoalName - The business goal name whose notes are  to be deleted
     * @param inBusinessNoteName - The business note name which need to be deleted
     * @returns 
     */

    public static innovationDeleteBusinessNote(inRepoId: string, inBusinessGoalName: string, inBusinessNoteName: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationDELETECall(["businessGoalNotes", inRepoId, inBusinessGoalName, inBusinessNoteName, ""])
                .then((deleteBGNoteRespnse: any) => {
                    resolve(deleteBGNoteRespnse);
                })
                .catch((deleteBGNoteError: any) => {
                    reject(deleteBGNoteError);
                });
        });
    }

    /**
     * Function to change the Priority of the Business Goal
     * @param inRepoId - Database/Repo-id 
     */
    public static innovationChangePriority(inRepoId: string, inBusinessGoalName: string, inPrevPriority: string, inNextPriority: string, inView: string) {
        const params: object = {
            view: inView,
            prevPriority: inPrevPriority,
            nextPriority: inNextPriority
        };
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(["api", "v0", "businessGoal", "updatePriority", inRepoId, inBusinessGoalName, ""],
                {},
                {},
                params)
                .then((updatePriorityResponse: any) => {
                    resolve(updatePriorityResponse);
                })
                .catch((updatePriorityError: any) => {
                    reject(updatePriorityError);
                });
        });
    }

    public static innovationBusinessGoalStatusUpdate(inRepoId: string, inBusinessGoalName: string, inPrevStatus: string, inNewStatus: string) {
        const lQueryParam: any = {
            newStatus: inNewStatus.trim(),
            previousStatus: inPrevStatus.trim()
        }
        return new Promise<any>((resolve, reject) => {
            this.InnovationPATCHCall(
                ["api", "v0", "businessGoal", "update", "status", inRepoId, inBusinessGoalName, ""],
                {},
                {},
                lQueryParam
            )
                .then((statusResponse: any) => {
                    resolve(statusResponse);
                })
                .catch((statusError: any) => {
                    reject(statusError);
                });
        });
    }

    public static innovationGetPredictionIPV(inRepoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "predicted-ipv", inRepoId, ""])
                .then((getPredictionIPVResponse: any) => {
                    resolve(getPredictionIPVResponse.result);
                })
                .catch((getPredictionIPVError: any) => {
                    console.log(getPredictionIPVError);
                    reject([]);
                });
        });
    }

    /**
     * Function to get the IPV value for four quarters
     * @param inRepoId - Database location for the repo id
     * @returns 
     */
    public static innovationGetIPV(inRepoId: string) {
        return new Promise<IPVNodeModel[] | any[]>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "get", "IPV", inRepoId, ""])
                .then((ipvResponse: any) => {
                    const lIPVArray: IPVNodeModel[] = ipvResponse.result;
                    const lIPVReveresedArray: IPVNodeModel[] = [...lIPVArray].reverse();
                    resolve(JSON.parse(JSON.stringify(lIPVReveresedArray)));
                })
                .catch((ipvError: any) => {
                    reject(ipvError);
                });
        });
    }

    /**
     * Function to get the IPV value for an year
     * @param inRepoId - Database location for the repo id
     * @returns 
     */
    public static innovationGetYearlyIPV(inRepoId: string, inYear: string) {
        const lQueryParam = {
            year: inYear
        }
        return new Promise<YealryIPVModel | any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "yearlyIPV", inRepoId, ""], lQueryParam)
                .then((ipvResponse: any) => {
                    resolve(JSON.parse(JSON.stringify(ipvResponse.result)));
                })
                .catch((ipvError: any) => {
                    reject(ipvError);
                });
        });
    }

    /**
     * Function to get the Quarterly IPV value for an year
     * @param inRepoId - Database location for the repo id
     * @returns 
     */
    public static innovationGetQuarterlyIPV(inRepoId: string, inYear: string) {
        const lQueryParam = {
            year: inYear
        }
        return new Promise<number[] | any[]>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "quarterlyIPV", inRepoId, ""], lQueryParam)
                .then((ipvResponse: any) => {
                    resolve(JSON.parse(JSON.stringify(ipvResponse.result)));
                })
                .catch((ipvError: any) => {
                    reject(ipvError);
                });
        });
    }

    /**
     * Function to call innovation backend to get the Business Goal data
     * @param inRepoId - Repo id of the database
     * @returns - List of Business Goals
     */
    public static innovationGetAllBusinessGoalList(inRepoId: string) {
        return new Promise<BusinessGoalTableType | any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "businessGoal", "getAllBGs", inRepoId, ""])
                .then((response: any) => {
                    const lBusinessGoalResponseArray: any[] = response.result.items;
                    const lBusinessGoalList: BusinessGoalTableType[] = BusinessGoalTableParser(lBusinessGoalResponseArray);
                    resolve(lBusinessGoalList);
                })
                .catch((error: any) => {
                    console.log(error);
                    reject([]);
                });
        });
    }

}
