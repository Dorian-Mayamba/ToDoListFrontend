import type React from "react";
import {useNavigate} from 'react-router-dom';
import type { AuthResponse, LoginState } from "../types";
import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import useFetch from "../hooks/useFetch";
import { authEnpoint } from "../constants";


const initialState : LoginState = {
    email : '',
    password: ''
};

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState<LoginState>(initialState);
    
    const HandleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {

        const {data, loading, error} = await useFetch<AuthResponse>(import.meta.env.VITE_SERVER_URL + authEnpoint + '/login',
            {
                method : 'POST',
                body : JSON.stringify(login)
            }
        );

        if (!(loading || error) && data){
            localStorage.setItem("token", data.access);
            navigate('/', {replace: true})
        }   
        
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