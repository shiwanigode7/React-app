import React from "react";
import AddButtonModel from "./AddButtonModel";
import { AddButtonStyles } from "./AddButtonStyles";
import { Grid, Tooltip } from "@material-ui/core";
import images from "../../../../../Icons/images";

export default function AddButton(addButtonProps: AddButtonModel) {
    const AddButtonStyleClasses = AddButtonStyles();    

    return (           
        <Grid item >
            <Tooltip title={addButtonProps.tooltipTitle} placement="right" arrow>
                    <img src={images.AddButton} 
                        alt={addButtonProps.addButtonAltText} 
                        onClick={addButtonProps.handleAddButtonClick} 
                        className={AddButtonStyleClasses.addButton} />
            </Tooltip>
        </Grid>
    )
}