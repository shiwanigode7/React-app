import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DynamicTextEditStyles } from "./DynamicTextEditStyles";


declare interface DynamicTextEditType {
    /**The value to be displayed on render */
    currentTextValue: string;
    currentDataId: string;
    maxCharacters: number;
    errorLabel: string;
    /**The function to be called on change in the data */
    updateCallBackFunction: (inOldRunwayName: string, inNewRunwayName: string, inRunwayId: string) => void | any;
}

/**
 * Function the return a text field which call the update 
 * callback function after two second of any changes made
 * @param inputProps - Props of the type DynamicTextEditType
 * @returns 
 */
export function DynamicTextEdit(inputProps: DynamicTextEditType) {
    const DynamicTextEditClasses = DynamicTextEditStyles();
    /**State To remember the old name */
    const [runwayName, setRunwayName] = useState<string>(inputProps.currentTextValue)

    /**To track the changes */
    const handleRunwayNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        /**set the user typed value value */
        setRunwayName(event.target.value);
    }

    /**wait for two second for inactivity on the component */
    useEffect(() => {
        /**Get the timeout id buy using setting the time and instruction to be executed */
        const timeOutId = setTimeout(() => {
            if (runwayName !== inputProps.currentTextValue) {
                const hold = inputProps.updateCallBackFunction(inputProps.currentTextValue, runwayName, inputProps.currentDataId);
                /**if user entered value caused some error in the
                 * callback function, then reset the value of textfield
                 */
                if (hold !== undefined) {
                    hold.catch(() => {
                        setRunwayName(inputProps.currentTextValue);
                    });
                }
            }
        }, 2000);

        return (() => {
            /**Clear the timeout to make sure to update once for last changed
             * This is done to make sure that the instruction are executed only
             * once after there is an inactivity, because normally if we don't do 
             * this useEffect will execute the instruction for single character changes.
             */
            clearTimeout(timeOutId);
        });
    }, [runwayName]);

    return (
        <TextField
            variant="outlined"
            required
            fullWidth
            style={{ width: "100%" }}
            error={(runwayName.length >= inputProps.maxCharacters)}
            value={runwayName}
            InputProps={{
                classes: {
                    notchedOutline: DynamicTextEditClasses.fieldNotchedOutline,
                    root: DynamicTextEditClasses.fieldOutlineRoot,
                    error: DynamicTextEditClasses.fieldOutlineError,
                    input: DynamicTextEditClasses.fieldInput
                }
            }}
            onChange={handleRunwayNameChange}
            inputProps={{ maxLength: inputProps.maxCharacters }}
            FormHelperTextProps={{
                classes: {
                    contained: DynamicTextEditClasses.fieldHelperText
                }
            }}
            helperText={(inputProps.maxCharacters === runwayName.length && inputProps.errorLabel)
            }
        />
    );
}