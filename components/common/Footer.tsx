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
    <footer className="bg-nomad-black pb-3 text-center text-gray-30 md:p-0">
      <div className="m-auto max-w-[95rem] p-1 md:p-2">
        <div className="flex items-center justify-between p-2">
          <HeaderLogoSvg color="#EEEEEE " />
          <div className="text-right">
            <span className="bold mb-1 block">Contributor</span>
            <div className="flex justify-between gap-2">
              {contributorData.map((item) => (
                <Link
                  target="_blank"
                  href={item.github}
                  className="relative h-6 w-6 overflow-hidden rounded-full md:h-8 md:w-8 "
                  key={`footer-${item.name}`}
                >
                  <Image
                    src={item.imageUrl}
                    sizes="32px"
                    fill
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
            <Link href="https://x.com/" target="_blank">
              <FooterTwitterSvg />
            </Link>
            <Link href="https://www.facebook.com/" target="_blank">
              <FooterFacebookSvg />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank">
              <FooterInstagramSvg />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank">
              <FooterYoutubeSvg />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
