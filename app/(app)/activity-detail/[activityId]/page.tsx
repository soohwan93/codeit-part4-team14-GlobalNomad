import React from "react";
import BannerImage from "@/components/activity-detail/BannerImage";
import KakaoMap from "@/components/activity-detail/KakaoMap";
import ReviewList from "@/components/activity-detail/ReviewList";
import ActivityDetailHeader from "@/components/activity-detail/ActivityDetailHeader";
import ReservationModal from "@/components/activity-detail/ReservationModal";
import { getActivityById, getActivityReviews, getUser } from "@/util/api";
import fetchCurrentUserData from "@/components/activity-detail/fetchCurrentUserData";
import StarSvg from "@/components/common/svg/StarSvg";

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
  const userData = await fetchCurrentUserData();
  const data: ActivityDetailType = await getActivityById(
    Number(params.activityId),
  );
  const reviewData = await getActivityReviews(Number(params.activityId), {
    page: 1,
    size: 3,
  });
  const isUserOwner = data.userId === userData.id;

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
            <div className="flex items-center gap-3 text-sm text-black">
              <span className="flex items-center gap-1.5">
                <StarSvg />
                {data.reviewCount !== 0 ? (
                  <>
                    {data.rating.toFixed(1)} ({data.reviewCount})
                  </>
                ) : (
                  <>후기 없음</>
                )}
              </span>

              <span>{data.address}</span>
            </div>
          </div>

          {isUserOwner && <ActivityDetailHeader activityId={data.id} />}
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
                className="w-full resize-none text-wrap border-none bg-transparent text-base leading-[162.5%] text-nomad-black"
                defaultValue={data.description}
              />
              <hr className="mb-10 mt-10" />
              <KakaoMap address={data.address} activityTitle={data.title} />
              <hr className="my-10" />
              <section>
                <ReviewList
                  activityId={Number(params.activityId)}
                  totalCount={reviewData.totalCount}
                  averageRating={reviewData.averageRating}
                  reviews={reviewData.reviews}
                />
              </section>
            </article>

            <ReservationModal
              price={data.price}
              schedules={data.schedules}
              activityId={params.activityId}
              isUserOwner={isUserOwner}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
