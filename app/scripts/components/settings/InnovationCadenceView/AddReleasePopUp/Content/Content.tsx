import React from "react";
import ContentModel from "./ContentModel";
import { ContentStyles } from "./ContentStyles";
import { DialogContent, Grid } from "@material-ui/core";
import InputTextField from "../../../../utils/InputFields/InputTextField/InputTextField";
import DatePickerField from "../../../../utils/InputFields/DatePickerField/DatePickerField";

export default function Content(contentProps: ContentModel) {
  const contentStyleClasses = ContentStyles();

  return (
    <DialogContent>
      <Grid container direction="column" spacing={2} className={contentStyleClasses.contentContainer} >
        {undefined !== contentProps.inputTextField &&
          <Grid item>
            <InputTextField
              hasLabel={contentProps.inputTextField.hasLabel}
              label={contentProps.inputTextField.label}
              isMandatory={contentProps.inputTextField.isMandatory}
              name={contentProps.inputTextField.name}
              defaultValue={contentProps.inputTextField.defaultValue}
              handleInput={contentProps.inputTextField.handleInput}
              maxCharactersAllowed={contentProps.inputTextField.maxCharactersAllowed}
              isEmpty={contentProps.inputTextField.isEmpty}
              isBlockCharacterEntry={contentProps.inputTextField.isBlockCharacterEntry}
              isShowMaxCharactersAllowedErrorMsg={contentProps.inputTextField.isShowMaxCharactersAllowedErrorMsg} />
          </Grid>
        }

        {undefined !== contentProps.datePickerField &&
          <Grid item>
            <DatePickerField
              hasLabel={contentProps.datePickerField.hasLabel}
              label={contentProps.datePickerField.label}
              isMandatory={contentProps.datePickerField.isMandatory}
              name={contentProps.datePickerField.name}
              defaultValue={contentProps.datePickerField.defaultValue}
              handleInput={contentProps.datePickerField.handleInput}
              isEmpty={contentProps.datePickerField.isEmpty}
              doesAlreadyExist={contentProps.datePickerField.doesAlreadyExist} />
          </Grid>
        }

        {undefined !== contentProps.textAreaField &&
          <Grid item>
            <InputTextField
              isTextArea={true}
              hasLabel={contentProps.textAreaField.hasLabel}
              label={contentProps.textAreaField.label}
              name={contentProps.textAreaField.name}
              defaultValue={contentProps.textAreaField.defaultValue}
              minRows={contentProps.textAreaField.minRows}
              maxRows={contentProps.textAreaField.maxRows}
              maxCharactersAllowed={contentProps.textAreaField.maxCharactersAllowed}
              isMandatory={contentProps.textAreaField.isMandatory}
              handleInput={contentProps.textAreaField.handleInput}
              isEmpty={contentProps.textAreaField.isEmpty}
              isBlockCharacterEntry={contentProps.textAreaField.isBlockCharacterEntry}
              isShowMaxCharactersAllowedErrorMsg={contentProps.textAreaField.isShowMaxCharactersAllowedErrorMsg} />
          </Grid>
        }
      </Grid>
    </DialogContent>
  )
}