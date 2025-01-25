import React from "react";
import { InvisibleInputTextFieldStyles } from "./InvisibleInputTextFieldStyles";
import { InputAdornment, TextField, Typography } from "@material-ui/core";
import InvisibleInputTextFieldModel from "./InvisibleInputTextFieldModel";

export default function InvisibleInputTextField(invisibleInputTextFieldProps: InvisibleInputTextFieldModel) {
  const invisibleInputTextFieldStyleClasses = InvisibleInputTextFieldStyles();

  return (
    <TextField
      type="text"
      id="outlined-basic"
      variant="outlined"
      disabled={invisibleInputTextFieldProps.disabled ? invisibleInputTextFieldProps.disabled : false}
      key={invisibleInputTextFieldProps.defaultValue ? "notLoadedYet" : "loaded"}
      name={invisibleInputTextFieldProps.name}
      defaultValue={invisibleInputTextFieldProps.defaultValue}
      value={invisibleInputTextFieldProps.value}
      onChange={invisibleInputTextFieldProps.handleInput}
      autoComplete="off"
      onBlur={invisibleInputTextFieldProps.handleBlur}
      inputProps={{
        maxLength: invisibleInputTextFieldProps.maxCharactersAllowed,
        style: {
          backgroundColor: invisibleInputTextFieldProps.backgroundColor,
          color: invisibleInputTextFieldProps.color
        }
      }}
      InputProps={{
        endAdornment: invisibleInputTextFieldProps.isPercentageView && invisibleInputTextFieldProps.value ? <InputAdornment className={invisibleInputTextFieldStyleClasses.endAdornment} position="start">
          <Typography className={invisibleInputTextFieldStyleClasses.percentageText}>{"%"}</Typography></InputAdornment> : undefined,
        classes: {
          root: invisibleInputTextFieldStyleClasses.root,
          multiline: invisibleInputTextFieldStyleClasses.multiline,
          input: invisibleInputTextFieldStyleClasses.input,
          notchedOutline: invisibleInputTextFieldStyleClasses.notchedOutline,
          disabled: invisibleInputTextFieldStyleClasses.disabled
        }
      }} />
  )
}