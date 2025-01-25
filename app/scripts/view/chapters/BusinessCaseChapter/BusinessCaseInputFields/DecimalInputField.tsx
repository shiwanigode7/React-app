import { TextField } from "@material-ui/core";
import React from "react";
import { BusinessCaseInputFieldsStyles, floatInputStyle } from "./BusinessCaseInputFieldsStyles";

/**Interface to define the type of props*/
export interface IntegerInputFieldType {
    title: string;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


export default function DecimalInputField(props: IntegerInputFieldType) {
    /**Declare the styles */
    const inputFieldClass =  floatInputStyle();

    const businessCaseInputFieldsStyleClasses = BusinessCaseInputFieldsStyles();

    return (
      <TextField
        variant="outlined"
        name={props.title}
        value={props.value}
        type="number"
        fullWidth
        onBlur={(evt) => props.onBlur(evt)}
        onChange={(evt) => props.onChange(evt)}
        className={inputFieldClass.input}
        inputProps={
          {
            min: 0,
            max: 99,
            pattern: "[0-9]*"
          }
        }
        InputProps={{
          classes: {
            root: businessCaseInputFieldsStyleClasses.root,
            multiline: businessCaseInputFieldsStyleClasses.multiline,
            input: businessCaseInputFieldsStyleClasses.inputFieldWithoutSA,
            notchedOutline: businessCaseInputFieldsStyleClasses.notchedOutline,
            adornedStart: businessCaseInputFieldsStyleClasses.adornedStart
          }
        }} />
    )    
}