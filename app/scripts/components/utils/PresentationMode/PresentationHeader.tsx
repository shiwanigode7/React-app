import { Avatar, Chip, Divider, Grid, Tooltip, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { UserListWithEmailModel } from "../../../interfaces/InnovationInterface";
import UserService from "../../../services/UserService";
import { BGStatusChip } from "../../presentationComponents/BGStatusChip";
import { BusinessGoalThumbnail } from "../../presentationComponents/BusinessGoalThumbnail";
import PresentationProps from "./PresentationHeaderModel";
import { GRID_DIRECTION_COLUMN, GRID_DIRECTION_ROW, PresentationOwnerStyles, PresentationStyles } from "./PresentationStyles";
import { BRIEF_DESCRIPTION_TITLE_TEXT, MISSING_DESCRIPTION, PROBLEM_STATEMENT_TITLE_TEXT } from "./PresentationTexts";

export function PresentationHeader(inputProps: PresentationProps) {

    /**Saving buisness goal owner details */
    const lInnovationData = useContext(InnovationAppContext);

    const presentationStyleClasses = PresentationStyles();

    const [ownerName, setOwnerName] = useState<string>("");
    const [userList, setUserList] = useState<UserListWithEmailModel[]>([]);


    const OWNER_FIRST_NAME: string = undefined !== ownerName.split(", ")[1] ? ownerName.split(", ")[1] : "";
    const OWNER_LAST_NAME: string = undefined !== ownerName.split(", ")[0] ? ownerName.split(", ")[0] : "";
    const presentationOwnerStyleClasses = PresentationOwnerStyles({ ownerFirstName: OWNER_FIRST_NAME, ownerLastName: OWNER_LAST_NAME });

    /**Variable to hold the values */
    const PROBLEM_STATEMENT: string = 0 !== inputProps.businessGoalData.problemDefinition.length ?
        inputProps.businessGoalData.problemDefinition.toString() :
        MISSING_DESCRIPTION;
    const BRIEF_DESCRIPTION: string = 0 !== inputProps.businessGoalData.briefDescription.length ?
        inputProps.businessGoalData.briefDescription.toString() :
        MISSING_DESCRIPTION;

    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID)
            .then((getAllUsersResponse: UserListWithEmailModel[]) => {
                setUserList(getAllUsersResponse);
            })

    }, [inputProps.businessGoalData.businessGoalName, lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        let lOwnerName: string = "";
        userList.forEach((user: UserListWithEmailModel) => {
            if (user.email === inputProps.businessGoalData.owner) {
                lOwnerName = user.displayName;
            }
        })
        setOwnerName(lOwnerName);
    }, [userList, inputProps.businessGoalData]);

    return (
        <div className={presentationStyleClasses.root}>
            {/* Header container */}
            <Grid container direction={GRID_DIRECTION_ROW} className={presentationStyleClasses.headerGridRoot}>
                {/* Business Goal Thumbnail */}
                <Grid item className={presentationStyleClasses.headerBGThumbnailGrid}>
                    <BusinessGoalThumbnail imageLink={inputProps.businessGoalData.thumbnail} />
                </Grid>
                {/* Business Goal title and description */}
                <Grid item direction={GRID_DIRECTION_COLUMN} className={presentationStyleClasses.headerBGTitleDescriptionRootGrid}>
                    {/* Business Goal Title with Status and Business Unit type */}
                    <Grid container direction={GRID_DIRECTION_ROW} spacing={2} className={presentationStyleClasses.headerBGTitleContainerGrid}>
                        {/* Business Goal Title */}
                        <Grid item className={presentationStyleClasses.headerBGTitleGrid}>
                            <Tooltip
                                title={inputProps.businessGoalData.businessGoalName}
                                placement={"bottom-start"}
                                classes={{
                                    tooltip: presentationStyleClasses.tooltip,
                                    popper: presentationStyleClasses.tooltipPopper
                                }}
                            >
                                <Typography className={presentationStyleClasses.businessGoalTitle}>
                                    {inputProps.businessGoalData.businessGoalName}
                                </Typography>
                            </Tooltip>
                        </Grid>
                        {/* Business Unit */}
                        <Grid item className={presentationStyleClasses.headerBGUnitStatusGrid}>
                            <Chip
                                label={inputProps.businessGoalData.businessUnit}
                                className={presentationStyleClasses.businessUnitChip}
                            />
                        </Grid>
                        {/* Status */}
                        <Grid item className={presentationStyleClasses.headerBGUnitStatusGrid}>
                            <BGStatusChip status={inputProps.businessGoalData.status} />
                        </Grid>
                    </Grid>
                    {/* Problem Statement */}
                    <Grid item className={presentationStyleClasses.headerBGDescriptionGrid}>
                        <Typography className={presentationStyleClasses.descriptionTitleTypography}>
                            {PROBLEM_STATEMENT_TITLE_TEXT}
                        </Typography>
                        <Tooltip
                            title={PROBLEM_STATEMENT}
                            placement={"bottom-start"}
                            classes={{
                                tooltip: presentationStyleClasses.tooltip,
                                popper: presentationStyleClasses.tooltipPopper
                            }}
                        >
                            <Typography className={presentationStyleClasses.descriptionTypography}>
                                {PROBLEM_STATEMENT}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    {/* Brief Description */}
                    <Grid item className={presentationStyleClasses.headerBGDescriptionGrid}>
                        <Typography className={presentationStyleClasses.descriptionTitleTypography}>
                            {BRIEF_DESCRIPTION_TITLE_TEXT}
                        </Typography>
                        <Tooltip
                            title={BRIEF_DESCRIPTION}
                            placement={"bottom-start"}
                            classes={{
                                tooltip: presentationStyleClasses.tooltip,
                                popper: presentationStyleClasses.tooltipPopper
                            }}
                        >
                            <Typography className={presentationStyleClasses.descriptionTypography}>
                                {BRIEF_DESCRIPTION}
                            </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
                {/* Business Goal Owner */}
                <Grid item className={presentationStyleClasses.headerBGOwnerGrid}>
                    <Tooltip
                        title={ownerName}
                        placement="right"
                        arrow
                    >
                        <Avatar className={presentationOwnerStyleClasses.avatar}>
                            {OWNER_FIRST_NAME.charAt(0) + OWNER_LAST_NAME.charAt(0)}
                        </Avatar>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider className={presentationStyleClasses.divider} />
        </div>
    );
}