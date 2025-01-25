/**TSX file to display the runway in list view */
import { Checkbox, LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { CircularProgress, IconButton, ThemeProvider, Tooltip } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../Icons/images";
import { DynamicTextEdit } from "../../components/runwayComponents/DynamicTextEditComponent";
import { Autocomplete } from "../../components/utils/Autocomplete/Autocomplete";
import { getRunwayNodePath, getRunwayThumbnailPath } from "../../constant/InnovationAPI";
import { conflictingRunway, defaultRunwayError, emptyRunwayNameError, forbiddenToRunwayMessages } from "../../constant/InnovationMessages";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayViewContext } from "../../context/RunwayViewContext";
import { RunwayModel } from "../../interfaces/InnovationInterface";
import { repoUpdateThumbnail } from "../../services/RepoService";
import RunwayService from "../../services/service/RunwayService";
import { RunwayFieldTheme } from "../../themes/RunwayTheme";
import { AvatarUpload } from "../../upload/AvatarUploadComponent";
import { AvatarThumbnailTheme } from "../../upload/AvatarUploaderStyling";
import { ColumnFieldData, TableWrapper } from "./TableWrapper";

declare interface RunwayListViewPropsType {
    /**Call back function when user click on delete icon */
    inputDeleteRunwayFunction: (runwayData: RunwayModel) => void;
    /**Variable to check the status of switch button */
    showInActiveRunway: boolean;
    /**To check if parent component rendered or not */
    parentComponentRendered: boolean;
    /**Setter to open the alert message in "Snackbar" component */
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
    /**Setter to set the message to be displayed in the "Snackbar" component */
    setAlertContent: React.Dispatch<React.SetStateAction<string>>;
    /**Setter to set whether the status is "success" or not */
    setAlertSeverity: React.Dispatch<React.SetStateAction<any>>;
    /**Variable to refresh the table */
    updateTable: boolean;
    setUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
    usersList: string[];
}

/**
 * Function that return List view of all the runway in 
 * the database.
 * @param inputProps - Props of the type RunwayListViewPropsType
 * @returns 
 */
export function RunwayListView(inputProps: RunwayListViewPropsType) {

    const MAX_CHARACTER_LIMIT: number = 140;

    /**Defining the Column field data of Runway Table */
    const columnFields: ColumnFieldData[] = [
        { dataKey: "isActive", label: "Active", alignment: "left", cellWidth: "5%", isComponentColumn: true, isSortable: true, returnsRowData: false },
        { dataKey: "runwayName", label: "Name", alignment: "left", cellWidth: "25%", isComponentColumn: true, isSortable: true, returnsRowData: false },
        { dataKey: "managerName", label: "Manager", alignment: "left", cellWidth: "30%", isComponentColumn: true, isSortable: true, returnsRowData: false },
        { dataKey: "thumbnail", label: "Thumbnail", alignment: "center", cellWidth: "10%", isComponentColumn: true, isSortable: false, returnsRowData: false },
        { dataKey: "actionComponent", label: "", alignment: "right", cellWidth: "30%", isComponentColumn: true, isSortable: false, returnsRowData: false }
    ];

    /**To set the loading animation when waiting for search response */
    const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
    /**to hold the table data returned from the search call */
    const [runwayListData, setRunwayListData] = useState<RunwayModel[]>([])
    /**To hold the display data that is displayed by the table wrapper */
    const [displayTableData, setDisplayTableData] = useState<any[]>([]);
    /**Get the context data */
    const lInnovationData = useContext(InnovationAppContext);
    const lRunwayViewData = useContext(RunwayViewContext);

    useEffect(() => {
        setLoadingIcon(true);
        /**Call innovation backend to get the Runway data */
        RunwayService.innovationGetRunwayForListView(lInnovationData.eskoAccountDetail.repoid)
            .then((response: RunwayModel[]) => {
                setRunwayListData(lRunwayViewData.handleRunwaysDataModification(response));
                setLoadingIcon(false);
            })
            .catch((error: any) => {
                console.log(error);
                setLoadingIcon(false);
            });
    }, [lInnovationData, inputProps.parentComponentRendered, inputProps.updateTable]);

    /**Re-render the table when the switch button changes or when the list data gets updated */
    useEffect(() => {
        createDisplayData(runwayListData);
        lRunwayViewData.setTotalRunways(runwayListData.length);
    }, [inputProps.showInActiveRunway, runwayListData, inputProps.usersList]);

    /**To show the error alert for error in update */
    const handleRunwayUpdateError = (inError: any) => {
        /**Setting the snackbar alert messages */
        inputProps.setAlertSeverity("error");
        inputProps.setOpenAlert(true);
        /**Display alert based on the error status */
        if (403 === inError.status) {
            inputProps.setAlertContent(forbiddenToRunwayMessages("Update"));
        } else {
            inputProps.setAlertContent(defaultRunwayError);
        }
        setLoadingIcon(false);
    };

    /**Function to update the active field on click */
    const handleActiveClick = (inRunwayName: string, inActiveValue: boolean, inRunwayId: string) => {
        /**Display the loading animation */
        setLoadingIcon(true);
        /**Save the changed active value as an object */
        const holdData = {
            isActive: !inActiveValue
        }
        /**Make the update request to innovation backend */
        RunwayService.innovationUpdateRunway(inRunwayId, inRunwayName.toString(), holdData)
            .then((updateRunwayResponse: any) => {
                setLoadingIcon(false);
                /**Setting the operation performed and saving the active status value */
                lRunwayViewData.setRunwayOperationPerformed("UPDATE_STATUS");
                lRunwayViewData.setModifiedRunway({
                    ...lRunwayViewData.modifiedRunway,
                    isActive: holdData.isActive,
                    runwayName: inRunwayName,
                    nodeId: inRunwayId
                });
                /**Trigger update of runway view  */
                inputProps.setUpdateTable(!inputProps.updateTable);
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("success");
                inputProps.setOpenAlert(true);
                inputProps.setAlertContent(updateRunwayResponse.message);
            })
            .catch((error: any) => {
                handleRunwayUpdateError(error);
            });
    };

    /**
     * Function to update the manager name on change in list view
     * @param newManagerName - The new manager name to be updated
     */
    const handleManagerChange = (inRunwayName: string, newManagerName: any, inRunwayId: string) => {
        /**Display the loading animation */
        setLoadingIcon(true);
        /**Save the changed manager value as an object */
        const holdData = {
            managerName: newManagerName
        };
        /**Make the update request to innovation backend */
        RunwayService.innovationUpdateRunway(inRunwayId, inRunwayName.toString(), holdData)
            .then((updateRunwayResponse: any) => {
                lRunwayViewData.setRunwayOperationPerformed("UPDATE_MANAGER");
                lRunwayViewData.setModifiedRunway({
                    ...lRunwayViewData.modifiedRunway,
                    managerName: newManagerName,
                    runwayName: inRunwayName.toString(),
                    nodeId: inRunwayId
                });
                setLoadingIcon(false);
                /**Trigger update of runway view  */
                inputProps.setUpdateTable(!inputProps.updateTable);
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("success");
                inputProps.setOpenAlert(true);
                inputProps.setAlertContent(updateRunwayResponse.message);
            })
            .catch((error: any) => {
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("error");
                inputProps.setOpenAlert(true);
                /**Display alert based on the error status */
                if (403 === error.status) {
                    inputProps.setAlertContent(forbiddenToRunwayMessages("Update"));
                } else {
                    inputProps.setAlertContent(defaultRunwayError);
                }
                setLoadingIcon(false);
            });
    }

    /**Function that calls the innovation backend to update the runway name */
    const handleRunwayNameChange = (inOldRunwayName: string, inNewRunwayName: string, inRunwayId: string) => {
        /**Display the loading animation */
        setLoadingIcon(true);
        /**Save the changed runway value as an object */
        const holdData = {
            runwayName: inNewRunwayName
        }
        return new Promise((_resolve, reject) => {
            /**Check if the runwayName is blank or not before making call to repo */
            if (inNewRunwayName === "") {
                reject(false);
                /**Stop the loading Animation */
                setLoadingIcon(false);
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("error");
                inputProps.setOpenAlert(true);
                /**Error message */
                inputProps.setAlertContent(emptyRunwayNameError);
                return;
            }
            /**Make the update request to innovation backend */
            RunwayService.innovationUpdateRunway(inRunwayId, inOldRunwayName.toString(), holdData)
                .then((updateRunwayResponse: any) => {
                    /**Getting the nodepath based on the latest runway name */
                    const holdNodePath = getRunwayNodePath(lInnovationData.eskoAccountDetail.repoid, inNewRunwayName);
                    /**function to update thumbnail link after node gets updated */
                    repoUpdateThumbnail(holdNodePath)
                        .then(() => {
                            setLoadingIcon(false);
                            /**Set the operation performed and save the updated data */
                            lRunwayViewData.setRunwayOperationPerformed("UPDATE_NAME");
                            lRunwayViewData.setModifiedRunway({
                                ...lRunwayViewData.modifiedRunway,
                                runwayName: holdData.runwayName,
                                nodeId: inRunwayId
                            });
                            lRunwayViewData.setPreviousRunwayName(inOldRunwayName.toString());
                            /**Trigger update of runway view  */
                            inputProps.setUpdateTable(!inputProps.updateTable);
                            /**Setting the snackbar alert messages */
                            inputProps.setAlertSeverity("success");
                            inputProps.setOpenAlert(true);
                            inputProps.setAlertContent(updateRunwayResponse.message);
                        })

                })
                .catch((error: any) => {
                    /**Setting the snackbar alert messages */
                    inputProps.setAlertSeverity("error");
                    inputProps.setOpenAlert(true);
                    /**Display alert based on the error status */
                    switch (error.status) {
                        case 403: inputProps.setAlertContent(forbiddenToRunwayMessages("Update")); break;
                        case 409: inputProps.setAlertContent(conflictingRunway(inNewRunwayName)); break;
                        default: inputProps.setAlertContent(defaultRunwayError);
                    }
                    setLoadingIcon(false);
                    reject(false);
                });
        });
    }

    /**Function that takes the data returned from search and 
     * build component for the required column and retur the 
     * data in a format suitable for displaying.
     */
    const createDisplayData = (inRunwayListData: RunwayModel[]) => {
        /**Variable to hold the changed data */
        let holdTableData: any[] = []

        inRunwayListData.forEach((runwayData: any) => {
            /**Variable to hold the row data to be displayed */
            let lRunwayData: any = JSON.parse(JSON.stringify(runwayData));

            /**Defining the delete icon */
            let lDeleteIcon = <Tooltip title="Delete Runway" placement="left" arrow><IconButton onClick={() => { onDeleteRequest(runwayData) }} >
                <DeleteForeverRoundedIcon />
            </IconButton></Tooltip>
            /**Defining the cell component for the actionComponent column */
            let lHoldIconColumn = {
                displayComponent: <div>{lDeleteIcon}</div>,
                componentValue: "none"
            }
            /**Adding new property to the runway object for display purpose */
            lRunwayData["actionComponent"] = lHoldIconColumn;

            /**To define the list for the manager view*/
            /**Function to save the value sent by the ListUserComponent */
            const getNewManagerName = (inNewManagerName: string, _inFieldValue: string) => {
                if ("" !== inNewManagerName) {
                    handleManagerChange(runwayData["runwayName"], inNewManagerName, runwayData["nodeId"]);
                }
            };
            let lManagerComponent = <Autocomplete
                // The following ternary operation in the dataList is to make sure that 
                // we display only the product manager in the drop down even when a administrator is selected.
                dataList={
                    lInnovationData.currentUserInfo.displayName.toLowerCase() === runwayData["managerName"].toString().toLowerCase() &&
                    -1 === inputProps.usersList.indexOf(lInnovationData.currentUserInfo.displayName) ?
                    [...inputProps.usersList, lInnovationData.currentUserInfo.displayName] :
                    inputProps.usersList
                }
                keyValue={"managerName"}
                noOptionText={"User not found"}
                onChange={getNewManagerName}
                selectedValue={runwayData["managerName"].toString()}
            />

            /**Create an object of component and the value */
            let lHoldManagerData = {
                "displayComponent": lManagerComponent,
                "componentValue": runwayData["managerName"]
            }
            lRunwayData["managerName"] = lHoldManagerData;

            /**To define a text field for the Runway name */
            let lRunwayComponent = <ThemeProvider theme={RunwayFieldTheme}>
                <DynamicTextEdit
                    errorLabel={`Maximum limit is ${MAX_CHARACTER_LIMIT} characters`}
                    maxCharacters={MAX_CHARACTER_LIMIT}
                    currentTextValue={runwayData["runwayName"]}
                    currentDataId={runwayData["nodeId"]}
                    updateCallBackFunction={handleRunwayNameChange}
                    key={runwayData["runwayName"]}
                />
            </ThemeProvider>
            /**Create an object of component and the value */
            let lHoldRunwayData = {
                "displayComponent": lRunwayComponent,
                "componentValue": runwayData["runwayName"]
            }
            lRunwayData["runwayName"] = lHoldRunwayData;

            /**To define the component for thumbnail column and assign the image url */
            // To make sure that the value is not none for the new runway value
            let lThumbnailValue = "none" === runwayData["thumbnail"] ?
                getRunwayThumbnailPath(lInnovationData.eskoAccountDetail.repoid, runwayData["runwayName"].toString()) :
                runwayData["thumbnail"];

            /**define the component for the column */
            let lThumbnailComponent = <ThemeProvider theme={AvatarThumbnailTheme}>
                <AvatarUpload
                    sizeOfAvatar={"none"}
                    defaultImageLink={lThumbnailValue}
                    nodePath={getRunwayNodePath(lInnovationData.eskoAccountDetail.repoid, runwayData["runwayName"])}
                    callBackOnSuccess={onThumbnailUploadSuccess}
                    callBackOnFailure={onThumbnailUploadFailure}
                    key={runwayData["runwayName"]}
                />
            </ThemeProvider>
            /**Create an object of component and the value */
            let lHoldThumbnailData = {
                "displayComponent": lThumbnailComponent,
                "componentValue": lThumbnailValue
            }
            /**Assign the value to the thumbnail field */
            lRunwayData["thumbnail"] = lHoldThumbnailData;

            /**define the component for the column
            * If the value is true check the box
            */
            let lActiveComponent = <ThemeProvider theme={LightTheme}>
                <Checkbox
                    checked={runwayData["isActive"]}
                    disableRipple={true}
                    onChange={() => {
                        handleActiveClick(runwayData["runwayName"], runwayData["isActive"], runwayData["nodeId"])
                    }}
                />
            </ThemeProvider>
            /**Create an object of component and the value */
            let lHoldActiveData = {
                "displayComponent": lActiveComponent,
                "componentValue": runwayData["isActive"]
            }
            /**Assign the value to the thumbnail field */
            lRunwayData["isActive"] = lHoldActiveData;

            /**Check if only active runway should be displayed or not */
            if (inputProps.showInActiveRunway || runwayData["isActive"]) {
                holdTableData.push(lRunwayData);
            }
        });
        /**Set changed table data to a state */
        setDisplayTableData(holdTableData);
    }

    /**When uploading of the thumbnail is success */
    const onThumbnailUploadSuccess = (_response: any, inNodePath: string) => {
        repoUpdateThumbnail(inNodePath)
            .then((_repoUpdateThumbnailResponse: any) => {
                setLoadingIcon(false);
                /**Trigger update of runway view  */
                inputProps.setUpdateTable(!inputProps.updateTable);
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("success");
                inputProps.setOpenAlert(true);
                inputProps.setAlertContent(`Thumbnail Updated`);
            })
            .catch((_error: any) => {
                /**displaying a standard error message since we are just updating the 
                 * value after uploading, there must be issue with the update in repo
                */
                /**Setting the snackbar alert messages */
                inputProps.setAlertSeverity("error");
                inputProps.setOpenAlert(true);
                inputProps.setAlertContent(defaultRunwayError);
                setLoadingIcon(false);
            });
    }

    /**When uploading of the thumbnail failes */
    const onThumbnailUploadFailure = (error: any, _inNodePath: string) => {
        handleRunwayUpdateError(error);
    };

    /**Callback function to return the data */
    const onDeleteRequest = (data: any) => {
        /**Convert the table row data to runway data */
        let holdData: RunwayModel = {
            isActive: data["isActive"],
            managerName: data["managerName"],
            runwayName: data["runwayName"],
            thumbnail: data["thumbnail"] === images.EskoIcon ? "none" : data["thumbnail"],
            nodeId: data["nodeId"]
        };
        /**return the runway data to be deleted */
        inputProps.inputDeleteRunwayFunction(holdData);
    }

    return (
        <div>
            {/**Div to display the Runway table */}
            <div
                style={{
                    height: "100vh",
                    opacity: loadingIcon ? 0.5 : 1,
                    pointerEvents: loadingIcon ? "none" : "all"
                }}
            >
                <TableWrapper
                    borderedRow={true}
                    tableHeight={"85%"}
                    zIndexValue={1}
                    onRowClickCallBack={(data: any) => { console.log(data) }}
                    inputData={displayTableData}
                    inputColumn={columnFields}
                    customMessageOnEmpty={"No Runways added yet"}
                    tableWidth={"auto"}
                />
            </div>
            {
                /**Display the loading animation only when loadingIcon is true */
                loadingIcon ?
                    <CircularProgress
                        style={{
                            color: "black",
                            position: "absolute",
                            left: "45%",
                            top: "40%",
                            zIndex: 1
                        }}
                    /> :
                    null
            }
        </div>
    );
}