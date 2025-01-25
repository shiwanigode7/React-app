import { Grid, makeStyles, TextField, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { COLOR_GRAPHITE_3 } from "../../constant/Colors";
import { MEETING_TOPIC_TYPE } from "../../constant/InnovationEnums";
import { MEETING_MINUTE_TEXT } from "../../constant/MeetingViewTexts";
import { MeetingTopicInterface } from "../../interfaces/InnovationInterface";
import { OutlinedTextFieldStyles } from "../../view/theme";

/**Interface for the props */
declare interface DiscussionTopicTextType {
    text: string;
    duration: number;
    index: number;
    presenter: string;
    isMeetingOver: boolean;
    discussionTopicId: string;
    updateTextFieldTopic: (inTopicIndex: number, inUpdatedTopicData: MeetingTopicInterface) => void;
}

/**Add styling */
const DiscussionTopicTextStyle = makeStyles((theme: any) => ({
    TopicTextFieldClass: {
        width: "318px"
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
    }
}));

export default function DiscussionTopicText(inputProps: DiscussionTopicTextType) {
    /**Get the styles */
    const DiscussionTopicTextStyleClass = DiscussionTopicTextStyle();
    /**Importing the styles */
    const OutlinedTextFieldClasses = OutlinedTextFieldStyles();
    /**Constant values used */
    const MAX_CHARACTER_LENGTH: number = 140;
    const INPUT_TIMEOUT: number = 2000;
    const MIN_DURATION_VALUE: number = 0;
    const MAX_DURATION_VALUE: number = 999;

    /**States to handle the inputs  */
    const [textName, setTextName] = useState<string>(inputProps.text);
    const [topicDuration, setTopicDuration] = useState<number>(inputProps.duration);

    /**Function to handle the text name change */
    const handleTextNameChange = (textNameChangeEvent: any) => {
        setTextName(textNameChangeEvent.target.value);
    };

    /**Function to handle the topic duration change */
    const handleTopicDurationChange = (topicDurationChangeEvent: any) => {
        setTopicDuration(topicDurationChangeEvent.target.value);
    };

    /**Function to fire the callback to update the topic */
    const handleUpdateTopicData = () => {
        inputProps.updateTextFieldTopic(inputProps.index, {
            topic: textName.trim(),
            presenter: inputProps.presenter,
            topicDuration: topicDuration,
            topicType: MEETING_TOPIC_TYPE.TEXT.trim(),
            discussionTopicId: inputProps.discussionTopicId,
            slideId: ""
        });
    }

    /**Use effect to wait for two seconds before sending the changed data to callback*/
    useEffect(() => {
        /**Get the timeout id buy using setting the time and instruction to be executed */
        const timeOutId = setTimeout(() => {
            if (textName.trim() !== inputProps.text && "" !== textName.trim()) {
                /**Call the function to update the topic details*/
                handleUpdateTopicData();
            }
            if ("" === textName.trim()) {
                setTextName(inputProps.text);
            }
        }, INPUT_TIMEOUT);

        return (() => {
            /**Clear the timeout to make sure to update once for last changed
             * This is done to make sure that the instruction are executed only
             * once after there is an inactivity, because normally if we don't do 
             * this useEffect will execute the instruction for single character changes.
             */
            clearTimeout(timeOutId);
        });
    }, [textName]);

    /**Use effect to wait for two seconds before sending the changed data to callback*/
    useEffect(() => {
        /**Get the timeout id buy using setting the time and instruction to be executed */
        const timeOutId = setTimeout(() => {
            if (topicDuration !== inputProps.duration) {
                /**Call the function to update the topic details*/
                handleUpdateTopicData();
            }
        }, INPUT_TIMEOUT);

        return (() => {
            /**Clear the timeout to make sure to update once for last changed
             * This is done to make sure that the instruction are executed only
             * once after there is an inactivity, because normally if we don't do 
             * this useEffect will execute the instruction for single character changes.
             */
            clearTimeout(timeOutId);
        });
    }, [topicDuration]);


    return (
        <div>
            <Grid container direction="row" spacing={1} className={DiscussionTopicTextStyleClass.gridContainerClass}>
                <Grid item >
                    <Tooltip
                        title={textName}
                        placement="bottom"
                        arrow
                    >
                        {/**Text field for the text topic */}
                        <TextField
                            variant="outlined"
                            className={DiscussionTopicTextStyleClass.TopicTextFieldClass}
                            value={textName}
                            onChange={handleTextNameChange}
                            disabled={inputProps.isMeetingOver}
                            required
                            inputProps={{
                                maxLength: MAX_CHARACTER_LENGTH,
                                className: OutlinedTextFieldClasses.textFieldOutlined,
                            }}
                            InputProps={{
                                classes: {
                                    notchedOutline: OutlinedTextFieldClasses.textFieldNotchedOutline,
                                    root: OutlinedTextFieldClasses.textFieldOutlineRoot
                                }
                            }}
                        />
                    </Tooltip>
                </Grid>
                <Grid item>
                    {/**Topic duration text field */}
                    <TextField
                        variant="outlined"
                        type="number"
                        value={topicDuration}
                        onChange={handleTopicDurationChange}
                        disabled={inputProps.isMeetingOver}
                        onKeyDown={(evt) => ("." === evt.key || "e" === evt.key) && evt.preventDefault()}
                        className={DiscussionTopicTextStyleClass.DurationFieldClass}
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
                        root: DiscussionTopicTextStyleClass.SuffixGridClass
                    }}
                    style={{
                        opacity: inputProps.isMeetingOver ? "0.6" : "1"
                    }}
                >
                    <Typography className={DiscussionTopicTextStyleClass.SuffixGridClass}>{MEETING_MINUTE_TEXT}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}