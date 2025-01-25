import { makeStyles, styled } from "@material-ui/core"
import MuiAccordionSummary, { AccordionSummaryProps } from '@material-ui/core/AccordionSummary';
import React from "react";
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import { COLOR_GRAPHITE_1, COLOR_GRAPHITE_2, COLOR_GREY_2 } from "../../constant/Colors";

export const ActionListStyles = makeStyles(({
    actionListTableGrid: {
        width: "98%",
        margin: "0px 10px"
    },
    accordionRoot: {
        padding: "0% 0%",
        maxWidth: "100%",
        width: "100%"
    },
    accordionDetailsRoot: {
        padding: "0"
    },
    accordionSummaryRoot: {
        margin: "0",
        maxHeight: "none"
    },
    accordionTitleText: {
        fontSize: "16px",
        fontWeight: "bold"
    },
    dateIcon: {
        color: COLOR_GRAPHITE_2,
        width: "auto",
        fontSize: "18px"
    },
    deleteIconButton: {
        padding: "2px"
    },
    deleteIcon: {
        height: "24px",
        width: "24px"
    },
    dateGrid: {
        background: COLOR_GREY_2,
        borderRadius: "3px",
        flexWrap: "nowrap"
    },
    dateIconGrid: {
        display: "flex",
        padding: "6px",
        alignContent: "center",
    },
    date: {
        fontSize: "14px",
        marginTop: "2px"
    },
    textTopic: {
        display: "flex",
        flexFlow: "noWrap",
        alignItems: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "initial"
    }
}));

export const ActionTableStyles = makeStyles(({
    paperStyles: {
        padding: "0",
        margin: "0"
    }
}));

export const ActionAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowRightRoundedIcon fontSize="large" style={{ color: COLOR_GRAPHITE_1 }} />}
        {...props}
    />
))(() => ({
    fontWeight: 'bold',
    flexDirection: 'row-reverse',
    padding: '0px 0px'
}));