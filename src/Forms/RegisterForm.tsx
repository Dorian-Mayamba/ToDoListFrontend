import { Box, Button, Link, TextField, Typography } from "@mui/material";

interface RegisterFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

const RegisterForm = ({ onChange, onSubmit }: RegisterFormProps) => {
    return <Box onSubmit={onSubmit} component={"form"} sx={{ width: '40vw', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            required
            id="firstname-required"
            label="firstName"
            name="first_name"
            onChange={onChange}
            placeholder="Enter your username"
        />
        <TextField
            required
            id="lastname-required"
            label="lastName"
            name="last_name"
            onChange={onChange}
            placeholder="Enter your username"
        />
        <TextField
            required
            id="email-required"
            label="email"
            name="email"
            onChange={onChange}
            type="email"
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
        <TextField
            required
            id="password-confirm-required"
            label="password-confirm"
            type="password"
            name="passwordConfirm"
            onChange={onChange}
            placeholder="confirm your password"
        />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        <Typography component="p">Already Have an Account? <Link href="/Login">Sign In</Link></Typography>
    </Box>
}

export default RegisterForm;