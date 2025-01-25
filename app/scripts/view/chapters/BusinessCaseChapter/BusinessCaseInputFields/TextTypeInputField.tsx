import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { BusinessCaseInputFieldsStyles } from "./BusinessCaseInputFieldsStyles";
import { TextTypeInputFieldModel } from "./BusinessCaseInputFieldsModel";
import { addThousandSeparatorToString } from "../../../../utils/Utilities";

export default function TextTypeInputField(textTypeInputFieldProps: TextTypeInputFieldModel) {
    const BusinessCaseInputFieldsStyleClasses = BusinessCaseInputFieldsStyles();
    const [isNegative, setIsNegative] = useState<boolean>(false); 
    const handleNegativeChange = (evt: any) => {
        const regEx = /^-?[0-9,]+$/;
        if ("0-" === evt.target.value) {
        evt.target.value = "-";
        } else if (!regEx.test(evt.target.value)) {
        evt.target.value = 0;
        } else {
            if (evt.target.value.includes("-")) {
                setIsNegative(true);
                evt.target.value = "-" + addThousandSeparatorToString(evt.target.value);
            } else {
                setIsNegative(false);
                evt.target.value = addThousandSeparatorToString(evt.target.value);
            }
        }
    };

    const handleChange = (evt: any) => {
        const regEx = /^[0-9,]+$/;
        if(!regEx.test(evt.target.value)) {
            evt.target.value = 0;
        } else {
            evt.target.value = addThousandSeparatorToString(evt.target.value);
        }        
    };

    useEffect(() => {
        if(textTypeInputFieldProps.defaultValue?.includes("-")){
            setIsNegative(true);
        } else{
            setIsNegative(false);
        }
    },[textTypeInputFieldProps.defaultValue])
    
    return (
        <TextField
            variant="outlined"
            name={textTypeInputFieldProps.name}
            defaultValue={textTypeInputFieldProps.defaultValue}
            value={textTypeInputFieldProps.value}
            type="text"
            fullWidth
            onBlur={textTypeInputFieldProps.handleBlur}
            onChange={textTypeInputFieldProps.allowNegativeValue ? handleNegativeChange : handleChange}
            inputProps={{ maxLength: isNegative ? textTypeInputFieldProps.maxCharactersAllowed + 1 : textTypeInputFieldProps.maxCharactersAllowed }}
            InputProps={{
                classes: {
                    root: BusinessCaseInputFieldsStyleClasses.root,
                    multiline: BusinessCaseInputFieldsStyleClasses.multiline,
                    input: textTypeInputFieldProps.isStartAdornmentVisible ?
                        (isNegative ?
                        BusinessCaseInputFieldsStyleClasses.inputFieldWithSANegativeValue : BusinessCaseInputFieldsStyleClasses.inputFieldWithSAPositiveValue) :
                        BusinessCaseInputFieldsStyleClasses.inputFieldWithoutSA,
                    notchedOutline: BusinessCaseInputFieldsStyleClasses.notchedOutline,
                    adornedStart: BusinessCaseInputFieldsStyleClasses.adornedStart
                },
                startAdornment: textTypeInputFieldProps.isStartAdornmentVisible ? (
                    <p className={BusinessCaseInputFieldsStyleClasses.startAdornmentText}>
                        {textTypeInputFieldProps.startAdornmentText}
                    </p>
                ) : null
            }} />
    )
}
