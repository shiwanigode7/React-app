import { Avatar, IconButton, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import React from "react";
import { COLOR_GRAPHITE_2, COLOR_GREY_2 } from "../constant/Colors";
import { RunwaysWithIdType } from "../interfaces/InnovationInterface";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../utils/UserAvatarColorFunction";
import { BusinessGoalType } from "../view/MPLView";
import { ProductModel } from "./settings/ProductView/ProductModel";

/**Interface class to define the type of props*/
declare interface SelectMultipleValueProps {
  totalRunwayListData?: RunwaysWithIdType[],
  totalProductListData?: ProductModel[],
  businessGoalData?: BusinessGoalType;
  callBackOnListChange?: (inNewValue: string[], inProductId: string) => void;
  productData?: ProductModel;
  managerList?: string[];
  productList?: ProductModel[];
  setManagerList?: React.Dispatch<React.SetStateAction<string[]>>;
  setBusinessGoalData?: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}

/**Styling for Input Text Field */
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      },
      "&:focus": {
        border: `1px solid ${COLOR_GRAPHITE_2}`,
        borderRadius: "5px",
        boxSizing: "border-box"
      },
      "&:hover": {
        border: `1px solid ${COLOR_GRAPHITE_2}`,
        borderRadius: "5px",
        boxSizing: "border-box"
      }
    },
    input: {
      borderRadius: '5px',
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #E3E4E5",
      fontSize: 16,
      minHeight: "34px",
      padding: "2px 7px 2px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: '5px',
        borderColor: "#91959A"
      }
    }
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      "&:focus": {
        backgroundColor: "white"
      }
    },
    cancelButton: {
      fontSize: "17px"
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: "2px"
    },
    chip: {
      margin: 2
    },
    chipLabel: {
      fontSize: "14px",
      padding: "13px"
    },
    chipRoot: {
      backgroundColor: COLOR_GREY_2,
      height: "24px",
      minWidth: "90px",
      maxWidth: "235px",
      margin: "2px",
      verticalAlign: "inherit"
    },
    chipDeleteIcon: {
      color: COLOR_GRAPHITE_2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    managerInputStyle: {
      border: "1px solid rgb(0 0 0 / 38%)",
      borderRadius: '5px'
    }
  })
);

/**Styling for Dropdown Menu */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: "604px"
    }
  },
  getContentAnchorEl: null
};

export default function SelectMultipleValues(inputProps: SelectMultipleValueProps) {

  const classes = useStyles();

  /**Changes the runwaysList whenever the user selects/deselects in dropdown menu */
  const handleRunwayListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (inputProps.setBusinessGoalData !== undefined) {
      inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
        ...prevState,
        runwaysList: event.target.value as string[]
      }))
    }
  };

  /**Changes the productList whenever the user selects/deselects in dropdown menu */
  const handleProductListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (inputProps.setBusinessGoalData !== undefined) {
      inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
        ...prevState,
        productsList: event.target.value as string[]
      }));
    }
  };

  const handleManagerListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (inputProps.callBackOnListChange) {
      inputProps.callBackOnListChange(event.target.value as string[], inputProps.productData?.nodeId ? inputProps.productData?.nodeId : "")
    }
  };

  /**Removes the id when the user cicks remove icon in Chip */
  const handleRunwayDelete = (data: string) => {
    if (inputProps.businessGoalData !== undefined && inputProps.setBusinessGoalData !== undefined) {
      let filteredRunways: string[] = inputProps.businessGoalData ? inputProps.businessGoalData.runwaysList : [];
      filteredRunways = filteredRunways.filter((val) => val !== data);
      inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
        ...prevState,
        runwaysList: filteredRunways
      }));
    }
  };

  const handleProductDelete = (data: string) => {
    if (inputProps.businessGoalData !== undefined && inputProps.setBusinessGoalData !== undefined) {
      let filteredProducts: string[] = inputProps.businessGoalData ? inputProps.businessGoalData.productsList : [];
      filteredProducts = filteredProducts.filter((val) => val !== data);
      inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
        ...prevState,
        productsList: filteredProducts
      }));
    }
  };

  const getFirstName = (userName: string) => {
    const firstName: string = undefined !== userName.split(", ")[1] ? userName.split(" ")[1] : "";
    return firstName;
  }
  const getLastName = (userName: string) => {
    const lastName: string = undefined !== userName.split(", ")[0] ? userName.split(", ")[0] : "";
    return lastName;
  }

  const handleManagerDelete = (data: string) => {
    if (inputProps.callBackOnListChange) {
      let filteredManagers: string[] = inputProps.productData?.managers ? inputProps.productData.managers : [];
      console.log(filteredManagers)
      filteredManagers = filteredManagers.filter((val) => val !== data);
      console.log(filteredManagers);
      inputProps.callBackOnListChange(filteredManagers, inputProps.productData?.nodeId ? inputProps.productData?.nodeId : "")
    }
  };

  const getManagerLabelData = (value: string[]) => {
    if (inputProps.productList) {
      if (inputProps.productList.find(option => option.managers === value)) {
        return inputProps.productList.find(option => option.managers === value)
      }
      else {
        return value;
      }
    }
    else {
      return value.toString();
    }
  }

  const getProductLabelData = (value: string) => {
    if (inputProps.totalProductListData) {
      let product = inputProps.totalProductListData.find(option => option.nodeId === value);
      if (product) {
        return product.productName
      }
      else {
        return value
      }
    }
    else {
      return value.toString()
    }
  }

  const getRunwayName = (inNodeId: string): string => {
    let lRunwayName = "";
    const lRunwayListData: RunwaysWithIdType[] = undefined !== inputProps.totalRunwayListData ? inputProps.totalRunwayListData : [];
    lRunwayListData.forEach((runwayName: RunwaysWithIdType) => {
      if (runwayName.nodeId === inNodeId) {
        lRunwayName = runwayName.runwayName;
      }
    })
    return lRunwayName;
  }

  return (
    <div>
      {inputProps.totalRunwayListData &&
        <Select
          IconComponent={() => (
            <ArrowDropDownRoundedIcon style={{ color: "#444B53", fontSize: "22px", right: "0", position: "absolute" }} />
          )}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          fullWidth
          value={inputProps.businessGoalData?.runwaysList}
          onChange={handleRunwayListChange}
          input={<BootstrapInput />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value: any) => (
                <Tooltip
                  title={getRunwayName(value)}
                  placement="left-start"
                  arrow>
                  <Chip
                    key={value}
                    size="small"
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onDelete={() => handleRunwayDelete(value)}
                    label={inputProps.totalRunwayListData ? inputProps.totalRunwayListData.find(option => option.nodeId == value)?.runwayName : ""}
                    className={classes.chip}
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chipLabel,
                      deleteIcon: classes.chipDeleteIcon
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {
            inputProps.totalRunwayListData?.map((runway: RunwaysWithIdType) => {
              if (runway.isActive) {
                return (
                  <MenuItem
                    key={runway.nodeId}
                    value={runway.nodeId}
                  >
                    <ListItemText primary={runway.runwayName} />
                  </MenuItem>
                )
              }
            })
          }
        </Select>
      }

      {inputProps.totalProductListData &&
        <Select
          IconComponent={() => (
            <ArrowDropDownRoundedIcon style={{ color: "#444B53", fontSize: "22px", right: "0", position: "absolute" }} />
          )}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          fullWidth
          disableUnderline
          value={inputProps.businessGoalData?.productsList}
          onChange={handleProductListChange}
          input={<BootstrapInput />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value: any) => (
                <Tooltip
                  title={getProductLabelData(value)}
                  placement="bottom">
                  <Chip
                    key={value}
                    size="small"
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onDelete={() => handleProductDelete(value)}
                    label={getProductLabelData(value)}
                    className={classes.chip}
                    classes={{
                      root: classes.chipRoot,
                      label: classes.chipLabel,
                      deleteIcon: classes.chipDeleteIcon
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {inputProps.totalProductListData.map((option) => (
            <MenuItem
              key={option.nodeId}
              value={option.nodeId}
            >
              <ListItemText primary={option.productName} />
            </MenuItem>
          ))}
        </Select>
      }
      {
        inputProps.managerList &&
        <Select
          IconComponent={() => (
            <ArrowDropDownRoundedIcon style={{ color: "#444B53", fontSize: "22px", right: "0", position: "absolute" }} />
          )}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          fullWidth
          value={inputProps.productData?.managers}
          onChange={handleManagerListChange}
          input={<BootstrapInput className={classes.managerInputStyle} />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value: any) => (
                <Chip
                  avatar={
                    <Avatar
                      style={{
                        color: userAvatarTextColor(value),
                        backgroundColor: userAvatarBackgroundColor(value),
                        width: "20px", height: "20px", alignItems: "center"
                      }}>
                      {getFirstName(value).charAt(0) + getLastName(value).charAt(0)}
                    </Avatar>}
                  key={value}
                  size="small"
                  deleteIcon={<IconButton disabled={1 === inputProps.productData?.managers.length}>
                    <CancelRoundedIcon className={classes.cancelButton} />
                  </IconButton>}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onDelete={1 !== inputProps.productData?.managers.length ? () => { handleManagerDelete(value) } : undefined}
                  label={getManagerLabelData(value)}
                  className={classes.chip}
                  classes={{
                    root: classes.chipRoot,
                    label: classes.chipLabel,
                    deleteIcon: classes.chipDeleteIcon
                  }}
                />
              ))}
            </div>
          )
          }
          MenuProps={MenuProps}
        >
          {
            inputProps.managerList.map((option) => (
              <MenuItem
                key={option}
                value={option}>
                <ListItemIcon >
                  <Avatar style={{
                    color: userAvatarTextColor(option),
                    backgroundColor: userAvatarBackgroundColor(option),
                    height: "38px", fontSize: "0.9rem"
                  }}>
                    {getFirstName(option).charAt(0) + getLastName(option).charAt(0)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={option}></ListItemText>
              </MenuItem>
            ))
          }
        </Select >
      }
    </div >
  );
}

