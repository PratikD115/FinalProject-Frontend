import Cookies from "js-cookie";

export const setAuthTokenInCookie = (token: string) => {
  const authToken = `Bearer ${token}`;
  console.log(authToken);
  Cookies.set("authToken", authToken, {
    expires: 7,
    secure: true,
    sameSite: "none",
  });
};
