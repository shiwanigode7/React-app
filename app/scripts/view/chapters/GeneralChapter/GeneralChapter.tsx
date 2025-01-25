import { AccordionDetails, Grid, MenuItem, TextField, ThemeProvider, Tooltip, Typography } from "@material-ui/core";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import React, { useEffect, useState } from "react";
import Asterisk from "../../../components/utils/Asterisk/Asterisk";
import { Autocomplete } from "../../../components/utils/Autocomplete/Autocomplete";
import { goalTypes, businessUnits } from "../../../constant/BusinessGoalDropdownValues";
import { UserListWithEmailModel } from "../../../interfaces/InnovationInterface";
import { AvatarUpload } from "../../../upload/AvatarUploadComponent";
import { BusinessGoalType } from "../../MPLView";
import { AccordionTheme, OutlinedInputTheme } from "../../theme";
import { GeneralChapterStyles } from "./GeneralChapterStyles";

/**Interface class to define the type of props*/
export interface GeneralChaptersProps {
    isFormInvalid: boolean;
    setIsFormInvalid: (isFormInvalid: boolean) => void;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    bgNodePath: string;
    usersList: UserListWithEmailModel[];
}

/**General chapter functional component to return the TextFields and Titles */
export default function GeneralChapter(props: GeneralChaptersProps) {

    const generalChapterStyleClasses = GeneralChapterStyles();

    const [userListWithName, setUserListWithName] = useState<string[]>([]);

    const [selectedOwnerValue, setSelectedOwnerValue] = useState<string>("");

    const [openTooltip, setOpenToolTip] = useState<boolean>(false);

    useEffect(() => {
        if (props.usersList.length != 0) {
            setUserListWithName(props.usersList.map(user => user.displayName));
            const userDetail: any = props.usersList.find(o => o.email === props.businessGoalData.owner);
            setSelectedOwnerValue(userDetail != undefined ? userDetail.displayName : props.businessGoalData.owner);
        }
    }, [props.usersList, props.businessGoalData.owner]);

    const MAX_CHARACTER_LIMIT: number = 1000;

    /**This function is called by onchange() to set the value to the 'businessGoalName' */
    const handleBGNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if ("" !== props.businessGoalData.businessGoalName) {
            props.setIsFormInvalid(false);
        }
        const lHoldLatestStringValue: string = event.target.value;
        if (lHoldLatestStringValue.indexOf("/") >= 0 ||
            lHoldLatestStringValue.indexOf("#") >= 0 ||
            lHoldLatestStringValue.indexOf("\\") >= 0
        ) {
            setOpenToolTip(true);
        } else {
            setOpenToolTip(false);
            props.setBusinessGoalData((prevState: BusinessGoalType) => ({
                ...prevState,
                businessGoalName: event.target.value
            }));
        }
    };
    /**This function is called by onchange() to set the value to the 'Problem Definition' */
    const problemDefinitionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            problemDefinition: event.target.value
        }));
    };

    /**This function is called by onchange() to set the value to the 'Brief SOlution Description' */
    const briefDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            briefDescription: event.target.value
        }));
    };

    /**This function is called by onchange() to set the value to the 'Goal Type' */
    const goalTypeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            goalType: event.target.value
        }));
    };

    /**This function is called by onchange() to set the value to the 'Business Goal' */
    const businessUnitChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            businessUnit: event.target.value
        }));
    };

    const handleThumbnailChange = (data: any) => {
        props.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            thumbnail: data
        }));
    };

    const handleOwnerNameChange = (inNewValue: string, _inFieldName: string) => {
        const lBusinessGoal: BusinessGoalType = JSON.parse(JSON.stringify(props.businessGoalData));
        if ("" !== inNewValue) {
            const userDetail: any = props.usersList.find(o => o.displayName === inNewValue);
            setSelectedOwnerValue(inNewValue);
            lBusinessGoal.owner = userDetail.email;
            console.log()
            props.setBusinessGoalData(lBusinessGoal);
        }
    };

    return (
        <ThemeProvider theme={AccordionTheme}>
            <AccordionDetails >
                <Grid container direction="column" spacing={1}>
                    <Grid item className={generalChapterStyleClasses.fieldRootGridItem}>
                        {/* Business Goal Name */}
                        <Grid item className={generalChapterStyleClasses.fieldGridItem}>
                            <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                                Business Goal Name <Asterisk />
                            </Typography>
                            <ThemeProvider theme={OutlinedInputTheme}>
                                <Tooltip
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={`Business Goal name cannot contain "\\" "/" and "#".`}
                                    open={openTooltip}
                                    arrow
                                    placement="right"
                                    classes={{
                                        tooltipPlacementRight: generalChapterStyleClasses.tooltip,
                                        tooltipPlacementLeft: generalChapterStyleClasses.tooltip
                                    }}

                                >
                                    <TextField
                                        variant="outlined"
                                        className={generalChapterStyleClasses.textField}
                                        required
                                        error={
                                            props.isFormInvalid &&
                                            0 === props.businessGoalData.businessGoalName.trim().length
                                        }
                                        value={props.businessGoalData.businessGoalName}
                                        helperText={((props.isFormInvalid && 0 === props.businessGoalData.businessGoalName.trim().length) && "This field is required") || (props.businessGoalData.businessGoalName.length == 140 && "Maximum limit is 140 characters")}
                                        onChange={handleBGNameChange}
                                        inputProps={{ maxLength: 140 }} />
                                </Tooltip>
                            </ThemeProvider>
                        </Grid>
                        {/* Business Goal Type */}
                        <Grid item className={generalChapterStyleClasses.fieldGridItem}>
                            <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                                Goal Type
                            </Typography>
                            <ThemeProvider theme={OutlinedInputTheme}>
                                <TextField
                                    variant="outlined"
                                    className={generalChapterStyleClasses.textField}
                                    select
                                    value={props.businessGoalData.goalType}
                                    SelectProps={{
                                        IconComponent: () =>
                                            <ArrowDropDownRoundedIcon className={generalChapterStyleClasses.selectDownArrowIcon} />
                                    }}
                                    onChange={goalTypeChange}
                                >
                                    {goalTypes.map((goal) => (
                                        <MenuItem key={goal} value={goal}>
                                            {goal}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid item className={generalChapterStyleClasses.fieldRootGridItem}>
                        {/* Business Goal Owner */}
                        <Grid item className={generalChapterStyleClasses.fieldGridItem}>
                            <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                                Owner <Asterisk />
                            </Typography>
                            <Autocomplete
                                dataList={userListWithName}
                                selectedValue={selectedOwnerValue}
                                onChange={handleOwnerNameChange}
                                keyValue={"owner"}
                                noOptionText={"User not found."}
                            />
                        </Grid>
                        {/* Business Unit */}
                        <Grid item className={generalChapterStyleClasses.fieldGridItem}>
                            <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                                Business Unit
                            </Typography>
                            <ThemeProvider theme={OutlinedInputTheme}>
                                <TextField
                                    variant="outlined"
                                    className={generalChapterStyleClasses.textField}
                                    select
                                    value={props.businessGoalData.businessUnit}
                                    SelectProps={{
                                        IconComponent: () => <ArrowDropDownRoundedIcon className={generalChapterStyleClasses.selectDownArrowIcon} />
                                    }}
                                    onChange={businessUnitChange}
                                >
                                    {businessUnits.map((businessUnit) => (
                                        <MenuItem key={businessUnit} value={businessUnit}>
                                            {businessUnit}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                    {/* Business Goal Thumbnail */}
                    <Grid item>
                        <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                            Thumbnail
                        </Typography>
                        <AvatarUpload
                            key={props.bgNodePath}
                            sizeOfAvatar={"large"}
                            callBackForAcceptedFiles={handleThumbnailChange}
                            defaultImageLink={props.businessGoalData.thumbnail}
                        />
                    </Grid>
                    {/* Problem Definition */}
                    <Grid item>
                        <Typography className={generalChapterStyleClasses.fieldLabelTypography}>
                            Problem Definition
                        </Typography>
                        <ThemeProvider theme={OutlinedInputTheme}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                value={props.businessGoalData.problemDefinition}
                                onChange={(e) => problemDefinitionChange(e)}
                                helperText={(
                                    MAX_CHARACTER_LIMIT === props.businessGoalData.problemDefinition.length &&
                                    `Maximum limit is ${MAX_CHARACTER_LIMIT} characters`
                                )}
                                inputProps={{
                                    className: generalChapterStyleClasses.textarea,
                                    maxLength: MAX_CHARACTER_LIMIT
                                }}
                            />
                        </ThemeProvider>
                        <Typography className={generalChapterStyleClasses.fieldDescriptionTypography}>
                            Explain what the problem is. Why it is a pain for the customer and what is the impact of the problem?
                        </Typography>
                    </Grid>
                    {/* Brief Description */}
                    <Grid item>
                        <Typography className={generalChapterStyleClasses.fieldLabelTypography}>Brief Solution Description</Typography>
                        <ThemeProvider theme={OutlinedInputTheme}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                onChange={(e) => briefDescriptionChange(e)}
                                value={props.businessGoalData.briefDescription}
                                helperText={(
                                    MAX_CHARACTER_LIMIT === props.businessGoalData.briefDescription.length &&
                                    `Maximum limit is ${MAX_CHARACTER_LIMIT} characters`
                                )}
                                inputProps={{
                                    className: generalChapterStyleClasses.textarea,
                                    maxLength: MAX_CHARACTER_LIMIT
                                }}
                            />
                        </ThemeProvider>
                        <Typography className={generalChapterStyleClasses.fieldDescriptionTypography}>
                            Briefly explain the concept of the solution. How do you want to address the problem?
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </ThemeProvider>
    );
}