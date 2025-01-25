/**TSX file listing all the table theme used in Innovation Application */

import { LightTheme } from "@esko/cloud-ui-components/dist/esm";
import { createMuiTheme, makeStyles } from "@material-ui/core";

/**Theme for the table and the paper container around the table */
export const TableWrapperTheme = createMuiTheme({
    overrides: {
        ...LightTheme.overrides,
        MuiPaper: {
            root: {
                width: "auto",
                padding: 10,
                margin: 10,
                overflow: "hidden",
            }
        },
        MuiTableContainer: {
            root: {
                maxHeight: "100%",
                minHeight: "100%"
            }
        }
    }
});

/**User badge theme */
export const EskoUserBadgeTheme = makeStyles((theme:any)=>({
    userBadgeClass : {
        marginRight: "30px",
    },
}));

/**Risk Score Avatar theme */
export const RiskScoreAvatarTheme = makeStyles((theme:any)=>({
    riskScoreClass : {
        width:'40px', 
        height:'40px', 
        fontSize:'16px'
    },
}));

/**Theme for the scroll bar */
export const ScrollBarTheme = makeStyles((theme: any) => ({

    ScrollBarClass: {
        /**Width */
        "&::-webkit-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        /* Track */
        "&::-webkit-scrollbar-track": {
            background: "#edeeef",
            borderRadius: "10px",
        },
        /**Handle */
        "&::-webkit-scrollbar-thumb": {
            background: "#c4c4c4",
            borderRadius: "10px"
        },
        /**Changes for mozilla */
        /**Width */
        "&::-ms-scrollbar": {
            width: "10px",
            height: "20px",
            border: "bold"
        },
        /* Track */
        "&::-ms-scrollbar-track": {
            boxShadow: "inset 0 0 5px #edeeef",
            borderRadius: "10px",
        },
        /**Handle */
        "&::-moz-scrollbar-thumb": {
            background: "#e5e5e5",
            borderRadius: "10px"
        },
        scrollbarColor: "black",
        scrollBarWidth: "thin"
    }

}));