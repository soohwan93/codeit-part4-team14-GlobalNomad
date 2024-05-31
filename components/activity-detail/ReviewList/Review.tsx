import Image from "next/image";
import React from "react";

type Props = {};

const Review = (props: Props) => {
  return (
    <section className="my-6 flex items-start justify-start gap-4">
      <Image
        src="/testProfile.png"
        alt=""
        width={45}
        height={45}
        className="rounded-full"
      />
      <div className="block">
        <div className="mb-2">
          <span>이름 |&nbsp;</span>
          <span className="leading-[162.5%] text-gray-60">작성 날짜</span>
        </div>
        <p>후기 쫘라라라ㅏ라라락</p>
      </div>
    </section>
  );
};

export default Review;
