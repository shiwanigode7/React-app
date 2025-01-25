import React from "react";
import { Checkbox, Grid, TextField, Typography } from '@material-ui/core';
import { IPChapterStyles } from "./IPChapterStyle";
import IPChapterModel from "./IPChapterModel";
import Asterisk from "../../../components/utils/Asterisk/Asterisk";

export default function IPChapter(IpChapterProps: IPChapterModel) {

    const IPChapterStyleClasses = IPChapterStyles();

    const MAX_CHARACTER_LIMIT: number = 1000;

    /**Function to update the freedom to operate checkbox of business goal */
    const handleFreedomToOperateChange = (event: any) => {
        IpChapterProps.setBusinessGoalData({
            ...IpChapterProps.businessGoalData,
            freedomToOperate: event.target.checked
        });
    };

    /**Function to update the potential IP checkbox of business goal */
    const handlePotentialIPChange = (event: any) => {
        IpChapterProps.setBusinessGoalData({
            ...IpChapterProps.businessGoalData,
            potentialIp: event.target.checked
        });
    };

    /**Function to handle the text enter event of the Potential IP description field */
    const handlePotentialIPDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        IpChapterProps.setBusinessGoalData({
            ...IpChapterProps.businessGoalData,
            potentialIpDescription: event.target.value
        });
    };

    return (
        <Grid container direction="column">
            {/* Free down to operate check box*/}
            <Grid item className={IPChapterStyleClasses.IPGrid}>
                <Checkbox
                    color="primary"
                    onChange={handleFreedomToOperateChange}
                    inputProps={{ "aria-label": "checkbox" }}
                    checked={IpChapterProps.businessGoalData.freedomToOperate}
                    classes={{
                        checked: IPChapterStyleClasses.IPCheckBox
                    }}
                />
                <Typography className={IPChapterStyleClasses.IPTitle}>
                    Freedom To Operate
                </Typography>
            </Grid>
            {/* Potential IP Checkbox */}
            <Grid item className={IPChapterStyleClasses.IPGrid}>
                <Checkbox
                    color="primary"
                    onChange={handlePotentialIPChange}
                    inputProps={{ "aria-label": "checkbox" }}
                    checked={IpChapterProps.businessGoalData.potentialIp}
                    classes={{
                        checked: IPChapterStyleClasses.IPCheckBox
                    }}
                />
                <Typography className={IPChapterStyleClasses.IPTitle}>
                    Potential IP
                </Typography>
            </Grid>
            {/* Potential IP description */}
            <Grid item >
                {IpChapterProps.businessGoalData.potentialIp &&
                    <div>
                        <Typography className={IPChapterStyleClasses.IPTitle}>
                            Potential IP Description <Asterisk />
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            disabled={!IpChapterProps.businessGoalData.potentialIp}
                            required
                            error={(0 === IpChapterProps.businessGoalData.potentialIpDescription.trim().length && IpChapterProps.businessGoalData.potentialIp)}
                            InputProps={{
                                classes: {
                                    notchedOutline: IPChapterStyleClasses.IPDescriptionFieldNotchedOutline,
                                    root: IPChapterStyleClasses.IPDescriptionFieldOutlineRoot,
                                    inputMultiline: IPChapterStyleClasses.IPDescriptionMultiline,
                                    error: IPChapterStyleClasses.IPDescriptionFieldOutLineError
                                },
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTER_LIMIT,
                                className: IPChapterStyleClasses.IPTextFieldDragStyle
                            }}
                            FormHelperTextProps={{
                                classes: {
                                    contained: IPChapterStyleClasses.IPDescriptionHelperText
                                }
                            }}
                            helperText={(MAX_CHARACTER_LIMIT == IpChapterProps.businessGoalData.potentialIpDescription.length && "Maximum limit is 1000 characters") ||
                                ((0 === IpChapterProps.businessGoalData.potentialIpDescription.trim().length && (IpChapterProps.businessGoalData.potentialIp)) && "This field is required")}
                            value={IpChapterProps.businessGoalData.potentialIpDescription}
                            onChange={handlePotentialIPDescriptionChange}
                        />
                    </div>
                }
            </Grid>
        </Grid>
    );
}