import ColumnModel from "./ColumnModel";

export default interface BasicTableModel {
    columns: ColumnModel[];
    rows: any[];
    tableHeight: string;
    tableWidth?: string;
    borderedRow: boolean;
    customMessageOnEmpty: string | undefined;
}