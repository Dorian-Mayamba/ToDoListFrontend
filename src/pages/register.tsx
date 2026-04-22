import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { AuthResponse, RegisterState } from "../types";
import RegisterForm from "../Forms/RegisterForm";
import { authEnpoint } from "../constants";
import FetchHelper from "../helpers/fetchHelper";

function Register() {
    const navigate = useNavigate();

    const initialState: RegisterState = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    const authResponseInitialState: AuthResponse | undefined = undefined;


    const [register, setRegister] = useState<RegisterState>(initialState);
    const [data, setData] = useState<AuthResponse | undefined>(authResponseInitialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const HandleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        if (register.password !== register.passwordConfirm) {
            setError(true);
            return;
        }

        setError(false);

        try {
            const { data: response } = await FetchHelper<AuthResponse>(import.meta.env.VITE_SERVER_URL + authEnpoint + '/login',
                {
                    method: 'POST',
                    body: JSON.stringify(register),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response) {
                console.log('data is defined');
                localStorage.setItem("token", response.access);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/');
            }
            
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setRegister((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <RegisterForm
            onChange={HandleChange}
            onSubmit={HandleSubmit}
            error={error}
        />
    );
}
export default Register;