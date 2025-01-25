import { Typography } from "@material-ui/core";
import React, { useState } from "react";

/**Decalring types for props */
declare interface DisplayNotesInterface {
    /**Data of the particular note */
    notesData: string
}

export function DisplayNotesData (inputProps: DisplayNotesInterface ) {
    /**State variable to indicate to show less or more data */
    const [showLess,setShowLess] = useState<boolean>(true)
    
    /**Function to switch View from more to less and vice versa */
    const switchView = () => {
        setShowLess(!showLess);
    }
    
    return (
        <div>
            <Typography style={{textAlign:"justify", whiteSpace: "pre-line", maxWidth:"430px", wordWrap: "break-word"}}>
                {inputProps.notesData.length <= 200 ? inputProps.notesData : 
                (
                <div>
                    {showLess ? inputProps.notesData.slice(0, 200) : inputProps.notesData}
                    <span style={{color:"#0079D1", cursor:"pointer", userSelect:"none"}} onClick={switchView}>
                        {showLess ? "...read more" : " show less"}
                    </span>
                </div>
                )}
            </Typography>
        </div>
    )
}