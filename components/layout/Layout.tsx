import Header from "../header/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="mb-0">
      <Header />
      <main className="pt-[10vh]">{children}</main>
    </div>
  );
}
