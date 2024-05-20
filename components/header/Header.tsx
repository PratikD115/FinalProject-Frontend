import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import Cookies from "js-cookie";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import toast from "react-hot-toast";
import { isSubscriptionOperation } from "@apollo/client/utilities";
import { isSubscriptionValid } from "../../utils/subscriptions";
import { RootState } from "../../store";

const Header = () => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const [isMenu, setIsMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const { subscribe } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { profile } = useSelector((state: RootState) => state.user);
  const handleAsArtistClick = () => {
    router.push("/asArtist");
  };
  const handleLogoutClick = () => {
    handleClose();
    Cookies.remove("authToken");
    dispatch(userActions.logout());
    router.push("/");
  };

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    router.push("/profile");
  };
  const handlePremium = () => {
    router.push("/subscription");
  };
  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen h-[8vh] md:shadow-md shadow-2xl backdrop-filter backdrop-blur-sm ${"text-white"}`}
    >
      {/* desktop and tablet */}
      <div className="hidden md:flex justify-between px-7 p-2 mt-2">
        {/* logo */}

        <div className="logo flex">
          <Link href="/">
            <h2
              className={`text-2xl ml-3 font-extrabold mt-1 mr-5 ${
                router.pathname === "/" ? "active" : ""
              }`}
              style={{ fontFamily: "Dancing Script" }}
            >
              Musical Moment
            </h2>
          </Link>
          <div className="menu font-[lato]">
            <ul className="flex">
              <li
                className={`mx-5 py-2 ${
                  router.pathname === "/browser" ? "active" : ""
                }`}
              >
                <Link href="/browser">Browser</Link>
              </li>
              {subscribe && (
                <li
                  className={`mx-5 py-2 ${
                    router.pathname === "/playlist" ? "active" : ""
                  }`}
                >
                  <Link href="/playlist">Playlists</Link>
                </li>
              )}
              <li
                className={`mx-5 py-2 ${
                  router.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link href="/about">About Us</Link>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="profile flex items-center ">
          {Boolean(subscribe) || (
            <div
              className="border-2 bg-slate-800 border-yellow-500 rounded-full px-5 py-1 flex items-center cursor-pointer "
              onClick={handlePremium}
            >
              <StarIcon fontSize="small" className="text-yellow-500" />
              Premium
            </div>
          )}
          {isLogin && (
            <div className="img w-10 h-10 rounded-full mr-10">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Image
                  src={profile || ""}
                  alt="profile"
                  width={40}
                  height={40}
                  onClick={handleClick}
                  className="img w-9 h-9 bg-red-300 rounded-full object-cover cursor-pointer"
                />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>
                  <PersonIcon fontSize="small" className="mr-2" />
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogoutClick}>
                  <LogoutIcon fontSize="small" className="mr-2" />
                  Log out
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleAsArtistClick} className="flex ">
                  <HandshakeIcon fontSize="small" className="mr-2" />
                  <div>
                    Join{" "}
                    <span
                      style={{ fontFamily: "Dancing Script" }}
                      className="font-extrabold text-lg text-green-600"
                    >
                      MusicalMoment{" "}
                    </span>
                    <br />
                    as a{" "}
                    <span
                      style={{ fontFamily: "Dancing Script" }}
                      className="font-extrabold text-lg text-red-600"
                    >
                      Artist
                    </span>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          )}

          {!isLogin && (
            <Link
              href="/login"
              className="flex justify-between items-center bg-green-500 px-4 py-1.5 pb-2 text-sm text-white rounded-full mx-3 hover:bg-green-600 hover:border-1 hover:border-black font-[lato]"
            >
              <span className="">LogIn</span>
              <LoginIcon fontSize="small" />
            </Link>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden h-full pl-2 pr-8">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="logo flex">
            <div>
              <Image src={logo} alt="logo" width={30} height={30} />
            </div>
            <h2 className="text-2xl font-semibold ml-3">MusicalMoment</h2>
          </div>
        </Link>

        <div>
          {isMenu && (
            <div className="bg-transparent  backdrop-blur-3xl  rounded-lg flex flex-col absolute top-16 left-0 w-full">
              <ul className="shadow-2xl flex flex-col">
                <li className="mx-5 py-2">
                  <Link href="/">Discover</Link>
                </li>
                <li className="mx-5 py-2">
                  <Link href="/browser">Browser</Link>
                </li>

                <li className="mx-5 py-2">
                  <Link href="/artist">Artists</Link>
                </li>
              </ul>
            </div>
          )}
          <AiOutlineMenu size={20} onClick={() => setIsMenu(!isMenu)} />
        </div>
      </div>
    </header>
  );
};
export default Header;
