import { makeStyles } from "@material-ui/core";
import { BORDER_GRAPHITE_5_OPACITY_02, COLOR_GRAPHITE_5 } from "../constant/Colors";

declare interface ThemeProps {
    isMeetingAvailable?: boolean;
}

export const PPGPresentationStyles = makeStyles(() => ({
    root: {
        height: "98%",
        minWidth: "1000px"
    },
    investmentGrid: {
        width: "49%"
    },
    gridRootContainer: {
        height: "74%",
        display: "flex",
        justifyContent: "space-between"
    },
    bottomGirdContainer: {
        height: "33%",
        display: "flex",
        justifyContent: "space-between"
    },
    bottomGrid: {
        width: "24%"
    },
    firstGrid: {
        width: "30%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    secondGrid: {
        width: "68%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    upcomingMeetingGrid: {
        height: "23%"
    },
    coreTeamGrid: {
        height: "70%"
    },
    runwaysGrid: {
        height: "38%"
    },
    healthAndRecycleGrid: {
        height: "35%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    healthGrid: {
        width: "59%"
    },
    recycleGrid: {
        width: "39%"
    },
    releaseGrid: {
        height: "60%",
        width: "100%"
    },
    investmentAndEbitGrid: {
        height: "33%",
        flexDirection: "row",
        justifyContent: "space-between",
        display: "flex"
    },
    bodyGridRoot: {
        height: "60%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "16px",
    },
    divider: {
        backgroundColor: COLOR_GRAPHITE_5,
        opacity: "0.8",
        margin: "0px",
        marginTop: "2px"
    },
    meetingRootCard: (themeProps: ThemeProps) => ({
        border: `1px solid ${BORDER_GRAPHITE_5_OPACITY_02}`,
        width: "100%",
        height: "100%",
        minHeight: themeProps.isMeetingAvailable ? "75%" : "20%"
    }),
    cardcontent: {
        padding: 0,
        "&:last-child": {
            paddingBottom: "10px"
        },
        paddingLeft: "30px",
        paddingTop: "3%"
    },
    cardContentMeetingDate: {
        alignContent: "space-between",
        display: "flex",
        flexDirection: "row"
    },
    cardContentMeetingDateIcon: {
        color: 'grey',
        fontSize: "35px",
        paddingTop: "4px"
    },
    cardContentMeetingDateText: {
        fontSize: "25px",
        fontWeight: "bold",
        marginLeft: "10px",
        marginRight: "20px",
        paddingTop: "4px"
    },
    cardContentMeetingLabel: {
        marginLeft: "3vh",
        marginTop: "4px",
        fontSize: "23px",
        color: "GrayText"
    },
    bodyRunwayGrid: {
        height: "150px",
        maxHeight: "150px",
        width: "37%"
    },
    bodyInvestmentAndScoresGrid: {
        height: "150px",
        maxHeight: "150px",
        marginLeft: "30px",
        width: "38%",
    },
    bodyInvestmentProfitGrid: {
        height: "150px",
        maxHeight: "150px",
        marginLeft: "40px",
        width: "46%",
    },
    recurringRatio: {
        fontSize: "48px",
        fontWeight: "bold"
    },
    finalGrid: {
        display: "flex",
        flexDirection: "row"
    },
    rootGrid: {
        width: "100%",
        height: "98%"
    },
    bodyRootGrid: {
        width: "100%",
        height: "65%"
    },
    bodyMeetingCoreRootGrid: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%"
    },
    bodyMeetingCoreGrid: {
        display: "flex",
        flexDirection: "column",
        width: "42%",
        height: "100%"
    },
    meetingGrid: {
        width: "100%",
        height: "20%"
    },
    healthTimelineReleaseRootGrid: {
        display: "flex",
        flexDirection: "column",
        height: "95%",
        width: "100%"
    },
    parentDivision: {
        display: "flex",
        flexDirection: "column",
        height: "70%",
        marginTop: "20px"
    },
    healthReleaseRootGrid: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%"
    },
    releaseTimelineGrid: {
        marginLeft: "35px",
        marginTop: "18px",
        width: "97%"
    },
    runwayEbitRevenueRootGrid: {
        display: "flex",
        flexDirection: "row",
        height: "30%"
    },
    meetingTypography: {
        paddingTop: "5px",
        paddingBottom: "12px",
        fontSize: "15px",
        textAlign: "center"
    }
}
));
