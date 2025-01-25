import React from "react";

interface CheckIconPropsModel {
    className?: string;
    fill?: string;
}

export function CheckIcon(checkIconProps: CheckIconPropsModel) {

    return (
        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={checkIconProps.className}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5 43.1195L15.2467 33.8662C14.2067 32.8262 12.5267 32.8262 11.4867 33.8662C10.4467 34.9062 10.4467 36.5862 11.4867 37.6262L22.6333 48.7729C23.6733 49.8129 25.3533 49.8129 26.3933 48.7729L54.6067 20.5595C55.6467 19.5195 55.6467 17.8395 54.6067 16.7995C53.5667 15.7595 51.8867 15.7595 50.8467 16.7995L24.5 43.1195Z" fill={undefined !== checkIconProps.fill ? checkIconProps.fill: "white"} />
        </svg>
    );
}