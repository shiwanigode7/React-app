import { AccordionDetails, Button, Grid, IconButton, Tooltip } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import React, { useContext, useEffect, useState } from "react";
import ReleaseModel from "../../../components/settings/InnovationCadenceView/ReleaseModel";
import InputTextField from "../../../components/utils/InputFields/InputTextField/InputTextField";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { MilestoneModel, ReleaseTimelineModel } from "../../../interfaces/InnovationInterface";
import ReleaseService from "../../../services/service/ReleaseService";
import { generateRandomUUID } from "../../../utils/UUIDGenerator";
import MilestonesChapterModel from "./MilestonesChapterModel";
import { MilestonesChapterStyles } from "./MilestonesChapterStyles";
export default function MilestonesChapter(milestonesChapterProps: MilestonesChapterModel) {

    const MilestonesChapterStyleClasses = MilestonesChapterStyles();

    const lInnovationData = useContext(InnovationAppContext);

    const [isMilestoneTextFieldEmpty, setIsMilestoneTextFieldEmpty] = useState<boolean>(false);
    const [archivedReleases, setArchivedReleases] = useState<ReleaseModel[]>([]);
    const [archivedReleasesList, setArchivedReleasesList] = useState<string[]>([]);
    const [archivedMilestones, setArchivedMilestones] = useState<string[]>([]);


    useEffect(() => {
        const isAnyElementEmpty: boolean = (undefined === milestonesChapterProps.businessGoalData.milestones.find(milestone => milestone.milestoneName === "")) ? false : true;
        setIsMilestoneTextFieldEmpty(!isAnyElementEmpty);
    }, [milestonesChapterProps.businessGoalData.milestones]);

    useEffect(() => {
        if (milestonesChapterProps.businessGoalData.milestones.length > 0) {
            milestonesChapterProps.setBusinessGoalData({
                ...milestonesChapterProps.businessGoalData,
                milestones: milestonesChapterProps.businessGoalData.milestones
            });
        }
    }, [milestonesChapterProps.businessGoalData.milestones]);

    useEffect(() => {
        ReleaseService.getReleases(lInnovationData.eskoAccountDetail.repoid, 999, true)
            .then((getReleasesResponse: ReleaseModel[]) => {
                setArchivedReleases(getReleasesResponse);
            })
            .catch(() => {
                setArchivedReleases([]);
            });
    }, [lInnovationData.eskoAccountDetail]);

    useEffect(() => {
        const lArchivedReleaseList: string[] = [];
        archivedReleases.forEach((release: ReleaseModel) => {
            lArchivedReleaseList.push(release.nodeId);
        })
        setArchivedReleasesList(lArchivedReleaseList);
    }, [archivedReleases])

    useEffect(() => {
        const lArchivedMilestoneList: string[] = [];

        milestonesChapterProps.businessGoalData.releaseTimelineData.forEach((releaseTimeline: ReleaseTimelineModel) => {
            if (0 <= archivedReleasesList.indexOf(releaseTimeline.releaseNodeId)) {
                lArchivedMilestoneList.push(...releaseTimeline.milestones);
            }
        })
        setArchivedMilestones(lArchivedMilestoneList);
    }, [milestonesChapterProps.businessGoalData]);

    const handleAddMilestoneButtonClick = (evt: any) => {
        evt.preventDefault();
        const duplicateMilestonesArray = [...milestonesChapterProps.businessGoalData.milestones];
        duplicateMilestonesArray[milestonesChapterProps.businessGoalData.milestones.length] = {
            milestoneId: generateRandomUUID(),
            milestoneName: ""
        };
        milestonesChapterProps.setBusinessGoalData({
            ...milestonesChapterProps.businessGoalData,
            milestones: duplicateMilestonesArray
        });
    };

    const handleChange = (evt: any, index: number) => {
        evt.preventDefault();
        const duplicateMilestonesArray = [...milestonesChapterProps.businessGoalData.milestones];
        if ("" !== evt.target.value.trim()) {
            duplicateMilestonesArray[index].milestoneName = evt.target.value;
        }

        milestonesChapterProps.setBusinessGoalData({
            ...milestonesChapterProps.businessGoalData,
            milestones: duplicateMilestonesArray
        });
        if (milestonesChapterProps.duplicateMilestoneIndices.length > 0) {
            milestonesChapterProps.formValid();
        }
    };

    const handleBlur = (evt: any, index: number) => {
        evt.preventDefault();
        const duplicateMilestonesArray = [...milestonesChapterProps.businessGoalData.milestones];
        duplicateMilestonesArray[index].milestoneName = duplicateMilestonesArray[index].milestoneName.trim();

        milestonesChapterProps.setBusinessGoalData({
            ...milestonesChapterProps.businessGoalData,
            milestones: duplicateMilestonesArray
        });
        if (milestonesChapterProps.duplicateMilestoneIndices.length > 0) {
            milestonesChapterProps.formValid();
        }
    };

    const handleDeleteMilestone = (evt: any, index: number, milestone: MilestoneModel) => {
        evt.preventDefault();
        // remove milestones from milestones list
        const duplicateMilestonesArray = [...milestonesChapterProps.businessGoalData.milestones];
        duplicateMilestonesArray.splice(index, 1);
        // remove milestones from release time line data
        const releaseTimelineData = [...milestonesChapterProps.businessGoalData.releaseTimelineData];
        releaseTimelineData.forEach((releaseTimeLine: ReleaseTimelineModel) => {
            const milestoneIndex: number = releaseTimeLine.milestones.indexOf(milestone.milestoneId);
            if (-1 !== milestoneIndex) {
                releaseTimeLine.milestones.splice(milestoneIndex, 1);
            }
        });

        milestonesChapterProps.setBusinessGoalData({
            ...milestonesChapterProps.businessGoalData,
            milestones: duplicateMilestonesArray,
            releaseTimelineData: releaseTimelineData
        });
        if (milestonesChapterProps.duplicateMilestoneIndices.length > 0 &&
            undefined !== milestonesChapterProps.duplicateMilestoneIndices.find(duplicateIndex => duplicateIndex === index)) {
            const indexofelement: number = milestonesChapterProps.duplicateMilestoneIndices.indexOf(index);

            milestonesChapterProps.duplicateMilestoneIndices.splice(indexofelement, 1);
            const duplicateIndicesArray = [...milestonesChapterProps.duplicateMilestoneIndices];
            milestonesChapterProps.setDuplicateMilestoneIndices(duplicateIndicesArray);
        }
    };

    return (
        <AccordionDetails>
            <Grid container spacing={1} direction="column" className={MilestonesChapterStyleClasses.milestoneChapterContainer}>
                <Grid container direction="column" spacing={1} item className={MilestonesChapterStyleClasses.milestones}>
                    {
                        milestonesChapterProps.businessGoalData.milestones.map((milestone: MilestoneModel, index: number) => (
                            <Grid item container className={MilestonesChapterStyleClasses.milestoneRow}>
                                <Grid item className={MilestonesChapterStyleClasses.milestoneInputFieldContainer}>
                                    {
                                        (milestonesChapterProps.duplicateMilestoneIndices.some((duplicateMilestoneIndex: number) => duplicateMilestoneIndex === index)) ?
                                            <InputTextField
                                                handleInput={(evt: any) => handleChange(evt, index)}
                                                handleBlur={(evt: any) => handleBlur(evt, index)}
                                                hasLabel={false}
                                                isEmpty={false}
                                                maxCharactersAllowed={32}
                                                isBlockCharacterEntry={true}
                                                value={milestone.milestoneName}
                                                name={milestone.milestoneName}
                                                disabled={-1 !== archivedMilestones.indexOf(milestone.milestoneId)}
                                                isMandatory={false}
                                                key={index}
                                                doesAlreadyExist={true}
                                                alreadyExistsText="Duplicate Milestones not allowed"
                                                isShowMaxCharactersAllowedErrorMsg={true} /> :

                                            <InputTextField
                                                handleInput={(evt: any) => handleChange(evt, index)}
                                                handleBlur={(evt: any) => handleBlur(evt, index)}
                                                hasLabel={false}
                                                isEmpty={false}
                                                maxCharactersAllowed={32}
                                                disabled={-1 !== archivedMilestones.indexOf(milestone.milestoneId)}
                                                isBlockCharacterEntry={true}
                                                value={milestone.milestoneName}
                                                name={milestone.milestoneName}
                                                isMandatory={false}
                                                key={index}
                                                isShowMaxCharactersAllowedErrorMsg={true} />
                                    }
                                </Grid>
                                <Tooltip title={-1 !== archivedMilestones.indexOf(milestone.milestoneId) ? "Milestone present in Archived Release" : "Delete Milestone"} placement="right" arrow>
                                    <Grid item className={MilestonesChapterStyleClasses.deleteButtonContainer}>
                                        <IconButton disabled={-1 !== archivedMilestones.indexOf(milestone.milestoneId)} onClick={(evt: any) => handleDeleteMilestone(evt, index, milestone)}>
                                            <DeleteForeverRoundedIcon
                                                color="action"
                                                className={-1 !== archivedMilestones.indexOf(milestone.milestoneId) ? MilestonesChapterStyleClasses.disableDeleteButton : MilestonesChapterStyleClasses.enabledDeleteButton} />
                                        </IconButton>
                                    </Grid>
                                </Tooltip>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item>
                    <Button
                        disabled={!isMilestoneTextFieldEmpty}
                        onClick={handleAddMilestoneButtonClick}
                        className={MilestonesChapterStyleClasses.addMilestoneButton}
                        variant="outlined">{"+ Add Milestone"}
                    </Button>
                </Grid>
            </Grid>
        </AccordionDetails>
    )
}