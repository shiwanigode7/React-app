import { Checkbox, FormControlLabel, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { RunwayFilterStyles } from "../../themes/RunwayFilterTheme";

/**type definition for Props */
export interface CheckBoxItemProps {
    itemName: string;
    itemId: string;
    isChecked: boolean;
    index: number;
    onChange: (index: number) => void;
}

/**Returns the checkbox to be displayed */
export default function CheckBoxItem(props: CheckBoxItemProps) {

    /**Get the styles */
    const runwayFilterStyleClasses = RunwayFilterStyles();

    // Reference to the text that is displayed by the Typography
    const textRef = useRef<HTMLSpanElement>(null);
    const [isEllipsisActive, setIsEllipsisActive] = useState(false)

    useEffect(() => {
        const element = textRef.current
        setIsEllipsisActive(
            element
                ? element.offsetWidth < element.scrollWidth ||
                element.offsetHeight < element.scrollHeight
                : false
        )
    }, [])

    return (
        <div>
            <FormControlLabel
                className={runwayFilterStyleClasses.FormControlLabelClass}
                control={
                    <Checkbox
                        name={props.itemId}
                        checked={props.isChecked}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={() => props.onChange(props.index)} />
                }
                label={
                    <Tooltip
                        title={isEllipsisActive ? props.itemName : ""}
                        placement="bottom-start"
                        classes={{
                            tooltipPlacementBottom: runwayFilterStyleClasses.RunwayTitleTooltip
                        }}
                    >
                        <Typography className={runwayFilterStyleClasses.RunwayTitle} ref={textRef}>
                            {props.itemName}
                        </Typography>
                    </Tooltip>
                }
            />
        </div>
    );
}