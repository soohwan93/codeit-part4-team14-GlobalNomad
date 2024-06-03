"use client";

import { checkAccessTokenCookie } from "@/util/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GuestNavButtons from "./GuestNavButtons";
import AuthNavButtons from "./AuthNavButtons";

const NavButtons = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const loginStatus = await checkAccessTokenCookie();
        setIsLogin(loginStatus);
      } catch (error) {
        console.error("로그인 상태 확인 중 에러 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return null;

  return (
    <nav className="flex items-center gap-[25px]">
      {isLogin ? <AuthNavButtons /> : <GuestNavButtons />}
    </nav>
  );
};

export default NavButtons;
