import { TableCell, Grid, IconButton, Tooltip } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { COLOR_AZURE_4, COLOR_LIGHT, COLOR_GREY_3, COLOR_AZURE_2, COLOR_GRAPHITE_2 } from "../../../../../constant/Colors"
import InvisibleInputTextField from "../../../../utils/InputFields/InvisibleInputTextField/InvisibleInputTextField"
import { BusinessGoalRowStyles } from "./BusinessGoalRowStyles";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import { BgRowTableCellProps } from "./BGRowTableCellModel";
import { InnovationAppContext } from "../../../../../context/InnovationAppContext";

export default function BgRowTableCell(tableCellProps: BgRowTableCellProps) {
    const businessGoalRowStyleClasses = BusinessGoalRowStyles();
    const [iconShow, setIconShow] = useState<boolean>(false);
    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (tableCellProps.defaultValue) {
            setValue(tableCellProps.defaultValue);
        } else {
            setValue("");
        }
    }, [tableCellProps.defaultValue]);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    /**Saving the details for local use */
    const lInnovationData = useContext(InnovationAppContext);

    function showIcon() {
        setIconShow(true);
    }

    function hideIcon() {
        setIconShow(false);
    }

    return (
        <TableCell onMouseOver={showIcon} onMouseLeave={hideIcon} className={!tableCellProps.isFTEEditable ?
            (1 === tableCellProps.index ? businessGoalRowStyleClasses.activeCell : businessGoalRowStyleClasses.editableTableCell) :
            (1 === tableCellProps.index ? businessGoalRowStyleClasses.nonEditableActiveCell : businessGoalRowStyleClasses.nonEditableTableCell)} align="center">
            <Grid container direction="row" className={businessGoalRowStyleClasses.tableCellGridContainer}>
                <Grid item className={businessGoalRowStyleClasses.inputGridStyle}>
                    <InvisibleInputTextField
                        name={tableCellProps.inputFieldName}
                        backgroundColor={(1 === tableCellProps.index ? COLOR_AZURE_4 : (!tableCellProps.isFTEEditable ? COLOR_LIGHT : COLOR_GREY_3))}
                        maxCharactersAllowed={tableCellProps.isPercentageView ? 5 : 4}
                        disabled={tableCellProps.isFTEEditable}
                        handleBlur={tableCellProps.handleInputFieldBlurEvent}
                        defaultValue={tableCellProps.defaultValue}
                        value={value}
                        handleInput={handleValueChange}
                        isPercentageView={tableCellProps.isPercentageView}
                    />
                </Grid>
                <Grid item className={businessGoalRowStyleClasses.notesIconGridStyle}>
                    {((lInnovationData.userPermission.rrmView.isNotesEditable && iconShow) || tableCellProps.isNotePresent) ?
                        <Tooltip
                            title={tableCellProps.notes}
                            placement="left-start"
                            arrow>
                            {lInnovationData.userPermission.rrmView.isNotesEditable ?
                                <IconButton
                                    onClick={() => tableCellProps.handleOpenCommentDialog(tableCellProps.inputFieldName)}
                                    disableTouchRipple
                                    className={businessGoalRowStyleClasses.iconButton}
                                >
                                    <CommentRoundedIcon
                                        // NOTE: Conditional styling used here due to error caused in makestyles for a 
                                        // passing props only to single style property
                                        style={{ color: tableCellProps.isNotePresent ? COLOR_AZURE_2 : COLOR_GRAPHITE_2 }}
                                    />
                                </IconButton> :
                                <CommentRoundedIcon
                                    // NOTE: Conditional styling used here due to error caused in makestyles for a 
                                    // passing props only to single style property
                                    style={{ color: tableCellProps.isNotePresent ? COLOR_AZURE_2 : COLOR_GRAPHITE_2 }}
                                />
                            }
                        </Tooltip> : null
                    }
                </Grid>
            </Grid>
        </TableCell>
    )
} 
