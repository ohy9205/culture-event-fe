import Link from "next/link";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="bg-slate-200 w-[1200px] h-[50px] flex justify-center items-center">
      <nav className="flex gap-5 text-xl">
        <Link href={"/"}>Home</Link>
        <Link href={"/event"}>Event</Link>
        {/* profile avatar 들어갈 자리 */}
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
