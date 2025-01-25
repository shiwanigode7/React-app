export const defaultOTDFreezeIn = "0 days, 0 hours, 0 minutes";

export function parseInt(string: string): number {
    let number: number = Number.parseInt(string);
    if (isNaN(number)) {
        number = 0;
    }
    return number;
}

export function isDigit(string: string): boolean {
    return /^\d+$/.test(string);
}

export function FormatDate(date: string): string {
    const dateParts = date.match(/\d+/g);
    const year: string = dateParts ? dateParts[0] : "";
    const month: string = dateParts ? dateParts[1] : "";
    const day: string = dateParts ? dateParts[2] : "";
    return (day + '-' + month + '-' + year);
}

export function isNull(value: any): boolean {
    if (null === value) {
        return true;
    }
    return false;
}

export function getCurrentYear(): number {
    return new Date().getFullYear();
}

export function getNextMonth(inMonthDate: Date): string {
    let nextMonthDate: Date = inMonthDate;
    nextMonthDate.setMonth(inMonthDate.getMonth() + 1);
    return MONTH_NAMES[nextMonthDate.getMonth()] + " " + nextMonthDate.getFullYear().toString();
}

export function getPreviousMonth(inMonthDate: Date): string {
    let prevMonthDate: Date = inMonthDate;
    prevMonthDate.setMonth(inMonthDate.getMonth() - 1);
    return MONTH_NAMES[prevMonthDate.getMonth()] + " " + prevMonthDate.getFullYear().toString();
}

export function diffWithCurrentDate(endDate: Date): string {
    const currentDate: Date = new Date();
    const seconds = Math.floor((endDate.getTime() - (currentDate.getTime())) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);

    if (0 > days || isNaN(days)) {
        return defaultOTDFreezeIn;
    }

    return days.toString() + " days, " + hours.toString() + " hours, " + minutes.toString() + " minutes"
}

export function isZero(string: string): boolean {
    return (0 === parseInt(string));
}

export function isEmpty(string: string): boolean {
    if ("" === string) {
        return true;
    }
    return false;
}

export const MONTH_NAMES: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

/** forms todays date in 01 Jan, 2020 format and returns */
export function getDateInDDMMMYYYYFormat(): string {


    const dateData: Date = new Date();
    const date: number = dateData.getDate();
    const month: string = MONTH_NAMES[dateData.getMonth()];
    const year: number = dateData.getFullYear();
    return date + " " + month.substring(0, 3) + ". " + year;
}

export function convertDateIntoDDMMMYYYYFormat(dateToBeConverted: string): string {
    let lFormattedDate: string = "";
    if (dateToBeConverted != "") {
        const splitedStrings: string[] = dateToBeConverted.split("-");
        const yearInYYYYFormat: string = splitedStrings[0];
        const monthInMMFormat: string = splitedStrings[1];
        const dateInDDFormat: string = splitedStrings[2];
        const month: string = MONTH_NAMES[parseInt(monthInMMFormat) - 1];
        lFormattedDate = dateInDDFormat + " " + month.substring(0, 3) + ". " + yearInYYYYFormat;
    }
    else {
        lFormattedDate = dateToBeConverted;
    }
    return lFormattedDate;
}

export function convertDateIntoDDMMMFormat(dateToBeConverted: string): string {
    let lFormattedDate: string = "";
    if (dateToBeConverted != "") {
        const splitedStrings: string[] = dateToBeConverted.split("-");
        const monthInMMFormat: string = splitedStrings[1];
        const dateInDDFormat: string = splitedStrings[2];
        const month: string = MONTH_NAMES[parseInt(monthInMMFormat) - 1];
        lFormattedDate = dateInDDFormat + " " + month.substring(0, 3);
    }
    else {
        lFormattedDate = dateToBeConverted;
    }
    return lFormattedDate;
}

export function isNumberZero(number: number) {
    if (0 === number) {
        return true;
    }
    return false;
}

/**
 * Adds thousand separator to a string. It do not check whether passed
 * string is number or not
 */
export function addThousandSeparatorToString(string: string): string {
    let extra = 0;
    let convertedValue: any = string.replace(/[\D\s\._\-]+/g, "");
    convertedValue = convertedValue ? Number.parseInt(convertedValue, 10) : 0;
    convertedValue += extra;
    return convertedValue.toLocaleString("en-US");
}

/**
 * Adds thousand separator to a number.
 */
export function addThousandSeparator(value: number): string {
    if (undefined !== value) {
        return value.toLocaleString("en-US");
    } else {
        return "0";
    }
}

export function isFloatingNumber(string: string): boolean {
    return /^[0-9.]+$/.test(string);
}

export function parseFloat(string: string): number {
    let number: number = Number.parseFloat(string);
    if (isNaN(number)) {
        number = 0.0;
    }
    return number;
}

export function convertTime(inStartTime: string): string {

    let hour: number = parseInt(inStartTime.split(":")[0]);
    let min: number = parseInt(inStartTime.split(":")[1]);
    let standardTime: string = "am";
    if (hour > 12) {
        standardTime = "pm"
        hour = hour % 12;
    } else if (hour === 0) {
        hour = 12;
    } else if (hour === 12) {
        standardTime = "pm"
    }
    let stringHour = hour < 10 ? "0" + hour.toString() : hour.toString();
    let stringMin = min < 10 ? "0" + min.toString() : min.toString();
    return (stringHour + ":" + stringMin + " " + standardTime)
}

/*Calculate the schedule end time for SIR/PPG discussion topics */
export const getEndTime = (inStartTime: string, inDuration: number): string => {
    let lEndTime: string = "";
    let hour: number = parseInt(inStartTime.split(":")[0]);

    let min: number = parseInt(inStartTime.split(":")[1]);

    min = min + parseInt(inDuration.toString());

    if (60 <= min) {
        hour = hour + Math.floor(min / 60);
        min = min % 60;
    }

    let stringHour = hour < 10 ? "0" + hour.toString() : hour.toString();

    let stringMin = min < 10 ? "0" + min.toString() : min.toString();
    lEndTime = stringHour + ":" + stringMin;

    return (lEndTime);
}

export const convertToMillionGetWithoutUnit = (amount: number) => {
    return (Math.sign(amount) * (Math.round(((Math.abs(amount) / 1000) + Number.EPSILON) * 10) / 10));
};

export const convertToMillion = (amount: number) => {
    const amountInMillion = convertToMillionGetWithoutUnit(amount).toString();
    return `${amountInMillion} M$`
};

export const roundToOneDecimalPointWithThousandSeparator = (value: number) => {
    const result = (Math.round((value + Number.EPSILON) * 10) / 10);
    return addThousandSeparator(result);
}