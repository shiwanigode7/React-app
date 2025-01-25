import { Typography, Tooltip } from "@material-ui/core";
import React from "react";
import { DropDownInterface } from "../../../../interfaces/InnovationInterface";
import { milestoneListModel } from "./MilestoneListModel";
import { milestoneListStyles } from "./MilestoneListStyle";

export function MilestoneList(milestoneListProps: milestoneListModel) {

    const milestoneListStylesClasses = milestoneListStyles();

    const getMilestoneName = (inDatakey: string): string => {
        let lReturnValue: string = "";
        milestoneListProps.dataList.forEach((data: DropDownInterface) => {
            if (inDatakey === data.dataKey) {
                lReturnValue = data.displayName;
            }
        })
        return lReturnValue;
    }

    return (
        <div className={milestoneListStylesClasses.rootDiv}>
            {
                milestoneListProps.defaultValues.map((selectedData: string) => {
                    return (
                        <Tooltip 
                            title={getMilestoneName(selectedData)} 
                            arrow={true}
                            placement="left">
                            <Typography className={milestoneListStylesClasses.typography}>{getMilestoneName(selectedData)}</Typography>
                        </Tooltip>
                    );
                })
            }
        </div>
    );
}