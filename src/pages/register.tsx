import { Box,Button, Link, TextField,Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    
    const HandleSubmit = (e: React.SubmitEvent<HTMLElement>) =>{
        navigate('/', {replace: true})
    }
    
    return (
        <Box component="form"
        onSubmit={HandleSubmit}
        sx={{ width: '40vw',  display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                    required
                    id="username-required"
                    label="name"
                    placeholder="Enter your username"
                    />
                <TextField
                    required 
                    id="email-required"
                    label="email"
                    type="email"
                    placeholder="enter your email"
                    />
                <TextField
                    required
                    id="password-required"
                    label="password"
                    type="password"
                    placeholder="enter your password"
                    />
                <TextField
                    required
                    id="password-confirm-required"
                    label="password-confirm"
                    type="password"
                    placeholder="confirm your password"
                    />
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                <Typography component="p">Already Have an Account? <Link href="/Login">Sign In</Link></Typography>
        </Box>
    )
}
export default Register;