"use client";
import Image from "next/image";
import React from "react";

interface SubImages {
  id: number;
  imageUrl: string;
}

interface BannerImageProps {
  banner: string;
  subImages: SubImages[];
}

const BannerImage = ({ banner, subImages }: BannerImageProps) => {
  return (
    <section className="grid h-[50rem] w-full grid-cols-4">
      <div className="relative col-start-1 col-end-5 h-[31.25rem] w-full">
        <Image
          src={banner}
          alt="mainImage"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </section>
  );
};

export default BannerImage;
