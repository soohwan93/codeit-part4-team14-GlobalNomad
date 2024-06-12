import React from "react";
import GuestNavButtons from "./GuestNavButtons";
import AuthNavButtons from "./AuthNavButtons";
import { auth } from "@/auth";

const NavButtons = async () => {
  const session = await auth();
  console.log(session);
  const user = session?.user;
  return (
    <nav className="flex items-center gap-[25px]">
      {session ? <AuthNavButtons /> : <GuestNavButtons />}
    </nav>
  );
};

export default NavButtons;
