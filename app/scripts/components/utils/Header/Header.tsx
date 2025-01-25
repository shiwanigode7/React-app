import React from "react";
import HeaderModel from "./HeaderModel";
import { HeaderStyles } from "./HeaderStyles";
import { Grid } from "@material-ui/core";
import Heading from "./Heading/Heading";
import AddButton from "./AddButton/AddButton";
import ToggleButton from "./ToggleButton/ToggleButton";
import SelectMenu from "./SelectMenu/SelectMenu";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SearchBar from "./SearchBar/SearchBar";
import ToggleSelectField from "./ToggleSelectField/ToggleSelectField";
import SelectFieldWithScrollbar from "./SelectMenu/SelectFieldWithScrollbar";
import DateSelector from "../DateSelector/DateSelector";
import DateRangeSelector from "../DateRangeSelector/DateRangeSelector";

export default function Header(headerProps: HeaderModel) {
    const headerStyleClasses = HeaderStyles();

    return (
        <Grid container className={headerStyleClasses.header} >
            <Grid item>
                <Grid>
                    <Grid item className={headerStyleClasses.title}>
                        <Heading heading={headerProps.currentPageHeading} subHeading={headerProps.currentPageSubHeading} />
                        {
                            (undefined !== headerProps.addButton) &&
                            <AddButton
                                addButtonAltText={headerProps.addButton.addButtonAltText}
                                tooltipTitle={headerProps.addButton.tooltipTitle}
                                handleAddButtonClick={headerProps.addButton.handleAddButtonClick} />
                        }
                        {
                            (undefined !== headerProps.selectMenu) &&
                            <Grid item>
                                <SelectMenu
                                    items={headerProps.selectMenu.items}
                                    selectedValue={headerProps.selectMenu.selectedValue}
                                    setSelectedValue={headerProps.selectMenu.setSelectedValue}
                                />
                            </Grid>
                        }
                        {
                            (undefined !== headerProps.dateRangeSelector) && 
                            <Grid item>
                                <DateRangeSelector 
                                    selectedDate={headerProps.dateRangeSelector.selectedDate} 
                                    setSelectedDate={headerProps.dateRangeSelector.setSelectedDate}
                                    disableUpArrow={headerProps.dateRangeSelector.disableUpArrow}
                                    disableDownArrow={headerProps.dateRangeSelector.disableDownArrow}/>
                            </Grid>
                        }
                        {
                            (undefined !== headerProps.selectFieldWithScrollbar) &&
                            <Grid item>
                                <SelectFieldWithScrollbar
                                    items={headerProps.selectFieldWithScrollbar.items}
                                    selectedValue={headerProps.selectFieldWithScrollbar.selectedValue}
                                    setSelectedValue={headerProps.selectFieldWithScrollbar.setSelectedValue}
                                />
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {
                (undefined !== headerProps.searchBar) &&
                <Grid item className={headerStyleClasses.searchBar}>
                    <SearchBar
                        value={headerProps.searchBar.value}
                        handleChange={headerProps.searchBar.handleChange}
                        handleCloseIconClick={headerProps.searchBar.handleCloseIconClick} />
                </Grid>
            }
            {
                (undefined !== headerProps.actionButtons) && (headerProps.actionButtons.displayEditButton) && (headerProps.actionButtons.isProductEditable) &&
                <Grid item className={headerStyleClasses.actionButtons}>
                    <Button className={headerStyleClasses.editButtons} variant="outlined" onClick={headerProps.actionButtons.onClickEdit} startIcon={<EditRoundedIcon />}>Edit Release Notes</Button>
                </Grid>
            }
            {
                (undefined !== headerProps.actionButtons) && (!headerProps.actionButtons.displayEditButton) &&
                <Grid item className={headerStyleClasses.actionButtons}>
                    <Button className={headerStyleClasses.revertButtons} variant="outlined" onClick={headerProps.actionButtons.onClickRevert} >Revert</Button>
                    <Button className={headerStyleClasses.editButtons} variant="outlined" onClick={headerProps.actionButtons.onClickSave} startIcon={<SaveRoundedIcon />}>Save Changes</Button>
                </Grid>
            }
            {
                (undefined !== headerProps.toggleButton) &&
                <ToggleButton
                    hasNextComponent={undefined !== headerProps.toggleSelectField}
                    label={headerProps.toggleButton.label}
                    handleChange={headerProps.toggleButton.handleChange} />
            }
            {
                (undefined !== headerProps.dateSelector?.displayDateSelector) &&
                <Grid item style={{ alignItems: "center", position: "fixed", left: headerProps.dateSelector.openFilterMenu ? "54vw" : "47vw" }}>
                    <DateSelector
                        displayDateSelector={true}
                        meetingDateList={headerProps.dateSelector.meetingDateList}
                        selectedDate={headerProps.dateSelector.selectedDate}
                        setSelectedDate={headerProps.dateSelector.setSelectedDate}
                    />
                </Grid>
            }
            {
                (undefined !== headerProps.toggleSelectField) &&
                <Grid item className={headerStyleClasses.toggleSelectField}>
                    <ToggleSelectField
                        defaultValue={headerProps.toggleSelectField.defaultValue}
                        menuOptions={headerProps.toggleSelectField.menuOptions}
                        handleChange={headerProps.toggleSelectField.handleChange} />
                </Grid>
            }
        </Grid>
    )
}