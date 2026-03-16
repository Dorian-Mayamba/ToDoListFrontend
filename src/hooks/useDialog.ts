import { useContext } from "react"
import { dialogModeContext } from "../contexts/DialogModeProvider"


const useDialog = () => {
    var context = useContext(dialogModeContext);
    if (!context) throw new Error('Cannot load dialog context');
    return context;
}

export default useDialog;