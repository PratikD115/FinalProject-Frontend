import Header from "../header/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-300 pb-56">
      <Header />
      <main className="pt-[8vh]">{children}</main>
    </div>
  );
};

export default Layout;
