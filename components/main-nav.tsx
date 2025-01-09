import { UserAccountNav } from "@/components/user-account-nav";
import { NavItem } from "@/components/nav-item";
import HeaderAuth from "./header-auth";
import Link from "next/link";

export function MainNav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-screen-2xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Baby Paradise</Link>
          {/* <HeaderAuth />  */}
        </div>
        <div className="flex space-x-4">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/client">Client</NavItem>
          <NavItem href="/server">Server</NavItem>
          <NavItem href="/protected">Protected</NavItem>
          <NavItem href="/admin">Admin</NavItem>
        </div>
        <UserAccountNav />
      </div>
    </nav>
  );
}
