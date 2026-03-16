import { createContext, useState } from "react";
import type { TaskItemProps } from "../types";

var initialState : TaskItemProps = {
    id : 0,
    name: '',
    description : '',
    status: 'Not Started',
    priority : 'Normal'
};

export const taskContext = createContext<FormContextProps>(
    {
        task : initialState,
        updateTask : (e) => {},
        setTask : (task) => {},
        resetTask : () => {}
    }
);

interface FormProviderProps {
    children : React.ReactNode;
}

interface FormContextProps {
    task : TaskItemProps;
    updateTask : (e : React.ChangeEvent<HTMLInputElement>) => void;
    setTask : (task : TaskItemProps) => void;
    resetTask : () => void;
}

export const FormProvider = ({children} : FormProviderProps) =>{
    const [task, setTask] = useState<TaskItemProps>(initialState);

    var formContextValue : FormContextProps = {
        task : task,
        updateTask: (e) => {
            const {name, value} = e.target;
            setTask((prev) => ({...prev, [name] : value}));
        },
        setTask : (task) => setTask(task),
        resetTask : () => setTask(initialState)
    };
    
    return <taskContext.Provider value={formContextValue}>
        {children}
    </taskContext.Provider>
}

