/**TSX file listing all the calls made to search service */

import { BusinessGoalWithIdType, MeetingInterface, MeetingsListWithDiscussionType, RunwayModel, RunwaysListType } from "../interfaces/InnovationInterface";
import Service from "../utils/util/Service";

export default class SearchService extends Service {
    /**Declaring the search service */
    // const SEARCH = new service("search");
    
    /**
     * This function searches the Business Goal Location for the Business Goal Node and returns
     * all the business goal found with only runwaysList and businessGoalName
    * Sends empty array if there is an error/no business goal.
    * @param inRepoId - The repo to be searched for the business goal
    */
    public static searchRunwaysListInBusinessGoal(inRepoId: string) {
        return new Promise((resolve, reject) => {
            /**Building the request body to search for BusinessGoal node type */
            const requestBody = {
                size: 200,
                query: {
                    bool: {
                        must: [
                            {
                                prefix: {
                                    path: `${inRepoId}/InnovationSite/BusinessGoals`
                                }
                            },
                            {
                                bool: {
                                    should: [
                                        {
                                            match: {
                                                nodeType: "esko:innovation/Innovation:BusinessGoal.json"
                                            }
                                        },
                                        {
                                            match: {
                                                nodeType: "Innovation:BusinessGoal"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                /**sort based on business goal node name */
                sort: { name: "asc" }
            };

            /**Call the search service to get the data */
            this.SearchPOSTCall(["_esko", "search", "nodes", "repo", inRepoId, "_search"], requestBody)
                .then((response: any) => {
                    /**Array to hold the business goals that is returned back */
                    const lBusinessGoalList: RunwaysListType[] = [];
                    /**If no business goal is found in the mentioned repo id because
                     * the repo id is new and goals are yet to be created
                    */
                    if (undefined !== response.hits.hits && [] !== response.hits.hits) {
                        /**Save the response in a local constand */
                        const lBusinessGoalResponseArray: any[] = response.hits.hits;
                        /**Iterate over each each element in the response array saved in the constant */
                        lBusinessGoalResponseArray.forEach((lBusinessGoal) => {
                            /**Save the required fields. If a field is undefined then save with a custom value
                             * For strings it is "", for numbers it is zero
                             */
                            const lBusinessGoalHolder = {
                                businessGoalName: lBusinessGoal._source["ec_s@businessGoalName"] === undefined ? "" : lBusinessGoal._source["ec_s@businessGoalName"],
                                runwaysList: lBusinessGoal._source["ec_nio@runwaysList"] === undefined ? [] : lBusinessGoal._source["ec_nio@runwaysList"],
                            };
                            /**Add the business goal to the return array */
                            lBusinessGoalList.push(lBusinessGoalHolder);
                        });
                    }
                    resolve(lBusinessGoalList);
                })
                .catch((error: any) => {
                    reject(error);
                });
            });
    }

    /**
     * This function searches the Meetings location for the Meeting Node and returns
     * all the Meetings found with only meetingName and discussionTopics
     * Sends empty array if there is an error/no meetings.
     * @param inRepoId - The repo to be searched for the Meetings
     */
    public static searchGetMeetingsListWithDiscussionTopics(inRepoId: string) {
        
        
        return new Promise<MeetingInterface | any>((resolve, reject) => {
            /**Building the request body to search for Meeting node type */
            const requestBody = {
                size: 999,
                query: {
                    bool: {
                        must: [
                            {
                                prefix: {
                                    path: `${inRepoId}/InnovationSite/Meetings/`
                                }
                            },
                            {
                                bool: {
                                    should: [
                                        {
                                            match: {
                                                nodeType: "esko:innovation/Innovation:Meeting.json"
                                            }
                                        },
                                        {
                                            match: {
                                                nodeType: "Innovation:Meeting"
                                            }
                                        }
                                    ]
                                }
                            },
                        ]
                    }
                },
                sort: { "name": "asc" }
            };
            /**Call the search service to get the data */
            this.SearchPOSTCall(["_esko", "search", "nodes", "repo", inRepoId, "_search"], requestBody)
                .then((response: any) => {
                    /**Array to hold the Meetings that is returned back */
                    const lMeetingsList: MeetingsListWithDiscussionType[] = [];
                    /**If no Meetings is found in the mentioned repo id because
                     * the repo id is new and Meetings are yet to be created
                    */
                    if (response.hits.hits !== undefined && response.hits.hits != []) {
                        /**Save the response in a local constant */
                        const lMeetingsResponseArray: any[] = response.hits.hits;
                        /**Iterate over each each element in the response array saved in the constant */
                        lMeetingsResponseArray.forEach((lMeeting: any) => {
                            /**Save the required fields. If a field is undefined then save with a custom value
                             * For strings it is "", for array of object it is []
                            */
                            const lMeetingHolder: MeetingsListWithDiscussionType = {
                                meetingName: undefined !== lMeeting._source["ec_s@meetingName"] ? lMeeting._source["ec_s@meetingName"] : "",
                                discussionTopics : undefined !== lMeeting._source["ec_nio@discussionTopics"] ? lMeeting._source["ec_nio@discussionTopics"] : [],
                            };
                            /**Add the Meetings to the return array */
                            lMeetingsList.push(lMeetingHolder);
                        })
                    }
                    resolve(lMeetingsList);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })

    }

    /**
    * This function searches the BusinessGoals location for the Business goal Node and returns
    * all the Business Goals found with only nodeId and businessGoalName, which can be used to display Business Goal List in Add Topi/BusinessGoal Dialog.
    * Sends empty array if there is an error/no runway.
    * @param inRepoId - The repo to be searched for the Runways
    */
    public static searchGetBGListWithID(inRepoId: string) {
        return new Promise<RunwayModel | any>((resolve, reject) => {
            /**Building the request body to search for Runway node type */
            const requestBody = {
                size: 200,
                query: {
                    bool: {
                        must: [
                            {
                                prefix: {
                                    path: `${inRepoId}/InnovationSite/BusinessGoals`
                                }
                            },
                            
                            {
                                bool: {
                                    should: [
                                        {
                                            match: {
                                                nodeType: "esko:innovation/Innovation:BusinessGoal.json"
                                            }
                                        },
                                        {
                                            match: {
                                                nodeType: "Innovation:BusinessGoal"
                                            }
                                        }
                                    ]
                                }
                            },
                        ]
                    }
                },
                sort: { "name": "asc" }
            };
            /**Call the search service to get the data */
            this.SearchPOSTCall(["_esko", "search", "nodes", "repo", inRepoId, "_search"], requestBody)
                .then((response: any) => {
                    /**Array to hold the Business goals that is returned back */
                    const lBusinessGoalListWithID: BusinessGoalWithIdType[] = [];
                    /**If no Business Goal is found in the mentioned repo id because
                     * the repo id is new and Business Goal are yet to be created
                    */
                    if (response.hits.hits !== undefined && response.hits.hits != []) {
                        /**Save the response in a local constand */
                        const lBusinessGoalResponseArray: any[] = response.hits.hits;
                        /**Iterate over each each element in the response array saved in the constant */
                        lBusinessGoalResponseArray.forEach((lBusinessGoal: any) => {
                            /**Save the required fields. If a field is undefined then save with a custom value
                             * For strings it is "", for numbers it is zero
                            */
                            const lBusinessGoalHolder: BusinessGoalWithIdType = {
                                nodeId: lBusinessGoal._source["nodeId"] !== undefined ? lBusinessGoal._source["nodeId"] : "",
                                businessGoalName: lBusinessGoal._source["ec_s@businessGoalName"] === undefined ? "" : lBusinessGoal._source["ec_s@businessGoalName"],
                            };
                            /**Add the Business Goal to the return array */
                            lBusinessGoalListWithID.push(lBusinessGoalHolder);
                        })
                    }
                    resolve(lBusinessGoalListWithID);
                })
                .catch((error: any) => {
                    reject(error);
                });
        })

    }

    /**
     * Function to call the search service to get the number of business goal set 
     * to a given status
     * @param inRepoId - The repo id of the database to search
     * @param inStatus - The status whose business goal count has to be returned
     * @returns 
     */
    public static searchGetBGStatusCount(inRepoId: string, inStatus: string) {
        const searchQuery = {
            size: 200,
            query: {
                bool: {
                    must: [
                        {
                            prefix: {
                                path: `${inRepoId}/InnovationSite/BusinessGoals`
                            }
                        },
                        
                        {
                            bool: {
                                should: [
                                    {
                                        match: {
                                            nodeType: "esko:innovation/Innovation:BusinessGoal.json"
                                        }
                                    },
                                    {
                                        match: {
                                            nodeType: "Innovation:BusinessGoal"
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            match: {
                                "ec_s@status": inStatus.trim()
                            }
                        }
                    ]
                }
            },
            sort: { "name": "asc" }
        };
        return new Promise<any>((resolve, reject) => {
            this.SearchPOSTCall(["_esko", "search", "nodes", "repo", inRepoId, "_search"], searchQuery)
                .then((response: any) => {
                    resolve(response.hits.total !== undefined ? response.hits.total : 0);
                })
                .catch((error: any) => {
                    console.log(error);
                    reject(0);
                });
        });
    }
}