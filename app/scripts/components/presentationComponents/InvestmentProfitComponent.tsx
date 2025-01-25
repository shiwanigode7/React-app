/**TSX file for the component used to display the Investment, profit and CAGR */

import { Card, Divider, Grid } from "@material-ui/core";
import React from "react";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { IndividualValueComponentStyles, InvestmentProfitComponentStyles } from "../../themes/InvestmentProfitComponentTheme";
import { MISSING_VALUE_TEXT } from "../../constant/SIRPresentationTexts";

export declare interface InvestmentComponentInputDataInterface {
    /**The value of the data */
    dataValue: number;
    /**The label/title of the data */
    dataTitle: string;
    /**The unit of the data (M$, % etc) */
    dataUnit: string;
}

/**Interface for the component */
declare interface InvestmentProfitComponentProps {
    /**The icon to be displayed */
    dataIcon: any;
    /**Data to be displayed */
    dataArray: InvestmentComponentInputDataInterface[];
}

export function InvestmentProfitComponent(inputProps: InvestmentProfitComponentProps) {

    /**State to apply error label for the card*/
    let areAllDataValid: boolean = true;

    /**Check the data list to see if there are any missed value */
    inputProps.dataArray.forEach((individualData: InvestmentComponentInputDataInterface) => {
        if (0 === individualData.dataValue) {
            areAllDataValid = false;
        }
    });

    /**Importing styles */
    const InvestmentProfitComponentClasses = InvestmentProfitComponentStyles({ isDataValid: areAllDataValid });

    function IndividualValueComponent(compInputProps: InvestmentComponentInputDataInterface) {
        /**Check if the data is valid or not */
        const isDataValid: boolean = undefined !== compInputProps.dataValue;
        /**Import styling */
        const IndividualValueComponentClasses = IndividualValueComponentStyles({ isDataValid: isDataValid });
        /**Assign the component to be displayed based on whether the value is valid or not */
        const DATA_VALUE_COMPONENT = isDataValid ? compInputProps.dataValue :
            <div>
                <WarningRoundedIcon fontSize="large" />
                <br />{MISSING_VALUE_TEXT}
            </div>;

        return (
            <Grid item className={IndividualValueComponentClasses.individualValuesRootGrid}>
                {/* The value */}
                <Grid item className={IndividualValueComponentClasses.individualDataValueGrid}>
                    {DATA_VALUE_COMPONENT}
                </Grid>
                <Grid item className={IndividualValueComponentClasses.dividerGrid}>
                    <Divider orientation="vertical" className={IndividualValueComponentClasses.divider} />
                </Grid>
                {/* Value label and unit grid */}
                <Grid item className={IndividualValueComponentClasses.individualLabelAndUnitRootGrid}>
                    {/* The unit */}
                    <Grid item className={IndividualValueComponentClasses.individualDataUnitGrid}>
                        {compInputProps.dataUnit}
                    </Grid>
                    {/* The value label */}
                    <Grid item className={IndividualValueComponentClasses.individualDataLabelGrid}>
                        {compInputProps.dataTitle}
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <Card className={InvestmentProfitComponentClasses.cardRoot}>
            <Grid container className={InvestmentProfitComponentClasses.gridRoot}>
                {/* Icon to display */}
                <Grid item className={InvestmentProfitComponentClasses.iconGrid}>
                    {inputProps.dataIcon}
                </Grid>
                {/* Grid for the values */}
                <Grid item className={InvestmentProfitComponentClasses.valueGrid}>
                    {
                        inputProps.dataArray.map((data: InvestmentComponentInputDataInterface) => (
                            <IndividualValueComponent
                                dataTitle={data.dataTitle}
                                dataUnit={data.dataUnit}
                                dataValue={data.dataValue}
                            />
                        ))
                    }
                </Grid>
            </Grid>
        </Card>
    );
}