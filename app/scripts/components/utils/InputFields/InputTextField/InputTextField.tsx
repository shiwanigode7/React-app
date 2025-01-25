import React, { useState } from "react";
import { OutlinedInputTheme } from "../FieldStyles";
import { TextField, Typography } from "@material-ui/core";
import InputTextFieldModel from "./InputTextFieldModel";
import Asterisk from "../../Asterisk/Asterisk";
import { ThemeProvider } from "@material-ui/styles";
import { TextAreaFieldStyles } from "../TextAreaField/TextAreaFieldStyles";

export default function InputTextField(inputTextFieldProps: InputTextFieldModel) {
  const textAreaFieldStyleClasses = TextAreaFieldStyles();

  const [inputValue, setInputValue] = useState<string | undefined>(inputTextFieldProps.value);

  const [inputDefaultValue, setDefaultInputValue] = useState<string | undefined>(inputTextFieldProps.defaultValue);

  //Function to set the value in the variable to check and display error message for maximum limit
  function handleMaxLimit(evt: any) {
    setInputValue(evt.target.value);
    setDefaultInputValue(evt.target.value);
  }

  return (
    <ThemeProvider theme={OutlinedInputTheme}>
      {inputTextFieldProps.hasLabel &&
        <Typography >
          {inputTextFieldProps.label} {inputTextFieldProps.isMandatory && <Asterisk />}
        </Typography>
      }
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder={inputTextFieldProps.placeholderText}
        fullWidth
        multiline={inputTextFieldProps.isTextArea}
        title={inputTextFieldProps.title}
        name={inputTextFieldProps.name}
        value={inputTextFieldProps.value}
        disabled={inputTextFieldProps.disabled ? inputTextFieldProps.disabled : false}
        defaultValue={inputTextFieldProps.defaultValue}
        onChange={inputTextFieldProps.handleInput}
        onInput={(evt: any) => handleMaxLimit(evt)}
        autoComplete="off"
        minRows={inputTextFieldProps.minRows}
        maxRows={inputTextFieldProps.maxRows}
        onBlur={inputTextFieldProps.handleBlur}
        error={inputTextFieldProps.isEmpty && inputTextFieldProps.isMandatory}
        helperText={
          (inputTextFieldProps.isEmpty && inputTextFieldProps.isMandatory && "This field is required") ||
          ((inputDefaultValue && inputTextFieldProps.isShowMaxCharactersAllowedErrorMsg &&
            inputDefaultValue.length === inputTextFieldProps.maxCharactersAllowed)
            && `Maximum limit is ${inputTextFieldProps.maxCharactersAllowed} characters`) ||
          ((inputValue && inputTextFieldProps.isShowMaxCharactersAllowedErrorMsg &&
            inputValue.length === inputTextFieldProps.maxCharactersAllowed)
            && `Maximum limit is ${inputTextFieldProps.maxCharactersAllowed} characters`) ||
          (inputTextFieldProps.doesAlreadyExist && `${inputTextFieldProps.alreadyExistsText}`)}
        inputProps={inputTextFieldProps.isBlockCharacterEntry &&
          inputTextFieldProps.maxCharactersAllowed ? { maxLength: inputTextFieldProps.maxCharactersAllowed, className: inputTextFieldProps.isTextArea ? textAreaFieldStyleClasses.textarea : undefined } :
          { className: inputTextFieldProps.isTextArea ? textAreaFieldStyleClasses.textarea : undefined }}
      />
    </ThemeProvider>
  )
}