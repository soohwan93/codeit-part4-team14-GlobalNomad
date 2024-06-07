/*{
  "email": "rhajiit@google.com",
  "password": "rhajiit!"
}
id : 991
*/

import BannerImage from "@/components/activity-detail/BannerImage";
import KakaoMap from "@/components/activity-detail/KakaoMap";
import ReviewList from "@/components/activity-detail/ReviewList";
import KebabSvg from "@/components/common/svg/KebabSvg";
import React from "react";

const fetchData = async (endpoint: string) => {
  const response = await fetch(
    `https://sp-globalnomad-api.vercel.app/4-14/activities/${endpoint}`,
    { cache: "no-cache" },
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse.message);
    throw new Error(errorResponse.message);
  }
  const data = await response.json();

  return data;
};

interface ActivityDetailType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

const page = async ({ params }: { params: { activityId: string } }) => {
  const data: ActivityDetailType = await fetchData(params.activityId);
  console.log(data);

  return (
    <div className="bg-gray-10 px-0 py-4 md:px-6 md:py-6 xl:py-20">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between px-4 py-4 xl:pt-20">
          <div>
            <span className="mb-2.5 text-sm leading-normal text-black">
              {data.category}
            </span>
            <h1 className="mb-4 text-2xl font-bold leading-normal text-nomad-black md:text-3xl">
              {data.title}
            </h1>
            <div className="text-sm text-black ">
              <span className="mr-3 inline-block">
                <div className="mr-1.5 inline-block h-4 w-4 bg-[url('/icons/Star.svg')]" />
                {data.rating.toFixed(1)} ({data.reviewCount})
              </span>
              <span>{data.address}</span>
            </div>
          </div>
          <button type="button">
            <KebabSvg />
          </button>
        </header>
        <main>
          <BannerImage
            banner={data.bannerImageUrl}
            subImages={data.subImages}
          />
          <div className="flex gap-6 px-6 pt-4">
            <article className="w-full">
              <hr color="nomad-black" className="hidden md:block" />
              <h3 className="mb-4 text-xl font-bold leading-[130%] text-nomad-black md:mt-10">
                체험 설명
              </h3>
              <textarea
                disabled
                className="w-full resize-none text-wrap bg-transparent text-base leading-[162.5%] text-nomad-black"
                defaultValue={data.description}
              />
              <hr className="mb-10 mt-10" />
              <KakaoMap address={data.address} activityTitle={data.title} />
              <hr className="my-10" />
              <section>
                <header>
                  <h3 className="text-xl font-bold leading-[130%] text-nomad-black">
                    후기
                  </h3>
                  <div>
                    <span className="text-[3.125rem] font-semibold text-nomad-black">
                      {data.rating.toFixed(1)}
                    </span>
                    <div className="ml-4 inline-block">
                      <span className="text-lg leading-[133%] text-nomad-black">
                        매우 만족
                      </span>
                      <div className="text-sm text-nomad-black">
                        <span className="mr-3 inline-block">
                          <div className="mr-1.5 inline-block h-4 w-4 bg-[url('/icons/Star.svg')]" />
                          {data.reviewCount.toLocaleString()}개 후기
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
                <ReviewList />
              </section>
            </article>

            <section className="hidden h-96 shrink-0 border-2 border-black md:block md:w-60 xl:w-80">
              asdf
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
