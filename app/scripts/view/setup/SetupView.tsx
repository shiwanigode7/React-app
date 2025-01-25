import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { Button, Grid, Snackbar, ThemeProvider, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/utils/Header/Header";
import { ALERT_SEVERITY } from "../../constant/InnovationEnums";
import { InnovationAppContext } from "../../context/InnovationAppContext";
import Links from "../../Links";
import SetupService from "../../services/service/SetupService";
import { SetupViewStyles } from "./SetupViewStyles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { AlertStyles } from "../../themes/MeetingsTheme";
import { Alert } from "@material-ui/lab";
import { ALERT_UPDATE_FAILED } from "../../constant/MeetingViewTexts";
import { BusinessGoalTableType, BusinessCaseUpdateType } from "../../interfaces/InnovationInterface";
import BusinessGoalService from "../../services/service/BusinessGoalService";
import BusinessCaseModel from "../chapters/BusinessCaseChapter/BusinessCaseModel";
import { calculateNPV } from "../MPLView";

export default function SetupView() {

    const SetupViewStyleClasses = SetupViewStyles();
    const AlertStyleClasses = AlertStyles();

    const lInnovationData = useContext(InnovationAppContext);

    /**Alert */
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertSeverity, setAlertSeverity] = useState<any>("");
    const [alertContent, setAlertContent] = useState<string>("");
    const ALERT_AUTO_HIDE_DURATION: number = 3000;

    const handleUpdate = () => {
        SetupService.innovationIndexMeetingNodes(lInnovationData.eskoAccountDetail.repoid)
            .then((indexResponse: any) => {
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(indexResponse.message);
            }).catch((indexError: any) => {
                console.log(indexError);
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            })
    };

    const updateNPVValue = (inBusinessGoalList: BusinessGoalTableType[]) => {
        let businessCaseUpdatedDataList: BusinessCaseUpdateType[] = []
        inBusinessGoalList.forEach((inBusinessGoalData: BusinessGoalTableType) => {
            const lNPVValue: number = calculateNPV(inBusinessGoalData.businessCaseData);
            if( inBusinessGoalData.businessCaseData.npvValue !== lNPVValue) {
                const lTempBusinessCaseData: BusinessCaseModel = {
                    ...inBusinessGoalData.businessCaseData,
                    npvValue: lNPVValue
                };
                const tempBusinessCaseUpdateData: BusinessCaseUpdateType = {
                    nodeId: inBusinessGoalData.nodeId,
                    businessCaseData: lTempBusinessCaseData
                }
                businessCaseUpdatedDataList = businessCaseUpdatedDataList.concat(tempBusinessCaseUpdateData);
            } 
        });
        if(0 !== businessCaseUpdatedDataList.length) {
            SetupService.innovationUpdateBusinessCaseNPV(lInnovationData.eskoAccountDetail.repoid, businessCaseUpdatedDataList)
            .then((updateResponse: any) => {
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.SUCCESS);
                setAlertContent(updateResponse.message);
            }).catch((indexError: any) => {
                console.log(indexError);
                setOpenAlert(true);
                setAlertSeverity(ALERT_SEVERITY.ERROR);
                setAlertContent(ALERT_UPDATE_FAILED);
            })
        } else {
            setOpenAlert(true);
            setAlertSeverity(ALERT_SEVERITY.SUCCESS);
            setAlertContent("All Business Goal's NPV values are updated");
        }
    }

    const handleBusinessGoalUpdate = () => {
        BusinessGoalService.innovationGetAllBusinessGoalList(lInnovationData.eskoAccountDetail.repoid)
            .then((businessGoalListResponse: BusinessGoalTableType[]) => {
                updateNPVValue(businessGoalListResponse);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        lInnovationData.userPermission.leftNav.isSettingEnabled ?
            <ThemeProvider theme={LightTheme}>
                <Grid container className={SetupViewStyleClasses.headerGridContainer}>
                    <Grid item className={SetupViewStyleClasses.headerGridItem}>
                        <Header currentPageHeading="System Update" />
                    </Grid>
                    <Grid container className={SetupViewStyleClasses.bodyGridContainer}>
                        <Grid container spacing={2} className={SetupViewStyleClasses.itemGridContainer}>
                            <Grid item>
                                <Typography className={SetupViewStyleClasses.typography}>Update Meetings</Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="contained" onClick={handleUpdate}>Update</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className={SetupViewStyleClasses.bodyGridContainer}>
                        <Grid container spacing={2} className={SetupViewStyleClasses.itemGridContainer}>
                            <Grid item>
                                <Typography className={SetupViewStyleClasses.typography}>Update Business Goals (NPV)</Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" variant="contained" onClick={handleBusinessGoalUpdate}>Update</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/**Snackbar to display the success/error popup */}
                <Snackbar
                    open={openAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={'top' + 'center'}
                    autoHideDuration={ALERT_AUTO_HIDE_DURATION}
                    onClose={() => setOpenAlert(false)}>
                    <Alert
                        icon={alertSeverity === ALERT_SEVERITY.SUCCESS ?
                            <CheckCircleOutlineIcon fontSize="medium" />
                            : <ErrorOutlineIcon fontSize="medium" />
                        }
                        severity={alertSeverity}
                        className={AlertStyleClasses.root}
                    >
                        {alertContent}
                    </Alert>
                </Snackbar>
            </ThemeProvider >
            : <Redirect to={Links.dashboard(lInnovationData.eskoAccountDetail.repoid)} />
    );
}