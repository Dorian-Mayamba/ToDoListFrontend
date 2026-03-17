import { Box, Button, Link, TextField, Typography } from "@mui/material";
import type React from "react";
import {useNavigate} from 'react-router-dom';
import type { LoginState } from "../types";
import { useState } from "react";
import LoginForm from "../Forms/LoginForm";


const initialState : LoginState = {
    email : '',
    password: ''
};

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState<LoginState>(initialState);
    
    const HandleSubmit = (e: React.SubmitEvent<HTMLElement>) => {
        console.log(login);
        navigate('/', {replace: true})
    }

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;

        setLogin((prev) => ({...prev, [name]:value}));
    }
    
    return (
        <LoginForm
            onChange={HandleChange}
            onSubmit={HandleSubmit}
            />
    )
}

export default Login;