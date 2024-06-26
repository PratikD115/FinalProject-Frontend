import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";

interface LayoutSidebarProps {
  children: React.ReactNode;
}

const LayoutSidebar = ({ children }: LayoutSidebarProps): JSX.Element => {
  const [sidebarWidth, setSidebarWidth] = useState<number | undefined>(
    undefined
  );
  const [sidebarTop, setSidebarTop] = useState<number | undefined>(undefined);

  useEffect(() => {
    const sidebarEl = document.querySelector(".sidebar") as HTMLElement;
    if (sidebarEl) {
      const sidebarRect = sidebarEl.getBoundingClientRect();
      setSidebarWidth(sidebarRect.width);
      setSidebarTop(sidebarRect.top);
    }
  }, []);

  useEffect(() => {
    if (!sidebarTop) return;

    const isSticky = () => {
      const sidebarEl = document.querySelector(".sidebar") as HTMLElement;
      const scrollTop = window.scrollY;
      if (scrollTop >= sidebarTop - 10) {
        sidebarEl?.classList.add("is-sticky");
      } else {
        sidebarEl?.classList.remove("is-sticky");
      }
    };

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  return (
    <>
      <main className="lg:flex lg:justify-evenly px-5 mt-3">
        <div className="ml-2 content w-full lg:w-[67%]">{children}</div>
        <div
          className="lg:w-[30%] border-1 border-solid border-gray-600 rounded-xl p-5"
          style={{ width: sidebarWidth }}
        >
          <Sidebar />
        </div>
      </main>
    </>
  );
};
export default LayoutSidebar;
