import { Accordion, AccordionDetails, ThemeProvider, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import { UserListWithEmailModel } from "../../interfaces/InnovationInterface";
import UserService from "../../services/UserService";
import { ScheduledandActiveChaptersStyles } from "../../themes/ScheduledandActiveChaptersStyles";
import { AccordionSummary } from "../BusinessGoalChapters";
import { BusinessGoalType } from "../MPLView";
import { AccordionTheme } from "../theme";
import { CoreTeamChapter } from "./CoreTeamChapter/CoreTeamChapter";
import { HealthChapter } from "./HealthChapter/HealthChapter";
import { ReleaseTimelineChapter } from "./ReleaseTimelineChapter/ReleaseTimelineChapter";

interface EditBGExtraChaptersPropsModel {
    businessGoal: BusinessGoalType;
    setBusinessGoal: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    usersList: UserListWithEmailModel[];
    bgNodePath: string;
}

/**Component which will have the extra chapter for Add Business Goal */
export default function ScheduledandActiveChapters(EditBGExtraChaptersProps: EditBGExtraChaptersPropsModel) {

    /**CONTEXT RELATED VARIABLES and functions*/
    const lInnovationData = useContext(InnovationAppContext);

    const ScheduledandActiveChaptersStyleClasses = ScheduledandActiveChaptersStyles();
    const [allUsersList, setGetAllUsersList] = useState<UserListWithEmailModel[]>([]);

    useEffect(() => {
        UserService.getAllUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setGetAllUsersList(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, []);

    return (
        <ThemeProvider theme={AccordionTheme}>
            <Accordion>
                <AccordionSummary>
                    <Typography className={ScheduledandActiveChaptersStyleClasses.accordionTypography}> Core Team</Typography>
                </AccordionSummary>
                <AccordionDetails className={ScheduledandActiveChaptersStyleClasses.accordionDetail}>
                    <CoreTeamChapter
                        businessGoal={EditBGExtraChaptersProps.businessGoal}
                        setBusinessGoal={EditBGExtraChaptersProps.setBusinessGoal}
                        usersList={allUsersList}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography className={ScheduledandActiveChaptersStyleClasses.accordionTypography}>Health</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <HealthChapter
                        businessGoalData={EditBGExtraChaptersProps.businessGoal}
                        setBusinessGoalData={EditBGExtraChaptersProps.setBusinessGoal}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography className={ScheduledandActiveChaptersStyleClasses.accordionTypography}>Release Timeline</Typography>
                </AccordionSummary>
                <AccordionDetails className={ScheduledandActiveChaptersStyleClasses.releaseTimelineAccordionDetail}>
                    <ReleaseTimelineChapter
                        businessGoal={EditBGExtraChaptersProps.businessGoal}
                        setBusinessGoal={EditBGExtraChaptersProps.setBusinessGoal}
                        bgNodePath={EditBGExtraChaptersProps.bgNodePath}
                    />
                </AccordionDetails>
            </Accordion>
        </ThemeProvider>
    )
}