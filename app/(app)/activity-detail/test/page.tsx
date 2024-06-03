import ActivityManagementCard from "@/components/activity-management/ActivityManagementCard";
import ReservationListCard from "@/components/activity-management/ReservationListCard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen bg-gray-10">
      <ReservationListCard />;
      <ReservationListCard />;
      <ActivityManagementCard />;
      <ActivityManagementCard />;
    </div>
  );
};

export default page;
