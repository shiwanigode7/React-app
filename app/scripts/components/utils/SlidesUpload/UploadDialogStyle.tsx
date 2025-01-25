import { makeStyles } from "@material-ui/core";
import { COLOR_GRAPHITE_1, COLOR_GREY_3 } from "../../../constant/Colors";

export const UploadDialogStyle = makeStyles({

    label: {
        fontSize: "16px",
        letterSpacing: "0.02rem"
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    titleRoot: {
        backgroundColor: COLOR_GREY_3
    },
    typographyStyles: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: COLOR_GRAPHITE_1
    },
    slidesTypography: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: COLOR_GRAPHITE_1,
        marginTop: "8px"
    },
    divider: {
        margin: '0'
    },
    loadingIcon: {
        color: "white",
        marginLeft: "8px"
    },
    dropdown: {
        width: "322px"
    },
    selectStyles: {
        width: "100%"
    }
})