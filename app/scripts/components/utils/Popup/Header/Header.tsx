import React from "react";
import HeaderModel from "./HeaderModel";
import { HeaderStyles } from "./HeaderStyles";
import { DialogTitle, Grid, IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

export default function Header(headerProps: HeaderModel) {
  const headerStyleClasses = HeaderStyles();

  return (
    <DialogTitle className={headerStyleClasses.dialogTitle}>
      <Grid container spacing={0} direction="row" className={headerStyleClasses.headerContainer}>
        <Grid item xs={6} md={8} className={headerStyleClasses.title}>
          {headerProps.titleText}
        </Grid>
        <Grid item xs={6} md={4} style={{ flexBasis: "auto" }} >
          <IconButton onClick={headerProps.handleCloseButtonClick} >
            <CloseRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>
  )
}