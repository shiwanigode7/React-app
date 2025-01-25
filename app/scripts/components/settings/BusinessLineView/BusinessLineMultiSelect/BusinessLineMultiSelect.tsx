import { Button, Chip, MenuItem, Select, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { BusinessLineMenuDataModel } from "../BusinessLineModel";
import { BusinessLineMultiSelectPropsModel } from "./BusinessLineMultiSelectModel";
import { BusinessLinesMultiSelectStyles } from "./BusinessLineMultiSelectStyles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

export function BusinessLineMultiSelect(BusinessLineMultiSelectProps: BusinessLineMultiSelectPropsModel) {

    const BusinessLineMultiSelectStylesClasses = BusinessLinesMultiSelectStyles();

    const [dataList, setDataList] = useState<BusinessLineMenuDataModel[]>([]);
    const [openMenuList, setOpenMenuList] = useState<boolean>(false);
    /**
     * Function to pass the selected values to the callback  
     * @param event - The select event
     */
    const handleSelectChange = (event: any) => {
        if (event.target.value.length > BusinessLineMultiSelectProps.maxValues) {
            BusinessLineMultiSelectProps.maxValueLimitCrossCallback();
        } else if (0 === event.target.value.length && !BusinessLineMultiSelectProps.hasEmptyValues) {
            BusinessLineMultiSelectProps.emptyErrorCallback();
        } else {
            BusinessLineMultiSelectProps.onSelectCallBack(event.target.value);
        }
    };

    /**Function to delete the data when the cross icon is clicked */
    const handleDataDelete = (inData: string) => {
        BusinessLineMultiSelectProps.defaultValues.splice(
            BusinessLineMultiSelectProps.defaultValues.indexOf(inData), 1
        );
        BusinessLineMultiSelectProps.onSelectCallBack(
            BusinessLineMultiSelectProps.defaultValues
        );
    };

    const handleCloseMenuList = () => {
        if (0 === BusinessLineMultiSelectProps.defaultValues.length && !BusinessLineMultiSelectProps.hasEmptyValues) {
            BusinessLineMultiSelectProps.valueRequiredCallBack();
            return;
        }
        setOpenMenuList(false);
    };

    const handleOpenMenuList = () => {
        setOpenMenuList(true);
    };

    useEffect(() => {
        setDataList(BusinessLineMultiSelectProps.dataList);
        if (0 === BusinessLineMultiSelectProps.defaultValues.length && !BusinessLineMultiSelectProps.hasEmptyValues) {
            handleOpenMenuList();
        }
    }, [BusinessLineMultiSelectProps]);

    return (
        <div className={BusinessLineMultiSelectStylesClasses.rootDiv}>
            {
                BusinessLineMultiSelectProps.defaultValues.map((selectedData: string) => {
                    const lBusinessLineIndex: number = BusinessLineMultiSelectProps.dataList.findIndex(
                        (businessLine: BusinessLineMenuDataModel) => (businessLine.dataKey === selectedData)
                    );

                    if (lBusinessLineIndex >= 0) {
                        return (
                            <Tooltip
                                arrow
                                title={BusinessLineMultiSelectProps.dataList[lBusinessLineIndex].displayValue.length > 50 ?
                                    BusinessLineMultiSelectProps.dataList[lBusinessLineIndex].displayValue : ""
                                }
                                placement={"right"}
                                classes={{
                                    tooltipPlacementLeft: BusinessLineMultiSelectStylesClasses.tooltip,
                                    tooltipPlacementRight: BusinessLineMultiSelectStylesClasses.tooltip
                                }}
                            >
                                <Chip
                                    key={selectedData}
                                    label={BusinessLineMultiSelectProps.dataList[lBusinessLineIndex].displayValue}
                                    deleteIcon={<Tooltip
                                        arrow
                                        title={BusinessLineMultiSelectProps.deleteIconTooltip}
                                        placement={"right"}

                                        classes={{
                                            tooltipPlacementLeft: BusinessLineMultiSelectStylesClasses.tooltip,
                                            tooltipPlacementRight: BusinessLineMultiSelectStylesClasses.tooltip
                                        }}
                                    >
                                        <CancelRoundedIcon />
                                    </Tooltip>}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onDelete={1 === BusinessLineMultiSelectProps.defaultValues.length &&
                                        !BusinessLineMultiSelectProps.hasEmptyValues ? undefined : () => { handleDataDelete(selectedData) }
                                    }
                                    classes={{
                                        root: BusinessLineMultiSelectStylesClasses.chipRoot,
                                        label: BusinessLineMultiSelectStylesClasses.chipLabel,
                                        deleteIcon: BusinessLineMultiSelectStylesClasses.chipDeleteIcon
                                    }}
                                />
                            </Tooltip>
                        );
                    } else {
                        return (
                            <Tooltip
                                arrow
                                title={selectedData.length > 32 ?
                                    selectedData : ""
                                }
                                placement={"right"}
                                classes={{
                                    tooltipPlacementLeft: BusinessLineMultiSelectStylesClasses.tooltip,
                                    tooltipPlacementRight: BusinessLineMultiSelectStylesClasses.tooltip
                                }}
                            >
                                <Chip
                                    key={selectedData}
                                    label={selectedData}
                                    deleteIcon={<Tooltip
                                        arrow
                                        title={BusinessLineMultiSelectProps.deleteIconTooltip}
                                        placement={"right"}

                                        classes={{
                                            tooltipPlacementLeft: BusinessLineMultiSelectStylesClasses.tooltip,
                                            tooltipPlacementRight: BusinessLineMultiSelectStylesClasses.tooltip
                                        }}
                                    >
                                        <CancelRoundedIcon />
                                    </Tooltip>}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onDelete={1 === BusinessLineMultiSelectProps.defaultValues.length &&
                                        !BusinessLineMultiSelectProps.hasEmptyValues ? undefined : () => { handleDataDelete(selectedData) }
                                    }
                                    classes={{
                                        root: BusinessLineMultiSelectStylesClasses.chipRoot,
                                        label: BusinessLineMultiSelectStylesClasses.chipLabel,
                                        deleteIcon: BusinessLineMultiSelectStylesClasses.chipDeleteIcon
                                    }}
                                />
                            </Tooltip>
                        );
                    }
                })
            }
            <Button
                startIcon={<AddIcon />}
                classes={{
                    root: BusinessLineMultiSelectStylesClasses.buttonRoot
                }}
                onClick={handleOpenMenuList}
            >
                {BusinessLineMultiSelectProps.selectButtonTitle}
            </Button>
            <Select
                multiple
                open={openMenuList}
                onClose={handleCloseMenuList}
                onOpen={handleOpenMenuList}
                value={BusinessLineMultiSelectProps.defaultValues}
                onChange={handleSelectChange}
                onClick={(event: any) => { event.preventDefault(); }}
                disableUnderline
                MenuProps={{
                    getContentAnchorEl: null,
                    classes: {
                        paper: BusinessLineMultiSelectStylesClasses.menuList
                    }
                }}
                className={BusinessLineMultiSelectStylesClasses.selectDropdown}
                // Disable when there are no milestone or when there is a empty milestone
                disabled={0 === dataList.length}
                IconComponent={AddIcon}
                classes={{
                    icon: BusinessLineMultiSelectStylesClasses.selectIcon
                }}
                inputProps={{
                    classes: {
                        root: BusinessLineMultiSelectStylesClasses.selectOutlineRoot,
                    }
                }}
            >
                {dataList.map((data: BusinessLineMenuDataModel) => {
                    return (
                        <MenuItem key={data.dataKey} value={data.dataKey}>
                            {data.displayValue}
                        </MenuItem>
                    );
                })}
            </Select>
        </div>
    );
}