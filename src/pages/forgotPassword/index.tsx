import { useSelector } from "react-redux";
import Title from "../../../components/common/Title";
import HeaderHome from "../../../components/header/HeaderHome";
import { RootState } from "../../../store";
import toast from "react-hot-toast";
import { useRef } from "react";
import { validateEmail } from "../../../utils/Authfunctions";

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current?.value) {
      toast.error("Please enter email address");
      return;
    }
    if (!validateEmail(emailRef.current.value)) {
      toast.error("Please enter the valid email address");
      return;
    }
    console.log(emailRef.current.value);
  };
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-20 text-white">
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
                id="email"
                ref={emailRef}
                placeholder="Enter your email"
                className=" w-full h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
