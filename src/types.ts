export type TaskItemProps = {
    id : number;
    name: string;
    description: string;
    status: string;
    priority: string;
}

export type TaskListProps = {
    tasks: TaskItemProps[];
}

export type DialogModeProps = 'ADD' | 'EDIT' | 'DELETE' | null;

