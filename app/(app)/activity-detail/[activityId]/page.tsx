/*{
  "email": "rhajiit@google.com",
  "password": "rhajiit!"
}
id : 991
*/

import React from "react";
import BannerImage from "@/components/activity-detail/BannerImage";
import KakaoMap from "@/components/activity-detail/KakaoMap";
import ReviewList from "@/components/activity-detail/ReviewList";
import KebabSvg from "@/components/common/svg/KebabSvg";
import ActivityDetailHeader from "@/components/activity-detail/ActivityDetailHeader";

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
  const reviewData = await fetchData(
    `${params.activityId}/reviews?page=1&size=3`,
  );
  console.log(data);

  return (
    <div className="bg-gray-10 px-0 py-4 md:px-6 md:py-6 xl:py-20">
      <div className="mx-auto max-w-[1200px]">
        <ActivityDetailHeader data={data} />
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
                <ReviewList
                  totalCount={reviewData.totalCount}
                  averageRating={reviewData.averageRating}
                  reviews={reviewData.reviews}
                />
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
