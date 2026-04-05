import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

function TaskList({tasks} : TaskListProps) {
    return <>
        {tasks.map(({id, name, status, priority }) => (
            <TaskItem
                key={id}
                id={id}
                name={name}
                status={status}
                priority={priority} />
        ))}
    </>
}

export default TaskList;