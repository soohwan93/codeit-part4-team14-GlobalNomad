export interface ActivityItem {
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
}

import React from "react";
import { MainInfo } from "@/components/main-page/MainInfo";
import { getActivities } from "@/util/api";
import { ActivityQuerys } from "@/util/apiType";

const Home = async () => {
  const query: ActivityQuerys = {
    method: "offset",
    page: 1,
    size: 200,
  };

  const { activities, totalCount } = await getActivities(query);

  if (activities) {
    return <MainInfo activities={activities} totalCount={totalCount} />;
  }
};

export default Home;
