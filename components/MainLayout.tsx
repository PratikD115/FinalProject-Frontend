import * as jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { User } from "../Query/authQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { favouriteActions } from "../store/favoriteSlice";
import { useRouter } from "next/router";
import { RootState } from "../store";

const MainLayout = () => {
  const [payload, setPayload] = useState<any>();
  const authCookie = Cookies.get("authToken");

  const dispatch = useDispatch();
  const { subscribe } = useSelector((state: RootState) => state.user);
  const { data, refetch } = useQuery(User, {
    variables: {
      userId: payload?.userId,
    },
  });

  // const router = useRouter(); // Get access to the router object
  // const [redirected, setRedirected] = useState(false); // State to track if redirection has occurred

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Set redirected to false every 30 minutes
  //     setRedirected(false);
  //   }, 30 * 60 * 1000); // 30 minutes in milliseconds

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {

  //   if (!redirected && Boolean(!subscribe)) {
  //     setRedirected(true);
  //     toast.custom((t) => (
  //       <div
  //         className={`${
  //           t.visible ? "animate-enter" : "animate-leave"
  //         } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //       >
  //         <div className="flex-1 w-0 p-4">
  //           <div className="flex items-start">
  //             <div className="ml-3 flex-1">
  //               <p className="text-sm font-medium text-gray-900">
  //                 Subscription
  //               </p>
  //               <p className="mt-1 text-sm text-gray-500">
  //                 For Better experience purchase the subscription
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex border-l border-gray-200">
  //           <button
  //             onClick={() => router.push("/subscription")}
  //             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //           >
  //             Subsribe
  //           </button>
  //         </div>
  //       </div>
  //     ));
  //   }
  // }, [redirected, router]);

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [payload]);

  useEffect(() => {
    if (data && authCookie) {
      const { getUserById } = data;

      const { favourite, follow, ...user } = getUserById;
      const artistData = follow?.map((item: { id: string }) => item.id);
      const songData = favourite?.map((item: { id: string }) => item.id);
    

      dispatch(
        userActions.login({
          user,
          token: authCookie,
          subscribe: user.subscribe?.expireDate,
          asArtist: user.artistId?.id,
        })
      );
      dispatch(favouriteActions.setArtistAndSong({ artistData, songData }));
    }
  }, [data]);

  const reload = () => {
    if (authCookie) {
      const token = authCookie.split(" ")[1];
      const decoded = jwt.decode(token);
      setPayload(decoded);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default MainLayout;
