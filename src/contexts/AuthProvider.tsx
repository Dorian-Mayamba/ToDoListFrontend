import { createContext, useState } from "react";
import type { AuthType } from "../types";

var initialState : AuthType = {
    id : 0,
    name : '',
    email: '',
    task: [],
    token : ''
};

interface AuthProviderProps {
    children : React.ReactNode;
}

export const authContext = createContext<AuthContextProps>(
    {
        auth : initialState,
        setAuth(auth) {
            
        },
    }
);

interface AuthContextProps {
    auth : AuthType;
    setAuth : (auth : AuthType) => void;
}

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthType>(initialState);

    const authContextValue : AuthContextProps = {
        auth : auth,
        setAuth : (auth) => setAuth(auth)
    };

    return <authContext.Provider value={authContextValue}>
        {children}
    </authContext.Provider>
    
}