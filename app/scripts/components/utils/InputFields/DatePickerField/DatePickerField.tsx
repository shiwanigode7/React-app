import { TextField, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import Asterisk from "../../Asterisk/Asterisk";
import DatePickerFieldModel from "./DatePickerFieldModel";
import { OutlinedInputTheme } from "../FieldStyles";

export default function DatePickerField(datePickerFieldProps: DatePickerFieldModel) {

  return (
    <ThemeProvider theme={OutlinedInputTheme}>
      {datePickerFieldProps.hasLabel &&
        <Typography>
          {datePickerFieldProps.label} {datePickerFieldProps.isMandatory && <Asterisk />}
        </Typography>
      }
      <TextField
        variant={"outlined"}
        type={"date"}
        name={datePickerFieldProps.name}
        defaultValue={datePickerFieldProps.defaultValue}
        onChange={datePickerFieldProps.handleInput}
        autoComplete="off"
        onBlur={datePickerFieldProps.handleBlur}
        error={datePickerFieldProps.isEmpty || datePickerFieldProps.doesAlreadyExist}
        helperText={(datePickerFieldProps.isEmpty && "This field is required") || (datePickerFieldProps.doesAlreadyExist && "Date already exists")} />
    </ThemeProvider>
  )
}