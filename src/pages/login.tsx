import type React from "react";
import { useNavigate } from 'react-router-dom';
import type { AuthResponse, LoginState } from "../types";
import { useState } from "react";
import LoginForm from "../Forms/LoginForm";
import { authEnpoint } from "../constants";
import FetchHelper from "../helpers/fetchHelper";


const initialState: LoginState = {
    email: '',
    password: ''
};

const authResponseInitialState: AuthResponse | undefined = undefined;

function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState<AuthResponse | undefined>(authResponseInitialState);
    const [login, setLogin] = useState<LoginState>(initialState);
    const [loading, setLoading] = useState(false);

    const HandleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            const { data: response } = await FetchHelper<AuthResponse>(import.meta.env.VITE_SERVER_URL + authEnpoint + '/login',
                {
                    method: 'POST',
                    body: JSON.stringify(login),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response) {
                localStorage.setItem("token", response.access);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/', { replace: true })
            }

        } catch (err) {

        } finally {
            setLoading(false);
        }

    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLogin((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <LoginForm
            onChange={HandleChange}
            onSubmit={HandleSubmit}
        />
    )
}

export default Login;