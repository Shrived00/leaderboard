import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUserStore } from '../hooks/userStore';

const defaultTheme = createTheme();

const SignIn: React.FC = () => {
    const { user, setUser } = useUserStore();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (email === 'admin@gmail.com' && password === '1q2w3e4r') {
            console.log('Logged in');

            // Set user as logged in
            setUser(true);

            // Set expiration time for one day
            const expirationTime = new Date();
            expirationTime.setDate(expirationTime.getDate() + 1);

            // Save user login state and expiration time in local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginExpiration', expirationTime.toISOString());
        } else {
            console.log('Incorrect email or password');
            setUser(false);
        }
    };

    React.useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const loginExpiration = localStorage.getItem('loginExpiration');

        if (isLoggedIn === 'true' && loginExpiration) {
            const expirationTime = new Date(loginExpiration);
            if (expirationTime > new Date()) {
                // User is still logged in
                setUser(true);
            } else {
                // User's login has expired, log them out
                setUser(false);
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('loginExpiration');
            }
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="admin@gmail.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password-1q2w3e4r"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
