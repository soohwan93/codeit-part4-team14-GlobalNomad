import Link from "next/link";
import React from "react";
import FooterTwitterSvg from "./svg/FooterTwitterSvg";
import FooterFacebookSvg from "./svg/FooterFacebookSvg";
import FooterInstagramSvg from "./svg/FooterInstagramSvg";
import FooterYoutubeSvg from "./svg/FooterYoutubeSvg";
import Image from "next/image";
import HeaderLogoSvg from "./svg/HeaderLogoSvg";
const contributorData = [
  {
    name: "김수환",
    github: "https://github.com/soohwan93",
    imageUrl: "https://avatars.githubusercontent.com/u/155133655?s=64&v=4",
  },
  {
    name: "김세동",
    github: "https://github.com/Rhajiit",
    imageUrl: "https://avatars.githubusercontent.com/u/155033024?s=64&v=4",
  },
  {
    name: "구승모",
    github: "https://github.com/Trophy198",
    imageUrl: "https://avatars.githubusercontent.com/u/100824183?s=64&v=4",
  },
  {
    name: "신민철",
    github: "https://github.com/MinCheolS",
    imageUrl: "https://avatars.githubusercontent.com/u/97032929?s=64&v=4",
  },
  {
    name: "한태욱",
    github: "https://github.com/TaeUk471",
    imageUrl: "https://avatars.githubusercontent.com/u/90249043?s=64&v=4",
  },
];

const Footer = () => {
  return (
    <footer className="bg-nomad-black text-center text-gray-30">
      <div className="m-auto max-w-[80rem] p-1 md:p-2">
        <div className="flex items-center justify-between p-1 md:p-2">
          <HeaderLogoSvg color="#EEEEEE " />
          <div className="text-right">
            <span>Contributor</span>
            <div className="flex justify-between gap-2">
              {contributorData.map((item) => (
                <Link
                  href={item.github}
                  className="overflow-hidden rounded-full"
                  key={`footer-${item.name}`}
                >
                  <Image
                    src={item.imageUrl}
                    height={32}
                    width={32}
                    alt={item.name}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-1 md:my-2" />
        <div className="flex items-center justify-between p-1 md:p-2">
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
