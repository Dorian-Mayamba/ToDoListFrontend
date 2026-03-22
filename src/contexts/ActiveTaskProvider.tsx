import React, { createContext, useState } from "react";
import type { TaskItemProps } from "../types";

interface ActiveTaskProps {
    children : React.ReactNode;
}

interface ActiveTaskContextProps {
    activeTask : TaskItemProps;
    updateActiveTask : (activateTask : TaskItemProps) => void;
}

var initialState : TaskItemProps = {
    id : 0,
    name: '',
    status: 'Not Started',
    priority : 'Normal'
};

export const activeTaskContext = createContext<ActiveTaskContextProps>({
    activeTask : initialState,
    updateActiveTask(task) {
    },
})

export const ActiveTaskProvider = ({children} : ActiveTaskProps) => {
    const [activeTask, setActiveTask] = useState<TaskItemProps>(initialState);

    const ActiveTaskContextValue : ActiveTaskContextProps = {
        activeTask : activeTask,
        updateActiveTask : (task : TaskItemProps) => setActiveTask(task)
    }
    
    return <activeTaskContext.Provider value={ActiveTaskContextValue}>
        {children}
    </activeTaskContext.Provider>
}