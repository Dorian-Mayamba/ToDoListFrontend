import { Box, Button, Link, TextField, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    
    const HandleSubmit = (e: React.SubmitEvent<HTMLElement>) => {
        navigate('/', {replace: true})
    }
    
    return (
        <Box onSubmit={HandleSubmit} component="form" sx={{ width: '40vw', display: 'flex', flexDirection: 'column', gap: 3}}>
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
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <div>
                    <Typography component='p'>Don't have an account? <Link href="/register">Create One</Link></Typography>
                </div>
        </Box>
                
    )
}

export default Login;