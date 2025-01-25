import React from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { TextWithTooltipStyles } from "./TextWithTooltipStyles";
import TextWithTooltipModel from "./TextWithTooltipModel";

export default function TextWithTooltip(textWithTooltipProps: TextWithTooltipModel) {
    const textWithTooltipStyleClasses = TextWithTooltipStyles();

    return (
        <Tooltip
            title={textWithTooltipProps.tooltipText}
            placement={textWithTooltipProps.tooltipPlacement}>
            <Typography className={textWithTooltipStyleClasses.text}
                style={{ fontWeight: textWithTooltipProps.isTextBold ? "bold" : "unset", textAlign: textWithTooltipProps.textAlign ? textWithTooltipProps.textAlign : "center" }}>
                {textWithTooltipProps.text}
            </Typography>
        </Tooltip>
    )
}