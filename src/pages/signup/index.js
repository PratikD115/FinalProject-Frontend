import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/login.jpg";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import {  useRouter } from "next/router";
import { SIGNUP } from "@/Query/authQuery";


export default function LoginForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter()

  const [signUp, { loading, error, data }] = useMutation(SIGNUP);
  
  async function handleSingUp(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const { data } = await signUp({
      variables: { email: enteredEmail, name: enteredName, password: enteredPassword },
    });
    console.log(data);  
    router.push("/login")
  }

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <div className="container mx-auto h-[80%]  w-[56%]">
        <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg md:flex md:justify-center ">
          <div className="md:w-1/2 ">
            <Image src={img} alt="" className="h-full w-full" />
          </div>
          <div className="md:w-1/2 px-6 py-4">
            <h3 className="text-2xl font-bold mb-2 flex justify-center">
              SignUp
            </h3>
            <form onSubmit={handleSingUp} className="signin-form">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  E MAIL
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
                  SignUp
                </button>
              </div>
            </form>
            <div className="text-sm mt-14">
              Already have account:{" "}
              <Link href="/login" className="text-sky-600 underline">
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
