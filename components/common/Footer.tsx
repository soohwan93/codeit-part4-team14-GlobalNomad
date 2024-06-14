import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-nomad-black text-center text-white">
      <div className="m-auto max-w-[80rem] p-2">
        <div className="flex justify-between p-2">
          Global-Nomad
          <div className="text-left">
            <span>Contributor</span>
            <div className="flex justify-between gap-2">
              <Link href="https://github.com/soohwan93">김수환</Link>
              <Link href="https://github.com/Rhajiit">김세동</Link>
              <Link href="https://github.com/Trophy198">구승모</Link>
              <Link href="https://github.com/MinCheolS">신민철</Link>
              <Link href="https://github.com/TaeUk471">한태욱</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between p-2">
          ⓒcodeit - 2024
          <div className="flex justify-between gap-1">
            <Link href="">twitter</Link>
            <Link href="">facebook</Link>
            <Link href="">instagram</Link>
            <Link href="">youtube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
