import * as jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { User } from "../Query/authQuery";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { favouriteActions } from "../store/favoriteSlice";

const MainLayout = () => {
  const [payload, setPayload] = useState<any>(null);
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
      const artistData = follow.map((item: any) => item.id);
      const songData = favourite.map((item: any) => item.id);

      console.log(user);
      console.log(user.subscribe.expireDate);
      console.log(user.artistId.id);
      dispatch(
        userActions.login({
          user,
          token: authCookie,
          expireDate: user?.subscribe.expireDate,
          artistId: user?.artistId.id,
        })
      );
      dispatch(favouriteActions.setArtistAndSong({ artistData, songData }));
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
};

export default MainLayout;
