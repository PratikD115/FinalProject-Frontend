import { useState } from "react";
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

export default function Header() {
  const { isLogin } = useSelector((state: any) => state.user);
  const { user } = useSelector((state: any) => state.user);

  const router = useRouter();

  const [isMenu, setIsMenu] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [anchorEl, setAnchorEl] = useState < any >( null);
  const dispatch = useDispatch();
  const handleAsArtistClick = () => {
    router.push("/asArtist");
  };
  function handleLogoutClick() {
    handleClose();
    Cookies.remove("authToken");
    dispatch(userActions.logout());
  }

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

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen h-[10vh] md:shadow-md shadow-2xl backdrop-filter backdrop-blur-sm ${"text-white"}`}
    >
      {/* desktop and tablet */}
      <div className="hidden md:flex justify-between px-7 p-2">
        {/* logo */}
        <div className="logo flex">
          <h2
            className="text-2xl ml-3 font-extrabold "
            style={{ fontFamily: "Dancing Script" }}
          >
            Musical Moment
          </h2>
        </div>

        <div className="menu font-[lato]">
          <ul className="flex">
            <li className="mx-5 py-2">
              <Link href="/">Discover</Link>
            </li>
            <li className="mx-5 py-2">
              <Link href="/browser">Browser</Link>
            </li>

            <li className="mx-5 py-2">
              <Link href="/artist">Artist</Link>
            </li>
          </ul>
        </div>

        <div className="profile flex items-center">
          {isLogin && (
            <div className="img w-10 h-10 rounded-full mr-10">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Image
                  src={user.profile}
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
}