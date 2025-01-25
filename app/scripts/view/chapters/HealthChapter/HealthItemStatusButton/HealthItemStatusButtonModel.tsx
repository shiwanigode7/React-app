export default interface HealthItemStatusButtonModel {
    item: string;
    status: string;
    isCommentPresent: boolean;
    isDisabled : boolean;
    handleStatusChange: (item: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}