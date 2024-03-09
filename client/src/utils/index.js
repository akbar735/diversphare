export const validateRegisterPage = (registerForm, readyToSubmit) => {
  const errorMessage = {};

  // First name field validation
  if (!registerForm.firstName && readyToSubmit) {
    errorMessage.firstName = "First Name is required";
  }

  // Last name field validation
  if (!registerForm.lastName && readyToSubmit) {
    errorMessage.lastName = "Last Name is required";
  }

  // DOB field validation
  if (!registerForm.dob && readyToSubmit) {
    errorMessage.dob = "Date of Birth is required";
  }

  // Email field validation
  if (!registerForm.email && readyToSubmit) {
    errorMessage.email = "Email is required";
  } else if (
    registerForm.email &&
    !new RegExp(/\S+@\S+\.\S+/).test(registerForm.email)
  ) {
    errorMessage.email = "Incorrect email format";
  }

  // Password field validation
  if (!registerForm.password && readyToSubmit) {
    errorMessage.password = "Password is required";
  } else if (registerForm.password && registerForm.password.length < 8) {
    errorMessage.password = "Password must have a minimum 8 characters";
  }

  // Confirm Password field validation
  if (!registerForm.confirmPassword && readyToSubmit) {
    errorMessage.confirmPassword = "Confirm Password is required";
  } else if (
    registerForm.confirmPassword &&
    registerForm.confirmPassword.length < 8
  ) {
    errorMessage.confirmPassword =
      "Confirm Password must have a minimum 8 characters";
  } else if (registerForm.confirmPassword !== registerForm.password) {
    errorMessage.confirmPassword =
      "Password and Confirm Passwords does not match";
  }

  // City field validation
  if (!registerForm.city && readyToSubmit) {
    errorMessage.city = "City is required";
  }

  // State field validation
  if (!registerForm.state && readyToSubmit) {
    errorMessage.state = "State is required";
  }

  // Pincode field validation
  if (!registerForm.pincode && readyToSubmit) {
    errorMessage.pincode = "Pincode is required";
  }

  // Country field validation
  if (!registerForm.country && readyToSubmit) {
    errorMessage.country = "Country is required";
  }

  // Country Code field validation
  if (!registerForm.countryCode && readyToSubmit) {
    errorMessage.countryCode = "Country Code is required";
  }

  // Mobile No field validation
  if (!registerForm.mobileNo && readyToSubmit) {
    errorMessage.mobileNo = "Mobile No is required";
  }

  // Address field validation
  if (!registerForm.address && readyToSubmit) {
    errorMessage.address = "Address is required";
  }

  return errorMessage;
};

export const validateLoginPage = (loginForm, readyToSubmit) => {
  const errorMessage = {};

  // Email field validation
  if (!loginForm.email && readyToSubmit) {
    errorMessage.email = "Email is required";
  } else if (
    loginForm.email &&
    !new RegExp(/\S+@\S+\.\S+/).test(loginForm.email)
  ) {
    errorMessage.email = "Incorrect email format";
  }

  // Password field validation
  if (!loginForm.password && readyToSubmit) {
    errorMessage.password = "Password is required";
  } else if (loginForm.password && loginForm.password.length < 8) {
    errorMessage.password = "Password must have a minimum 8 characters";
  }

  return errorMessage;
};

export const validateForgotPassPage = (forgotEmail) => {
  // Email field validation
  if (!forgotEmail) {
    return "Email is required";
  } else if (forgotEmail && !new RegExp(/\S+@\S+\.\S+/).test(forgotEmail)) {
    return "Incorrect email format";
  }
};

/* set cookie */
export function setAuthCookie(cname = "token", cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getAuthCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteAuthCookie() {
  document.cookie = "token =; max-age=0";
}
