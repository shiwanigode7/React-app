import React from "react";
import { BG_RELEASE_TYPE } from "../../../constant/InnovationEnums";
import ReleaseTypeIconModel from "./ReleaseTypeIconModel";
import { ControlledReleaseIcon } from "../../../components/Icons/ControlledReleaseIcon";
import { OpenReleaseIcon } from "../../../components/Icons/OpenReleaseIcon";
import { PredictedActiveIcon } from "../../../components/Icons/PredictedActiveIcon";
import { LaunchIcon } from "../../../components/Icons/LaunchIcon";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { ReleaseTypeIconStyles } from "./ReleaseTypeIconStyles";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { ACTIVE_COLOR, COLOR_GRAPHITE_3 } from "../../../constant/Colors";

export default function ReleaseTypeIcon(releaseTypeIconProps: ReleaseTypeIconModel) {
    const releaseTypeIconStyleClasses = ReleaseTypeIconStyles();

    const isActiveRelease: boolean = releaseTypeIconProps.isActiveRelease;
    let releaseIcon: any;

    switch (releaseTypeIconProps.releaseTimelineData.releaseType) {
        case BG_RELEASE_TYPE.PREDICTED_ACTIVE:
            releaseIcon = <Tooltip title={BG_RELEASE_TYPE.PREDICTED_ACTIVE} arrow placement="bottom">
                <IconButton className={undefined !== releaseTypeIconProps.isEditable && !releaseTypeIconProps.isEditable ? releaseTypeIconStyleClasses.nonEditableIconButton : releaseTypeIconStyleClasses.iconButton}>
                    <PredictedActiveIcon fill={isActiveRelease ? ACTIVE_COLOR : COLOR_GRAPHITE_3} />
                </IconButton>
            </Tooltip>;
            break;
        case BG_RELEASE_TYPE.CONTROLLED_RELEASE:
            releaseIcon = <Tooltip title={BG_RELEASE_TYPE.CONTROLLED_RELEASE} arrow placement="bottom">
                <IconButton className={undefined !== releaseTypeIconProps.isEditable && !releaseTypeIconProps.isEditable ? releaseTypeIconStyleClasses.nonEditableIconButton : releaseTypeIconStyleClasses.iconButton}>
                    <ControlledReleaseIcon fill={isActiveRelease ? ACTIVE_COLOR : COLOR_GRAPHITE_3} />
                </IconButton>
            </Tooltip>;
            break;
        case BG_RELEASE_TYPE.OPEN_RELEASE:
            releaseIcon = <Tooltip title={BG_RELEASE_TYPE.OPEN_RELEASE} arrow placement="bottom">
                <IconButton className={undefined !== releaseTypeIconProps.isEditable && !releaseTypeIconProps.isEditable ? releaseTypeIconStyleClasses.nonEditableIconButton : releaseTypeIconStyleClasses.iconButton}>
                    <OpenReleaseIcon fill={isActiveRelease ? ACTIVE_COLOR : COLOR_GRAPHITE_3} />
                </IconButton>
            </Tooltip>;
            break;
        case BG_RELEASE_TYPE.LAUNCH_RELEASE:
            releaseIcon = <Tooltip title={"Launch"} arrow placement="bottom">
                <IconButton className={undefined !== releaseTypeIconProps.isEditable && !releaseTypeIconProps.isEditable ? releaseTypeIconStyleClasses.nonEditableIconButton : releaseTypeIconStyleClasses.iconButton}>
                    <LaunchIcon fill={isActiveRelease ? ACTIVE_COLOR : COLOR_GRAPHITE_3} />
                </IconButton>
            </Tooltip>;
            break;
        default: releaseIcon = <Tooltip title={BG_RELEASE_TYPE.NO_RELEASE} arrow placement="bottom">
            <FiberManualRecordRoundedIcon className={releaseTypeIconStyleClasses.noReleaseIconBarView} />
        </Tooltip>;
    }

    const comment = releaseTypeIconProps.releaseTimelineData.comment;
    const commentIcon = comment ? <Grid item>
        <Tooltip title={comment} placement="bottom" arrow>
            <CommentRoundedIcon className={releaseTypeIconStyleClasses.activeColor} />
        </Tooltip>
    </Grid> : null;

    return (
        <Grid item container direction="row" spacing={1} className={releaseTypeIconStyleClasses.iconsContainer}>
            <Grid item>{releaseIcon}</Grid>
            {commentIcon}
        </Grid>
    )
}
