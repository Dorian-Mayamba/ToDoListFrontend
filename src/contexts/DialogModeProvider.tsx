import { createContext, useState } from "react";
import type { DialogModeProps } from "../types";

export const dialogModeContext = createContext<DialogContextTyoe | null>(null);

interface DialogModeProviderProps {
    children: React.ReactNode;
}

interface DialogContextTyoe {
    mode: DialogModeProps;
    UpdateDialogMode: (mode: DialogModeProps) => void;
}

export const DialogModeProvider = ({ children }: DialogModeProviderProps) => {
    const [dialogMode, setDialogMode] = useState<DialogModeProps>(null);

    var dialogContextVal: DialogContextTyoe = {
        mode: dialogMode,
        UpdateDialogMode: (mode) => setDialogMode(mode)
    }

    return (

        <dialogModeContext.Provider value={dialogContextVal}>
            {children}
        </dialogModeContext.Provider>
    )

}

