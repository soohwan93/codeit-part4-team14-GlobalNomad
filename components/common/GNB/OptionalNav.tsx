import React from "react";
import GuestNav from "./navType/GuestNav";
import AuthNav from "./navType/AuthNav";
import { auth } from "@/auth";

const OptionalNav = async () => {
  const session = await auth();
  return (
    <nav className="flex items-center gap-[25px]">
      {session ? <AuthNav /> : <GuestNav />}
    </nav>
  );
};

export default OptionalNav;
