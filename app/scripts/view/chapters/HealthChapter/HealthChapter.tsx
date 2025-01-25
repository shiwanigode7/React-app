import { Grid, TextField, Tooltip } from "@material-ui/core";
import React from "react";
import HealthChapterModel from "./HealthChapterModel";
import { HealthItemStatusButton } from "./HealthItemStatusButton/HealthItemStatusButton";
import { HealthChapterStyle } from "./HealthChapterStyle";
import { BusinessGoalType } from "../../MPLView";
import { BG_HEALTH_ITEMS } from "../../../constant/InnovationEnums";

export function HealthChapter(HealthChapterProps: HealthChapterModel) {

    const healtChapterStyleClasses = HealthChapterStyle();

    const MAX_CHARACTER_LIMIT: number = 140;

    const canStatusBeChanged: boolean = ("Active" === HealthChapterProps.businessGoalData.status);

    const canCommentBeChanged: boolean = (("Active" === HealthChapterProps.businessGoalData.status) || ("Scheduled" === HealthChapterProps.businessGoalData.status));

    const toolTipMessage = canCommentBeChanged ? "" : "Comment is disabled as long as Business Goal is not Scheduled or Active";

    const handleCommentChange = (item: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const lBusinessGoal: BusinessGoalType = JSON.parse(JSON.stringify(HealthChapterProps.businessGoalData));

        switch (item) {
            case BG_HEALTH_ITEMS.TECHNICAL: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    technical: {
                        ...lBusinessGoal.healthData.technical,
                        comment: event.target.value
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.SCHEDULE: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    schedule: {
                        ...lBusinessGoal.healthData.schedule,
                        comment: event.target.value
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.RESOURCES: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    resources: {
                        ...lBusinessGoal.healthData.resources,
                        comment: event.target.value
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.IP: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    IP: {
                        ...lBusinessGoal.healthData.IP,
                        comment: event.target.value
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.BUSINESS_CASE: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    businessCase: {
                        ...lBusinessGoal.healthData.businessCase,
                        comment: event.target.value
                    }
                }
            });
                break;
        }
    }

    const handleStatusChange = (item: string, event: any) => {

        const lBusinessGoal: BusinessGoalType = JSON.parse(JSON.stringify(HealthChapterProps.businessGoalData));

        switch (item) {
            case BG_HEALTH_ITEMS.TECHNICAL: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    technical: {
                        ...lBusinessGoal.healthData.technical,
                        status: event.target.innerText.trim()
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.SCHEDULE: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    schedule: {
                        ...lBusinessGoal.healthData.schedule,
                        status: event.target.innerText.trim()
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.RESOURCES: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    resources: {
                        ...lBusinessGoal.healthData.resources,
                        status: event.target.innerText.trim()
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.IP: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    IP: {
                        ...lBusinessGoal.healthData.IP,
                        status: event.target.innerText.trim()
                    }
                }
            });
                break;

            case BG_HEALTH_ITEMS.BUSINESS_CASE: HealthChapterProps.setBusinessGoalData({
                ...lBusinessGoal,
                healthData: {
                    ...lBusinessGoal.healthData,
                    businessCase: {
                        ...lBusinessGoal.healthData.businessCase,
                        status: event.target.innerText.trim()
                    }
                }
            });
                break;
        }
    }

    return (
        <Grid container direction="row" className={healtChapterStyleClasses.rootContainer}>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <HealthItemStatusButton
                            item={BG_HEALTH_ITEMS.TECHNICAL}
                            status={HealthChapterProps.businessGoalData.healthData.technical.status}
                            isCommentPresent={(HealthChapterProps.businessGoalData.healthData.technical.comment.length > 0)}
                            isDisabled={!canStatusBeChanged}
                            handleStatusChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title={toolTipMessage}
                            placement="right"
                            classes={{
                                tooltip : healtChapterStyleClasses.tooltip
                            }}
                        >
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                required
                                disabled={!canCommentBeChanged}
                                InputProps={{
                                    classes: {
                                        notchedOutline: healtChapterStyleClasses.commentTextFieldNotchedOutline,
                                        root: healtChapterStyleClasses.commentFieldOutlineRoot,
                                        inputMultiline: healtChapterStyleClasses.commentMultiline,
                                        error: healtChapterStyleClasses.commentFieldOutLineError
                                    },
                                }}
                                inputProps={{
                                    maxLength: MAX_CHARACTER_LIMIT,
                                    className: healtChapterStyleClasses.commentTextFieldDragStyle
                                }}
                                FormHelperTextProps={{
                                    classes: {
                                        contained: healtChapterStyleClasses.commentHelperText
                                    }
                                }}
                                helperText={(MAX_CHARACTER_LIMIT == HealthChapterProps.businessGoalData.healthData.technical.comment.length && "Maximum limit is 140 characters")}
                                value={HealthChapterProps.businessGoalData.healthData.technical.comment}
                                onChange={(event) => handleCommentChange(BG_HEALTH_ITEMS.TECHNICAL, event)}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <HealthItemStatusButton
                            item={BG_HEALTH_ITEMS.SCHEDULE}
                            status={HealthChapterProps.businessGoalData.healthData.schedule.status}
                            isCommentPresent={(HealthChapterProps.businessGoalData.healthData.schedule.comment.length > 0)}
                            isDisabled={!canStatusBeChanged}
                            handleStatusChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid item> 
                    <Tooltip
                            title={toolTipMessage}
                            placement="right"
                            classes={{
                                tooltip : healtChapterStyleClasses.tooltip
                            }}
                        >
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            disabled={!canCommentBeChanged}
                            InputProps={{
                                classes: {
                                    notchedOutline: healtChapterStyleClasses.commentTextFieldNotchedOutline,
                                    root: healtChapterStyleClasses.commentFieldOutlineRoot,
                                    inputMultiline: healtChapterStyleClasses.commentMultiline,
                                    error: healtChapterStyleClasses.commentFieldOutLineError
                                },
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTER_LIMIT,
                                className: healtChapterStyleClasses.commentTextFieldDragStyle
                            }}
                            FormHelperTextProps={{
                                classes: {
                                    contained: healtChapterStyleClasses.commentHelperText
                                }
                            }}
                            helperText={(MAX_CHARACTER_LIMIT == HealthChapterProps.businessGoalData.healthData.schedule.comment.length && "Maximum limit is 140 characters")}
                            value={HealthChapterProps.businessGoalData.healthData.schedule.comment}
                            onChange={(event) => handleCommentChange(BG_HEALTH_ITEMS.SCHEDULE, event)}
                        />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <HealthItemStatusButton
                            item={BG_HEALTH_ITEMS.RESOURCES}
                            status={HealthChapterProps.businessGoalData.healthData.resources.status}
                            isCommentPresent={(HealthChapterProps.businessGoalData.healthData.resources.comment.length > 0)}
                            isDisabled={!canStatusBeChanged}
                            handleStatusChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title={toolTipMessage}
                            placement="right"
                            classes={{
                                tooltip : healtChapterStyleClasses.tooltip
                            }}
                        >
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            disabled={!canCommentBeChanged}
                            InputProps={{
                                classes: {
                                    notchedOutline: healtChapterStyleClasses.commentTextFieldNotchedOutline,
                                    root: healtChapterStyleClasses.commentFieldOutlineRoot,
                                    inputMultiline: healtChapterStyleClasses.commentMultiline,
                                    error: healtChapterStyleClasses.commentFieldOutLineError
                                },
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTER_LIMIT,
                                className: healtChapterStyleClasses.commentTextFieldDragStyle
                            }}
                            FormHelperTextProps={{
                                classes: {
                                    contained: healtChapterStyleClasses.commentHelperText
                                }
                            }}
                            helperText={(MAX_CHARACTER_LIMIT == HealthChapterProps.businessGoalData.healthData.resources.comment.length && "Maximum limit is 140 characters")}
                            value={HealthChapterProps.businessGoalData.healthData.resources.comment}
                            onChange={(event) => handleCommentChange(BG_HEALTH_ITEMS.RESOURCES, event)}
                        />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <HealthItemStatusButton
                            item={BG_HEALTH_ITEMS.IP}
                            status={HealthChapterProps.businessGoalData.healthData.IP.status}
                            isCommentPresent={(HealthChapterProps.businessGoalData.healthData.IP.comment.length > 0)}
                            isDisabled={!canStatusBeChanged}
                            handleStatusChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title={toolTipMessage}
                            placement="right"
                            classes={{
                                tooltip : healtChapterStyleClasses.tooltip
                            }}
                        >
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            disabled={!canCommentBeChanged}
                            InputProps={{
                                classes: {
                                    notchedOutline: healtChapterStyleClasses.commentTextFieldNotchedOutline,
                                    root: healtChapterStyleClasses.commentFieldOutlineRoot,
                                    inputMultiline: healtChapterStyleClasses.commentMultiline,
                                    error: healtChapterStyleClasses.commentFieldOutLineError
                                },
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTER_LIMIT,
                                className: healtChapterStyleClasses.commentTextFieldDragStyle
                            }}
                            FormHelperTextProps={{
                                classes: {
                                    contained: healtChapterStyleClasses.commentHelperText
                                }
                            }}
                            helperText={(MAX_CHARACTER_LIMIT == HealthChapterProps.businessGoalData.healthData.IP.comment.length && "Maximum limit is 140 characters")}
                            value={HealthChapterProps.businessGoalData.healthData.IP.comment}
                            onChange={(event) => handleCommentChange(BG_HEALTH_ITEMS.IP, event)}
                        />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid >
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <HealthItemStatusButton
                            item={BG_HEALTH_ITEMS.BUSINESS_CASE}
                            status={HealthChapterProps.businessGoalData.healthData.businessCase.status}
                            isCommentPresent={(HealthChapterProps.businessGoalData.healthData.businessCase.comment.length > 0)}
                            isDisabled={!canStatusBeChanged}
                            handleStatusChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title={toolTipMessage}
                            placement="right"
                            classes={{
                                tooltip : healtChapterStyleClasses.tooltip
                            }}
                        >
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            disabled={!canCommentBeChanged}
                            InputProps={{
                                classes: {
                                    notchedOutline: healtChapterStyleClasses.commentTextFieldNotchedOutline,
                                    root: healtChapterStyleClasses.commentFieldOutlineRoot,
                                    inputMultiline: healtChapterStyleClasses.commentMultiline,
                                    error: healtChapterStyleClasses.commentFieldOutLineError
                                },
                            }}
                            inputProps={{
                                maxLength: MAX_CHARACTER_LIMIT,
                                className: healtChapterStyleClasses.commentTextFieldDragStyle
                            }}
                            FormHelperTextProps={{
                                classes: {
                                    contained: healtChapterStyleClasses.commentHelperText
                                }
                            }}
                            helperText={(MAX_CHARACTER_LIMIT == HealthChapterProps.businessGoalData.healthData.businessCase.comment.length && "Maximum limit is 140 characters")}
                            value={HealthChapterProps.businessGoalData.healthData.businessCase.comment}
                            onChange={(event) => handleCommentChange(BG_HEALTH_ITEMS.BUSINESS_CASE, event)}
                        />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid >
        </Grid >
    )
}