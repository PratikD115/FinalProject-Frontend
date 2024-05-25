import HeaderHome from "../../../components/header/HeaderHome";
import toast from "react-hot-toast";
import { useRef } from "react";
import { isValidPassword } from "../../../utils/Authfunctions";

export default function SetPassword() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  console.log("in the page ");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordRef.current?.value) {
      toast.error("Please enter the password");
      return;
    }

    if (!isValidPassword(passwordRef.current.value)) {
      {
      }
      if (!confirmPasswordRef.current?.value) {
        toast.error("Please enter the confirm password");
        return;
      }

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        console.log("both password and confirm password is same");
      }
    }
    return (
      <div className="h-screen bg-black p-20 text-white">
        <HeaderHome />
        <div className="flex justify-center mt-20">
          <div className="flex flex-col w-[30%]  rounded-md py-10">
            <span className="text-green-500 text-2xl flex justify-center">
              Forgot Password?
            </span>

            <form
              onSubmit={handleSubmit}
              className=" p-6 w-full flex justify-center flex-col rounded-md h-52 "
            >
              <div className="w-full">
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="password"
                  className=" w-full h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  ref={confirmPasswordRef}
                  placeholder="Enter your email"
                  className=" w-full h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
