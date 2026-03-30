import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { AuthResponse, RegisterState } from "../types";
import RegisterForm from "../Forms/RegisterForm";
import { authEnpoint } from "../constants";
import FetchHelper from "../helpers/fetchHelper";

function Register(){
    const navigate = useNavigate();

    const initialState : RegisterState = {
        first_name : '',
        last_name : '',
        email: '',
        password : '',
        passwordConfirm : ''
    };

    const authResponseInitialState : AuthResponse | undefined = undefined;
    
    
    const [register, setRegister] = useState<RegisterState>(initialState);
    const [data, setData] = useState<AuthResponse | undefined>(authResponseInitialState);
    const [loading, setLoading] = useState(false);
    
    const HandleSubmit = async (e: React.SubmitEvent<HTMLElement>) =>{
        e.preventDefault();

        try{
            const {data : response} = await FetchHelper<AuthResponse>(import.meta.env.VITE_SERVER_URL + authEnpoint + '/login',
                {
                    method : 'POST',
                    body : JSON.stringify(register),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
            );
            setData(response);
            
        } catch (err){

        } finally {
            setLoading(false);
        }

        if (!(loading) && data){
            localStorage.setItem("token", data.access);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/', {replace: true});
        }
    }

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        
        setRegister((prev) => ({...prev, [name] : value}));
    }
    
    return (
        <RegisterForm
            onChange={HandleChange}
            onSubmit={HandleSubmit}
        />
    );
}
export default Register;