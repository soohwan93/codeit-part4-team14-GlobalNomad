import HeaderLogoSvg from "./svg/HeaderLogoSvg";
import NavButtons from "./GNB/NavButtons";

import Link from "next/link";

const GNB = () => {
  return (
    <header className="flex h-[70px] items-center border-b-2 border-gray-20">
      <div className="flex w-full justify-between px-6">
        <Link href="/">
          <HeaderLogoSvg />
        </Link>
        <NavButtons />
      </div>
    </header>
  );
};

export default GNB;
