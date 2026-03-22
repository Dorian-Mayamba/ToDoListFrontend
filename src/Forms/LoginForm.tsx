import { Box, Button, Link, TextField, Typography } from "@mui/material";

interface LoginFormProps{
    onSubmit : (e : React.SubmitEvent<HTMLFormElement>) => void;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
}


const LoginForm = ({onSubmit, onChange} : LoginFormProps) => {
    
    return (
        <Box onSubmit={onSubmit} component="form" sx={{ width: '40vw', display: 'flex', flexDirection: 'column', gap: 3}}>
                <TextField
                    required 
                    id="email-required"
                    label="email"
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder="enter your email"
                    />
                <TextField
                    required
                    id="password-required"
                    label="password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    placeholder="enter your password"
                    />
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <div>
                    <Typography component='p'>Don't have an account? <Link href="/register">Create One</Link></Typography>
                </div>
        </Box>
    )
}

export default LoginForm;