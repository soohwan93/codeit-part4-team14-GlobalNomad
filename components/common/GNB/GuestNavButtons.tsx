import Link from "next/link";
import React from "react";

const GuestNavButtons = () => {
  return (
    <>
      <Link className="font-medium" href="/signin">
        로그인
      </Link>
      <Link className="font-medium" href="/signup">
        회원가입
      </Link>
    </>
  );
};

export default GuestNavButtons;
