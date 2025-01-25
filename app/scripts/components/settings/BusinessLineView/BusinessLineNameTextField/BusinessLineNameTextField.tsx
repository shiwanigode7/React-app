import { TextField, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BusinessLineNameTextFieldModel } from "./BusinessLineNameTextFieldModel";
import { BusinessLineNameTextFieldStyles } from "./BusinessLineNameTextFieldStyles";

export function BusinessLineNameTextField(businessLineNameTextFieldProps: BusinessLineNameTextFieldModel) {

    const businessLineNameTextFieldClasses = BusinessLineNameTextFieldStyles();

    let textFieldReference: HTMLInputElement | null = null;

    const [openTooltip, setOpenToolTip] = useState<boolean>(false);
    const [fieldValue, setFieldValue] = useState<string>(businessLineNameTextFieldProps.value);

    const handleTextFieldValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const lHoldLatestStringValue: string = event.target.value;
        if (lHoldLatestStringValue.indexOf("/") >= 0 ||
            lHoldLatestStringValue.indexOf("#") >= 0 ||
            lHoldLatestStringValue.indexOf("\\") >= 0
        ) {
            setOpenToolTip(true);
        } else {
            setOpenToolTip(false);
            setFieldValue(event.target.value);
        }
    };

    /**
     * Function to enable and disable the click event.
     * @param isEnabled - If false the click event is disabled
     */
    const handleClickEvent = (isEnabled: boolean) => {
        document.addEventListener("click", (clickEvent: MouseEvent) => {
            if (!isEnabled) {
                clickEvent.stopPropagation();
                clickEvent.preventDefault();
            }
        }, true);
    };

    /**Function called when user clicks outside the textfield */
    const handleBlurEvent = () => {
        setOpenToolTip(false);

        if (null !== textFieldReference &&
            0 === businessLineNameTextFieldProps.value.trim().length &&
            0 === fieldValue.trim().length
        ) {
            textFieldReference.focus();
            handleClickEvent(false);
            businessLineNameTextFieldProps.onEmptyValueCallback();
        } else if (0 === fieldValue.trim().length) {// If the field is empty and earlier there was a value, then reset to original value
            handleClickEvent(true);
            businessLineNameTextFieldProps.onEmptyValueCallback();
            setFieldValue(businessLineNameTextFieldProps.value);
        }
        else {
            handleClickEvent(true);
            businessLineNameTextFieldProps.onBlur(fieldValue.trim(), businessLineNameTextFieldProps.fieldId);
        }
    };

    useEffect(() => {
        setFieldValue(businessLineNameTextFieldProps.value);
        // if the value is empty focus the textfield
        if (0 === businessLineNameTextFieldProps.value.trim().length &&
            null !== textFieldReference
        ) {
            textFieldReference.focus();
        }
    }, [businessLineNameTextFieldProps]);

    return (
        <Tooltip
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={`Business Line name cannot contain "\\" "/" and "#".`}
            open={openTooltip}
            arrow
            placement="right"
            classes={{
                tooltipPlacementRight: businessLineNameTextFieldClasses.tooltip,
                tooltipPlacementLeft: businessLineNameTextFieldClasses.tooltip
            }}
        >
            <TextField
                variant="outlined"
                fullWidth
                required
                error={(businessLineNameTextFieldProps.value.length >= businessLineNameTextFieldProps.maxCharacters)}
                InputProps={{
                    classes: {
                        notchedOutline: businessLineNameTextFieldClasses.fieldNotchedOutline,
                        root: businessLineNameTextFieldClasses.fieldOutlineRoot,
                        error: businessLineNameTextFieldClasses.fieldOutlineError,
                        input: businessLineNameTextFieldClasses.fieldInput
                    }
                }}
                // TODO: Reason for inline styling is to avoid declaring makeStyles props that won't be used
                // to avoid code smells
                style={{
                    height: "38px"
                }}
                inputProps={{
                    maxLength: businessLineNameTextFieldProps.maxCharacters,
                    ref: (textField: HTMLInputElement | null) => { textFieldReference = textField }
                }}
                FormHelperTextProps={{
                    classes: {
                        contained: businessLineNameTextFieldClasses.fieldHelperText
                    }
                }}
                helperText={(businessLineNameTextFieldProps.maxCharacters === fieldValue.length &&
                    businessLineNameTextFieldProps.errorLabel)}
                value={fieldValue}
                onChange={handleTextFieldValueChange}
                onBlur={() => { handleBlurEvent() }}
                title={fieldValue}
            />
        </Tooltip>
    );
}