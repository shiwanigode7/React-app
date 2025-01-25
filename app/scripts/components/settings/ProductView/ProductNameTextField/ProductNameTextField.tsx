import { TextField, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ProductNameTextFieldModel } from "./ProductNameTextFieldModel";
import { ProductNameTextFieldStyles } from "./ProductNameTextFieldStyles";

export function ProductNameTextField(ProductNameTextFieldProps: ProductNameTextFieldModel) {

    const ProductNameTextFieldClasses = ProductNameTextFieldStyles();

    const [openTooltip, setOpenToolTip] = useState<boolean>(false);
    const [fieldValue, setFieldValue] = useState<string>(ProductNameTextFieldProps.value);

    const handleTextFieldValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const lHoldLatestStringValue: string = event.target.value;
        if (lHoldLatestStringValue.indexOf("/") >= 0 ||
            lHoldLatestStringValue.indexOf("#") >= 0 ||
            lHoldLatestStringValue.indexOf("\\") >= 0
        ) {
            setOpenToolTip(true);
        } else {
            ProductNameTextFieldProps.setIsFormValid(true);
            setOpenToolTip(false);
            setFieldValue(event.target.value);
        }
    };

    const handleBlurEvent = () => {
        setOpenToolTip(false);
        // If the field is empty reset the value
        if (0 === fieldValue.trim().length) {
            ProductNameTextFieldProps.onIncorrectValue();
            setFieldValue(ProductNameTextFieldProps.value);
        }
        else {
            ProductNameTextFieldProps.onBlur(fieldValue, ProductNameTextFieldProps.fieldId);
        }
    };

    useEffect(() => {
        setFieldValue(ProductNameTextFieldProps.value)
    }, [ProductNameTextFieldProps]);

    return (
        <Tooltip
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={`Product name cannot contain "\\" "/" and "#".`}
            open={openTooltip}
            arrow
            placement="right"
            classes={{
                tooltipPlacementRight: ProductNameTextFieldClasses.tooltip,
                tooltipPlacementLeft: ProductNameTextFieldClasses.tooltip
            }}
        >
            <TextField
                variant="outlined"
                fullWidth
                required
                error={(ProductNameTextFieldProps.value.length >= ProductNameTextFieldProps.maxCharacters) ||
                    (!ProductNameTextFieldProps.isFormValid && ProductNameTextFieldProps.isDialogField)
                }
                InputProps={{
                    classes: {
                        notchedOutline: ProductNameTextFieldClasses.fieldNotchedOutline,
                        root: ProductNameTextFieldClasses.fieldOutlineRoot,
                        error: ProductNameTextFieldClasses.fieldOutlineError,
                        input: ProductNameTextFieldClasses.fieldInput
                    }
                }}
                // NOTE: Reason for inline styling is to avoid declaring makeStyles props that won't be used
                // to avoid code smells
                style={{
                    height: !ProductNameTextFieldProps.isDialogField ?
                        "38px" : "100%"
                }}
                inputProps={{
                    maxLength: ProductNameTextFieldProps.maxCharacters
                }}
                FormHelperTextProps={{
                    classes: {
                        contained: ProductNameTextFieldClasses.fieldHelperText
                    }
                }}
                helperText={(ProductNameTextFieldProps.maxCharacters === fieldValue.length &&
                    ProductNameTextFieldProps.errorLabel) ||
                    ((!ProductNameTextFieldProps.isFormValid && ProductNameTextFieldProps.isDialogField) &&
                        ProductNameTextFieldProps.fieldRequiredLabel
                    )
                }
                value={fieldValue}
                onChange={handleTextFieldValueChange}
                onBlur={() => { handleBlurEvent() }}
                title={fieldValue}
            />
        </Tooltip>
    );
}