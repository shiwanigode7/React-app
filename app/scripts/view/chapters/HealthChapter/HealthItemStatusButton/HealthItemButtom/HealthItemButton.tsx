import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import HealthItemButtonModel from "./HealthItemButtonModel";
import { Tooltip } from "@material-ui/core";

export function HealthItemButton(HealthItemButtonProps: HealthItemButtonModel) {

    const [iconVisibility, setIconVisibility] = useState<boolean>(false);

    const toolTipMessage = HealthItemButtonProps.isDisabled ? "Status is disabled as long as Business Goal is not Active" : "";

    return (
        <Tooltip
            title={toolTipMessage}
            placement="right"
            classes={{
                tooltip : HealthItemButtonProps.toolTipClass
            }}
        >
            <div>
                <Button
                    variant="contained"
                    onClick={HealthItemButtonProps.handleClick}
                    disableElevation
                    disabled={HealthItemButtonProps.isDisabled}
                    color={"primary"}
                    startIcon={HealthItemButtonProps.startIcon}
                    endIcon={<KeyboardArrowDownIcon style={{ opacity: iconVisibility ? "1" : "0" }} />}
                    onMouseEnter={() => { setIconVisibility(true) }}
                    onMouseLeave={() => { setIconVisibility(false) }}
                    classes={{
                        root: HealthItemButtonProps.rootClass,
                        containedPrimary: HealthItemButtonProps.containedPrimaryClass,
                        endIcon: HealthItemButtonProps.endIconClass,
                        startIcon: HealthItemButtonProps.startIconClass
                    }}
                >
                    {HealthItemButtonProps.item}
                </Button>
            </div>
        </Tooltip>
    )
}