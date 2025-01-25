import { Avatar, Grid, Tooltip, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { RunwayModel } from "../../BusinessGoalViewModel";
import CardContentModel from "./CardContentModel";
import { CardContentStyle } from "./CardContentViewStyle";

export function CardContentView(cardContentViewProps: CardContentModel) {
    const CardContentStyleClasses = CardContentStyle();
    return (
        <Grid container direction="column" className={CardContentStyleClasses.cardContentContainer}>
            <Grid item className={CardContentStyleClasses.descriptionGrid}>
                <Typography className={CardContentStyleClasses.headings}>
                    Brief Description:
                </Typography>
                <Tooltip
                    title={cardContentViewProps.description}
                    placement={"bottom-start"}
                    classes={{
                        tooltip: CardContentStyleClasses.tooltip,
                        popper: CardContentStyleClasses.tooltipPopper
                    }}
                >
                    <Typography className={CardContentStyleClasses.descriptionTypography}>
                        {cardContentViewProps.description}
                    </Typography>
                </Tooltip>
            </Grid>
            <Grid item className={CardContentStyleClasses.gridItem}>
                <Grid className={CardContentStyleClasses.runwayGrid}>
                    <Grid item>
                        <Typography className={CardContentStyleClasses.headings}>
                            Runways:
                        </Typography>
                    </Grid>
                    <Grid item className={CardContentStyleClasses.avatarGrid}>
                        {cardContentViewProps.runways.map((runway: RunwayModel) => {
                            return (
                                <Tooltip title={runway.runwayName} arrow placement="right">
                                    <Avatar className={CardContentStyleClasses.avatar}
                                        alt="Runway" src={runway.runwayThumbnail}
                                        title={runway.runwayName} />
                                </Tooltip>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={CardContentStyleClasses.gridItem}>
                <Grid item className={CardContentStyleClasses.mileStoneGrid}>
                    <Tooltip title={`Milestones for ${cardContentViewProps.selectedRelease}`} arrow placement="right-start">
                        <Typography className={CardContentStyleClasses.headings}>
                            Milestones for {cardContentViewProps.selectedRelease}:
                        </Typography>
                    </Tooltip>
                </Grid>
                <Grid item className={CardContentStyleClasses.mileStoneChipGrid}>
                    {cardContentViewProps.milestones.map((mileStone: string) => {
                        return (
                            <Tooltip title={mileStone} arrow placement="right">
                                <Chip className={CardContentStyleClasses.milestoneChip} label={mileStone} />
                            </Tooltip>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}