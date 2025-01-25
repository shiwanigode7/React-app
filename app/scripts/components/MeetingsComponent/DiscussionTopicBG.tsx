import { Grid, makeStyles, MenuItem, TextField, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { OutlinedTextFieldStyles } from "../../view/theme";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { BG_MEETING_TYPE_DROP_DOWN_FIELDS, MEETING_MINUTE_TEXT } from "../../constant/MeetingViewTexts";
import { BusinessGoalWithIdType, MeetingTopicInterface } from "../../interfaces/InnovationInterface";
import { COLOR_GRAPHITE_3 } from "../../constant/Colors";
import { MEETING_TOPIC_TYPE } from "../../constant/InnovationEnums";

/**Interface for the props */
declare interface DiscussionTopicBGType {
    nodeId: string;
    duration: number;
    topicType: string;
    index: number;
    presenter: string;
    businessGoalListWithId: BusinessGoalWithIdType[];
    isMeetingOver: boolean;
    discussionTopicId: string;
    updateBusinessGoalTopic: (inTopicIndex: number, inUpdatedTopicData: MeetingTopicInterface) => void;
}

/**Add styling */
const DiscussionTopicBGStyle = makeStyles((theme: any) => ({
    BGFieldClass: {
        width: "200px",
        textAlign: "left"
    },
    DropDownIconClass: {
        color: COLOR_GRAPHITE_3,
        fontSize: "22px"
    },
    MeetingTypeClass: {
        width: "110px",
        textAlign: "left"
    },
    DurationFieldClass: {
        width: "60px"
    },
    SuffixGridClass: {
        padding: "0px",
        fontSize: "12px"
    },
    SuffixClass: {
        fontSize: "12px",
        color: COLOR_GRAPHITE_3,
        display: "inline"
    },
    gridContainerClass: {
        flexWrap: "nowrap",
        alignItems: "center"
    },
    selectOutlined: {
        paddingRight: "0px !important"
    }
}));

export default function DiscussionTopicBG(inputProps: DiscussionTopicBGType) {
    /**Get the styles */
    const DiscussionTopicBGStyleClass = DiscussionTopicBGStyle();
    /**Importing the styles */
    const OutlinedTextFieldClasses = OutlinedTextFieldStyles();
    /**Constant values used */
    const INPUT_TIMEOUT: number = 2000;
    const MIN_DURATION_VALUE: number = 0;
    const MAX_DURATION_VALUE: number = 999;

    /**State to handle the text field input changes */
    const [businessGoal, setBusinessGoal] = useState<string>(inputProps.nodeId);
    const [topicDuration, setTopicDuration] = useState<number>(inputProps.duration);
    const [typeOfTopic, setTypeOfTopic] = useState<string>(inputProps.topicType);

    /**Function to handle the input changes */
    const handleBusinessGoalChange = (businessGoalChangeEvent: any) => {
        const tempBusinessGoalId: string = businessGoalChangeEvent.target.value.trim();
        setBusinessGoal(tempBusinessGoalId);
        if (tempBusinessGoalId !== inputProps.nodeId) {
            /**Call the function to update the business goal topic*/
            inputProps.updateBusinessGoalTopic(inputProps.index, {
                topic: tempBusinessGoalId,
                topicDuration: topicDuration,
                topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL.trim(),
                typeOfTopic: typeOfTopic,
                presenter: inputProps.presenter,
                discussionTopicId: inputProps.discussionTopicId,
                slideId: ""
            });
        }
    };

    const getBusinessGoalName = (inNodeId: string): string => {
        let lBusinessGoalName = "";
        inputProps.businessGoalListWithId.forEach((businessGoalWithId: BusinessGoalWithIdType) => {
            if (businessGoalWithId.nodeId === inNodeId) {
                lBusinessGoalName = businessGoalWithId.businessGoalName;
            }
        })
        return lBusinessGoalName;
    }

    /**Function to handle the topic duration change */
    const handleTopicDurationChange = (topicDurationChangeEvent: any) => {
        setTopicDuration(topicDurationChangeEvent.target.value);
    };

    const handleTypeOfTopicChange = (typeOfTopicChangeEvent: any) => {
        const holdTypeOfTopic: string = typeOfTopicChangeEvent.target.value.trim();
        setTypeOfTopic(holdTypeOfTopic);
        /**Call the function to update the business goal topic*/
        inputProps.updateBusinessGoalTopic(inputProps.index, {
            topic: businessGoal,
            presenter: inputProps.presenter,
            topicDuration: topicDuration,
            topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL.trim(),
            typeOfTopic: holdTypeOfTopic,
            discussionTopicId: inputProps.discussionTopicId,
            slideId: ""
        });
    };

    /**Use effect to wait for two seconds before sending the changed data to callback*/
    useEffect(() => {
        /**Get the timeout id buy using setting the time and instruction to be executed */
        const timeOutId = setTimeout(() => {
            if (topicDuration !== inputProps.duration) {
                /**Call the function to update the business goal topic */
                inputProps.updateBusinessGoalTopic(inputProps.index, {
                    topic: businessGoal,
                    presenter: inputProps.presenter,
                    topicDuration: topicDuration,
                    topicType: MEETING_TOPIC_TYPE.BUSINESS_GOAL.trim(),
                    typeOfTopic: typeOfTopic,
                    discussionTopicId: inputProps.discussionTopicId,
                    slideId: ""
                });
            }
        }, INPUT_TIMEOUT);

        return (() => {
            clearTimeout(timeOutId);
        });
    }, [topicDuration]);

    return (
        <Grid container direction="row" spacing={1} className={DiscussionTopicBGStyleClass.gridContainerClass}>
            <Grid item >
                <Tooltip
                    title={getBusinessGoalName(businessGoal)}
                    placement="bottom"
                    arrow
                >
                    {/**Business goal drop down */}
                    <TextField
                        variant={"outlined"}
                        className={DiscussionTopicBGStyleClass.BGFieldClass}
                        select
                        value={businessGoal}
                        onChange={handleBusinessGoalChange}
                        disabled={inputProps.isMeetingOver}
                        SelectProps={{
                            classes: {
                                outlined: DiscussionTopicBGStyleClass.selectOutlined
                            },
                            IconComponent: () => <ArrowDropDownRoundedIcon className={DiscussionTopicBGStyleClass.DropDownIconClass} />
                        }}
                        InputProps={{
                            classes: {
                                notchedOutline: OutlinedTextFieldClasses.textFieldNotchedOutline,
                                root: OutlinedTextFieldClasses.textFieldOutlineRoot
                            }
                        }}
                        inputProps={{
                            className: OutlinedTextFieldClasses.textFieldOutlined
                        }}
                    >
                        {inputProps.businessGoalListWithId.map((option) => (
                            <MenuItem key={option.nodeId} value={option.nodeId}>
                                {option.businessGoalName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Tooltip>
            </Grid>
            <Grid item>
                {/**Business goal topic type drop down */}
                <TextField
                    variant="outlined"
                    className={DiscussionTopicBGStyleClass.MeetingTypeClass}
                    onChange={handleTypeOfTopicChange}
                    select
                    disabled={inputProps.isMeetingOver}
                    value={typeOfTopic}
                    SelectProps={{
                        IconComponent: () => <ArrowDropDownRoundedIcon className={DiscussionTopicBGStyleClass.DropDownIconClass} />
                    }}
                    InputProps={{
                        classes: {
                            notchedOutline: OutlinedTextFieldClasses.textFieldNotchedOutline,
                            root: OutlinedTextFieldClasses.textFieldOutlineRoot
                        }
                    }}
                    inputProps={{
                        className: OutlinedTextFieldClasses.textFieldOutlined
                    }}
                >
                    {BG_MEETING_TYPE_DROP_DOWN_FIELDS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item>
                {/**Topic duration field */}
                <TextField
                    type="number"
                    value={topicDuration}
                    onChange={handleTopicDurationChange}
                    disabled={inputProps.isMeetingOver}
                    onKeyDown={(evt) => ("." === evt.key || "e" === evt.key) && evt.preventDefault()}
                    variant="outlined"
                    className={DiscussionTopicBGStyleClass.DurationFieldClass}
                    inputProps={{
                        min: MIN_DURATION_VALUE, max: MAX_DURATION_VALUE, pattern: "[0-9]*", step: "5",
                        className: OutlinedTextFieldClasses.textFieldOutlined
                    }}
                    InputProps={{
                        classes: {
                            notchedOutline: OutlinedTextFieldClasses.textFieldNotchedOutline,
                            root: OutlinedTextFieldClasses.textFieldOutlineRoot
                        }
                    }}
                />
            </Grid>
            <Grid
                item
                classes={{
                    root: DiscussionTopicBGStyleClass.SuffixGridClass
                }}
                style={{
                    opacity: inputProps.isMeetingOver ? "0.6" : "1"
                }}
            >
                <Typography className={DiscussionTopicBGStyleClass.SuffixClass}>
                    {MEETING_MINUTE_TEXT}
                </Typography>
            </Grid>
        </Grid>
    );
}