
/**
 * Function to save a key-value pair in browser local storage
 * @param inKeyName - The key name of the value being stored
 * @param inValue - The data to be saved
 */
export function saveDataToLocalStorage(inKeyName: string, inValue: string) {
    window.localStorage.setItem(inKeyName, inValue);
}

/**
 * Function to get the value of the key name passed from the local storage
 * @param inKeyName - The key name of the value to be fetched
 * @returns - Value of the key passed, if the key is not found returns empty string
 */
export function getLocalStorageData(inKeyName: string) {
    const lValue: string | null = window.localStorage.getItem(inKeyName);
    let outValue: string = "";
    if (null !== lValue) {
        outValue = lValue;
    }
    return outValue;
}