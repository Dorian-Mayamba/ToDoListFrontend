import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { AuthResponse, RegisterState } from "../types";
import RegisterForm from "../Forms/RegisterForm";
import useFetch from "../hooks/useFetch";
import { authEnpoint } from "../constants";

function Register(){
    const navigate = useNavigate();

    const initialState : RegisterState = {
        first_name : '',
        last_name : '',
        email: '',
        password : '',
        passwordConfirm : ''
    };
    
    const [data, setData] = useState<RegisterState>(initialState);
    
    const HandleSubmit = async (e: React.SubmitEvent<HTMLElement>) =>{

        try {

            var fData = JSON.stringify({
                first_name : data.first_name,
                last_name : data.last_name,
                email : data.email,
                password : data.password
            });
            
            const path = import.meta.env.VITE_SERVER_URL as string + authEnpoint + '/register';
            
            const {data : response, loading, error} = await useFetch<AuthResponse>(path , 
                {
                    method : 'POST',
                    body : fData,
                }
            );

            if (!(loading || error) && response) {
                localStorage.setItem('token', response.access);
            }  
            
        } catch (err) {
            
        }
        
        navigate('/', {replace: true})
    }

    const HandleChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        
        setData((prev) => ({...prev, [name] : value}));
    }
    
    return (
        <RegisterForm
            onChange={HandleChange}
            onSubmit={HandleSubmit}
        />
    );
}
export default Register;