import { AccordionDetails, Avatar, Box, Grid, MenuItem, TextField, ThemeProvider, Typography } from "@material-ui/core";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import React, { useEffect, useState } from "react";
import { channelPartners, DescriptionValues, ideaTypes, indexToScoreMapping, positioning, targetMarkets } from "../../../interfaces/RiskProfileDropDownValues";
import { BusinessGoalType } from "../../MPLView";
import { AccordionTheme, OutlinedInputTheme } from "../../theme";
import { RiskProfileChaptersProps } from "./RiskProfileChapterModel";
import { RiskProfileChapterStyle } from "./RiskProfileChapterStyles";

/**Component that returns the Text fields(Dropdown) and other components to be available in Risk Profile Chapter */
export default function RiskProfileChapter(riskProfileChapterProps: RiskProfileChaptersProps) {

    const riskProfileChapterStyleClasses = RiskProfileChapterStyle();

    /**This function map the index and return the corresponding score value */
    const getScore = (index: number): number => {
        let score: number = 1;
        indexToScoreMapping.forEach((option) => {
            if (option.index === index) {
                score = option.score
            }
        })
        return score;
    }

    /**This function map the score and return the corresponding index value */
    const getIndex = (score: number): number => {
        let index: number = 0;
        indexToScoreMapping.forEach((option) => {
            if (option.score === score) {
                index = option.index
            }
        })
        return index;
    }

    /**State to set the Risk Score Badge Color */
    const [avatarColor, setAvatarColor] = useState<any>("#7C9E24");

    /**Calculates the Risk Score and set the value of riskScore */
    useEffect(() => {
        riskProfileChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            riskScore: (riskProfileChapterProps.businessGoalData.targetMarketScore + riskProfileChapterProps.businessGoalData.channelPartnerScore + riskProfileChapterProps.businessGoalData.positioningScore + riskProfileChapterProps.businessGoalData.ideaTypeScore)
        }));
    }, [riskProfileChapterProps.businessGoalData.targetMarketScore,
    riskProfileChapterProps.businessGoalData.channelPartnerScore,
    riskProfileChapterProps.businessGoalData.positioningScore,
    riskProfileChapterProps.businessGoalData.ideaTypeScore])

    /**Whenever the riskScore value is changed the badgeColor will be set according to the riskScore */
    useEffect(() => {
        if (riskProfileChapterProps.businessGoalData.riskScore >= 4 && riskProfileChapterProps.businessGoalData.riskScore <= 6)
            setAvatarColor("#7C9E24")
        else if (riskProfileChapterProps.businessGoalData.riskScore >= 7 && riskProfileChapterProps.businessGoalData.riskScore <= 9)
            setAvatarColor("#FF4713")
        else if (riskProfileChapterProps.businessGoalData.riskScore >= 10 && riskProfileChapterProps.businessGoalData.riskScore <= 12)
            setAvatarColor("#DB2436")
    }, [riskProfileChapterProps.businessGoalData.riskScore])

    /**Function that changes the value of targetMarketScore whenever the Target Market dropdown option is changed*/
    const handleTargetMArketChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        riskProfileChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            targetMarketScore: getScore(parseInt(event.target.value))
        }));
    }

    /**Function that changes the value of channelPartnerScore whenever the Channel Partner dropdown option is changed*/
    const handleChannelPartnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        riskProfileChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            channelPartnerScore: getScore(parseInt(event.target.value))
        }));
    }

    /**Function that changes the value of positioningScore whenever the Positioning dropdown option is changed*/
    const handlePositioningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        riskProfileChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            positioningScore: getScore(parseInt(event.target.value))
        }));
    }

    /**Function that changes the value of ideaTypeScore whenever the Idea Type dropdown option is changed*/
    const handleIdeaTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        riskProfileChapterProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            ideaTypeScore: getScore(parseInt(event.target.value))
        }));
    }

    return (
        <ThemeProvider theme={AccordionTheme}>
            <AccordionDetails >
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Grid container direction='row' spacing={3}>
                            <Grid item className={riskProfileChapterStyleClasses.riskChapterItems}>
                                <Typography className={riskProfileChapterStyleClasses.typography}>{DescriptionValues.TARGET_MARKET}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <TextField
                                        variant="outlined"
                                        className={riskProfileChapterStyleClasses.textField}
                                        select
                                        value={getIndex(riskProfileChapterProps.businessGoalData.targetMarketScore)}
                                        SelectProps={{
                                            IconComponent: () => <ArrowDropDownRoundedIcon className={riskProfileChapterStyleClasses.dropdownIcon} />
                                        }}
                                        onChange={handleTargetMArketChange}
                                    >
                                        {targetMarkets.map((option) => (
                                            <MenuItem key={option.index} value={option.index}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider>
                                <Grid className={riskProfileChapterStyleClasses.gridItem}>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.CORE}</Box>
                                        {DescriptionValues.TARGET_MARKET_CORE}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.ADJACENT}</Box>
                                        {DescriptionValues.TARGET_MARKET_ADJACENT}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.NEW}</Box>
                                        {DescriptionValues.TARGET_MARKET_NEW}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={riskProfileChapterStyleClasses.riskChapterItems}>
                                <Typography className={riskProfileChapterStyleClasses.typography}>{DescriptionValues.CHANNEL_PARTNER}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <TextField
                                        variant="outlined"
                                        className={riskProfileChapterStyleClasses.textField}
                                        select
                                        value={getIndex(riskProfileChapterProps.businessGoalData.channelPartnerScore)}
                                        SelectProps={{
                                            IconComponent: () => <ArrowDropDownRoundedIcon className={riskProfileChapterStyleClasses.dropdownIcon} />
                                        }}
                                        onChange={handleChannelPartnerChange}
                                    >
                                        {channelPartners.map((option) => (
                                            <MenuItem key={option.index} value={option.index}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider>
                                <Grid className={riskProfileChapterStyleClasses.gridItem}>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.CORE}</Box>
                                        {DescriptionValues.CHANNEL_PARTNER_CORE}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.ADJACENT} </Box>
                                        {DescriptionValues.CHANNEL_PARTNER_ADJACENT}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.NEW}</Box>
                                        {DescriptionValues.CHANNEL_PARTNER_NEW}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' spacing={3}>
                            <Grid item className={riskProfileChapterStyleClasses.riskChapterItems}>
                                <Typography className={riskProfileChapterStyleClasses.typography}>{DescriptionValues.POSITIONING}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <TextField
                                        variant="outlined"
                                        className={riskProfileChapterStyleClasses.textField}
                                        select
                                        value={getIndex(riskProfileChapterProps.businessGoalData.positioningScore)}
                                        SelectProps={{
                                            IconComponent: () => <ArrowDropDownRoundedIcon className={riskProfileChapterStyleClasses.dropdownIcon} />
                                        }}
                                        onChange={handlePositioningChange}
                                    >
                                        {positioning.map((option) => (
                                            <MenuItem key={option.index} value={option.index}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider>
                                <Grid className={riskProfileChapterStyleClasses.gridItem}>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.EXISTING} </Box>
                                        {DescriptionValues.POSITIONING_EXISTING}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.RARELY_USED} </Box>
                                        {DescriptionValues.POSITIONING_RARELY_USED}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.UNFAMILIAR}</Box>
                                        {DescriptionValues.POSITIONING_UNFAMILIAR}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={riskProfileChapterStyleClasses.riskChapterItems}>
                                <Typography className={riskProfileChapterStyleClasses.typography}>{DescriptionValues.IDEA_TYPE}</Typography>
                                <ThemeProvider theme={OutlinedInputTheme}>
                                    <TextField
                                        variant="outlined"
                                        className={riskProfileChapterStyleClasses.textField}
                                        select
                                        value={getIndex(riskProfileChapterProps.businessGoalData.ideaTypeScore)}
                                        SelectProps={{
                                            IconComponent: () => <ArrowDropDownRoundedIcon className={riskProfileChapterStyleClasses.dropdownIcon} />
                                        }}
                                        onChange={handleIdeaTypeChange}
                                    >
                                        {ideaTypes.map((option) => (
                                            <MenuItem key={option.index} value={option.index}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </ThemeProvider>
                                <Grid className={riskProfileChapterStyleClasses.gridItem}>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.INCREMENTAL}</Box>
                                        {DescriptionValues.IDEA_TYPE_INCREMENTAL}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.ARCHITECTURAL}</Box>
                                        {DescriptionValues.IDEA_TYPE_ARCHITECTURAL}
                                    </Typography>
                                    <Typography component='div' className={riskProfileChapterStyleClasses.description}>
                                        <Box fontWeight='bold' display='inline'>{DescriptionValues.DISCONTINUOUS}</Box>
                                        {DescriptionValues.IDEA_TYPE_DISCONTINUOUS}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className={riskProfileChapterStyleClasses.typography}>Risk Score</Typography>
                        <Avatar style={{ backgroundColor: avatarColor }} className={riskProfileChapterStyleClasses.avatar}>{riskProfileChapterProps.businessGoalData.riskScore}</Avatar>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </ThemeProvider>
    )
}