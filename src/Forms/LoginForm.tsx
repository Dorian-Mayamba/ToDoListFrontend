import { Email, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, Link, TextField, Typography, Paper } from "@mui/material";

interface LoginFormProps {
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const LoginForm = ({ onSubmit, onChange }: LoginFormProps) => {

    return (
        <Paper sx={{ width: '40vw', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
            <Typography sx={{ textAlign: 'center', p:3 }} component={"h1"}>Sign In</Typography>
            <Box onSubmit={onSubmit} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 5, p:6 }}>
                <TextField
                    required
                    id="email-required"
                    label="email"
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder="enter your email"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="action" />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
                <TextField
                    required
                    id="password-required"
                    label="password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    placeholder="enter your password"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="action" />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <div>
                    <Typography component='p'>Don't have an account? <Link href="/register">Create One</Link></Typography>
                </div>
            </Box>
        </Paper>

    )
}

export default LoginForm;