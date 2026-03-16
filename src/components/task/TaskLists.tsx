import type { TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

function TaskList({ tasks }: TaskListProps) {
    return <>
        {tasks.map(({id, name, description, status, priority }, index) => (
            <TaskItem
                key={index}
                id={id}
                name={name}
                description={description}
                status={status}
                priority={priority} />
        ))}
    </>
}

export default TaskList;