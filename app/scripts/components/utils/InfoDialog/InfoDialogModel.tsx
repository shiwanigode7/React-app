export default interface InfoDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogTitle: string;
    dialogContent: string[];
}