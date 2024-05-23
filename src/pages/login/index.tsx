import Image from "next/image";
import img from "../../../public/images/login.png";
import Link from "next/link";
import { LOGIN, User } from "../../../Query/authQuery";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { setAuthTokenInCookie } from "../../../utils/Authfunctions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../../../store/userSlice";
import HeaderHome from "../../../components/header/HeaderHome";
import { Divider } from "@mui/material";
import { favouriteActions } from "../../../store/favoriteSlice";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>({});
  const [hasUser, setHasUser] = useState(false);
  const [login] = useMutation(LOGIN);
  const { data: favouriteData } = useQuery(User, {
    variables: {
      userId: user?.id,
    },
    skip: !hasUser,
  });

  useEffect(() => {
    if (favouriteData) {
      const { getUserById } = favouriteData;

      const { favourite, follow, ...user } = getUserById;
      const artistData = follow?.map((item: { id: string }) => item.id);
      const songData = favourite?.map((item: { id: string }) => item.id);
      dispatch(favouriteActions.setArtistAndSong({ artistData, songData }));
    }
  }, [favouriteData]);

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    try {
      const { data } = await login({
        variables: {
          email: enteredEmail,
          password: enteredPassword,
        },
      });
      if (data) {
        const { token, ...user } = data.login;
        console.log(user);
        setUser(user);
        setHasUser(true);
        setAuthTokenInCookie(token);
        dispatch(
          userActions.login({
            user,
            token,
            subscribe: user.endDate,
            asArtist: user.asArtist,
          })
        );
        toast.success("Login SuccessFully !");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-20">
      <HeaderHome />
      <div className="container mx-auto  h-[80vh] w-[70%] bg-gray-800 rounded-lg border-gray-400 flex justify-center ">
        <div className="lg:w-1/2 p-[5%] ">
          <Image src={img} alt="kl" className="h-full w-full" />
        </div>
        <Divider
          orientation="vertical"
          color="white"
          variant="middle"
          flexItem
        />

        <div className="lg:w-1/2 px-[5%]">
          <h3 className="text-2xl font-bold mb-5  mt-3 flex justify-center  text-white font-[lato]">
            LOGIN
          </h3>
          <div className="flex justify-end mb-4"></div>
          <form onSubmit={handleLogIn} className="signin-form">
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="username"
              >
                EMAIL
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
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
                LogIn
              </button>
            </div>
          </form>

          <div className="text-sm mt-10 text-white ">
            Create new account:{" "}
            <Link href="/signup" className="text-sky-400 underline">
              signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
