/**TSX file with the generic table component with the basic UI and the theme */
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { COLOR_GREY_2, COLOR_WHITE } from "../../constant/Colors";
import { ScrollBarTheme, TableWrapperTheme } from "../../themes/TableTheme";

/**Interface for the inputColumn props */
export declare interface ColumnFieldData {
    /**The display name of the table header */
    label: any,
    /**The id of the column data */
    dataKey: string,
    /**The alignment type */
    alignment: "left" | "right" | "inherit" | "center" | "justify" | undefined,
    /**Whether the column is sortable or not */
    isSortable: boolean,
    /**Whether the column has a component or just text */
    isComponentColumn: boolean,
    /**Whether the column elements return the entire row data back */
    returnsRowData: boolean
    /**Width of the cell for the column. Total width = 100%, more than that will
     * cause alignment to be not proper.
     */
    cellWidth: string
}

/**Interface for the inputComponentColumn props */
export declare interface ComponentColumnFieldData {
    /**To display the component in the cell of tablehead */
    component: any,
    /**The id of the column data */
    dataKey: string,
    /**The alignment type */
    alignment: "left" | "right" | "inherit" | "center" | "justify" | undefined,
    /**Width of the cell for the column. Total width = 100%, more than that will
     * cause alignment to be not proper.
     */
    cellWidth: string
}

/**Interface for the row item if the isComponentColumn is true
 * Note: This is only for reference, this will be incorporated with the table row type
 * in the future. 
 */
export interface RowItemComponentModel {
    displayComponent: any;
    componentValue: any;
}

const TableWrapperStyles = makeStyles(() => ({

    tableHead: {
        width: "100%",
        alignItems: "center",
        "&.MuiTableSortLabel": {
            width: "100%",
        }
    }
}))

/**Input type for the TableWrapper */
declare interface TableProps {
    /**The input data to be displayed
     * If the data contains component it must be
     * an object with two fields
     * 1. displayComponent - the component to be displayed
     * 2. componentValue - the value on which sorting is performed
     * and this is the value that is returned when use clicks on the 
     * row.
    */
    inputData: any[],
    /**The header fields */
    inputColumn: ColumnFieldData[],
    /**The max height of the table */
    tableHeight: string,
    /**max width of the table */
    tableWidth?: string,
    /**Whether the row should be bordered or not */
    borderedRow: boolean,
    /**call back function */
    onRowClickCallBack: any,
    /**Custom message on when inputData is empty */
    customMessageOnEmpty: string | undefined,
    /**Search string */
    inputSearchData?: string,
    /**The columns to search  */
    inputSearchableField?: string[];
    isDragDisabled?: boolean;
    zIndexValue: number;
    setIsDragDisabled?: (isDragDisabled: boolean) => void;
    handleTopicDragEvent?: any;
    styleTableClasses?: any;
    isNoFilterApplied?: boolean;
    hideHeader?: boolean;
}

/**
 * Table wrapper component created on top of Material UI table
 * @param inputProps - input of containing array of input data to be displayed
 * in table body, Input column of the type ColumnFieldData, a call back funtion to 
 * call when user clicks on a row element, the max table height, and boolean of
 * whether the table must have bordered rows.
 */
export function TableWrapper(inputProps: TableProps) {
    /**Styling declaration */
    const ScrollBarThemeClass = ScrollBarTheme();

    const TableWrapperStylesClasses = TableWrapperStyles();

    /**if false no border between individual rows.
     * if true border is applied between individual rows.
     */
    let borderSelector: boolean = inputProps.borderedRow;

    /**value passed to the css property field of borderBottom */
    let borderBottomValue: string = "";

    /**Deciding border theme */
    if (borderSelector) {
        borderBottomValue = "solid 1px";
    }
    else {
        borderBottomValue = "none";
    }

    /**How much percentage of the screen should that table take */
    let tableHeight: string = inputProps.inputData.length !== 0 ? inputProps.tableHeight : "fit-content";

    /**To define the direction of the sorting */
    const [order, setOrder] = useState<"asc" | "desc" | undefined>('asc');
    /**To hold the field that needs to be sorted */
    const [orderBy, setOrderBy] = useState('priorityNumber');
    /**To see if the selected column for sorting has a component field. */
    const [isComponent, setIsComponent] = useState(false);

    const [isPriorityAscending, setIsPriorityAscending] = useState(true);

    const handleTopicDragEvent = (topicDragEvent: any) => {
        if (topicDragEvent.source.index !== topicDragEvent.destination.index) {
            inputProps.handleTopicDragEvent(topicDragEvent)
        }
    }

    /**useEffect to set the drag handler based on the runways and status. */
    useEffect(() => {
        if (inputProps.setIsDragDisabled) {
            if (inputProps.isNoFilterApplied && isPriorityAscending) {
                inputProps.setIsDragDisabled(false);
            } else {
                inputProps.setIsDragDisabled(true);
            }
        }
    }, [inputProps.isNoFilterApplied])

    /**Function to that returns the table data based on whether user has passed search related
     * inputs or not
    */
    const searchHandleFunction = () => {

        /**To Disable drag and drop when user search */
        if (inputProps.isNoFilterApplied) {
            if (!inputProps.isDragDisabled || isPriorityAscending) {
                if ((inputProps.inputSearchData === undefined || 0 == inputProps.inputSearchData.length) && isPriorityAscending) {
                    if (inputProps.setIsDragDisabled) {
                        inputProps.setIsDragDisabled(false);
                    }
                } else if (inputProps.setIsDragDisabled && (inputProps.isDragDisabled || !(inputProps.inputSearchData === undefined || 0 === inputProps.inputSearchData.length))) {
                    inputProps.setIsDragDisabled(true);
                }
            }
        }
        /**If user has not passed any search paramter just display the input table data passed */
        if (inputProps.inputSearchData === undefined || inputProps.inputSearchableField === undefined) {
            return tableSortFunction(inputProps.inputData, order, orderBy);
        }
        else {
            /**If search paramter is set filter the data and then display the data */
            return tableSortFunction(filterFunction(inputProps.inputData), order, orderBy);
        }
    }

    /**Function to filter the array based on the search string */
    const filterFunction = (inDataArray: any[]) => {
        /**Return the filtered data */
        return inDataArray.filter((rowData) => {
            /**Hold the array of all the searchable fields */
            const holdSearchableFields = inputProps.inputSearchableField !== undefined ? inputProps.inputSearchableField : [];
            /**Get the keys of the object and then iterate over those keys */
            return Object.keys(rowData).some((key) => {
                /**Check if the current key is the list of searchable fields, if not don't consider 
                 * that field for search
                 */
                if (holdSearchableFields.indexOf(key) > -1) {
                    /**If the value is an object take the component value assigned */
                    if (typeof (rowData[key]) === "object") {
                        /**Check for string and numbers */
                        if (typeof (rowData[key].componentValue) === "string") {
                            return (rowData[key].componentValue.toLowerCase().includes(inputProps.inputSearchData?.toLowerCase()))
                        }
                        else if (typeof (rowData[key].componentValue) === "number") {
                            return (rowData[key].componentValue.toString().toLowerCase().includes(inputProps.inputSearchData?.toLowerCase()))
                        }
                    }
                    else {
                        if (typeof (rowData[key]) === "string") {
                            return (rowData[key].toLowerCase().includes(inputProps.inputSearchData?.toLowerCase()))
                        }
                        else if (typeof (rowData[key]) === "number") {
                            return (rowData[key].toString().toLowerCase().includes(inputProps.inputSearchData?.toLowerCase()))
                        }
                    }
                }
            });
        });
    }

    /**Function to handle the sorting of table element when user clicks on header */
    const tableSortFunction = (array: any, inOrder: any, inOrderBy: any) => {
        /**If the filtered data is empty return the appropriate message */
        if (array.length === 0) {
            /**When the input data is empty */
            return (
                <TableRow>
                    <TableCell
                        colSpan={inputProps.inputColumn.length}
                        align={"center"}
                        style={{
                            fontWeight: "bold",
                            borderBottom: "none"
                        }}
                    >
                        {"No Results Found"}
                    </TableCell>
                </TableRow>
            );
        }

        array.sort((firstElement: any, secondElement: any) => {
            let lReturnValue: number = 0;
            /**Variables to hold the value of the data to be compared */
            let lFirstElementValue: any;
            let lSecondElementValue: any;
            /**Check if the column selected to sort has components in it */
            if (isComponent) {
                lFirstElementValue = firstElement[inOrderBy].componentValue;
                lSecondElementValue = secondElement[inOrderBy].componentValue;
            }
            else {
                lFirstElementValue = firstElement[inOrderBy];
                lSecondElementValue = secondElement[inOrderBy];
            }
            /**check the whether sorting is for a string value */
            if (typeof (lFirstElementValue) === "string") {
                if (lFirstElementValue.toLowerCase() < lSecondElementValue.toLowerCase()) {
                    lReturnValue = inOrder === "asc" ? -1 : 1;
                }
                if (lFirstElementValue.toLowerCase() > lSecondElementValue.toLowerCase()) {
                    lReturnValue = inOrder === "asc" ? 1 : -1;
                }
                if (lFirstElementValue.toLowerCase() === lSecondElementValue.toLowerCase()) {
                    lReturnValue = 0;
                }
            } else if (typeof (lFirstElementValue) === "number") {
                /**sorting for numeric value */
                /**returning the value based on whether the sorting is of ascending or descending */
                lReturnValue = inOrder === "asc" ? (lFirstElementValue - lSecondElementValue) : -(lFirstElementValue - lSecondElementValue);
            } else if (typeof (lFirstElementValue) === "boolean") {
                /**Sorting for boolean value */
                if (inOrder === "asc") {
                    lReturnValue = (lFirstElementValue === lSecondElementValue) ? 0 : (lFirstElementValue ? -1 : 1);
                }
                else {
                    lReturnValue = (lFirstElementValue === lSecondElementValue) ? 0 : (lFirstElementValue ? 1 : -1);
                }
            }
            return lReturnValue;
        });

        /**return the table rows component for each table data */
        return array.map((row: any) => (
            <Draggable
                // adding a key is important!
                key={row.nodePath === undefined ? row.discussionTopicId : row.nodePath}
                draggableId={row.nodePath === undefined ? row.discussionTopicId : row.nodePath}
                index={row.id} type="mpl-bg"
                //To be altered in the future
                isDragDisabled={inputProps.isDragDisabled || row.isDragAndDropDisabledForStatus ? true : false}
            >
                {
                    (provided: any) => (
                        <TableRow hover
                            style={{
                                outline: inputProps.borderedRow ? "auto" : "",
                                outlineColor: inputProps.borderedRow ? COLOR_GREY_2 : ""
                            }} ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {
                                inputProps.inputColumn.map((element) => (
                                    <TableCell
                                        key={element.dataKey}
                                        align={element.alignment}
                                        style={{
                                            whiteSpace: "nowrap",
                                            borderBottom: borderBottomValue,
                                            borderColor: "#edeeef",
                                            width: element.cellWidth,
                                            justifyContent: "center",
                                            cursor: (element.isComponentColumn && row[element.dataKey].cursor) ? row[element.dataKey].cursor : element.returnsRowData ? "pointer" : "default"
                                        }}
                                        onClick={() => {
                                            if (element.returnsRowData) {
                                                inputProps.onRowClickCallBack(row);
                                            }
                                        }}
                                    >
                                        {
                                            element.isComponentColumn ?
                                                row[element.dataKey].displayComponent :
                                                row[element.dataKey]
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    )
                }
            </Draggable>
        ));
    }

    /**Function to enable sorting when user clicks on the table header */
    const handleColumnSort = (columnDataField: any, isSortableColumn: boolean, hasComponentFields: boolean) => {
        /**If the column is to be sorted */
        if (isSortableColumn) {
            /**check if the column selected was sorted in any order on previous sort click
            * if yes change the order of sorting 
            * If no sort the newly selected column in ascending order
            */
            const lIsAsc = orderBy === columnDataField && order === 'asc';
            setOrder(lIsAsc ? 'desc' : 'asc');
            if (("priorityNumber" === columnDataField) && (!lIsAsc)) {
                if (inputProps.setIsDragDisabled) {
                    inputProps.setIsDragDisabled(false);
                }
                setIsPriorityAscending(true);
            } else {
                if (inputProps.setIsDragDisabled) {
                    inputProps.setIsDragDisabled(true);
                }
                setIsPriorityAscending(false);
            }
            /**Set the column to be sorted */
            setOrderBy(columnDataField);
            /**Check if the column has a component fields and they are to be sorted */
            if (hasComponentFields) {
                setIsComponent(true);
            } else {
                setIsComponent(false);
            }
        }
    }

    return (
        <ThemeProvider theme={TableWrapperTheme}>
            <Paper
                style={{
                    height: tableHeight,
                    width: inputProps.tableWidth !== undefined ? inputProps.tableWidth : "90vw"
                }}
                className={undefined !== inputProps.styleTableClasses ? inputProps.styleTableClasses.paperStyles : undefined}
                elevation={inputProps.borderedRow ? 0 : 1}
            >
                <TableContainer className={ScrollBarThemeClass.ScrollBarClass} >
                    {/**Customizing the table to have a sticky header (header will be visible even if you scroll) */}
                    <Table
                        stickyHeader
                        style={{
                            padding: inputProps.borderedRow ? "0px" : "10px",
                            border: inputProps.borderedRow ? "solid 1px" : "",
                            borderColor: inputProps.borderedRow ? "#edeeef" : "",
                        }}
                    >
                        {/**Header of the table */}
                        <TableHead
                            style={{
                                outline: inputProps.borderedRow ? "auto" : "",
                                outlineColor: inputProps.borderedRow ? "#edeeef" : "",
                                display: inputProps.hideHeader ? "none" : ""
                            }}
                        >
                            <TableRow>
                                {/**Iterater over each column variable */}
                                {
                                    inputProps.inputColumn.map((element) => (
                                        <TableCell
                                            key={element.dataKey}
                                            align={element.alignment}
                                            style={{
                                                zIndex: inputProps.zIndexValue,
                                                background: COLOR_WHITE,
                                                whiteSpace: "nowrap",
                                                borderBottom: "solid 1px",
                                                borderColor: "#edeeef",
                                                width: element.cellWidth
                                            }}
                                        >
                                            <TableSortLabel
                                                active={orderBy === element.dataKey && element.isSortable}
                                                /**No need to hide the icon if sorting is activated
                                                 * and vice versa
                                                 */
                                                classes={{
                                                    root: TableWrapperStylesClasses.tableHead
                                                }}
                                                style={{ justifyContent: element.alignment }}
                                                hideSortIcon={!element.isSortable}
                                                /**Current sort direction */
                                                direction={orderBy === element.dataKey ? order : 'asc'}
                                                onClick={() => { handleColumnSort(element.dataKey, element.isSortable, element.isComponentColumn) }}
                                            >
                                                {element.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        {/**The table body - the content part */}
                        <DragDropContext onDragEnd={handleTopicDragEvent}>
                            <Droppable droppableId="mpl-table" type="mpl-bg">
                                {
                                    (provided: any) => (
                                        <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                            {
                                                /**If the table body has no data */
                                                inputProps.inputData.length !== 0 ?
                                                    searchHandleFunction()
                                                    : (
                                                        /**When the input data is empty */
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={inputProps.inputColumn.length}
                                                                align={"center"}
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    borderBottom: "none"
                                                                }}
                                                            >
                                                                {inputProps.customMessageOnEmpty}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                            }
                                            {provided.placeholder}
                                        </TableBody>
                                    )
                                }
                            </Droppable>
                        </DragDropContext>
                    </Table>
                </TableContainer>
            </Paper>
        </ThemeProvider >
    );
}
