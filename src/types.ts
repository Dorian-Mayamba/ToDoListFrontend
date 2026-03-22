import type { ChartSeriesTypeRequiredPlugins } from "@mui/x-charts/internals";

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
    first_name : string;
    last_name : string;
    email : string;
    password : string;
    passwordConfirm : string;
}

export type UserDetail = {
    pk : number;
    username : string;
    email : string;
    first_name : string;
    last_name : string;
}

export type AuthResponse = {
    access : string;
    refresh : string;
    user : UserDetail;
}

export type TaskResponse = {
    name : string;
    priority : string;
    status : string;
}

