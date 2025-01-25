import { IconButton, Tooltip } from "@material-ui/core";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import React from "react";
import { ControlledReleaseIcon } from "../../../../components/Icons/ControlledReleaseIcon";
import { LaunchIcon } from "../../../../components/Icons/LaunchIcon";
import { OpenReleaseIcon } from "../../../../components/Icons/OpenReleaseIcon";
import { PredictedActiveIcon } from "../../../../components/Icons/PredictedActiveIcon";
import { COLOR_AZURE_2, COLOR_GRAPHITE_3 } from "../../../../constant/Colors";
import { BG_RELEASE_TYPE } from "../../../../constant/InnovationEnums";
import { ReleaseTypeIconModel } from "./ReleaseTypeIconModel";
import { ReleaseTypeIconStyles } from "./ReleaseTypeIconStyles";

export function ReleaseTypeIcon(releaseTypeIconProps: ReleaseTypeIconModel) {

    const releaseTypeIconStyleClasses = ReleaseTypeIconStyles();

    /**Constant to hold the previous comment value */
    const BG_COMMENT: string = releaseTypeIconProps.comment;

    let lIconToDisplay: any;
    const bgRelease: BG_RELEASE_TYPE = releaseTypeIconProps.releaseType;


    switch (bgRelease) {
        case BG_RELEASE_TYPE.PREDICTED_ACTIVE:
            lIconToDisplay = <PredictedActiveIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.CONTROLLED_RELEASE:
            lIconToDisplay = <ControlledReleaseIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.OPEN_RELEASE:
            lIconToDisplay = <OpenReleaseIcon fill={COLOR_GRAPHITE_3} />; break;
        case BG_RELEASE_TYPE.LAUNCH_RELEASE:
            lIconToDisplay = <LaunchIcon fill={COLOR_GRAPHITE_3} />; break;
        default: lIconToDisplay = <FiberManualRecordRoundedIcon className={releaseTypeIconStyleClasses.noReleaseIconBarView} />;
    }

    const ReleaseCommentComponent = () => {
        return (0 === BG_COMMENT.length ? null :
            <Tooltip
                arrow
                placement={"right"}
                title={BG_COMMENT}
                classes={{ tooltipPlacementRight: releaseTypeIconStyleClasses.tooltip }}
            >
                <CommentRoundedIcon
                    className={releaseTypeIconStyleClasses.releaseTypeIconBarView}
                    // NOTE: Conditional styling used here due to error caused in makestyles for a 
                    // passing props only to single style property
                    style={{ color: 0 !== BG_COMMENT.length ? COLOR_AZURE_2 : COLOR_GRAPHITE_3 }}
                />
            </Tooltip>);
    };

    const ReleaseTypeIconWithTooltip = () => {
        return (
            <Tooltip arrow
                placement={"left"}
                title={bgRelease}
                classes={{
                    tooltipPlacementRight: releaseTypeIconStyleClasses.tooltip,
                    tooltipPlacementLeft: releaseTypeIconStyleClasses.tooltip
                }}
            >
                <IconButton className={releaseTypeIconStyleClasses.iconButton}>
                    {lIconToDisplay}
                </IconButton>
            </Tooltip>);
    };

    return (
        <div className={releaseTypeIconStyleClasses.commendIconGrid}>
            <ReleaseTypeIconWithTooltip />
            <ReleaseCommentComponent />
        </div>
    );
}