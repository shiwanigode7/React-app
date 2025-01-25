import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_2, COLOR_GRAPHITE_4, COLOR_WHITE } from "../../../constant/Colors";

const LAYOUT_STYLE: Object = {
    backgroundColor: COLOR_GRAPHITE_2,
    color: COLOR_WHITE
};

export const InfoDialogStyles = makeStyles({
    layout: {
        ...LAYOUT_STYLE
    },
    dialogTitle: {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    closeIconButton: {
        position: 'absolute', 
        right: 8,
        top: 8
    },
    closeIcon: {
        color: COLOR_WHITE
    },
    dialogContent: {
        fontSize: '14px',
        whiteSpace: "pre-line"
    },
    list: {
        listStyleType: 'disc',
        margin: "0px 10px",
        padding: "2px 0px 4px 0px"
    },
    listItem: {
        display: "list-item",
        padding: "5px 0px"
    },
    divider: {
        background: COLOR_GRAPHITE_4,
        margin: "0"
    }
});