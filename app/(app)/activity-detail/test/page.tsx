import ActivityManagementCard from "@/components/activity-management/ActivityManagementCard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen bg-gray-10">
      <ActivityManagementCard />;
      <ActivityManagementCard />;
      <ActivityManagementCard />;
    </div>
  );
};

export default page;
