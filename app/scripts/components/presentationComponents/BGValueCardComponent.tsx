/**TSX file to display a business goal value in a card view */

import { Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { MISSING_VALUE_TEXT } from "../../constant/SIRPresentationTexts";
import { BGValueCardComponentStyle } from "../../themes/BGValueCardComponentTheme";

declare interface BGValueCardComponentProps {
    /**Value to be displayed */
    dataValue?: any;
    /**The label/title of the value */
    dataTitle: string;
}

export function BGValueCardComponent(inputProps: BGValueCardComponentProps) {
    /**Check if the values is missing or not */
    const IS_VALUE_MISSING = undefined === inputProps.dataValue;
    
    /**Value to be displayed based on the whether the value is undefined or not */
    const COMPONENT_TO_DISPLAY = !IS_VALUE_MISSING ? inputProps.dataValue :
        <div>
            <WarningRoundedIcon fontSize="large" />
            <br />{MISSING_VALUE_TEXT}
        </div>;

    /**Import Styles */
    const BGValueCardComponentClasses = BGValueCardComponentStyle({ isValueMissing: IS_VALUE_MISSING });

    return (
        <Card className={BGValueCardComponentClasses.cardStyle} >
            <CardContent className={BGValueCardComponentClasses.cardContentStyle}>
                {COMPONENT_TO_DISPLAY}
            </CardContent>
            <CardActions className={BGValueCardComponentClasses.cardActionStyle}>
                {inputProps.dataTitle}
            </CardActions>
        </Card>
    );
}