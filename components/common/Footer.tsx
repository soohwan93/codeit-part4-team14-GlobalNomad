import Link from "next/link";
import React from "react";
import FooterTwitterSvg from "./svg/FooterTwitterSvg";
import FooterFacebookSvg from "./svg/FooterFacebookSvg";
import FooterInstagramSvg from "./svg/FooterInstagramSvg";
import FooterYoutubeSvg from "./svg/FooterYoutubeSvg";

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
          <div className="flex justify-between gap-2">
            <Link href="https://x.com/">
              <FooterTwitterSvg />
            </Link>
            <Link href="https://www.facebook.com/">
              <FooterFacebookSvg />
            </Link>
            <Link href="https://www.instagram.com/">
              <FooterInstagramSvg />
            </Link>
            <Link href="https://www.youtube.com/">
              <FooterYoutubeSvg />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
