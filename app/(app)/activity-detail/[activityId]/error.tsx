"use client";
import Link from "next/link";
import React from "react";

type Props = {};

const error = (props: Props) => {
  return (
    <div>
      <Link href="http://localhost:3000/activity-detail/991">error</Link>
    </div>
  );
};

export default error;
