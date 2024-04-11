import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import profile from "../../public/images/b4.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  const activeNavLink = (isActive) => (isActive ? "active" : "NavLink");
  const [isMenu, setIsMenu] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen h-[10vh] md:shadow-md shadow-2xl backdrop-filter backdrop-blur-sm ${"text-white"}`}
    >
      {/* desktop and tablet */}
      <div className="hidden md:flex justify-between px-7 p-2">
        {/* logo */}
        <div className="logo flex">
          <h2
            className="text-2xl ml-3 font-extrabold"
            style={{ fontFamily: "Dancing Script" }}
          >
            Musical Moment
          </h2>
        </div>

        <div className="menu">
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

        {/* profile  */}
        <div className="profile flex items-center">
          <div className="img w-10 h-10 rounded-full">
            <Image
              src={profile}
              alt="profile"
              width="40px"
              height="40px"
              className="img w-10 h-10 bg-red-300 rounded-full object-cover cursor-pointer"
            />
          </div>

          <Link href ="/login" className="flex justify-between items-center bg-green-500 px-4 py-1.5 pb-2 text-sm text-white rounded-full mx-3 hover:bg-green-600 hover:border-1 hover:border-black">
            <span className="mr-1">LogIn </span>
            <LoginIcon fontSize="small" />
          </Link>
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
