import React from "react";
import { CircularProgress } from "@material-ui/core";
import { LoadingIconStyles } from "./LoadingIconStyles";

export default function LoadingIcon() {
    const loadingIconStyleClasses = LoadingIconStyles();

    return (
        <CircularProgress
            className={loadingIconStyleClasses.loadingIcon} />            
    )
}
