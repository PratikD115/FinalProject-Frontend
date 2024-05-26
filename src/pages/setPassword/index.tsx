import { useSelector } from "react-redux";
import Title from "../../../components/common/Title";
import HeaderHome from "../../../components/header/HeaderHome";
import { RootState } from "../../../store";
import toast from "react-hot-toast";
import { useRef } from "react";
import { isValidPassword } from "../../../utils/Authfunctions";
import { changePassword } from "../../../Query/authQuery";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";

const setPassword: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [updatePassword, { loading }] = useMutation(changePassword);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordRef.current?.value) {
      toast.error("Please enter the password");
      return;
    }
    if (!isValidPassword(passwordRef.current.value)) {
      toast.error(
        "Password must be 8+ characters with 1 uppercase letter, 1 special character, and 1 number"
      );
      return;
    }
    if (!confirmPasswordRef.current?.value) {
      toast.error("Please enter the confirm password");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error("password and confirm password must be same");
      return;
    }

    console.log(user?.id);

    const { data } = await updatePassword({
      variables: {
        userId: user?.id,
        password: passwordRef.current?.value,
        confirmPassword: confirmPasswordRef.current?.value,
      },
    });
    if (loading) {
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader
          color="rgba(40, 189, 41, 1)"
          height={15}
          loading={true}
          margin={3}
          radius={3}
          speedMultiplier={2}
          width={4}
        />
      </div>;
    }
    if (data) {
      router.push("/");
    }
  };
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-20 text-white">
      <HeaderHome />
      <div className="flex justify-center mt-20">
        <div className="flex flex-col w-[30%]  rounded-md py-10">
          <span className="text-green-500 text-2xl flex justify-center">
            Reset Password
          </span>

          <form
            onSubmit={handleSubmit}
            className=" p-6 w-full flex justify-center flex-col rounded-md h-52 "
          >
            <div className="w-full">
              <input
                id="password"
                ref={passwordRef}
                placeholder="Password"
                className=" w-full h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordRef}
                placeholder="Confirm password"
                className=" w-full h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default setPassword;
