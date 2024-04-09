import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
export default function LayoutSidebar ({ children })  {
  const [sidebarWidth, setSidebarWidth] = useState(undefined);
  const [sidebarTop, setSidebarTop] = useState(undefined);

  // useEffect(() => {
  //   const sidebarEl = document
  //     .querySelector(".sidebar")
  //     .getBoundingClientRect();
  //   setSidebarWidth(sidebarEl.width);
  //   setSidebarTop(sidebarEl.top);
  // }, []);

  useEffect(() => {
    if (!sidebarTop) return;

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  const isSticky = (e) => {
    const sidebarEl = document.querySelector(".sidebar");
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop - 10) {
      sidebarEl.classList.add("is-sticky");
    } else {
      sidebarEl.classList.remove("is-sticky");
    }
  };
  return (
    <>
      <main className="md:flex md:justify-around px-5 mt-3">
        <div className=" ml-2 content w-full md:w-[67%]">{children}</div>
        <div
          className="md:w-[30%] border-1 border-solid border-gray-600 rounded-xl p-5"
          style={{ width: sidebarWidth }}
        >
          <Sidebar />
        </div>
      </main>
    </>
  );
};
