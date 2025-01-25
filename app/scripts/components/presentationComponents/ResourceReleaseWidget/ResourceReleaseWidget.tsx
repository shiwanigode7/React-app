import React, { useContext } from "react";
import { BottomWidget } from "../BottomWidget/BottomWidget";
import { PeopleIcon } from "../../Icons/PeopleIcon";
import { COLOR_GRAPHITE_4 } from "../../../constant/Colors";
import { RESOURCES_RELEASES } from "../../../view/chapters/BusinessCaseChapter/BusinessCaseChapterText";
import { ESTIMATED_DEV_TIME, RUNWAYS, YEAR } from "../PPGPresentationConstant";
import { Avatar, Grid, Tooltip, Typography } from "@material-ui/core";
import { BottomWidgetStyles } from "../BottomWidget/BottomWidgetStyle";
import { ProjectionsField } from "../ProjectionsField/ProjectionsField";
import BusinessCaseModel from "../../../view/chapters/BusinessCaseChapter/BusinessCaseModel";
import { ResourceReleaseWidgetStyles } from "./ResourceReleaseWidgetStyle";
import { getRunwayThumbnailPath } from "../../../constant/InnovationAPI";
import { NO_RUNWAY_TEXT } from "../../../constant/SIRPresentationTexts";
import { InnovationAppContext } from "../../../context/InnovationAppContext";

export declare interface ResourceReleaseWidgetModel {
    businessCaseData: BusinessCaseModel;
    runwaysList: string[];
}

export function ResourceReleaseWidget(props: ResourceReleaseWidgetModel) {

    const bottomWidgetStyleClass = BottomWidgetStyles();
    const resourceReleaseWidgetStyleClass = ResourceReleaseWidgetStyles();
    const lInnovationData = useContext(InnovationAppContext);
    const cardContent = <Grid container className={resourceReleaseWidgetStyleClass.cardContentGrid} direction="column">
                            <Grid item className={bottomWidgetStyleClass.cardContetntGridItem}>
                                <ProjectionsField 
                                    suffix={YEAR}
                                    title={ESTIMATED_DEV_TIME}
                                    titleXS={8}
                                    suffixXS={1}
                                    value={props.businessCaseData.estimatedDevelopmentTime}/>
                            </Grid>
                            <Grid item className={resourceReleaseWidgetStyleClass.runwaysGrid}>
                                <Typography className={resourceReleaseWidgetStyleClass.title}>{RUNWAYS}</Typography>
                                <div className={resourceReleaseWidgetStyleClass.avatarDiv}>
                                    {
                                        (undefined !== props.runwaysList && 0 !== props.runwaysList.length) ?
                                            props.runwaysList?.map((data: string) => (
                                                <Tooltip
                                                    title={data}
                                                    placement={"bottom-start"}
                                                    arrow={true}
                                                    classes={{ tooltip: resourceReleaseWidgetStyleClass.tooltip }}
                                                    >
                                                    <Avatar
                                                        src={getRunwayThumbnailPath(lInnovationData.eskoAccountDetail.repoid, data.toLowerCase())}
                                                        className={resourceReleaseWidgetStyleClass.avatar}
                                                        />
                                                </Tooltip>
                                            )) :
                                            <Typography className={resourceReleaseWidgetStyleClass.noRunwaysTypography}>{NO_RUNWAY_TEXT}</Typography>
                                    }
                                </div>
                            </Grid>
                        </Grid>

    return (
        <BottomWidget 
        cardHeaderTitle={RESOURCES_RELEASES}
        cardHeaderIcon={<PeopleIcon size={"30"} fill={COLOR_GRAPHITE_4}/>}
        cardContent={cardContent}/>
    )
}