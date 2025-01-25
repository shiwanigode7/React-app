import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import FilterSubmenu from '../components/FilterSubmenu';
import { StatusFilterButtonInterface } from '../components/StatusFilterButton';
import { InnovationAppContext } from '../context/InnovationAppContext';
import SearchService from '../services/SearchService';

export default function PPGView() {

    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;

    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)
    /**Importing context */
    const lInnovationData = useContext(InnovationAppContext);

    /**Variables to hold the count of business goal under a given status */
    const [scheduledBGCount, setScheduledBGCount] = useState<number>(0);
    const [activeBGCount, setActiveBGCount] = useState<number>(0);
    const [completedBGCount, setCompletedBGCount] = useState<number>(0);
    const [selectedStatusValues, setSelectedStatusValues] = useState<string[]>(["Active", "Scheduled"]);

    /**Defining the list of buttons to be displayed in the status filter */
    const inListOfButtons: StatusFilterButtonInterface[] = [
        {
            BGCount: scheduledBGCount,
            buttonTitle: "Scheduled"
        },
        {
            BGCount: activeBGCount,
            buttonTitle: "Active"
        },
        {
            BGCount: completedBGCount,
            buttonTitle: "Completed"
        }
    ];

    /**Function to update the status count */
    const statusCountUpdateFunction = () => {
        /**get the status counts of Ideation*/
        SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, "Active")
            .then((activeResponse: number) => {
                setActiveBGCount(activeResponse);
            })
            .catch((activeError: number) => {
                setActiveBGCount(activeError);
            });
        /**get the status counts of Ideation*/
        SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, "Scheduled")
            .then((scheduledResponse: number) => {
                setScheduledBGCount(scheduledResponse);
            })
            .catch((scheduledError: number) => {
                setScheduledBGCount(scheduledError);
            });
        /**Get the status counts of Completed */
        SearchService.searchGetBGStatusCount(lInnovationData.eskoAccountDetail.repoid, "Completed")
            .then((completedResponse: number) => {
                setCompletedBGCount(completedResponse);
            })
            .catch((completedError: number) => {
                setCompletedBGCount(completedError);
            });
    }

    useEffect(() => {
        /**Get the filter data */
        let holdStatusValue = window.sessionStorage.getItem("ppgViewStatus");
        if (holdStatusValue !== null && holdStatusValue.split(",") !== undefined) {
            setSelectedStatusValues(holdStatusValue.split(","));
        }
        /**set the count of the business goal status */
        statusCountUpdateFunction();
    }, []);

    /**To update the filter value as the status filter buttons are clicked.*/
    useEffect(() => {
        window.sessionStorage.setItem("ppgViewStatus", selectedStatusValues.toString());
    }, [selectedStatusValues]);

    /**To update the status count if the repo id/organization is changed */
    useEffect(() => {
        statusCountUpdateFunction();
    }, [lInnovationData.eskoAccountDetail]);

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() => {
        if (openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth)
        }
        else {
            setMarginContentView(leftNavWidth)
        }
    }, [openFilterMenu]);

    /**State to hold the array of Selected Runway nodeid's while filtering */
    const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);

    return (
        <Grid container >
            <Grid item style={{ position: 'absolute' }}>
                <FilterSubmenu
                    view="PPG"
                    openFilterMenu={openFilterMenu}
                    setOpenFilterMenu={setOpenFilterMenu}
                    listOfButtons={inListOfButtons}
                    selectedStatusValues={selectedStatusValues}
                    setSelectedStatusValues={setSelectedStatusValues}
                    selectedRunwaysList={selectedRunwaysList}
                    setSelectedRunwaysList={setSelectedRunwaysList}
                />
            </Grid>
            <Grid item style={{ marginLeft: marginContentView, transition: "150ms", marginTop: "12px", width: "100%" }}>
                <h3>PPG View</h3>
            </Grid>
        </Grid>
    )
}
