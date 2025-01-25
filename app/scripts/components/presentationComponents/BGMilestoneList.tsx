/**TSX File for the milestone list displayed in the SIR Presentation */

import { Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";
import { MILESTONE_TITLE_TEXT, NO_MILESTONE_TEXT } from "../../constant/SIRPresentationTexts";
import { MilestoneModel } from "../../interfaces/InnovationInterface";
import { BGMilestoneListStyles } from "../../themes/BGMilestoneListTheme";

declare interface BGMilestoneListProps {
    /**List of all the milestones for a given business goal */
    mileStonesList?: MilestoneModel[];
}

export function BGMilestoneList(inputProps: BGMilestoneListProps) {
    /**Check if the milestones are present or not */
    const IS_MILESTONE_PRESENT: boolean = (0 !== inputProps.mileStonesList?.length && undefined !== inputProps.mileStonesList)
    /**Styles import */
    const BGMilestoneListClasses = BGMilestoneListStyles({ isDataValid: IS_MILESTONE_PRESENT });

    return (
        <Card className={BGMilestoneListClasses.cardRoot}>
            <CardHeader
                title={MILESTONE_TITLE_TEXT}
                classes={{
                    title: BGMilestoneListClasses.mileStoneHeader
                }}
            />
            <CardContent className={BGMilestoneListClasses.cardContent}>
                {
                    /** Note: It is better to have ternary logic here since we are dealing with an array in one case
                     *  and a string in another. This way we can avoid using extra div */
                    IS_MILESTONE_PRESENT ?
                        inputProps.mileStonesList?.map((data: MilestoneModel) => (
                            <p >{data.milestoneName}</p>
                        )) :
                        NO_MILESTONE_TEXT
                }
            </CardContent>
        </Card>
    );
}