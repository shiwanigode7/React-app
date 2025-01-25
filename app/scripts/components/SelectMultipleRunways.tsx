import React from "react";
import {createStyles,  makeStyles,  withStyles,  Theme} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { ListItemText } from "@material-ui/core";
import { RunwaysWithIdType } from "../interfaces/InnovationInterface";
import { BusinessGoalType } from "../view/MPLView";

/**Interface class to define the type of props*/
declare interface SelectMultipleValueProps {
    totalRunwayListData: RunwaysWithIdType[],
    businessGoalData: BusinessGoalType;
    setBusinessGoalData: React.Dispatch<React.SetStateAction<BusinessGoalType>>;
}

/**Styling for Input Text Field */
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: '4px',
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #E3E4E5",
      fontSize: 16,
      padding: "2px 7px 2px",
      minHeight:"28px",
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
            backgroundColor:"white"
        }
    },
    formControl: {
      minWidth: 800,
      maxWidth: 800,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
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
      width: 250,
      overflow: "auto"
    }
  }
};

export default function SelectMultipleRunways(inputProps: SelectMultipleValueProps) {
  
  const classes = useStyles();

  /**Changes the runwaysList whenever the user selects/deselects in dropdown menu */
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            runwaysList: event.target.value as string[]
        }));
  };

  /**Removes the id when the user cicks remove icon in Chip */
  const handleDelete = (data: string) => {
    let filteredRunways: string[] = inputProps.businessGoalData.runwaysList;
    filteredRunways = filteredRunways.filter((val) => val !== data);
    inputProps.setBusinessGoalData((prevState: BusinessGoalType) => ({
            ...prevState,
            runwaysList: filteredRunways
        }));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          IconComponent={() => (
            <ArrowDropDownRoundedIcon style={{ color: "#444B53", fontSize: "22px",right: "0",position: "absolute"}} />
          )}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={inputProps.businessGoalData.runwaysList}
          onChange={handleChange}
          input={<BootstrapInput />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value : any) => (
                <Chip
                  key={value}
                  size="small"
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  onDelete={() => handleDelete(value)}
                  label={inputProps.totalRunwayListData.find(option => option.nodeId == value)?.runwayName}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {inputProps.totalRunwayListData.map((option) => (
            <MenuItem
              key={option.nodeId}
              value={option.nodeId}
            >
              <ListItemText primary={option.runwayName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
