import Image from "next/image";
import Link from "next/link";
import img from "../../../public/images/login.png";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { useRouter } from "next/router";
import { SIGNUP } from "../../../Query/authQuery";
import HeaderHome from "../../../components/header/HeaderHome";
import { Divider } from "@mui/material";

const LoginForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [signUp, { loading, error, data }] = useMutation(SIGNUP);

  const handleSingUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const { data } = await signUp({
      variables: {
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
        role: "artist",
      },
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-20">
      <HeaderHome />

      <div className="container mx-auto h-[80vh] w-[70%] flex justify-center  bg-gray-800 rounded-lg border-gray-400 ">
        <div className="md:w-1/2 p-[5%]">
          <Image src={img} alt="lk" className="h-full w-full" />
        </div>
        <Divider
          orientation="vertical"
          color="white"
          variant="middle"
          flexItem
        />
        <div className="md:w-1/2 px-[5%] ">
          <h3 className="text-2xl font-bold font-[lato] mb-5  mt-3 flex justify-center text-gray-200">
            SIGNUP
          </h3>
          <form onSubmit={handleSingUp} className="signin-form">
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="username"
              >
                USERNAME
              </label>
              <input
                ref={nameInputRef}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="username"
              >
                EMAIL
              </label>
              <input
                ref={emailInputRef}
                type="text"
                id="email"
                name="email"
                placeholder="Example@gmail.com"
                required
                className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
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
            <div className="mb-6 mt-10">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="text-sm mt-8 text-white">
            Already have account:{" "}
            <Link href="/login" className="text-sky-400 underline">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
