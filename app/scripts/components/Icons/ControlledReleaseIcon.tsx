import React from "react";

interface ControlledReleaseIconPropsModel {
    className?: string;
    fill?: string;
}

export function ControlledReleaseIcon(controlledReleaseIconProps: ControlledReleaseIconPropsModel) {

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={controlledReleaseIconProps.className}>
            <path d="M12 4.24275L19.7572 12L12 19.7572L4.24275 12L12 4.24275ZM12 0L0 12L12 24L24 12L12 0Z" fill={controlledReleaseIconProps.fill} />
        </svg>
    );
}