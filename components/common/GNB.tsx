import HeaderLogoSvg from "./svg/HeaderLogoSvg";
import OptionalNav from "./GNB/OptionalNav";

import Link from "next/link";

const GNB = () => {
  return (
    <>
      <header className="mx-auto flex h-[70px] w-full max-w-[1200px] flex-col items-center justify-center ">
        <div className="flex w-full justify-between px-6">
          <Link href="/">
            <HeaderLogoSvg />
          </Link>
          <OptionalNav />
        </div>
      </header>
      <div className="border-b-2 border-gray-200" />
    </>
  );
};

export default GNB;
