import React from "react";
import { Accordion, AccordionDetails, ThemeProvider, Typography } from "@material-ui/core";
import { AccordionSummary } from "../BusinessGoalChapters";
import { AccordionTheme } from "../theme";

/**Component which will have the extra chapter for Add Business Goal */
export default function AddBGExtraChapters() {
    return (
        <ThemeProvider theme={AccordionTheme}>
            <Accordion style={{ width: "1000px" }}>
                <AccordionSummary>
                    <Typography style={{ fontSize: "16px", fontWeight: "bold", color: "#22262A" }}>SIR Schedule</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ height: "200px" }}>
                    <Typography>
                        SIR Schedule
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    )
}