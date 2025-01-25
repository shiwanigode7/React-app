import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete } from "../../../components/utils/Autocomplete/Autocomplete";
import { BGCoreTeam } from "../../../interfaces/InnovationInterface";
import { BusinessGoalType } from "../../MPLView";
import { CoreTeamChapterModel } from "./CoreTeamChapterModel";
import { CoreTeamChapterStyles } from "./CoreTeamChapterStyles";

export function CoreTeamChapter(CoreTeamChapterProps: CoreTeamChapterModel) {
    const CoreTeamChapterClasses = CoreTeamChapterStyles();

    const USER_NOT_FOUND_TEXT: string = "User not found.";

    const [userListWithName, setUserListWithName] = useState<string[]>([]);

    useEffect(() => {
        setUserListWithName(CoreTeamChapterProps.usersList.map(user => user.displayName));
    },[CoreTeamChapterProps.usersList])

    const handleValueChange = (inNewValue: string, inField: string) => {
        const lBusinessGoal: BusinessGoalType = JSON.parse(JSON.stringify(CoreTeamChapterProps.businessGoal));
        let lCoreTeam: BGCoreTeam = lBusinessGoal.coreTeam;
        const lNewValue: string = null !== inNewValue ? inNewValue : "";
        // Check the field to be updated with the new value
        switch (inField) {
            case "productManager": lCoreTeam.productManager = lNewValue; break;
            case "marketing": lCoreTeam.marketing = lNewValue; break;
            case "sales": lCoreTeam.sales = lNewValue; break;
            case "projectManager": lCoreTeam.projectManager = lNewValue; break;
            case "researchAndDevelopment": lCoreTeam.researchAndDevelopment = lNewValue; break;
            default: lCoreTeam = lBusinessGoal.coreTeam;
        }
        lBusinessGoal.coreTeam = lCoreTeam;
        CoreTeamChapterProps.setBusinessGoal(lBusinessGoal);
    };

    return (
        <Grid container className={CoreTeamChapterClasses.rootContainer}>
            {/* Left grid listing product manager, marketing and sales */}
            <Grid item className={CoreTeamChapterClasses.columnGrid}>
                {/* Product Manager drop down  grid */}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                    <Typography className={CoreTeamChapterClasses.typography}>{"Product Manager"}</Typography>
                    <Autocomplete
                        dataList={userListWithName}
                        selectedValue={CoreTeamChapterProps.businessGoal.coreTeam.productManager}
                        onChange={handleValueChange}
                        keyValue={"productManager"}
                        noOptionText={USER_NOT_FOUND_TEXT}
                    />
                </Grid>
                {/* Marketing drop down grid */}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                    <Typography className={CoreTeamChapterClasses.typography}>{"Marketing"}</Typography>
                    <Autocomplete
                        dataList={userListWithName}
                        selectedValue={CoreTeamChapterProps.businessGoal.coreTeam.marketing}
                        onChange={handleValueChange}
                        keyValue={"marketing"}
                        noOptionText={USER_NOT_FOUND_TEXT}
                    />
                </Grid>
                {/* Sales drop down grid */}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                    <Typography className={CoreTeamChapterClasses.typography}>{"Sales"}</Typography>
                    <Autocomplete
                        dataList={userListWithName}
                        selectedValue={CoreTeamChapterProps.businessGoal.coreTeam.sales}
                        onChange={handleValueChange}
                        keyValue={"sales"}
                        noOptionText={USER_NOT_FOUND_TEXT}
                    />
                </Grid>
            </Grid>
            {/* Right grid listing project manager, R&D  */}
            <Grid item className={CoreTeamChapterClasses.columnGrid}>
                {/* Project Manager drop down  grid */}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                    <Typography className={CoreTeamChapterClasses.typography}>{"Project Manager"}</Typography>
                    <Autocomplete
                        dataList={userListWithName}
                        selectedValue={CoreTeamChapterProps.businessGoal.coreTeam.projectManager}
                        onChange={handleValueChange}
                        keyValue={"projectManager"}
                        noOptionText={USER_NOT_FOUND_TEXT}
                    />
                </Grid>
                {/* R&D drop down grid */}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                    <Typography className={CoreTeamChapterClasses.typography}>{"R&D"}</Typography>
                    <Autocomplete
                        dataList={userListWithName}
                        selectedValue={CoreTeamChapterProps.businessGoal.coreTeam.researchAndDevelopment}
                        onChange={handleValueChange}
                        keyValue={"researchAndDevelopment"}
                        noOptionText={USER_NOT_FOUND_TEXT}
                    />
                </Grid>
                {/* Placeholder for any future roles*/}
                <Grid item className={CoreTeamChapterClasses.contentGrid}>
                </Grid>
            </Grid>
        </Grid>
    );
}