"use client";

import { checkAccessTokenCookie } from "@/util/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
      {isLogin ? (
        <Link className="font-medium" href="/my-profile">
          내 정보
        </Link>
      ) : (
        <>
          <div>Logintest</div>
          <Link className="font-medium" href="/signin">
            로그인
          </Link>
          <Link className="font-medium" href="/signup">
            회원가입
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavButtons;
