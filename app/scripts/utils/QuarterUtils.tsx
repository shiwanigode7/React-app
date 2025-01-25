import { QuarterModel } from "../interfaces/InnovationInterface";
/** Util function to generate last 4 quarters with the last quarter as the current one */

export const getLastFourQuarters = () => {
    let today = new Date();

    var quarter: QuarterModel[] = [];
    const firstQuarter: QuarterModel = {
        quarterStart: "-01",
        quarterEnd: "-03",
        quarterDetails: "Q1 '"
    };
    const secondQuarter: QuarterModel = {
        quarterStart: "-04",
        quarterEnd: "-06",
        quarterDetails: "Q2 '"
    };
    const thirdQuarter: QuarterModel = {
        quarterStart: "-07",
        quarterEnd: "-09",
        quarterDetails: "Q3 '"
    };
    const fourthQuarter: QuarterModel = {
        quarterStart: "-10",
        quarterEnd: "-12",
        quarterDetails: "Q4 '"
    };
    const currentFullYear: string = today.getFullYear().toString();
    const previousFullYear: string = (today.getFullYear() - 1).toString()
    let currentYear: string = currentFullYear.substring(2);
    let previousYear: string = previousFullYear.substring(2);


    switch (today.getMonth()) {
        case 0:
        case 1:
        case 2:
            {
                quarter = [
                    {
                        quarterStart: previousFullYear + secondQuarter.quarterStart,
                        quarterEnd: previousFullYear + secondQuarter.quarterEnd,
                        quarterDetails: secondQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: previousFullYear + thirdQuarter.quarterStart,
                        quarterEnd: previousFullYear + thirdQuarter.quarterEnd,
                        quarterDetails: thirdQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: previousFullYear + fourthQuarter.quarterStart,
                        quarterEnd: previousFullYear + fourthQuarter.quarterEnd,
                        quarterDetails: fourthQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: currentFullYear + firstQuarter.quarterStart,
                        quarterEnd: currentFullYear + firstQuarter.quarterEnd,
                        quarterDetails: firstQuarter.quarterDetails + currentYear
                    }
                ];
                break;
            }
        case 3:
        case 4:
        case 5:
            {
                quarter = [
                    {
                        quarterStart: previousFullYear + thirdQuarter.quarterStart,
                        quarterEnd: previousFullYear + thirdQuarter.quarterEnd,
                        quarterDetails: thirdQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: previousFullYear + fourthQuarter.quarterStart,
                        quarterEnd: previousFullYear + fourthQuarter.quarterEnd,
                        quarterDetails: fourthQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: currentFullYear + firstQuarter.quarterStart,
                        quarterEnd: currentFullYear + firstQuarter.quarterEnd,
                        quarterDetails: firstQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + secondQuarter.quarterStart,
                        quarterEnd: currentFullYear + secondQuarter.quarterEnd,
                        quarterDetails: secondQuarter.quarterDetails + currentYear
                    }
                ];
                break;
            }
        case 6:
        case 7:
        case 8:
            {
                quarter = [
                    {
                        quarterStart: previousFullYear + fourthQuarter.quarterStart,
                        quarterEnd: previousFullYear + fourthQuarter.quarterEnd,
                        quarterDetails: fourthQuarter.quarterDetails + previousYear
                    },
                    {
                        quarterStart: currentFullYear + firstQuarter.quarterStart,
                        quarterEnd: currentFullYear + firstQuarter.quarterEnd,
                        quarterDetails: firstQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + secondQuarter.quarterStart,
                        quarterEnd: currentFullYear + secondQuarter.quarterEnd,
                        quarterDetails: secondQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + thirdQuarter.quarterStart,
                        quarterEnd: currentFullYear + thirdQuarter.quarterEnd,
                        quarterDetails: thirdQuarter.quarterDetails + currentYear
                    }
                ];
                break;
            }
        case 9:
        case 10:
        case 11:
            {
                quarter = [
                    {
                        quarterStart: currentFullYear + firstQuarter.quarterStart,
                        quarterEnd: currentFullYear + firstQuarter.quarterEnd,
                        quarterDetails: firstQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + secondQuarter.quarterStart,
                        quarterEnd: currentFullYear + secondQuarter.quarterEnd,
                        quarterDetails: secondQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + thirdQuarter.quarterStart,
                        quarterEnd: currentFullYear + thirdQuarter.quarterEnd,
                        quarterDetails: thirdQuarter.quarterDetails + currentYear
                    },
                    {
                        quarterStart: currentFullYear + fourthQuarter.quarterStart,
                        quarterEnd: currentFullYear + fourthQuarter.quarterEnd,
                        quarterDetails: fourthQuarter.quarterDetails + currentYear
                    }
                ];
                break;
            }
        default:
            {
                throw "Invalid Month value";
            }
    }
    return quarter;
}