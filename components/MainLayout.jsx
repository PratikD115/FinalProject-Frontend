import Cookies from "js-cookie";

export default function MainLayout() {
  function reload() {
    console.log(" in the main alyout ");
    const authcookie = Cookies.get("authToken");
  }
  return <>{reload()}</>;
}
