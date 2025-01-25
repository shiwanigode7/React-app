import React from "react";
import TextAreaFieldModel from "./TextAreaFieldModel";
import { TextField, Typography } from "@material-ui/core";
import Asterisk from "../../Asterisk/Asterisk";
import { ThemeProvider } from "@material-ui/styles";
import { OutlinedInputTheme, TextAreaFieldStyles } from "./TextAreaFieldStyles";

export default function TextAreaField(textAreaFieldProps: TextAreaFieldModel) {
  const textAreaFieldStyleClasses = TextAreaFieldStyles();

  return (
    <ThemeProvider theme={OutlinedInputTheme}>
      {(textAreaFieldProps.hasLabel) &&
        <Typography>
          {textAreaFieldProps.label} {textAreaFieldProps.isMandatory && <Asterisk />}
        </Typography>
      }
      <TextField
        variant="outlined"
        name={textAreaFieldProps.name}
        value={textAreaFieldProps.value}
        defaultValue={textAreaFieldProps.defaultValue}
        fullWidth
        multiline
        autoComplete="off"
        onChange={textAreaFieldProps.handleInput}
        onBlur={textAreaFieldProps.handleBlur}
        minRows={textAreaFieldProps.minRows}
        maxRows={textAreaFieldProps.maxRows}
        inputProps={textAreaFieldProps.isBlockCharacterEntry &&
          textAreaFieldProps.maxCharactersAllowed ?
          { maxLength: textAreaFieldProps.maxCharactersAllowed, className: textAreaFieldStyleClasses.textarea } :
          { className: textAreaFieldStyleClasses.textarea }}
        error={(textAreaFieldProps.value !== undefined && textAreaFieldProps.isShowMaxCharactersAllowedErrorMsg
          && textAreaFieldProps.value.length === textAreaFieldProps.maxCharactersAllowed) ||
          (textAreaFieldProps.defaultValue !== undefined && textAreaFieldProps.isShowMaxCharactersAllowedErrorMsg
            && textAreaFieldProps.defaultValue.length === textAreaFieldProps.maxCharactersAllowed)}
        helperText={
          ((textAreaFieldProps.value && textAreaFieldProps.isShowMaxCharactersAllowedErrorMsg
            && textAreaFieldProps.value.length === textAreaFieldProps.maxCharactersAllowed)
            && `Maximum limit is ${textAreaFieldProps.maxCharactersAllowed} characters`) ||
          ((textAreaFieldProps.defaultValue && textAreaFieldProps.isShowMaxCharactersAllowedErrorMsg
            && textAreaFieldProps.defaultValue.length === textAreaFieldProps.maxCharactersAllowed)
            && `Maximum limit is ${textAreaFieldProps.maxCharactersAllowed} characters`)} />
    </ThemeProvider>
  )
}
