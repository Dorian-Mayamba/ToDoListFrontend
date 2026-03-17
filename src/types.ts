export type TaskItemProps = {
    id : number;
    name: string;
    description: string;
    status: string;
    priority: string;
}

export type TaskListProps = {
    tasks: TaskItemProps[]
};

export type DialogModeProps = 'ADD' | 'EDIT' | 'DELETE' | null;

export type AuthType = {
    id : number;
    email : string;
    token : string;
    name : string;
    task : TaskItemProps[]
}

export type LoginState = {
    email : string;
    password : string;
}

export type RegisterState = {
    name : string;
    email : string;
    password : string;
    passwordConfirm : string;
}

