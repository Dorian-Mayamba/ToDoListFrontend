import { Dialog, DialogTitle } from "@mui/material";


interface DialogProps {
    open: boolean;
    onClose: (value: boolean) => void;
    children: React.ReactNode
}

function ToDoDialog(props: DialogProps) {

    const { open, onClose, children } = props;


    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Task</DialogTitle>
            {children}
        </Dialog>
    )
}

export default ToDoDialog;