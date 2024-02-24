import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Register.css";
import { validateRegisterPage } from "../../utils";
import { HttpRequest } from "../../network";
import {
  COUNTRY_URL,
  REGISTER,
  apiEndpoints,
} from "../../constants/apiEndpoint";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  dob: undefined,
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  mobileNo: "",
  countryCode: "",
  address: "",
  isSeller: false,
};

const getCountryDetail = (data) => {
  const countryDetail = data
    .filter((el) => typeof el?.idd?.suffixes?.[0] === "string")
    .map((el) => ({
      countryName: el?.name?.common,
      stdCode: el.idd.root + el.idd.suffixes[0],
    }));
  console.log(countryDetail);
  return countryDetail;
};
export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userDetail, setUserDetail] = useState(INITIAL_STATE);
  const [validationMsg, setValidationMsg] = useState({});

  const onLinkClickHandler = (pageUrl) => {
    navigate(pageUrl);
  };

  // Fetch Country Name and Country Code from api
  const [countryDetails, setCountryDetails] = useState([]);
  useEffect(() => {
    fetch(COUNTRY_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const countryDetail = getCountryDetail(data);
        setCountryDetails(countryDetail);
      });
  }, []);

  // Handle hide/show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Handle hide/show confirm password
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleOnChange = useCallback(
    (event, fieldName) => {
      if (fieldName !== "dob") event.preventDefault();
      const userDetailsTemp = { ...userDetail };
      userDetailsTemp[fieldName] === "isSeller"
        ? (userDetailsTemp[fieldName] = event.target.checked)
        : (userDetailsTemp[fieldName] =
            fieldName !== "dob" ? event.target.value : event);
      setUserDetail(userDetailsTemp);
    },
    [userDetail, setUserDetail]
  );

  useEffect(() => {
    setValidationMsg(validateRegisterPage(userDetail));
  }, [userDetail, setValidationMsg]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const valDetail = validateRegisterPage(userDetail, true);
      if (Object.keys(valDetail).length) {
        setValidationMsg(valDetail);
        return;
      }
      // console.log(userDetail);

      const payload = {
        name: userDetail["firstName"] + " " + userDetail["lastName"],
        dob: userDetail["dob"],
        email: userDetail["email"],
        password: userDetail["password"],
        address: {
          state: userDetail["state"],
          city: userDetail["city"],
          pincode: Number(userDetail["pincode"]),
          country: userDetail["country"],
          mobileNo: userDetail["mobileNo"],
          countryCode: userDetail["countryCode"],
          fullAddress: userDetail["address"],
        },
        comissionRate: 3,
        isSeller: userDetail["isSeller"],
      };
      // console.log(payload);

      const request = new HttpRequest(onRegisterHandler, onRequestFailure);
      request.post(apiEndpoints.REGISTER, payload);
    },
    [userDetail, setValidationMsg]
  );

  const onRegisterHandler = (resposne) => {
    console.log("response", resposne);
  };

  const onRequestFailure = (error) => {
    console.log("error", error);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{ marginTop: "85px" }}>
        <Card>
          <CardContent>
            <Typography
              component="h5"
              variant="h5"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              Registration Form
            </Typography>
            <Form
              method="POST"
              component="form"
              noValidate
              onSubmit={onSubmitForm}
              sx={{ mt: 3, marginTop: "15px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    required
                    value={userDetail.firstName}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "firstName");
                    }}
                  />
                  {validationMsg.firstName ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.firstName}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    required
                    value={userDetail.lastName}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "lastName");
                    }}
                  />
                  {validationMsg.lastName ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.lastName}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ marginTop: "-8px", width: "auto" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer components={["DatePicker"]}> */}
                    <DatePicker
                      name="dob"
                      id="dob"
                      label="Date of Birth"
                      required
                      value={userDetail.dob}
                      fullWidth
                      autoFocus
                      sx={{ width: "100%" }}
                      onChange={(value) => {
                        handleOnChange(value, "dob");
                      }}
                    />
                    {/* </DemoContainer> */}
                  </LocalizationProvider>
                  {validationMsg.dob ? (
                    <span style={{ color: "red" }}>{validationMsg.dob}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                  {validationMsg.email ? (
                    <span style={{ color: "red" }}>{validationMsg.email}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    sx={{
                      m: 1,
                      margin: "0",
                    }}
                    fullWidth
                    variant="outlined"
                    className="password-style"
                  >
                    <InputLabel
                      sx={{
                        m: 1,
                        margin: "0",
                      }}
                      htmlFor="password"
                      className="password-style"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
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
                    {validationMsg.password ? (
                      <span style={{ color: "red" }}>
                        {validationMsg.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    sx={{
                      m: 1,
                      margin: "0",
                    }}
                    fullWidth
                    variant="outlined"
                    className="password-style"
                  >
                    <InputLabel
                      sx={{
                        m: 1,
                        margin: "0",
                      }}
                      htmlFor="confirm-password"
                      className="password-style"
                    >
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      required
                      value={userDetail.confirmPassword}
                      onChange={(e) => {
                        handleOnChange(e, "confirmPassword");
                      }}
                    />
                    {validationMsg.confirmPassword ? (
                      <span style={{ color: "red" }}>
                        {validationMsg.confirmPassword}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    name="city"
                    id="city"
                    label="City"
                    required
                    value={userDetail.city}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "city");
                    }}
                  />
                  {validationMsg.city ? (
                    <span style={{ color: "red" }}>{validationMsg.city}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    name="state"
                    id="state"
                    label="State"
                    required
                    value={userDetail.state}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "state");
                    }}
                  />
                  {validationMsg.state ? (
                    <span style={{ color: "red" }}>{validationMsg.state}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    name="pincode"
                    id="pincode"
                    label="Pincode"
                    required
                    value={userDetail.pincode}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "pincode");
                    }}
                  />
                  {validationMsg.pincode ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.pincode}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      id="country"
                      value={userDetail.country}
                      label="Country"
                      onChange={(e) => {
                        handleOnChange(e, "country");
                      }}
                    >
                      {countryDetails.map((item) => (
                        <MenuItem
                          key={item.countryName}
                          value={item.countryName}
                        >
                          {item.countryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {validationMsg.country ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.country}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="country-code-label">
                      Country Code
                    </InputLabel>
                    <Select
                      labelId="country-code-label"
                      id="country-code"
                      value={userDetail.countryCode}
                      label="Country Code"
                      onChange={(e) => {
                        handleOnChange(e, "countryCode");
                      }}
                    >
                      {countryDetails.map((item) => (
                        <MenuItem key={item.stdCode} value={item.stdCode}>
                          {item.stdCode}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {validationMsg.countryCode ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.countryCode}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    name="mobileNo"
                    id="mobileNo"
                    label="Mobile No"
                    required
                    value={userDetail.mobileNo}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "mobileNo");
                    }}
                  />
                  {validationMsg.mobileNo ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.mobileNo}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="textarea"
                    name="address"
                    id="address"
                    label="Address"
                    multiline
                    rows={3}
                    required
                    value={userDetail.address}
                    fullWidth
                    autoFocus
                    onChange={(e) => {
                      handleOnChange(e, "address");
                    }}
                  />
                  {validationMsg.address ? (
                    <span style={{ color: "red" }}>
                      {validationMsg.address}
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value={!userDetail.isSeller} color="primary" />
                    }
                    label="Is Seller?"
                    onChange={(e) => {
                      handleOnChange(e, "isSeller");
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    variant="body2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onLinkClickHandler("/login");
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
