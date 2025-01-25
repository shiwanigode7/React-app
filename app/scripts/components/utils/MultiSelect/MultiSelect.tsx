import { Chip, MenuItem, Select, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { DropDownInterface } from "../../../interfaces/InnovationInterface";
import { MultiSelectPropsModel } from "./MultiSelectModel";
import { MultiSelectStyles } from "./MultiSelectStyles";

export function MultiSelect(MultiSelectProps: MultiSelectPropsModel) {

    const MultiSelectStylesClasses = MultiSelectStyles();

    const [dataList, setDataList] = useState<DropDownInterface[]>([]);

    /**
     * Function to pass the selected values to the callback  
     * @param event - The select event
     */
    const handleSelectChange = (event: any) => {
        MultiSelectProps.onSelectCallBack(event.target.value);
    };

    /**Function to delete the data when the cross icon is clicked */
    const handleDataDelete = (inData: string) => {
        MultiSelectProps.defaultValues.splice(
            MultiSelectProps.defaultValues.indexOf(inData), 1
        );
        MultiSelectProps.onSelectCallBack(
            MultiSelectProps.defaultValues
        );
    };

    const getMilestoneName = (inDatakey: string): string => {
        let lReturnValue: string = "";
        MultiSelectProps.dataList.forEach((data: DropDownInterface) => {
            if (inDatakey === data.dataKey) {
                lReturnValue = data.displayName;
            }
        })
        return lReturnValue;
    }

    /**To update the data selected if at all the data list gets updated */
    const updateDataSelected = () => {
        if (dataList.length === MultiSelectProps.dataList.length) {
            for (let dataIndex = 0; dataIndex < dataList.length; ++dataIndex) {
                if (dataList[dataIndex] !== MultiSelectProps.dataList[dataIndex]) {
                    const lSelectedDataIndex: number = MultiSelectProps.defaultValues.indexOf(dataList[dataIndex].dataKey);
                    if (-1 !== lSelectedDataIndex) {
                        MultiSelectProps.defaultValues.splice(lSelectedDataIndex, 1, MultiSelectProps.dataList[dataIndex].dataKey)
                    }
                }
            }
        }
        // Meaning: A data is deleted from the complete list
        else if (dataList.length > MultiSelectProps.dataList.length) {
            handleDataListDeletion();
        }
    }

    /**To handle removal of data if it is not present in the list */
    const handleDataListDeletion = () => {
        for (const data of dataList) {
            if (-1 === MultiSelectProps.dataList.findIndex(lData => lData.dataKey === data.dataKey) &&
                0 !== data.dataKey.trim().length) {
                let index =  MultiSelectProps.defaultValues.indexOf(data.dataKey);
                if(-1 !== index)
                {
                    MultiSelectProps.defaultValues.splice(index, 1);
                }
            }
        }
    }

    useEffect(() => {
        /**
         * Steps followed below
         * 1. Compared the old and new value to see which data has changed
         * 2. updated the changed/deleted milestone in the MultiselectProps.defaultValue
         */
        if (0 !== dataList.length &&
            0 !== MultiSelectProps.dataList.length &&
            JSON.stringify(dataList) !== JSON.stringify(MultiSelectProps.dataList)
        ) {
            updateDataSelected();
        }
        // If all the data is erased update the selected values to empty array
        if (0 === MultiSelectProps.dataList.length) {
            MultiSelectProps.defaultValues.splice(0, MultiSelectProps.defaultValues.length);
        }
        setDataList(MultiSelectProps.dataList);
    }, [MultiSelectProps.dataList]);

    return (
        <div className={MultiSelectStylesClasses.rootDiv}>
            {
                MultiSelectProps.defaultValues.map((selectedData: string) => {
                    return (
                        <Tooltip
                            arrow
                            title={getMilestoneName(selectedData)}
                            placement={"right"}
                            classes={{
                                tooltipPlacementLeft: MultiSelectStylesClasses.tooltip,
                                tooltipPlacementRight: MultiSelectStylesClasses.tooltip
                            }}
                        >
                            <Chip
                                key={selectedData}
                                label={getMilestoneName(selectedData)}
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                                onDelete={MultiSelectProps.disableEdit ? () => { handleDataDelete(selectedData) } : undefined}
                                classes={{
                                    root: MultiSelectStylesClasses.chipRoot,
                                    label: MultiSelectStylesClasses.chipLabel,
                                    deleteIcon: MultiSelectStylesClasses.chipDeleteIcon
                                }}
                            />
                        </Tooltip>
                    );
                })
            }
            {
                MultiSelectProps.disableEdit &&
                <Tooltip
                    arrow
                    title={MultiSelectProps.tooltipTitle}
                    placement={"right"}
                    classes={{
                        tooltipPlacementLeft: MultiSelectStylesClasses.tooltip,
                        tooltipPlacementRight: MultiSelectStylesClasses.tooltip
                    }}
                >
                    <Select
                        multiple
                        value={MultiSelectProps.defaultValues}
                        onChange={handleSelectChange}
                        onClick={(event: any) => { event.preventDefault(); }}
                        disableUnderline
                        MenuProps={{
                            getContentAnchorEl: null,
                            classes: {
                                paper: MultiSelectStylesClasses.menuList
                            }
                        }}
                        className={MultiSelectStylesClasses.selectDropdown}
                        // Disable when there are no milestone or when there is a empty milestone
                        disabled={0 === dataList.length ||
                            (1 === dataList.length && ((undefined !== dataList[0].displayName) ? 0 === dataList[0].displayName.trim().length : true))
                        }
                        IconComponent={AddIcon}
                        classes={{
                            icon: MultiSelectStylesClasses.selectIcon
                        }}
                        inputProps={{
                            classes: {
                                root: MultiSelectStylesClasses.selectOutlineRoot,
                            }
                        }}
                    >
                        {dataList.map((data: DropDownInterface) => {
                            if (0 !== data.displayName.trim().length) {
                                return (
                                    <MenuItem key={data.dataKey} value={data.dataKey}>
                                        {data.displayName}
                                    </MenuItem>
                                );
                            }
                        })}
                    </Select>
                </Tooltip>
            }
        </div>
    );
}