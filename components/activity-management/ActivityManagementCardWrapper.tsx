"use client";
import { getMyActivities } from "@/util/api";
import { MyActivitiesQuery } from "@/util/apiType";
import React, { Fragment, useEffect, useState, useCallback } from "react";

import { useInView } from "react-intersection-observer";
import ActivityManagementCard from "./ActivityManagementCard";
import Image from "next/image";

export interface ActivityManagementCardProps {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface ActivityApiProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

interface Props {
  initialActivities: ActivityApiProps[];
  hasNext: number | null;
  totalCount: number;
}

const ActivityManagementCardWrapper = ({
  totalCount,
  hasNext,
  initialActivities,
}: Props) => {
  const [activities, setActivities] =
    useState<ActivityApiProps[]>(initialActivities);
  const [lastCursorId, setLastCursorId] = useState<number | null>(
    initialActivities.length > 0
      ? initialActivities[initialActivities.length - 1].id
      : null,
  );
  const [ref, inView] = useInView({ threshold: 1 });
  const [loading, setLoading] = useState(false);
  const [lastDataLength, setLastDataLength] = useState<number>(5);
  const callMyActivities = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const query: MyActivitiesQuery = {
      size: 5,
      cursorId: lastCursorId,
    };

    const { activities: newActivities } = await getMyActivities(query);

    setLoading(false);
    setLastDataLength(newActivities.length);

    if (newActivities.length === 0) {
      return;
    }

    setActivities((prevActivities) => [...prevActivities, ...newActivities]);
    if (newActivities.length > 0) {
      setLastCursorId(newActivities[newActivities.length - 1].id);
    }
  }, [lastCursorId, loading]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      lastDataLength === 5 &&
      totalCount > 5 &&
      hasNext
    ) {
      callMyActivities();
    }
  }, [inView, callMyActivities, loading, lastDataLength, totalCount, hasNext]);

  return (
    <>
      {activities?.map((item: ActivityApiProps) => (
        <Fragment key={item.id}>
          <ActivityManagementCard setActivities={setActivities} prop={item} />
        </Fragment>
      ))}
      {loading && (
        <div className="flex h-32 w-full items-center justify-center space-x-2 bg-gray-10 dark:invert md:h-52">
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-nomad-black"></div>
        </div>
      )}
      {!loading && activities.length === 0 && (
        <div className="mx-auto mt-20 flex w-fit flex-col items-center">
          <Image
            src="/icons/no-result.svg"
            width={130}
            height={177}
            alt="아직 등록한 체험이 없습니다."
          />
          <span className="mt-10 inline-block text-xl font-medium text-gray-70 md:text-2xl">
            아직 등록한 체험이 없어요.
          </span>
        </div>
      )}
      <div ref={ref} className="h-1" />
    </>
  );
};

export default ActivityManagementCardWrapper;
