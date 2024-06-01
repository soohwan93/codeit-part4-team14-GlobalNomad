import HeaderLogoSvg from "./svg/HeaderLogoSvg";
import NavButton from "./GNB/NavButton";

import Link from "next/link";

const GNB = () => {
  return (
    <header className="flex h-[70px] items-center border-b-2 border-gray-20">
      <div className="flex w-full justify-between px-6">
        <Link href="/">
          <HeaderLogoSvg />
        </Link>
        <NavButton />
      </div>
    </header>
  );
};

export default GNB;
