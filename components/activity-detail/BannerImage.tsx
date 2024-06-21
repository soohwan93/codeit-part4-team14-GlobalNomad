"use client";
import Image from "next/image";
import React, { useState } from "react";

interface SubImages {
  id: number;
  imageUrl: string;
}

interface BannerImageProps {
  banner: string;
  subImages: SubImages[];
}

const BannerImage = ({ banner, subImages }: BannerImageProps) => {
  const [currentBanner, setCurrentBanner] = useState<number | null>(null);

  return (
    <section className="max-h-[50rem] w-full px-2 md:px-0">
      <div className="relative mb-2 h-[25rem] w-full overflow-hidden rounded-xl bg-gray-40 xl:h-[31.25rem]">
        <Image
          src={banner}
          alt="mainImage"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center duration-500 ${currentBanner !== null ? "opacity-0" : "opacity-100"}`}
        />
        {subImages.map((item) => (
          <React.Fragment key={`banner-${item.id}`}>
            <Image
              src={item.imageUrl}
              alt=""
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover object-center  duration-500 ${currentBanner !== item.id ? "opacity-0" : "opacity-100"}`}
            />
          </React.Fragment>
        ))}
      </div>
      <section className="scrollbar-hide flex h-[8.4rem] grid-cols-4 gap-2 overflow-x-scroll md:grid xl:h-[14rem]">
        {subImages.length !== 0 &&
          subImages.map((item, i) => (
            <div
              key={`subImage-${item.id}`}
              className="relative min-w-[11.65rem] overflow-hidden rounded-xl bg-gray-20 md:w-full md:min-w-[10.9375rem] "
              onMouseOver={() => {
                setCurrentBanner(item.id);
              }}
              onMouseOut={() => setCurrentBanner(null)}
            >
              <Image
                src={item.imageUrl}
                alt={`subBanner-${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover object-center"
              />
            </div>
          ))}
      </section>
    </section>
  );
};

export default BannerImage;
