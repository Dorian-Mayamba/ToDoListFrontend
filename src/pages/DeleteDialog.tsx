import { Dialog } from "@mui/material";

interface DeleteDialogProps{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function DeleteDialog({open, onClose, children}: DeleteDialogProps){
    return <Dialog open={open} onClose={onClose}>
        {children}
    </Dialog>
}

export default DeleteDialog;