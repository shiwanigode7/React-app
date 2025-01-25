/**TSX file to list all the users added to innovation */
import { Avatar, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import React, { useEffect, useState } from "react";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../utils/UserAvatarColorFunction";

/**Input props declaration */
declare interface ListUsersComponentProps {
    /**The call back function called when the user selected data changes */
    onChangeCallBackFunction: (inSelectedUser: any) => void
    /**Select value */
    defaultSelectedValue: string
}

export function ListUsersComponent(inputProps: ListUsersComponentProps) {

    /**State that holds the current user selected value */
    const [selectedValue, setSelectedValue] = useState<string>("");
    /**State to hold all the users of a given organization */
    const [listOfUsers, setListOfUsers] = useState<string[]>([]);
    /**make the call and get the data */
    useEffect(() => {
        /**set the default value to be selected */
        setSelectedValue(inputProps.defaultSelectedValue);
        /**For now the value is being pushed because no call is made to IAM
         * Once the users and roles story for Innovation will be complete
         * IAM call will be made to populate all the users.
         */
        setListOfUsers([inputProps.defaultSelectedValue]);
    }, [inputProps.defaultSelectedValue]);

    /**Call the passed in callback function when value is changed */
    const handleOptionChange = (event: any) => {
        /**Save the latest selected value in the list */
        setSelectedValue(event.target.value);
        /**Call the callback function to perform operation of choice */
        inputProps.onChangeCallBackFunction(event.target.value);
    };

    /**Function to return the initial for a given user name */
    const getUserInitials = (inUserName: string) => {
        const firstName: string = inUserName.split(", ")[1] !== undefined ?
            inUserName.split(", ")[1].charAt(0) : "";
        const lastName: string = inUserName.split(", ")[0] !== undefined ?
            inUserName.split(", ")[0].charAt(0) : "";

        return firstName + lastName;
    };

    return (
        <TextField
            variant="outlined"
            style={{ width: "100%", minWidth: "max-content" }}
            select
            value={selectedValue}
            SelectProps={{
                IconComponent: () => <ArrowDropDownRoundedIcon style={{ color: "#444B53", fontSize: "22px" }} />
            }}
            onChange={(event: any) => { handleOptionChange(event) }}
        >
            {listOfUsers.map((user: any) => (
                <MenuItem key={user} value={user}>
                    {/**Grid container to show both Avatar(user badge) with the User Name-Typography */}
                    <Grid container direction='row' spacing={1}>
                        <Grid item>
                            {/**Avatar component to show the User Badge
                                     * For styling, used getUserColor and getContrastText from LightTheme to obtain the background color and tex color for that specific user  
                                     * */}
                            <Avatar
                                style={{
                                    height: "32px", width: "32px", marginTop: "-1px",
                                    color: userAvatarTextColor(user),
                                    backgroundColor: userAvatarBackgroundColor(user)
                                }}
                            >
                                {getUserInitials(user)}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography style={{ marginTop: "5px", fontSize: "14px" }}>{user}</Typography>
                        </Grid>
                    </Grid>
                </MenuItem>
            ))
            }
        </TextField >
    );
}