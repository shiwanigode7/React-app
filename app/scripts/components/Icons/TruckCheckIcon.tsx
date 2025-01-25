import React from "react";
import { COLOR_GRAPHITE_2 } from "../../constant/Colors";

interface TruckIconPropsModel {
    className?: string;
    fill?: string;
    size?: string;
}

export function TruckIcon(truckIconProps: TruckIconPropsModel) {

    return (
        <svg width={undefined !== truckIconProps.size ? truckIconProps.size : "65"} height={undefined !== truckIconProps.size ? truckIconProps.size : "64"} viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={truckIconProps.className}>
            <path d="M10.6819 13.333H44.6213V23.333H51.894L59.1667 33.333V45.833H54.3182C54.3182 47.8221 53.552 49.7298 52.1881 51.1363C50.8242 52.5428 48.9743 53.333 47.0455 53.333C45.1166 53.333 43.2668 52.5428 41.9029 51.1363C40.539 49.7298 39.7728 47.8221 39.7728 45.833H25.2273C25.2273 47.8221 24.4611 49.7298 23.0972 51.1363C21.7333 52.5428 19.8834 53.333 17.9546 53.333C16.0257 53.333 14.1759 52.5428 12.812 51.1363C11.4481 49.7298 10.6819 47.8221 10.6819 45.833H5.83337V18.333C5.83337 17.0069 6.3442 15.7352 7.25346 14.7975C8.16273 13.8598 9.39596 13.333 10.6819 13.333ZM44.6213 27.083V33.333H55.4576L50.6819 27.083H44.6213ZM17.9546 42.083C16.9902 42.083 16.0652 42.4781 15.3833 43.1814C14.7013 43.8846 14.3182 44.8384 14.3182 45.833C14.3182 46.8276 14.7013 47.7814 15.3833 48.4847C16.0652 49.1879 16.9902 49.583 17.9546 49.583C18.919 49.583 19.8439 49.1879 20.5259 48.4847C21.2078 47.7814 21.591 46.8276 21.591 45.833C21.591 44.8384 21.2078 43.8846 20.5259 43.1814C19.8439 42.4781 18.919 42.083 17.9546 42.083ZM47.0455 42.083C46.0811 42.083 45.1562 42.4781 44.4742 43.1814C43.7923 43.8846 43.4091 44.8384 43.4091 45.833C43.4091 46.8276 43.7923 47.7814 44.4742 48.4847C45.1562 49.1879 46.0811 49.583 47.0455 49.583C48.0099 49.583 48.9348 49.1879 49.6168 48.4847C50.2987 47.7814 50.6819 46.8276 50.6819 45.833C50.6819 44.8384 50.2987 43.8846 49.6168 43.1814C48.9348 42.4781 48.0099 42.083 47.0455 42.083ZM22.8031 38.333L37.3485 23.333L33.9303 19.783L22.8031 31.258L17.7364 26.033L14.3182 29.583L22.8031 38.333Z" fill={undefined !== truckIconProps.fill ? truckIconProps.fill: COLOR_GRAPHITE_2} />
        </svg>
    );
}