import { Avatar, Tooltip } from "@material-ui/core";
import React from "react";
import images from "../../../../../Icons/images";
import { BusinessLineMenuDataModel } from "../BusinessLineModel";
import { BusinessLineAvatarModel } from "./BusinessLineAvatarModel";
import { BusinessLinesAvatarStyles } from "./BusinessLineAvatarStyles";

export function BusinessLineAvatar(businessLineAvatarProps: BusinessLineAvatarModel) {

    const businessLineAvatarStyleClasses = BusinessLinesAvatarStyles();

    return (
        <div className={businessLineAvatarStyleClasses.rootDiv}>
            {
                businessLineAvatarProps.defaultValues.map((data: string) => {
                    const lBusinessLineIndex: number = businessLineAvatarProps.dataList.findIndex(
                        (businessLine: BusinessLineMenuDataModel) => (businessLine.dataKey === data)
                    );

                    if (lBusinessLineIndex >= 0) {
                        return (
                            <Tooltip
                                arrow
                                placement={"right"}
                                title={businessLineAvatarProps.dataList[lBusinessLineIndex].displayValue}
                                classes={{
                                    tooltipPlacementRight: businessLineAvatarStyleClasses.tooltip,
                                    tooltipPlacementLeft: businessLineAvatarStyleClasses.tooltip
                                }}
                            >
                                <Avatar
                                    src={businessLineAvatarProps.dataList[lBusinessLineIndex].thumbnail}
                                    className={businessLineAvatarStyleClasses.avatar}
                                />
                            </Tooltip>
                        );
                    } else {
                        return (
                            <Tooltip
                                arrow
                                placement={"right"}
                                title={data}
                                classes={{
                                    tooltipPlacementRight: businessLineAvatarStyleClasses.tooltip,
                                    tooltipPlacementLeft: businessLineAvatarStyleClasses.tooltip
                                }}
                            >
                                <Avatar
                                    src={images.EskoStarPng}
                                    className={businessLineAvatarStyleClasses.avatar}
                                />
                            </Tooltip>
                        );
                    }

                })
            }
        </div>
    );
}