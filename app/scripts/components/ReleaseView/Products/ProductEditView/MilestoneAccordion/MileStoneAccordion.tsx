import { Accordion, AccordionDetails, ThemeProvider, Typography } from "@material-ui/core";
import React from "react";
import { ReleaseTimelineModel } from "../../../../../interfaces/InnovationInterface";
import { AccordionSummary } from "../../../../../view/BusinessGoalChapters";
import { AccordionTheme } from "../../../../../view/theme";
import { getMileStoneName } from "../../ProductViewCard/CardContent/ProductViewCardContent";
import { MileStoneAccordionDetail } from "./MileStoneAccordionDetail/MileStoneAccordionDetail";
import MileStoneAccordionModel from "./MileStoneAccordionModel";
import { MileStoneAccordionStyle } from "./MileStoneAccordionStyle";

export function MileStoneAccordion(milestoneAccordionProps: MileStoneAccordionModel) {

    const mileStoneAccordionStyleClasses = MileStoneAccordionStyle();

    return (
        <ThemeProvider theme={AccordionTheme}>
            <Accordion defaultExpanded>
                <AccordionSummary>
                    <Typography className={mileStoneAccordionStyleClasses.businessGoalStyle}>
                        Business Goal: {milestoneAccordionProps.businessGoal.businessGoalName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={mileStoneAccordionStyleClasses.accordionDetail} >
                    {
                        0 !== milestoneAccordionProps.businessGoal.releaseTimelineData.length &&
                            -1 !== milestoneAccordionProps.businessGoal.releaseTimelineData.findIndex((releaseTimeline: ReleaseTimelineModel) => releaseTimeline.releaseNodeId === milestoneAccordionProps.selectedReleaseId) ?
                            milestoneAccordionProps.businessGoal.releaseTimelineData.map((releaseTimeLine: ReleaseTimelineModel) => {
                                if (milestoneAccordionProps.selectedReleaseId === releaseTimeLine.releaseNodeId) {
                                    if ((0 === releaseTimeLine.milestones.length) && (releaseTimeLine)) {
                                        return (<h4>No Milestones added for the Release.</h4>)
                                    }
                                    else {
                                        return releaseTimeLine.milestones.map((milestone: string) => {
                                            return (
                                                <MileStoneAccordionDetail
                                                    key={milestone}
                                                    milestoneName={getMileStoneName(milestoneAccordionProps.businessGoal.milestones, milestone)}
                                                    milestoneId={milestone}
                                                    productId={milestoneAccordionProps.productId}
                                                    heroFeatures={milestoneAccordionProps.heroFeatures}
                                                    setHeroFeatureList={milestoneAccordionProps.setHeroFeatureList}
                                                    selectedReleaseId={milestoneAccordionProps.selectedReleaseId}
                                                    businessGoalId={milestoneAccordionProps.businessGoal.nodeId ? milestoneAccordionProps.businessGoal.nodeId : ""}
                                                    setIsHeroFeatureChanged={milestoneAccordionProps.setIsHeroFeatureChanged}
                                                />
                                            )
                                        })
                                    }
                                }
                            }) :
                            <h4>No Milestones added for the Release.</h4>
                    }
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    )
}