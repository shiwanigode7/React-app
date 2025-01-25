/**TSX File for the milestone list displayed in the SIR Presentation */

import { Avatar, Card, CardContent, CardHeader, Tooltip } from "@material-ui/core";
import React, { useContext } from "react";
import { getRunwayThumbnailPath } from "../../constant/InnovationAPI";
import { NO_RUNWAY_TEXT, RUNWAY_TITLE_TEXT } from "../../constant/SIRPresentationTexts";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { RunwayPresentationListStyles } from "../../themes/RunwayPresentationListTheme";
import { SIRPresentationStyles } from "../../themes/SIRPresentationTheme";

declare interface RunwayPresentationListProps {
    /**List of all the milestones for a given business goal */
    runwayList?: string[];
}

export function RunwayPresentationList(inputProps: RunwayPresentationListProps) {

    const lInnovationData = useContext(InnovationAppContext);
    /**Check if the milestones are present or not */
    const IS_MILESTONE_PRESENT: boolean = (0 !== inputProps.runwayList?.length && undefined !== inputProps.runwayList);
    const TOTAL_RUNWAYS: number = undefined !== inputProps.runwayList ? inputProps.runwayList.length : 1;
    const RUNWAY_LENGTH_FOR_STYLING = 5 >= TOTAL_RUNWAYS ? TOTAL_RUNWAYS : 5;
    /**Styles import */
    const RunwayPresentationListClasses = RunwayPresentationListStyles({ isDataValid: IS_MILESTONE_PRESENT, totalRunway: RUNWAY_LENGTH_FOR_STYLING });
    /**Style for the tooltip */
    const SIRPresentationClasses = SIRPresentationStyles();
    return (
        <Card className={RunwayPresentationListClasses.cardRoot}>
            <CardHeader
                title={RUNWAY_TITLE_TEXT}
                classes={{
                    title: RunwayPresentationListClasses.runwayTitleHeader
                }}
            />
            <CardContent className={RunwayPresentationListClasses.cardContent}>
                {
                    /** Note: It is better to have this logic here since we are dealing with an array in one case
                     *  and a string in another. This way we can avoid using extra div */
                    IS_MILESTONE_PRESENT ?
                        inputProps.runwayList?.map((data: string) => (
                            <div className={RunwayPresentationListClasses.avatarDiv}>
                                <Avatar
                                    src={getRunwayThumbnailPath(lInnovationData.eskoAccountDetail.repoid, data.toLowerCase())}
                                    className={RunwayPresentationListClasses.avatar}
                                />
                                <Tooltip
                                    title={data}
                                    placement={"bottom-start"}
                                    classes={{ tooltip: SIRPresentationClasses.tooltip }}
                                >
                                    <p className={RunwayPresentationListClasses.label}>{data}</p>
                                </Tooltip>
                            </div>
                        )) :
                        NO_RUNWAY_TEXT
                }
            </CardContent>
        </Card>
    );
}