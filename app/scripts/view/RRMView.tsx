import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FilterSubmenu from '../components/FilterSubmenu';

export default function RRMView(){
    /**Defining the widths of the sideNavPanel */
    const maxDrawerWidth: number = 240;
    const leftNavWidth: number = 73;
    
    /**Variable to track if the side nav panel (drawer) is open or not, by default it is open */
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(true)

    /**Variable to hold the margin-left displacement for the content view (the space excluding the left nav and the side nav) */
    const [marginContentView, setMarginContentView] = useState<number>(maxDrawerWidth + leftNavWidth)
    
    /**State to hold the array of Selected Runway nodeid's while filtering */
    const [selectedRunwaysList, setSelectedRunwaysList] = useState<string[]>([]);

    /**When even the sideNavOpen changes update the marginContentView */
    useEffect(() =>{
        if(openFilterMenu) {
            setMarginContentView(maxDrawerWidth + leftNavWidth)
        }
        else {
            setMarginContentView(leftNavWidth)
        }
    },[openFilterMenu])
    
    return (
        <Grid container >
            {/**Settings sub panel */}
            <Grid item style={{ position: 'absolute' }}>
                <FilterSubmenu 
                    view="RRM" 
                    openFilterMenu={openFilterMenu} 
                    setOpenFilterMenu={setOpenFilterMenu}
                    selectedRunwaysList={selectedRunwaysList}
                    setSelectedRunwaysList={setSelectedRunwaysList}/>
            </Grid>
            <Grid item style={{ marginLeft: marginContentView, transition: "150ms", marginTop: "12px", width: "auto" }}>        
                    <h3>RRM View</h3>
            </Grid>
        </Grid>
    )
}