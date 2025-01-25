import React, { useState, useReducer, useEffect, useContext } from "react";
import ReleaseService from "../../../services/service/ReleaseService";
import AddButtonModel from "../../utils/Header/AddButton/AddButtonModel";
import Header from "../../utils/Header/Header";
import HeaderModel from "../../utils/Popup/Header/HeaderModel";
import ActionButtonsModel from "../../utils/Popup/ActionButtons/ActionButtonsModel";
import InputTextFieldModel from "../../utils/InputFields/InputTextField/InputTextFieldModel";
import DatePickerModel from "../../utils/InputFields/DatePickerField/DatePickerFieldModel";
import TextAreaFieldModel from "../../utils/InputFields/TextAreaField/TextAreaFieldModel";
import ReleaseModel from "./ReleaseModel";
import InputTextField from "../../utils/InputFields/InputTextField/InputTextField";
import DatePickerField from "../../utils/InputFields/DatePickerField/DatePickerField";
import AlertPopup from "../../utils/AlertPopup/AlertPopup";
import AlertPopupModel from "../../utils/AlertPopup/AlertPopupModel";
import ConfirmationPopup from "../../utils/ConfirmationPopup/ConfirmationPopup";
import ConfirmationPopupModel from "../../utils/ConfirmationPopup/ConfirmationPopupModel";
import ToggleButtonModel from "../../utils/Header/ToggleButton/ToggleButtonModel";
import ArchiveIcon from "../../../../Icons/ArchiveIcon";
import LoadingIcon from "../../utils/LoadingIcon/LoadingIcon";
import ColumnModel from "../../utils/BasicTable/ColumnModel";
import BasicTable from "../../utils/BasicTable/BasicTable";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { cancelDialogTitle, cancelActionContent, cancelDialogContent, INTERNAL_SERVER_ERROR } from "../../../constant/InnovationMessages";
import { ACTIVE_COLOR, COLOR_GRAPHITE_5 } from "../../../constant/Colors";
import AddReleasePopUp from "./AddReleasePopUp/AddReleasePopUp";
import { InnovationAppContext } from "../../../context/InnovationAppContext";

export default function InnovationCadence() {

    const lInnovationData = useContext(InnovationAppContext);

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [allReleases, setAllReleases] = useState<ReleaseModel[]>([]);
    const [formInput, setFormInput] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            name: "",
            date: "",
            description: ""
        }
    );
    const [alertPopupData, setAlertPopupData] = useState<AlertPopupModel>({ isOpen: false });
    const [formInputFieldsValidations, setFormInputFieldsValidations] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            isNameEmpty: false,
            isDateEmpty: false,
            doesDateAlreadyExist: false
        }
    );
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState<boolean>(false);
    const [mainPageLoading, setMainPageLoading] = useState<boolean>(false);
    const [actionButtonLoading, setActionButtonLoading] = useState<boolean>(false);
    const [isToggleButtonClicked, setIsToggleButtonClicked] = useState<boolean>(false);
    const [nonArchivedReleases, setNonArchivedReleases] = useState<ReleaseModel[]>([]);
    const [tableRowArray, setTableRowArray] = useState<any[]>([]);

    useEffect(() => {
        setMainPageLoading(true);
        ReleaseService.getAllReleases(lInnovationData.eskoAccountDetail.repoid)
            .then((releases: ReleaseModel[]) => {
                setAllReleases(releases);
                setMainPageLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setMainPageLoading(false);
            });
    }, []);

    useEffect(() => {
        setNonArchivedReleases(allReleases.filter(release => !release.isArchived));
    }, [allReleases]);

    const addButtonData: AddButtonModel = {
        tooltipTitle: "Add Release",
        addButtonAltText: "Add Release Button",
        handleAddButtonClick: () => {
            setIsPopupOpen(true);
        }
    };

    const toggleButtonData: ToggleButtonModel = {
        label: "Show Archived Versions",
        handleChange: (evt: any) => {
            setIsToggleButtonClicked(evt.target.checked)
        }
    };

    const headerData: HeaderModel = {
        titleText: "Add Release",
        handleCloseButtonClick: () => {
            closePopup();
        }
    };

    const actionButtonsData: ActionButtonsModel = {
        handleCancelButtonClick: () => {
            closePopup();
        },
        successButtonText: "Add",
        handleSuccessButtonClick: (evt: any) => {
            evt.preventDefault();

            if ("" === formInput.name) {
                setFormInputFieldsValidations({ isNameEmpty: true });
                return;
            }
            if ("" === formInput.date) {
                setFormInputFieldsValidations({ isDateEmpty: true });
                return;
            }

            let isValidForm = false;
            if (!formInputFieldsValidations.doesDateAlreadyExist &&
                !formInputFieldsValidations.isNameEmpty &&
                !formInputFieldsValidations.isDateEmpty) {
                isValidForm = true;
            }
            if (isValidForm) {
                setActionButtonLoading(true);
                const releaseData: ReleaseModel = {
                    name: formInput.name,
                    date: formInput.date,
                    description: formInput.description,
                    isArchived: false,
                    nodeId: ""
                };
                ReleaseService.createRelease(releaseData, lInnovationData.eskoAccountDetail.repoid).then((addReleaseResponse: any) => {
                    if (null !== addReleaseResponse) {
                        releaseData.id = addReleaseResponse;
                        const duplicateAllReleasesArray = [...allReleases];
                        duplicateAllReleasesArray.push(releaseData);
                        duplicateAllReleasesArray.sort((firstElement, secondElement) => (firstElement.date > secondElement.date ? 1 : -1));
                        setAllReleases(duplicateAllReleasesArray);
                        setIsPopupOpen(false);
                        resetFormData();
                        setAlertPopupData({
                            isOpen: true,
                            content: "Release was created Successfully.",
                            severity: "success",
                            handleCloseButtonClick: () => {
                                setAlertPopupData({ isOpen: false });
                            }
                        });
                    } else {
                        setIsPopupOpen(false);
                        resetFormData();
                        showErrorMessage(INTERNAL_SERVER_ERROR)
                    }
                }).catch(() => {
                    setIsPopupOpen(false);
                    resetFormData();
                    showErrorMessage(INTERNAL_SERVER_ERROR);
                });
            }
        },
        loading: actionButtonLoading
    };

    const inputTextFieldData: InputTextFieldModel = {
        hasLabel: true,
        label: "Name",
        isMandatory: true,
        name: "name",
        defaultValue: formInput.name,
        isEmpty: formInputFieldsValidations.isNameEmpty,
        maxCharactersAllowed: 30,
        handleInput: (evt: any) => {
            handleInputValueChange(evt);
            setFormInputFieldsValidations({ isNameEmpty: false });
        },
        isBlockCharacterEntry: true,
        isShowMaxCharactersAllowedErrorMsg: true
    };

    const datePickerFieldData: DatePickerModel = {
        hasLabel: true,
        label: "Expected Release Date",
        isMandatory: true,
        name: "date",
        defaultValue: formInput.date,
        isEmpty: formInputFieldsValidations.isDateEmpty,
        doesAlreadyExist: formInputFieldsValidations.doesDateAlreadyExist,
        handleInput: (evt: any) => {
            handleInputValueChange(evt);
            setFormInputFieldsValidations({ isDateEmpty: false });
            const doesDateExist = (allReleases.find(release => release.date === evt.target.value) === undefined) ? false : true;
            setFormInputFieldsValidations({ doesDateAlreadyExist: doesDateExist });
        }
    };

    const textAreaFieldData: TextAreaFieldModel = {
        hasLabel: true,
        label: "Description",
        name: "description",
        defaultValue: formInput.description,
        minRows: 3,
        maxRows: 3,
        maxCharactersAllowed: 1000,
        isMandatory: false,
        isEmpty: formInput.description ? false : true,
        handleInput: (evt: any) => {
            handleInputValueChange(evt);
        },
        isBlockCharacterEntry: true,
        isShowMaxCharactersAllowedErrorMsg: true
    };

    const confirmationPopupData: ConfirmationPopupModel = {
        isOpen: isConfirmationPopupOpen,
        header: {
            titleText: cancelDialogTitle,
            handleCloseButtonClick: () => { setIsConfirmationPopupOpen(false); },
        },
        confirmationMessage: {
            text: cancelDialogContent
        },
        actionButtons: {
            handleCancelButtonClick: () => { setIsConfirmationPopupOpen(false); },
            successButtonText: cancelActionContent,
            handleSuccessButtonClick: () => {
                setIsConfirmationPopupOpen(false);
                setIsPopupOpen(false);
                resetFormData();
            },
            loading: false
        }
    };

    function resetFormData() {
        setFormInput({ name: "", date: "", description: "" });
        setFormInputFieldsValidations({ isNameEmpty: false, isDateEmpty: false, doesDateAlreadyExist: false });
        setActionButtonLoading(false);
    }

    function closePopup() {
        if ("" !== formInput.name || "" !== formInput.date || "" !== formInput.description) {
            setIsConfirmationPopupOpen(true);
        } else {
            resetFormData();
            setIsPopupOpen(false);
        }
    }

    function handleInputValueChange(evt: any) {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    }

    useEffect(() => {
        isToggleButtonClicked ? createDisplayData(allReleases) : createDisplayData(nonArchivedReleases);
    }, [nonArchivedReleases, isToggleButtonClicked]);

    const handleReleaseDataUpdate = (evt: any, id: any, oldValue: any) => {
        setMainPageLoading(true);
        const updatedField: string = evt.target.name;
        const updatedValue: string = evt.target.value;

        const errorMessage: string = validateUpdateForm(updatedField, updatedValue, id);

        if ("" === errorMessage) {
            const updatedReleaseData: any = allReleases.find(release => release.id === id);
            const shouldUpdateFormData: boolean = checkFormFieldValueChange(updatedReleaseData, updatedField, updatedValue);

            if (shouldUpdateFormData) {
                const releaseData: ReleaseModel = {
                    name: ("name" === updatedField) ? updatedValue : updatedReleaseData.name,
                    date: ("date" === updatedField) ? updatedValue : updatedReleaseData.date,
                    description: ("description" === updatedField) ? updatedValue : updatedReleaseData.description,
                    isArchived: ("isArchived" === updatedField) ? !(updatedValue) : updatedReleaseData.isArchived,
                    nodeId: ""
                };
                ReleaseService.updateRelease(lInnovationData.eskoAccountDetail.repoid, id, releaseData).then((updateReleaseResponse) => {
                    if (null !== updateReleaseResponse) {
                        updateReleaseInView(updatedField, updatedValue, id);
                    } else {
                        showErrorMessage(INTERNAL_SERVER_ERROR);
                    }
                }).catch(() => {
                    showErrorMessage(INTERNAL_SERVER_ERROR);
                });
            }
        } else {
            setMainPageLoading(false);
            evt.target.value = oldValue;
            showErrorMessage(errorMessage);
        }
    };

    function validateUpdateForm(updatedField: string, updatedValue: string, id: string) {
        const doesUpdatedDateAlreadyExists = (allReleases.find(release => release.date === updatedValue && release.id !== id) === undefined) ? false : true;
        if ("name" === updatedField && "" === updatedValue)
            return "Name cannot be empty";
        else if ("date" === updatedField && "" === updatedValue)
            return "Date cannot be empty";
        else if ("date" === updatedField && doesUpdatedDateAlreadyExists)
            return "Date already exists";
        else
            return "";
    }

    function checkFormFieldValueChange(updatedReleaseData: any, updatedField: string, updatedValue: string) {
        switch (updatedField) {
            case "name": setMainPageLoading(false); return (updatedValue !== updatedReleaseData.name) ? true : false;
            case "date": setMainPageLoading(false); return (updatedValue !== updatedReleaseData.date) ? true : false;
            case "description": setMainPageLoading(false); return (updatedValue !== updatedReleaseData.description) ? true : false;
        }
        return true;
    }

    function showErrorMessage(message: string) {
        setMainPageLoading(false);
        setTimeout(function () {
            setAlertPopupData({
                isOpen: true,
                content: message,
                severity: "error",
                handleCloseButtonClick: () => {
                    setAlertPopupData({ isOpen: false });
                }
            });
        }, 1000);
    }

    function updateReleaseInView(updatedField: any, updatedValue: any, id: string) {
        allReleases.forEach(release => {
            if (release.id === id) {
                switch (updatedField) {
                    case "name": release.name = updatedValue; break;
                    case "date": release.date = updatedValue; break;
                    case "description": release.description = updatedValue; break;
                    case "isArchived": release.isArchived = !updatedValue; break;
                }
            }
        });
        const duplicateAllReleasesArray = [...allReleases];
        if ("date" === updatedField) {
            duplicateAllReleasesArray.sort((firstElement, secondElement) => (firstElement.date > secondElement.date ? 1 : -1));
        }
        setAllReleases(duplicateAllReleasesArray);
        setMainPageLoading(false);
        setAlertPopupData({
            isOpen: true,
            content: "Release updated successfully.",
            severity: "success",
            handleCloseButtonClick: () => {
                setAlertPopupData({ isOpen: false });
            }
        });
    }

    const columnArray: ColumnModel[] = [
        { dataIndex: "name", label: "Name", alignment: "left", width: "18%" },
        { dataIndex: "date", label: "Expected Release Date", alignment: "left", width: "12%" },
        { dataIndex: "description", label: "Description", alignment: "left", width: "65%" },
        { dataIndex: "isArchived", label: "Archived", alignment: "left", width: "5%" }
    ];

    function createDisplayData(releases: ReleaseModel[]) {
        let rowArray: any[] = [];
        releases.forEach((release) => {
            const releaseId = release.id;
            const nameCellData = (
                <InputTextField
                    hasLabel={false}
                    isMandatory={true}
                    name="name"
                    title={release.name}
                    maxCharactersAllowed={30}
                    defaultValue={release.name}
                    handleBlur={(evt: any) => handleReleaseDataUpdate(evt, release.id, release.name)}
                    isEmpty={false}
                    isBlockCharacterEntry={true}
                    isShowMaxCharactersAllowedErrorMsg={true} />
            );
            const dateCellData = (
                <DatePickerField
                    hasLabel={false}
                    isMandatory={true}
                    name="date"
                    defaultValue={release.date}
                    handleBlur={(evt: any) => handleReleaseDataUpdate(evt, release.id, release.date)}
                    isEmpty={false} />
            );
            const descriptionCellData = (
                <InputTextField
                    isTextArea={true}
                    hasLabel={false}
                    isMandatory={false}
                    name="description"
                    minRows={1}
                    maxRows={2}
                    maxCharactersAllowed={1000}
                    defaultValue={release.description}
                    handleBlur={(evt: any) => handleReleaseDataUpdate(evt, release.id, release.description)}
                    isEmpty={false}
                    isShowMaxCharactersAllowedErrorMsg={true}
                    isBlockCharacterEntry={true} />
            );
            const archivedCellData = (
                release.isArchived ? (
                    <Tooltip title="Unarchive Release" placement="left" arrow>
                        <IconButton onClick={() => handleReleaseDataUpdate({ target: { name: "isArchived", value: release.isArchived } }, release.id, release.isArchived)}>
                            <ArchiveIcon name="archive" fill={ACTIVE_COLOR} />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Archive Release" placement="left" arrow>
                        <IconButton onClick={() => handleReleaseDataUpdate({ target: { name: "isArchived", value: release.isArchived } }, release.id, release.isArchived)}>
                            <ArchiveIcon name="nonArchive" fill={COLOR_GRAPHITE_5} />
                        </IconButton>
                    </Tooltip>
                )
            );

            const releaseRowData: any = {
                id: releaseId,
                name: nameCellData,
                date: dateCellData,
                description: descriptionCellData,
                isArchived: archivedCellData
            };
            rowArray.push(releaseRowData);
        });
        setTableRowArray(rowArray);
    }

    return (
        <div>
            <Grid container direction="column" spacing={1}>
                <Grid item style={{ padding: "0px 7px 0px 24px", marginBottom: "16px", marginRight: "0px" }}>
                    <Header
                        currentPageHeading={"Innovation Cadence"}
                        addButton={addButtonData}
                        toggleButton={toggleButtonData} />
                </Grid>
                <Grid item style={{ padding: "0px 7px 0px 24px" }}>
                    <BasicTable
                        columns={columnArray}
                        rows={tableRowArray}
                        borderedRow={true}
                        tableHeight={"90%"}
                        customMessageOnEmpty={"No Releases added yet"}
                        tableWidth={"100%"} />
                </Grid>
            </Grid>

            {isPopupOpen &&
                <AddReleasePopUp
                    isOpen={isPopupOpen}
                    header={headerData}
                    actionButtons={actionButtonsData}
                    inputTextField={inputTextFieldData}
                    datePickerField={datePickerFieldData}
                    textAreaField={textAreaFieldData} />}

            {alertPopupData.isOpen &&
                <AlertPopup
                    isOpen={alertPopupData.isOpen}
                    severity={alertPopupData.severity}
                    content={alertPopupData.content}
                    handleCloseButtonClick={alertPopupData.handleCloseButtonClick} />}

            {confirmationPopupData.isOpen &&
                <ConfirmationPopup
                    isOpen={confirmationPopupData.isOpen}
                    header={confirmationPopupData.header}
                    confirmationMessage={confirmationPopupData.confirmationMessage}
                    actionButtons={confirmationPopupData.actionButtons} />}

            {mainPageLoading && <LoadingIcon />}
        </div>
    )
}