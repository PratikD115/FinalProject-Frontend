import Image from "next/image";
import img from "@/public/images/login.jpg";
import Link from "next/link";
import { LOGIN } from "@/Query/authQuery";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN, {
    onError: (err) => {
      setError(err);
    },
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const setAuthTokenInCookie = (token) => {
    const authToken = `Bearer ${token}`;
    console.log(authToken);
    Cookies.set("authToken", authToken, { expires: 7 });
  };

  async function handleLogIn(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const { data } = await login({
      variables: {
        email: enteredEmail,
        password: enteredPassword,
      },
    });
    
    if (data) {
      setAuthTokenInCookie(data.login.token);router.push("/");
    }

    
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <div className="container mx-auto h-[80%]  w-[56%]">
        <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg md:flex md:justify-center ">
          <div className="md:w-1/2 ">
            <Image src={img} alt="" className="h-full w-full" />
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-bold mb-4 flex justify-center">
              LogIn
            </h3>
            <div className="flex justify-end mb-4">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-icon ml-2">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <form onSubmit={handleLogIn} className="signin-form">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  EMAIL
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  required
                  className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:bg-white"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  PASSWORD
                </label>
                <input
                  ref={passwordInputRef}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:bg-white"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  LogIn
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
            <div className="text-sm mt-16">
              Create new account:{" "}
              <Link href="/signup" className="text-sky-600 underline">
                signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
