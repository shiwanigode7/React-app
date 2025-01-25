export default interface AlertPopupModel {
    isOpen: boolean;
    severity?: 'success' | 'info' | 'warning' | 'error';
    content?: string;
    handleCloseButtonClick?: any
}