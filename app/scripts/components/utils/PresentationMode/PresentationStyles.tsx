import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { GridDirection, makeStyles } from "@material-ui/core";
import { COLOR_WHITE, COLOR_GRAPHITE_5, COLOR_GRAPHITE_1, COLOR_GRAPHITE_4, COLOR_GREY_AVATAR } from "../../../constant/Colors";
import { OwnerAvatarThemeProps } from "../../ReleaseView/BusinessGoal/ReleaseViewCard/CardHeader/CardHeaderModel";

export const GRID_DIRECTION_COLUMN: GridDirection = "column";
export const GRID_DIRECTION_ROW: GridDirection = "row";

export const PresentationStyles = makeStyles(() => ({
    root: {
        height: "98%",
        minWidth: "1000px"
    },
    headerGridRoot: {
        height: "25%",
        width: "100%",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        marginBottom: "16px",
        marginTop: "8px",
        minHeight: "150px",
    },
    headerBGThumbnailGrid: {
        width: "15%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    headerBGTitleDescriptionRootGrid: {
        width: "70%",
        display: "flex",
        justifyContent: "space-between",
        maxHeight: "100%"
    },
    headerBGOwnerGrid: {
        width: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    headerBGTitleGrid: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "calc(65%)"
    },
    descriptionTitleTypography: {
        fontWeight: "bold",
        fontSize: "16px"
    },
    descriptionTypography: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "14px"
    },
    headerBGUnitStatusGrid: {
        display: "inline-flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    headerBGTitleContainerGrid: {
        flexWrap: "nowrap",
        maxHeight: "30%",
        minHeight: "30%",
    },
    businessGoalTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        textTransform: "capitalize",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    businessUnitChip: {
        fontSize: "24px",
        color: COLOR_WHITE,
        background: COLOR_GRAPHITE_5,
        height: "100%",
        borderRadius: "20px"
    },
    headerBGDescriptionGrid: {
        maxHeight: "35%",
        minHeight: "35%",
    },
    bodyGridRoot: {
        height: "68%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "24px",
        minHeight: "300px"
    },
    bodyRunwayMilestoneGridRoot: {
        width: "30%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    bodyRunwayGrid: {
        height: "30%",
        maxHeight: "30%"
    },
    bodyMileStonesGrid: {
        height: "65%",
        maxHeight: "65%"
    },
    bodyInvestmentGridRoot: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    bodyScoreAndRatioGridRoot: {
        width: "15%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    bodyInvestmentAndScoresGrid: {
        height: "30%",
        maxHeight: "30%"
    },
    divider: {
        backgroundColor: COLOR_GRAPHITE_5,
        opacity: "0.2",
        margin: "0px"
    },
    tooltip: {
        background: COLOR_GRAPHITE_5,
        color: COLOR_WHITE,
        fontSize: "14px",
        margin: "0px",
        maxWidth: "80%",
        whiteSpace: "pre-line",
        wordBreak: "break-word"
    },
    tooltipPopper: {
        maxWidth: "80%",
        whiteSpace: "nowrap"
    },
    recurringRatio: {
        fontSize: "48px",
        fontWeight: "bold"
    },
    simplePayBackRootDiv: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    simplePayBackValue: {
        fontSize: "48px",
        fontWeight: "bold",
        color: COLOR_GRAPHITE_1,
        margin: 0
    },
    simplePayBackYearMonthLabel: {
        fontWeight: "normal",
        fontSize: "28px",
        color: COLOR_GRAPHITE_4,
        margin: 0,
        lineHeight: "1.6"
    }
}));


/**Styles for the owner */
export const PresentationOwnerStyles = makeStyles(() => ({
    avatar: (themeInput: OwnerAvatarThemeProps) => ({
        width: "75px",
        height: "75px",
        marginTop: "-1px",
        fontSize: "24px",
        color: LightTheme.palette.getContrastText(LightTheme.palette.getUserColor ?
            LightTheme.palette.getUserColor(themeInput.ownerFirstName.charAt(0) + themeInput.ownerLastName.charAt(0)) :
            LightTheme.palette.grey[400] || COLOR_GREY_AVATAR
        ),
        backgroundColor: LightTheme.palette.getUserColor ?
            LightTheme.palette.getUserColor(themeInput.ownerFirstName.charAt(0) + themeInput.ownerLastName.charAt(0)) :
            COLOR_GREY_AVATAR
    })
}));