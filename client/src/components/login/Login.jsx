import React, { useCallback, useEffect, useState } from "react";
import "./Login.css";
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
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setAuthCookie, validateLoginPage } from "../../utils";
import { HttpRequest } from "../../network";
import { apiEndpoints } from "../../constants/apiEndpoint";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const defaultTheme = createTheme();
const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userDetail, setUserDetail] = useState(INITIAL_STATE);
  const [loginValidationMsg, setLoginValidationMsg] = useState({});

  // Handle hide/show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onLinkClickHandler = (pageUrl) => {
    navigate(pageUrl);
  };

  const handleOnChange = useCallback(
    (event, fieldName) => {
      event.preventDefault();
      const userDetailsTemp = { ...userDetail };
      // userDetailsTemp[fieldName] === "allowRememberMe"
      //   ? (userDetailsTemp[fieldName] = event.target.checked)
      //   : (userDetailsTemp[fieldName] = event.target.value);
      userDetailsTemp[fieldName] = event.target.value;
      setUserDetail(userDetailsTemp);
    },
    [userDetail, setUserDetail]
  );

  useEffect(() => {
    setLoginValidationMsg(validateLoginPage(userDetail));
  }, [userDetail, setLoginValidationMsg]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const valDetail = validateLoginPage(userDetail, true);
      if (Object.keys(valDetail).length) {
        setLoginValidationMsg(valDetail);
        return;
      }
      // const data = JSON.stringify(userDetail, null, 2);
      const request = new HttpRequest(onLoginHandler, onRequestFailure);
      request.post(apiEndpoints.LOGIN, userDetail);
    },
    [userDetail, setLoginValidationMsg]
  );

  const onLoginHandler = (resposne) => {
    console.log("response", resposne);
    const { status, token } = resposne;
    if (status === 200) {
      setAuthCookie("Authorization", token);
      navigate("/");
    }
  };

  const onRequestFailure = (error) => {
    console.log("Error");
    console.log("error", error);
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
          <Card sx={{ mt: 5 }}>
            <CardContent>
              <Grid sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                Log in
              </Typography>
              <Box
                component="form"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  type="email"
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  required
                  value={userDetail.email}
                  fullWidth
                  autoFocus
                  onChange={(e) => {
                    handleOnChange(e, "email");
                  }}
                />
                {loginValidationMsg.email ? (
                  <span style={{ color: "red" }}>
                    {loginValidationMsg.email}
                  </span>
                ) : (
                  ""
                )}
                <FormControl
                  sx={{ m: 1, margin: "0", marginTop: "10px" }}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="outlined-adornment-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    required
                    value={userDetail.password}
                    onChange={(e) => {
                      handleOnChange(e, "password");
                    }}
                  />
                </FormControl>
                {loginValidationMsg.password ? (
                  <span style={{ color: "red" }}>
                    {loginValidationMsg.password}
                  </span>
                ) : (
                  ""
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      className="urlHover"
                      onClick={() => onLinkClickHandler("/forgotpassword")}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      className="urlHover"
                      onClick={() => onLinkClickHandler("/register")}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
