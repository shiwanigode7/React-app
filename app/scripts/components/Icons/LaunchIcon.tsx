import React from "react";

interface LaunchIconPropsModel {
    className?: string;
    fill?: string;
}

export function LaunchIcon(lexIconProps: LaunchIconPropsModel) {

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={lexIconProps.className}>
            <rect width="24" height="24" rx="4" fill={lexIconProps.fill}/>
            <path d="M14.7461 15.1289V16.5H10.4512V15.1289H14.7461ZM11.0195 7.96875V16.5H9.26172V7.96875H11.0195Z" fill="white"/>
        </svg>

    );
}