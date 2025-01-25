import React from "react";

interface PowerPointIconPropsModel {
    className?: string;
    fill?: string;
}

export function PowerPointIcon(powerPointIconProps: PowerPointIconPropsModel) {

    return (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={powerPointIconProps.className}>
            <path d="M20.5 0V8H28.5L20.5 0Z" fill="#91959A" />
            <path d="M15.794 16H14.5V21H15.794C17.435 21 18.256 19.947 18.256 18.476C18.256 17.037 17.435 16 15.794 16Z" fill="#91959A" />
            <path d="M18.5 10V8V0H4.5V32H28.5V10H20.5H18.5ZM20.016 21.785C19.027 22.654 17.706 23 16.052 23H14.5V28H11.5V14H16.328C19.776 14 21.5 15.443 21.5 18.417C21.5 19.823 21.005 20.916 20.016 21.785Z" fill="#91959A" />
        </svg>
    );
}