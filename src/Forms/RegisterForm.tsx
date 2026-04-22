import { Email, Person, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
interface RegisterFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    error: boolean;
}

const RegisterForm = ({ onChange, onSubmit, error }: RegisterFormProps) => {
    return<Paper sx={{ width: '40vw', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
        <Typography sx={{ textAlign: 'center', p:3 }} component={"h1"}>Sign Up</Typography>
        <Box onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 5, p:6}} component={"form"}>
            <TextField
                required
                id="firstname-required"
                label="firstName"
                name="first_name"
                onChange={onChange}
                placeholder="Enter your First Name"
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person color="action" />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                required
                id="lastname-required"
                label="lastName"
                name="last_name"
                onChange={onChange}
                placeholder="Enter your Last Name"
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person color="action" />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                required
                id="email-required"
                label="email"
                name="email"
                onChange={onChange}
                type="email"
                placeholder="enter your email"
                fullWidth
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
                fullWidth
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
            <TextField
                required
                id="password-confirm-required"
                label="password-confirm"
                type="password"
                name="passwordConfirm"
                onChange={onChange}
                error={error}
                helperText={error ? "Password do not match" : ""}
                placeholder="confirm your password"
                fullWidth
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
            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
            <Typography component="p">Already Have an Account? <Link href="/Login">Sign In</Link></Typography>
        </Box>
    </Paper>

}

export default RegisterForm;