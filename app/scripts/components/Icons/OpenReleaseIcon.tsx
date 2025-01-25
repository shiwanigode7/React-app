import React from "react";

interface OpenReleaseIconPropsModel {
    className?: string;
    fill?: string;
}

export function OpenReleaseIcon(openReleaseIconProps: OpenReleaseIconPropsModel) {

    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={openReleaseIconProps.className}>
            <g clip-path="url(#clip0_1294_36547)">
                <path d="M24.1522 11.9998L12.1997 0.0473633L0.247243 11.9998L12.1997 23.9523L24.1522 11.9998Z" fill={openReleaseIconProps.fill} />
            </g>
            <defs>
                <clipPath id="clip0_1294_36547">
                    <rect width="24" height="24" fill="white" transform="translate(0.199707)" />
                </clipPath>
            </defs>
        </svg>
    );
}