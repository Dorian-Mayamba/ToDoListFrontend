import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import type { RegisterState } from "../types";
import RegisterForm from "../Forms/RegisterForm";

function Register(){
    const navigate = useNavigate();

    const initialState : RegisterState = {
        name : '',
        email: '',
        password : '',
        passwordConfirm : ''
    };
    
    const [data, setData] = useState<RegisterState>(initialState);
    
    const HandleSubmit = (e: React.SubmitEvent<HTMLElement>) =>{
        console.log(data);
        
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