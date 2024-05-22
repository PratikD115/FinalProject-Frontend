import * as jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { User } from "../Query/authQuery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { Toaster } from "react-hot-toast";
import { favouriteActions } from "../store/favoriteSlice";
import { RootState } from "../store";

const MainLayout = () => {
  const [payload, setPayload] = useState<jwt.JwtPayload>();
  const authCookie = Cookies.get("authToken");

  const dispatch = useDispatch();
  const { subscribe } = useSelector((state: RootState) => state.user);
  const { data, refetch } = useQuery(User, {
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
      setPayload(decoded as jwt.JwtPayload);
      console.log(decoded);
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
