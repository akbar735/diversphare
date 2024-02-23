import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OtpVarification() {
  
    const [otp, setOtp] = React.useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyOtp = () => {
        // Here you can implement the logic to verify the entered OTP
        // For simplicity, we'll just console log the entered OTP in this example
        console.log('Entered OTP:', otp);
    };

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
                Verify OTP
                </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="Enter OTP"
                    name="otp"
                    autoComplete="one-time-code"
                    autoFocus
                    onChange={handleOtpChange}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleVerifyOtp}
                >
                    Verify OTP
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                        Resend OTP
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/forgotpassword" variant="body2">
                        Change Email Id
                    </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}