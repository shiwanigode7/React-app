import React from "react";
import { TextField } from "@material-ui/core";
import { NumberTypeInputFieldModel } from "./BusinessCaseInputFieldsModel";
import { BusinessCaseInputFieldsStyles } from "./BusinessCaseInputFieldsStyles";

export default function NumberTypeInputField(numberTypeInputFieldProps: NumberTypeInputFieldModel) {
  const businessCaseInputFieldsStyleClasses = BusinessCaseInputFieldsStyles();

  const handleKeyDown = (evt: any) => {
    if ("." === evt.key || "-" === evt.key || "+" === evt.key) {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }
    if (evt.target.value.length > numberTypeInputFieldProps.maxDigitsAllowed) {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }
  };

  const handleChange = (evt: any) => {
    if (evt.target.value > numberTypeInputFieldProps.maxNumberAllowed) {
      evt.target.value = numberTypeInputFieldProps.maxNumberAllowed;
    }
  };

  return (
    <TextField
      variant="outlined"
      name={numberTypeInputFieldProps.name}
      defaultValue={numberTypeInputFieldProps.defaultValue}
      value={numberTypeInputFieldProps.value}
      type="number"
      fullWidth
      onKeyDown={handleKeyDown}
      onBlur={numberTypeInputFieldProps.handleBlur}
      onChange={handleChange}
      className={businessCaseInputFieldsStyleClasses.displayTextFieldArrows}
      inputProps={
        {
          min: numberTypeInputFieldProps.minNumberAllowed,
          max: numberTypeInputFieldProps.maxNumberAllowed
        }
      }
      InputProps={{
        classes: {
          root: businessCaseInputFieldsStyleClasses.root,
          multiline: businessCaseInputFieldsStyleClasses.multiline,
          input: numberTypeInputFieldProps.isStartAdornmentVisible ?
            businessCaseInputFieldsStyleClasses.inputFieldWithSAPositiveValue :
            businessCaseInputFieldsStyleClasses.inputFieldWithoutSA,
          notchedOutline: businessCaseInputFieldsStyleClasses.notchedOutline,
          adornedStart: businessCaseInputFieldsStyleClasses.adornedStart
        },
        startAdornment: numberTypeInputFieldProps.isStartAdornmentVisible ? (
          <p className={businessCaseInputFieldsStyleClasses.startAdornmentText}>
            {numberTypeInputFieldProps.startAdornmentText}
          </p>
        ) : null,
        inputProps: {
          min: numberTypeInputFieldProps.minNumberAllowed,
          max: numberTypeInputFieldProps.maxNumberAllowed,
          pattern: "[0-9]*"
        }
      }} />
  )
}