export interface AddCommentDialogProps {
    open: boolean;
    title: string;
    textFieldValue: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    actionButtonLabel: string;
    maxCharLimit: number;
    handleChange: any;
    handleOnSave: any
}