import Cookies from "js-cookie";

export function setAuthTokenInCookie(token : any) {
  const authToken = `Bearer ${token}`;
  console.log(authToken);
  Cookies.set("authToken", authToken, {
    expires: 7,
    secure: true,
    sameSite: "none",
  });
}
