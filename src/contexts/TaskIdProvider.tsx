import React, { createContext, useState } from "react";


export const taskIdContext = createContext<TaskIdContextProps>(
    {
        id: 0,
        updateTaskId: (id) => { }
    }
);

interface TaskIdProviderProps {
    children: React.ReactNode;
}

interface TaskIdContextProps {
    id: number;
    updateTaskId: (id: number) => void;
}

export const TaskIdProvider = ({ children }: TaskIdProviderProps) => {
    const [taskId, setTaskId] = useState<number>(0);

    const taskIdContextValue: TaskIdContextProps = {
        id: taskId,
        updateTaskId: (id) => setTaskId(id)
    };

    return <taskIdContext.Provider value={taskIdContextValue}>
        {children}
    </taskIdContext.Provider>
}

