/**TSX file to define the component of the button used in the flyout menu */
import { Button, Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { StatusFilterButtonStyles, DashBoardStatusFilterButtonStyles } from "../themes/StatusFilterButtonTheme";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import RotateRightRoundedIcon from "@material-ui/icons/RotateRightRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import { InnovationStatus } from "../constant/InnovationEnums";


export declare interface StatusFilterButtonInterface {
    buttonTitle: string,
    BGCount: number
}

declare interface StatusFilterButtonProps {
    listOfButtons: StatusFilterButtonInterface[],
    selectedStatusValues: string[],
    setSelectedStatusValues: React.Dispatch<React.SetStateAction<string[]>>,
    viewPage?: string
}

export function StatusFilterButton(inputProps: StatusFilterButtonProps) {

    let StatusFilterButtonClasses = StatusFilterButtonStyles();

    //Condition to change the Theme based on the viewPage
    if (undefined !== inputProps.viewPage) {
        StatusFilterButtonClasses = DashBoardStatusFilterButtonStyles();
    }

    /**Function to handle the changes when the user selects or de-selects the status*/
    const handleClickEvent = (inValue: string, isSelected: boolean) => {
        let tempSelectedStatus: string[] = inputProps.selectedStatusValues;
        let tempIndex: number = inputProps.selectedStatusValues.indexOf(inValue);
        if (tempIndex === -1 && isSelected) {
            tempSelectedStatus.push(inValue);
        }
        if (tempIndex !== -1 && !isSelected) {
            tempSelectedStatus.splice(tempIndex, 1);
        }
        inputProps.setSelectedStatusValues([...tempSelectedStatus]);
    };

    return (
        <div className={StatusFilterButtonClasses.rootDiv}>
            {
                inputProps.listOfButtons.map((button: StatusFilterButtonInterface) => {
                    const [status, setStatus] = useState<boolean>(inputProps.selectedStatusValues.indexOf(button.buttonTitle) !== -1);
                    useEffect(() => {
                        setStatus(inputProps.selectedStatusValues.indexOf(button.buttonTitle) !== -1)
                    }, [inputProps.selectedStatusValues])
                    let buttonStyleClasses;
                    let startIconComponent;
                    switch (button.buttonTitle) {
                        case InnovationStatus.IDEATION:
                            buttonStyleClasses = StatusFilterButtonClasses.ideationButtonContained;
                            startIconComponent = <CategoryRoundedIcon className={StatusFilterButtonClasses.materialUISvg} />;
                            break;
                        case InnovationStatus.SCHEDULED:
                            buttonStyleClasses = StatusFilterButtonClasses.scheduledButtonContained
                            startIconComponent = <SwapVertIcon className={StatusFilterButtonClasses.materialUISvg} />
                            break;
                        case InnovationStatus.ACTIVE:
                            buttonStyleClasses = StatusFilterButtonClasses.activeButtonContained
                            startIconComponent = <RotateRightRoundedIcon className={StatusFilterButtonClasses.materialUISvg} />
                            break;
                        case InnovationStatus.COMPLETED:
                            buttonStyleClasses = StatusFilterButtonClasses.completedButtonContained
                            startIconComponent = <DoneRoundedIcon className={StatusFilterButtonClasses.materialUISvg} />
                            break;
                    }
                    return (
                        // Temporarly disabled status counters in DashBoradView Page
                        <Button disabled={undefined !== inputProps.viewPage}
                            className={StatusFilterButtonClasses.buttonRoot}
                            variant={status ? "contained" : "outlined"}
                            onClick={() => { handleClickEvent(button.buttonTitle, !status); setStatus(!status) }}
                            startIcon={startIconComponent}
                            endIcon={
                                <Chip
                                    variant={status ? "default" : "outlined"}
                                    label={button.BGCount}
                                    className={StatusFilterButtonClasses.chipDefault}
                                    classes={{
                                        outlined: StatusFilterButtonClasses.chipOutlined,
                                        label: StatusFilterButtonClasses.chipLabel
                                    }}
                                />
                            }
                            classes={{
                                contained: buttonStyleClasses,
                                outlined: StatusFilterButtonClasses.buttonOutlined,
                            }}
                        >
                            <p className={StatusFilterButtonClasses.displayText}>{button.buttonTitle}</p>
                        </Button>
                    );
                })
            }
        </div>
    );
}