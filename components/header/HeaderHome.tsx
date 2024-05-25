import { useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";

const HeaderHome = () => {
  const router = useRouter();

  const [isMenu, setIsMenu] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen h-[8vh] lg:shadow-md shadow-2xl backdrop-filter backdrop-blur-sm ${"text-white"} bg-slate-950`}
    >
      {/* desktop and tablet */}
      <div className="hidden lg:flex justify-between px-7 p-2 ">
        <div className="logo flex">
          <Link href="/">
            <h2
              className={`text-2xl ml-3 font-extrabold mt-3 mr-5 ${
                router.pathname === "/" ? "active" : ""
              }`}
              style={{ fontFamily: "Dancing Script" }}
            >
              Musical Moment
            </h2>
          </Link>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between lg:hidden h-full pl-2 pr-8">
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
                  <Link href="/browse">Browse</Link>
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

export default HeaderHome;
