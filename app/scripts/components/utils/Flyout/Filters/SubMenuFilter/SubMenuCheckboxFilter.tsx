import React, { useEffect, useState } from "react";
import { RunwayFilterTheme } from "../../../../../themes/RunwayFilterTheme";
import { FilterStyles } from "../FilterStyles";
import { CheckboxFilterModel, CheckboxListWithChecked } from "./SubMenuCheckboxFilterModel";
import { ThemeProvider, FormControl, FormGroup, FormControlLabel, Checkbox, ListItem, Accordion, Typography, AccordionDetails } from "@material-ui/core";
import CheckBoxItem from "../../../../FilterComponents/CheckBoxItem";
import { FilterAccordionSummary, FilterSubMenuStyles } from "../../../../../themes/FilterSubMenuTheme";
import { SHOW_OR_HIDE_ALL } from "../../../../../constant/SubMenuFilterTexts";

export default function SubMenuCheckboxFilter(subMenuCheckBoxFilterMenuProps : CheckboxFilterModel) {

    const checkBoxFilterStyleClasses = FilterStyles();
    const FilterSubMenuStyleClasses = FilterSubMenuStyles();
    const [showAll, setShowAll] = useState<boolean>(false);
    const [checkshowAll, setCheckShowAll] = useState<boolean>(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(false);
    const [totalListDatawithChecked, setTotalListDataWithChecked] = useState<CheckboxListWithChecked[]>([]);

    const handleShowAll = () => {
        setShowAll(!checkshowAll);
        setCheckShowAll(!checkshowAll);
    }

    const handleChecked = (index: number) => {
        let tempCheckedListOfData: CheckboxListWithChecked[] = [...totalListDatawithChecked];
        tempCheckedListOfData[index] = {
            checkBoxValue: tempCheckedListOfData[index].checkBoxValue,
            checked: !tempCheckedListOfData[index].checked
        }
        let tempCheckedItemList: string[] = [...subMenuCheckBoxFilterMenuProps.selectedCheckboxList];
        /**If a checkbox is checked checked add the respective value to selectedCheckboxList array */
        if (tempCheckedListOfData[index].checked) {
            tempCheckedItemList = tempCheckedItemList.concat(tempCheckedListOfData[index].checkBoxValue);
            subMenuCheckBoxFilterMenuProps.setSelectedCheckboxList(tempCheckedItemList);
        }
        /**If a checkbox is unchecked remove the respective value from selectedCheckboxList array */
        else {
            tempCheckedItemList.splice(tempCheckedItemList.indexOf(tempCheckedListOfData[index].checkBoxValue), 1);
            subMenuCheckBoxFilterMenuProps.setSelectedCheckboxList(tempCheckedItemList);
        }
        setTotalListDataWithChecked(tempCheckedListOfData);
        /**If every check box is checked, check the "Show/Hide All" */
        if (tempCheckedItemList.length - 1 === subMenuCheckBoxFilterMenuProps.listOfItems.length) {
            setCheckShowAll(true);
        }
        /**If a check box is unchecked when the "Show/Hide All" is checked, uncheck the "Show/Hide All" */
        if (!tempCheckedListOfData[index].checked && checkshowAll) {
            setShowAll(true);
            setCheckShowAll(false);
        }
    };

    useEffect(() => {
        let tempCheckedListOfData: CheckboxListWithChecked[] = [...totalListDatawithChecked];
        /**Checks every Checkboxes and push every data into totalListDataWithChecked list*/
        if (showAll && checkshowAll) {
            let tempCheckedItemList: string[] = [];
            subMenuCheckBoxFilterMenuProps.listOfItems.forEach((checkBoxItem: string) => {
                tempCheckedItemList = tempCheckedItemList.concat(checkBoxItem);
            });
            tempCheckedListOfData.forEach((checkBoxItemWithChecked: CheckboxListWithChecked) => {
                checkBoxItemWithChecked.checked = checkshowAll;
            });
            subMenuCheckBoxFilterMenuProps.setSelectedCheckboxList(tempCheckedItemList);
            setTotalListDataWithChecked(tempCheckedListOfData);
        }
        else if (showAll && !checkshowAll) {
            setShowAll(false);
        }
        /**UnChecks every Checkboxes and set the totalListDataWithChecked to empty array */
        else if (!showAll && !checkshowAll && initialLoad) {
            tempCheckedListOfData.forEach((checkBoxItemWithChecked: CheckboxListWithChecked) => {
                checkBoxItemWithChecked.checked = checkshowAll;
            })
            setTotalListDataWithChecked(tempCheckedListOfData);
            subMenuCheckBoxFilterMenuProps.setSelectedCheckboxList([]);
        }
    }, [checkshowAll]);

    useEffect(() => {
        /**If every check box is checked, check the "Show/Hide All" */
        if (subMenuCheckBoxFilterMenuProps.selectedCheckboxList.length === subMenuCheckBoxFilterMenuProps.listOfItems.length && subMenuCheckBoxFilterMenuProps.listOfItems.length != 0) {
            setCheckShowAll(true);
            setShowAll(true);
            setInitialLoad(true);
        }
        let tempCheckBoxListWithChecked: CheckboxListWithChecked[] = [];
        subMenuCheckBoxFilterMenuProps.listOfItems.forEach((checkBoxItem: string) => {
            const tempCheckBoxDataWithChecked: CheckboxListWithChecked = {
                checkBoxValue: checkBoxItem,
                checked: subMenuCheckBoxFilterMenuProps.selectedCheckboxList.indexOf(checkBoxItem) != -1 ? true : false
            }
            tempCheckBoxListWithChecked = tempCheckBoxListWithChecked.concat(tempCheckBoxDataWithChecked);
        });
        setTotalListDataWithChecked(tempCheckBoxListWithChecked);
    },[subMenuCheckBoxFilterMenuProps.selectedCheckboxList])

    useEffect(() => {
        if (subMenuCheckBoxFilterMenuProps.listOfItems.length != 0 && subMenuCheckBoxFilterMenuProps.selectedCheckboxList.length === subMenuCheckBoxFilterMenuProps.listOfItems.length) {
            setCheckShowAll(true);
        }
    }, [subMenuCheckBoxFilterMenuProps.listOfItems, subMenuCheckBoxFilterMenuProps.selectedCheckboxList]);

    return (
    <Accordion defaultExpanded className={FilterSubMenuStyleClasses.accordionRoot}>
        <FilterAccordionSummary>
            <Typography className={FilterSubMenuStyleClasses.accordionTitleText}>
                {subMenuCheckBoxFilterMenuProps.title}
            </Typography>
        </FilterAccordionSummary>
        <AccordionDetails >
            <ThemeProvider theme={RunwayFilterTheme}>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                name={""}
                                checked={checkshowAll}
                                onChange={handleShowAll}
                                inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                                label={<p className={checkBoxFilterStyleClasses.ShowOrHideAllClass}>{SHOW_OR_HIDE_ALL}</p>}
                            className={checkBoxFilterStyleClasses.ShowAllCheckBoxClass}
                        />
                        <div>
                            {totalListDatawithChecked.map((checkBoxItem: CheckboxListWithChecked, index: any) => (
                                <ListItem key={checkBoxItem.checkBoxValue} value={checkBoxItem.checkBoxValue}>
                                    <CheckBoxItem
                                        itemName={checkBoxItem.checkBoxValue}
                                        isChecked={checkBoxItem.checked}
                                        index={index}
                                        onChange={handleChecked}
                                        itemId={checkBoxItem.checkBoxValue}></CheckBoxItem>
                                </ListItem>
                            ))}
                        </div>
                    </FormGroup>
                </FormControl>
            </ThemeProvider>
            </AccordionDetails>
    </Accordion>
    )
}