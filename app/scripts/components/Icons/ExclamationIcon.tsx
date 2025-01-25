import React from "react";

interface ExclamationIconPropsModel {
    className?: string;
    fill?: string;
}

export function ExclamationIcon(exclamationIconProps: ExclamationIconPropsModel) {

    return (
        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={exclamationIconProps.className}>
            <path d="M29.8334 10.667H35.1667V40.0003H29.8334V10.667ZM35.1667 48.0003V53.3337H29.8334V48.0003H35.1667Z" fill={undefined !== exclamationIconProps.fill ? exclamationIconProps.fill: "white"} />
        </svg>

    );
}