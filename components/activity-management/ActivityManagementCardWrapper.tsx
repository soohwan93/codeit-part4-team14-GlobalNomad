"use client";
import { getMyActivities } from "@/util/api";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import ActivityManagementCard from "./ActivityManagementCard";
import { MyActivitiesQuery } from "@/util/apiType";
import { cookies } from "next/headers";
import { InView } from "react-intersection-observer";

export interface ActivityManagementCardProps {
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

const ActivityManagementCardWrapper = () => {
  // const cookieStore = cookies();
  // const token = cookieStore.get("accessToken")?.value;
  // console.log(token);

  const [activities, setActivities] = useState<ActivityApiProps[]>([]);
  const [lastCursorId, setLastCursorId] = useState<number | null>(null);

  const callMyActivities = async () => {
    const query: MyActivitiesQuery = {
      size: 5,
    };
    const { activities } = await getMyActivities(query);
    setActivities(activities);
    console.log(activities);
  };

  const handleIntersection = async (inView: boolean) => {
    if (inView && lastCursorId !== null) {
      console.log("In view:", inView);
      const query: MyActivitiesQuery = {
        size: 3,
        cursorId: lastCursorId,
      };
      const { activities: newActivities } = await getMyActivities(query);
      setActivities((prevActivities) => [...prevActivities, ...newActivities]);
      if (newActivities.length > 0) {
        setLastCursorId(newActivities[newActivities.length - 1].id);
        console.log(lastCursorId);
      }
    }
  };

  useEffect(() => {
    callMyActivities();
  }, []);

  return (
    <>
      {activities?.map((item: ActivityApiProps) => (
        <Fragment key={item.id}>
          <ActivityManagementCard prop={item} />
        </Fragment>
      ))}
      {/* <InView as="div" onChange={handleIntersection} threshold={1}>
        {({ ref }) => <div ref={ref} style={{ height: "1px" }}></div>}
      </InView> */}
      <InView
        as="div"
        onChange={handleIntersection}
        rootMargin="100px"
        threshold={0.1}
      >
        {({ ref }) => (
          <div ref={ref} style={{ height: "50px", background: "lightgray" }}>
            {/* 이 부분이 스크롤이 해당 영역에 도달했을 때 호출되는 지점입니다. */}
          </div>
        )}
      </InView>
    </>
  );
};
export default ActivityManagementCardWrapper;
