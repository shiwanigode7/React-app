import { Accordion, AccordionDetails, styled, ThemeProvider, Typography } from '@material-ui/core';
import MuiAccordionSummary, { AccordionSummaryProps } from '@material-ui/core/AccordionSummary';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import React from 'react';
import { UserListWithEmailModel } from '../interfaces/InnovationInterface';
import BusinessCaseChapter from './chapters/BusinessCaseChapter/BusinessCaseChapter';
import GeneralChapter from './chapters/GeneralChapter/GeneralChapter';
import IPChapter from './chapters/IPChapter/IPChapter';
import MilestonesChapter from './chapters/MilestonesChapter/MilestonesChapter';
import RiskProfileChapter from './chapters/RiskProfileChapter/RiskProfileChapter';
import SlidesChapter from './chapters/SlidesChapter/SlidesChapter';
import { BusinessGoalType } from './MPLView';
import { AccordionTheme } from './theme';

/**Interface class to define the type of props*/
export interface BGChaptersProps {
    isFormInvalid: boolean;
    setIsFormInvalid: (isFormInvalid: boolean) => void;
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
    duplicateMilestoneIndices: number[];
    setDuplicateMilestoneIndices: React.Dispatch<React.SetStateAction<number[]>>;
    formValid: () => void;
    bgNodePath: string;
    usersList: UserListWithEmailModel[];
    updateSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
    replaceSlidesInBG: (slideId: string, fileName: string, fileBlob: File) => void;
    deleteSlidesInBG: (bgNodePathToDeleteSlide: string, slideIdToDelete: string, slideNameToDeleteInPptLstToUpload: string) => void;
    slideRejectedFilesCallback: () => void;
}

/**Styling accordion Summary to have a proper backgroundColor and Expandable Icon*/
export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowRightRoundedIcon fontSize="large" style={{ color: "black" }} />}
        {...props}
    />
))(() => ({
    backgroundColor: '#E3E4E5',
    fontWeight: 'bold',
    flexDirection: 'row-reverse',
}));

/**BusinessGoalChapter functional component to return the Collapsible chapters and its contents  */
export default function BusinessGoalChapter(props: BGChaptersProps) {

    return (
        <div>
            <ThemeProvider theme={AccordionTheme}>
                <Accordion defaultExpanded>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>
                            General
                        </Typography>
                    </AccordionSummary>
                    <GeneralChapter
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData}
                        setIsFormInvalid={props.setIsFormInvalid}
                        isFormInvalid={props.isFormInvalid}
                        bgNodePath={props.bgNodePath}
                        usersList={props.usersList}
                    />
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>Risk Profile</Typography>
                    </AccordionSummary>
                    <RiskProfileChapter
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData} />
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>Business Case</Typography>
                    </AccordionSummary>
                    <BusinessCaseChapter
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData} />
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>IP</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ maxHeight: "300px", height: "fit-content" }}>
                        <IPChapter
                            businessGoalData={props.businessGoalData}
                            setBusinessGoalData={props.setBusinessGoalData}
                            setIsFormInvalid={props.setIsFormInvalid}
                            isFormInvalid={props.isFormInvalid}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>Milestones</Typography>
                    </AccordionSummary>
                    <MilestonesChapter
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData}
                        duplicateMilestoneIndices={props.duplicateMilestoneIndices}
                        setDuplicateMilestoneIndices={props.setDuplicateMilestoneIndices}
                        formValid={props.formValid} />
                </Accordion>
                <Accordion>
                    <AccordionSummary>
                        <Typography style={{ fontSize: '16px', fontWeight: 'bold', color: "#22262A" }}>Slides</Typography>
                    </AccordionSummary>
                    <SlidesChapter
                        businessGoalName={props.businessGoalData.businessGoalName}
                        slides={props.businessGoalData.slides}
                        businessGoalData={props.businessGoalData}
                        setBusinessGoalData={props.setBusinessGoalData}
                        updateSlidesInBG={props.updateSlidesInBG}
                        deleteSlidesInBG={props.deleteSlidesInBG}
                        replaceSlidesInBG={props.replaceSlidesInBG}
                        slideRejectedFilesCallback={props.slideRejectedFilesCallback}
                    />
                </Accordion>

            </ThemeProvider>
        </div>
    );
}