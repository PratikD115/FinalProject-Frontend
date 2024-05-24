import Cookies from "js-cookie";

export const setAuthTokenInCookie = (token: string) => {
  const authToken = `Bearer ${token}`;
  Cookies.set("authToken", authToken, {
    expires: 7,
    secure: true,
    sameSite: "none",
  });
};

export const isValidPassword = (password: string) => {
  return (
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
};


export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
