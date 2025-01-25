import React from "react";
import ActiveReleaseTableCellContentModel from "./ActiveReleaseTableCellContentModel";
import { Grid } from "@material-ui/core";
import TextWithTooltip from "../TextWithTooltip/TextWithTooltip";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import { ActiveReleaseTableCellContentStyles } from "./ActiveReleaseTableCellContentStyles";

export default function ActiveReleaseTableCellContent(activeReleaseTableCellContentProps: ActiveReleaseTableCellContentModel) {
    const activeReleaseTableCellContent = ActiveReleaseTableCellContentStyles();

    return (
        <Grid container direction="row" className={activeReleaseTableCellContent.activeReleaseGridContainer}>
            <Grid item>
                <TextWithTooltip
                    text={activeReleaseTableCellContentProps.text}
                    tooltipText={activeReleaseTableCellContentProps.tooltipText}
                    isTextBold={activeReleaseTableCellContentProps.isTextBold}
                    tooltipPlacement={activeReleaseTableCellContentProps.tooltipPlacement}
                />
            </Grid>
            <Grid item className={activeReleaseTableCellContent.rotateRightIconGrid}>
                <RotateRightIcon className={activeReleaseTableCellContent.rotateRightIcon} />
            </Grid>
        </Grid>
    )
}
