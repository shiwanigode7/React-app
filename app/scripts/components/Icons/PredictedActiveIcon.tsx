import React from "react";

interface PredictedActiveIconPropsModel {
    className?: string;
    fill?: string;
}

export function PredictedActiveIcon(predictedActiveIconProps: PredictedActiveIconPropsModel) {

    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={predictedActiveIconProps.className}>
            <path d="M6.3999 5.29602V18.704C6.3999 19.7264 7.60049 20.3476 8.52509 19.7911L19.7582 13.0871C20.6138 12.5824 20.6138 11.4176 19.7582 10.8999L8.52509 4.20889C7.60049 3.65238 6.3999 4.2736 6.3999 5.29602Z" fill={predictedActiveIconProps.fill} />
        </svg>
    );
}