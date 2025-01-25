import React, { useEffect, useState } from "react";

import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import { ReleaseTypeSelectPropsModel } from "./ReleaseTypeSelectModel";
import { Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@material-ui/core";
import { BG_RELEASE_TYPE } from "../../../../constant/InnovationEnums";
import { LaunchIcon } from "../../../../components/Icons/LaunchIcon";
import { ReleaseTypeSelectStyles } from "./ReleaseTypeSelectStyles";
import { BusinessGoalType } from "../../../MPLView";
import { ControlledReleaseIcon } from "../../../../components/Icons/ControlledReleaseIcon";
import { OpenReleaseIcon } from "../../../../components/Icons/OpenReleaseIcon";
import { PredictedActiveIcon } from "../../../../components/Icons/PredictedActiveIcon";
import { COLOR_AZURE_2, COLOR_GRAPHITE_3 } from "../../../../constant/Colors";
import { AddCommentDialog } from "../../../dialog/AddCommentDialog/AddCommentDialog";

export function ReleaseTypeSelect(ReleaseTypeSelectProps: ReleaseTypeSelectPropsModel) {

    const ReleaseTypeSelectClasses = ReleaseTypeSelectStyles();
    const MAX_CHARACTER_LIMIT: number = 1000;

    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>("");
    const [businessGoal, setBusinessGoal] = useState<BusinessGoalType>(JSON.parse(JSON.stringify(ReleaseTypeSelectProps.businessGoalData)));

    /**Constant to hold the previous comment value */
    const BG_COMMENT: string = ReleaseTypeSelectProps.businessGoalData.releaseTimelineData[ReleaseTypeSelectProps.releaseIndex].comment;

    let lIconToDisplay: any;
    const bgRelease: BG_RELEASE_TYPE = ReleaseTypeSelectProps.businessGoalData.releaseTimelineData[ReleaseTypeSelectProps.releaseIndex].releaseType;

    switch (bgRelease) {
        case BG_RELEASE_TYPE.PREDICTED_ACTIVE:
            lIconToDisplay = <PredictedActiveIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.CONTROLLED_RELEASE:
            lIconToDisplay = <ControlledReleaseIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.OPEN_RELEASE:
            lIconToDisplay = <OpenReleaseIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.LAUNCH_RELEASE:
            lIconToDisplay = <LaunchIcon fill={COLOR_GRAPHITE_3} />; break;
        default: lIconToDisplay = <FiberManualRecordRoundedIcon className={ReleaseTypeSelectClasses.noReleaseIconBarView} />;
    }

    /**Function to open the Release type selection menu */
    const handleMenuOpenClick = (event: any) => {
        setOpenMenu(true);
        setAnchorEl(event.currentTarget);
    };

    /**Function to close the Release type selection menu */
    const handleMenuClose = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    };

    /**Function to update the release type of a business goal for a given release */
    const handleMenuSelectionClick = (inValue: BG_RELEASE_TYPE) => {
        setOpenMenu(false);
        businessGoal.releaseTimelineData[ReleaseTypeSelectProps.releaseIndex].releaseType = inValue;
        setBusinessGoal(businessGoal);
        ReleaseTypeSelectProps.setBusinessGoalData(JSON.parse(JSON.stringify(businessGoal)));
    };

    /**Function called when the user types anything in the comment fieldS */
    const handleCommentInputEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommentValue(event.target.value);
    };

    /**Function to call when user clicks on the submit */
    const handleDialogSubmit = () => {
        setOpenDialog(false);
        // check if the values entered is valid
        if (0 !== commentValue.trim().length || BG_COMMENT !== commentValue) {
            businessGoal.releaseTimelineData[ReleaseTypeSelectProps.releaseIndex].comment = commentValue;
            setBusinessGoal(businessGoal);
            ReleaseTypeSelectProps.setBusinessGoalData(JSON.parse(JSON.stringify(businessGoal)));
        }
    };

    const handleOpenCommentDialog = () => {
        setOpenDialog(true);
        setOpenMenu(false);
    };

    const ReleaseCommentComponent = () => {
        return (0 === BG_COMMENT.length ? null :
            <Tooltip
                arrow
                placement={"right"}
                title={BG_COMMENT}
                classes={{ tooltipPlacementRight: ReleaseTypeSelectClasses.tooltip }}
            >
                <IconButton
                    onClick={() => { handleOpenCommentDialog() }}
                    disableTouchRipple
                    classes={{ root: ReleaseTypeSelectClasses.releaseTypeIconButton }}
                >
                    <CommentRoundedIcon
                        className={ReleaseTypeSelectClasses.releaseTypeIconBarView}
                        // NOTE: Conditional styling used here due to error caused in makestyles for a 
                        // passing props only to single style property
                        style={{ color: 0 !== BG_COMMENT.length ? COLOR_AZURE_2 : COLOR_GRAPHITE_3 }}
                    />
                </IconButton>
            </Tooltip>);
    };

    useEffect(() => {
        setCommentValue(ReleaseTypeSelectProps.businessGoalData.releaseTimelineData[ReleaseTypeSelectProps.releaseIndex].comment);
        setBusinessGoal(JSON.parse(JSON.stringify(ReleaseTypeSelectProps.businessGoalData)));
    }, [ReleaseTypeSelectProps.businessGoalData]);

    return (
        <div>
            {/* The Relese type Icon display component */}
            <Tooltip arrow
                placement="left"
                // Convert the text to lower case for all release type(because in enum the value is defined in upper case), except Launch
                title={bgRelease}
                classes={{
                    tooltipPlacementRight: ReleaseTypeSelectClasses.tooltip,
                    tooltipPlacementLeft: ReleaseTypeSelectClasses.tooltip
                }}
            >
                <IconButton
                    onClick={handleMenuOpenClick}
                    disableTouchRipple
                    classes={{ root: ReleaseTypeSelectClasses.releaseTypeIconButton }}
                >
                    {lIconToDisplay}
                </IconButton>
            </Tooltip>
            {/* Icon to be displayed if the comment is present */}
            <ReleaseCommentComponent />
            {/* Menu list */}
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => { handleOpenCommentDialog() }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <CommentRoundedIcon className={ReleaseTypeSelectClasses.releaseTypeIconListView} />
                    <Typography>{"Comment"}</Typography>
                </MenuItem>
                <Divider light />
                <MenuItem
                    onClick={() => { handleMenuSelectionClick(BG_RELEASE_TYPE.PREDICTED_ACTIVE) }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <PredictedActiveIcon className={ReleaseTypeSelectClasses.releaseTypeIconListView} fill={COLOR_GRAPHITE_3} />
                    <Typography>{BG_RELEASE_TYPE.PREDICTED_ACTIVE.toLowerCase()}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { handleMenuSelectionClick(BG_RELEASE_TYPE.CONTROLLED_RELEASE) }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <ControlledReleaseIcon className={ReleaseTypeSelectClasses.releaseTypeIconListView} fill={COLOR_GRAPHITE_3} />
                    <Typography>{BG_RELEASE_TYPE.CONTROLLED_RELEASE.toLowerCase()}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { handleMenuSelectionClick(BG_RELEASE_TYPE.OPEN_RELEASE) }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <OpenReleaseIcon className={ReleaseTypeSelectClasses.releaseTypeIconListView} fill={COLOR_GRAPHITE_3} />
                    <Typography>{BG_RELEASE_TYPE.OPEN_RELEASE.toLowerCase()}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { handleMenuSelectionClick(BG_RELEASE_TYPE.LAUNCH_RELEASE) }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <LaunchIcon className={ReleaseTypeSelectClasses.releaseTypeIconListView} fill={COLOR_GRAPHITE_3} />
                    <Typography>{BG_RELEASE_TYPE.LAUNCH_RELEASE}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => { handleMenuSelectionClick(BG_RELEASE_TYPE.NO_RELEASE) }}
                    className={ReleaseTypeSelectClasses.releaseTypeMenuList}
                >
                    <FiberManualRecordRoundedIcon className={ReleaseTypeSelectClasses.noReleaseIconListView} />
                    <Typography>{BG_RELEASE_TYPE.NO_RELEASE.toLowerCase()}</Typography>
                </MenuItem>
            </Menu>
            {/* Comment Dialog */}

            <AddCommentDialog
                title={0 === BG_COMMENT.length ?
                        "Add Comment" :
                        "Edit Comment"
                    }
                actionButtonLabel={0 === BG_COMMENT.length ?
                            "Add" :
                            "Save"
                    }
                open={openDialog}
                setOpen={setOpenDialog}
                maxCharLimit={MAX_CHARACTER_LIMIT}
                textFieldValue={commentValue}
                handleChange={handleCommentInputEvent}
                handleOnSave={handleDialogSubmit}
            />
        </div>
    );
}