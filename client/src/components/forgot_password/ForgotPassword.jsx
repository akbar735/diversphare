import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { validateForgotPassPage } from "../../utils";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [validationMsg, setValidationMsg] = useState();

  const onLinkClickHandler = (pageUrl) => {
    navigate(pageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidationMsg(validateForgotPassPage(event.target.email.value));
    // console.log(event.target.email.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography
              variant="p"
              component="p"
              marginTop="20px"
              marginBottom="10px"
            >
              Lost your password? Please enter your email address. You will
              receive a OTP.
            </Typography>
            <TextField
              margin="normal"
              type="email"
              name="email"
              id="email"
              label="Email Address"
              autoComplete="email"
              required
              fullWidth
              autoFocus
            />
            {validationMsg ? (
              <span style={{ color: "red" }}>{validationMsg}</span>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => onLinkClickHandler("/login")}
                  style={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Back to the login page"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
