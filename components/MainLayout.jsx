import * as jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { User } from "../Query/authQuery";
import { useDebugValue, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { favouriteActions } from "../store/favoriteSlice";

export default function MainLayout() {
  const [payload, setPayload] = useState(null);
  const authCookie = Cookies.get("authToken");

  const dispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(User, {
    variables: {
      userId: payload?.userId,
    },
  });
  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [payload]);

  useEffect(() => {
    if (data) {
      const { getUserById } = data;
      console.log(getUserById);

      const { favourite, follow, ...user } = getUserById;
      const artistData = follow.map((item) => item.id);
      const songData = favourite.map((item) => item.id);
     

      dispatch(userActions.login({ user, authCookie }));
      dispatch(favouriteActions.setArtistAndSong({artistData, songData}))
    }
  }, [data]);

  function reload() {
    if (authCookie) {
      const token = authCookie.split(" ")[1];

      const decoded = jwt.decode(token);
      setPayload(decoded);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={true} />
    </>
  );
}
