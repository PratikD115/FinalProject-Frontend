
import Header from "../header/Header";

export default function Layout({ children }) {
  return (
    <div className="mb-0  ">
      <Header />
      <main className="pt-[10vh]">{children}</main>
    </div>
  );
}
