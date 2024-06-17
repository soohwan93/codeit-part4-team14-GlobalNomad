"use client";
import React from "react";

interface ActivityData {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  title: string;
  updatedAt: string;
  userId: number;
}

const ReservationStatus = ({
  myActivityList,
}: {
  myActivityList: ActivityData[];
}) => {
  return <div className="h-96 w-full border border-black"></div>;
};

export default ReservationStatus;
