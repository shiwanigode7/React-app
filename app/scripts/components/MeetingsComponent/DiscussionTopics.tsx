import { Grid, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BusinessGoalWithIdType, MeetingTopicInterface } from "../../interfaces/InnovationInterface";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DiscussionTopicText from "./DiscussionTopicText";
import DiscussionTopicBG from "./DiscussionTopicBG";
import { Button } from "@esko/cloud-ui-components/dist/esm";
import { COLOR_GRAPHITE_3 } from "../../constant/Colors";
import { ADD_TOPIC_OR_BG_TEXT } from "../../constant/MeetingViewTexts";
import { MEETING_OPERATIONS } from "../../constant/InnovationEnums";

declare interface DiscussionTopicInterface {
    inMeetingName: string;
    inTopicData: MeetingTopicInterface[];
    isMeetingOver: boolean;
    businessGoalListWithId: BusinessGoalWithIdType[];
    addTopicCallBack: (inMeetingName: string, inTopicList: MeetingTopicInterface[], meetingStartTime: string, meetingEndTime: string, inMeetingTypeSelected: string) => void;
    meetingUpdateCallback: (inMeetingName: string, inMeetingData: Object, inOperationPerformed: MEETING_OPERATIONS) => void;
    meetingStartTime: string;
    meetingEndTime: string;
    meetingType: string
}

/**Style for Draggable component */
export const dragComponentStyles = (draggableStyle: any) => {
    return {
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 2,
        margin: "0 0 2px 0",
        textAlign: "right",

        // styles we need to apply on draggables
        ...draggableStyle
    };
};

/**Add styling */
const DiscussionTopicStyle = makeStyles((theme: any) => ({
    IconButtonClass: {
        padding: "0"
    },
    RemoveIconClass: {
        color: COLOR_GRAPHITE_3
    },
    disabledIconClass: {
        opacity: 0.5,
        marginTop: "2px"
    },
    ButtonClass: {
        margin: "5px"
    },
    gridContainerClass: {
        flexWrap: "nowrap",
        alignItems: "center",
        margin: "-5px"
    }
}));

export function DiscussionTopics(inputProps: DiscussionTopicInterface) {

    /**State variable to hold the array to be displayed */
    const [displayArray, setDisplayArray] = useState<MeetingTopicInterface[]>(inputProps.inTopicData);

    /**Get the styles */
    const DiscussionTopicStyleClass = DiscussionTopicStyle();

    /**Function to reOrder the index values when dragging */
    const reOrderTopicList = (meetingTopicList: MeetingTopicInterface[], startIndex: number, endIndex: number) => {
        /**re-ordering the array of topics */
        const reArrangedTopicList = Array.from(meetingTopicList);
        const [reOrderedTopic] = reArrangedTopicList.splice(startIndex, 1);
        reArrangedTopicList.splice(endIndex, 0, reOrderedTopic);
        /**Send the updated data to callback function */
        const outMeetingData: Object = {
            discussionTopics: reArrangedTopicList,
            meetingType: inputProps.meetingType
        }
        inputProps.meetingUpdateCallback(inputProps.inMeetingName, outMeetingData, MEETING_OPERATIONS.UPDATE_TOPICS);
        return reArrangedTopicList;
    };

    /**Function is triggered when a component is dragged */
    const handleTopicDragEvent = (topicDragEvent: any) => {
        if (!topicDragEvent.destination) {
            return;
        }
        /**Store the resultant array */
        const temp = reOrderTopicList(
            displayArray,
            topicDragEvent.source.index,
            topicDragEvent.destination.index
        );
        setDisplayArray(temp);
    };

    /**Function to update the business goal change  */
    const handleTopicDataUpdate = (inTopicIndex: number, inUpdatedTopicData: MeetingTopicInterface) => {
        inputProps.inTopicData.splice(inTopicIndex, 1, inUpdatedTopicData);
        const outMeetingData = {
            discussionTopics: inputProps.inTopicData,
            meetingType: inputProps.meetingType
        }
        inputProps.meetingUpdateCallback(inputProps.inMeetingName, outMeetingData, MEETING_OPERATIONS.UPDATE_TOPICS);
    };

    /**function to delete the topic based on the topic index */
    const handleTopicDelete = (inTopicIndex: number) => {
        inputProps.inTopicData.splice(inTopicIndex, 1);
        const outMeetingData = {
            discussionTopics: inputProps.inTopicData,
            meetingType: inputProps.meetingType
        }
        inputProps.meetingUpdateCallback(inputProps.inMeetingName, outMeetingData, MEETING_OPERATIONS.UPDATE_TOPICS);
    };

    return (
        <div>
            {/**The topic list */}
            <DragDropContext onDragEnd={(topicDragEndEvent: any) => { handleTopicDragEvent(topicDragEndEvent) }}>
                <Droppable droppableId="droppable">
                    {(provided: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                displayArray.map((topic: MeetingTopicInterface, index: number) => {
                                    return (
                                        <div>
                                            <Draggable
                                                key={topic.discussionTopicId}
                                                draggableId={topic.discussionTopicId}
                                                index={index}
                                                isDragDisabled={inputProps.isMeetingOver}
                                            >
                                                {(providedDraggable: any) => (
                                                    <div
                                                        ref={providedDraggable.innerRef}
                                                        {...providedDraggable.draggableProps}
                                                        {...providedDraggable.dragHandleProps}
                                                        style={dragComponentStyles(
                                                            providedDraggable.draggableProps.style
                                                        )}
                                                    >
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            spacing={1}
                                                            alignItems="center"
                                                            className={DiscussionTopicStyleClass.gridContainerClass}
                                                        >
                                                            {/**Drag icon component */}
                                                            {
                                                                !inputProps.isMeetingOver ?
                                                                    <Grid item>
                                                                        <span {...providedDraggable.dragHandleProps}>
                                                                            <DragIndicatorIcon className={DiscussionTopicStyleClass.disabledIconClass} />
                                                                        </span>
                                                                    </Grid> :
                                                                    null
                                                            }
                                                            {/**The text component - two text field for Text type topic
                                                             * - Three text field for Business Goal Based Toic
                                                             */}
                                                            <Grid item>
                                                                {"Text" === topic.topicType ?
                                                                    <DiscussionTopicText
                                                                        duration={topic.topicDuration}
                                                                        text={topic.topic}
                                                                        presenter={topic.presenter}
                                                                        index={index}
                                                                        discussionTopicId={topic.discussionTopicId}
                                                                        isMeetingOver={inputProps.isMeetingOver}
                                                                        updateTextFieldTopic={handleTopicDataUpdate}
                                                                    /> :
                                                                    <DiscussionTopicBG
                                                                        duration={topic.topicDuration}
                                                                        businessGoalListWithId={inputProps.businessGoalListWithId}
                                                                        index={index}
                                                                        presenter={topic.presenter}
                                                                        discussionTopicId={topic.discussionTopicId}
                                                                        nodeId={topic.topic}
                                                                        topicType={undefined !== topic.typeOfTopic ? topic.typeOfTopic : ""}
                                                                        isMeetingOver={inputProps.isMeetingOver}
                                                                        updateBusinessGoalTopic={handleTopicDataUpdate}
                                                                    />
                                                                }
                                                            </Grid>
                                                            {/**Delete icon/Remove topic icon component */}
                                                            {
                                                                !inputProps.isMeetingOver ?

                                                                    <Grid item>
                                                                        <Tooltip
                                                                            title={"Remove Discussion Topic"}
                                                                            placement="right-start"
                                                                            arrow
                                                                        >
                                                                            <IconButton
                                                                                className={DiscussionTopicStyleClass.IconButtonClass}
                                                                                onClick={() => { handleTopicDelete(index) }}
                                                                                disabled={inputProps.isMeetingOver}
                                                                                classes={{
                                                                                    disabled: DiscussionTopicStyleClass.disabledIconClass
                                                                                }}
                                                                            >
                                                                                <RemoveCircleRoundedIcon className={DiscussionTopicStyleClass.RemoveIconClass} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Grid> :
                                                                    null
                                                            }
                                                        </Grid>
                                                    </div>
                                                )}
                                            </Draggable>
                                        </div>
                                    )
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {/**The add topic or business goal button */}
            {
                !inputProps.isMeetingOver ?
                    <Button
                        color={"secondary"}
                        onClick={() => { inputProps.addTopicCallBack(inputProps.inMeetingName, inputProps.inTopicData, inputProps.meetingStartTime, inputProps.meetingEndTime, inputProps.meetingType) }}
                        className={DiscussionTopicStyleClass.ButtonClass}
                        startIcon={<AddRoundedIcon />}
                        endIcon={undefined}
                        pullDown={undefined}
                    >
                        {ADD_TOPIC_OR_BG_TEXT}
                    </Button> :
                    null
            }
        </div>
    )
}