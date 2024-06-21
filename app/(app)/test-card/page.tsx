import ActivityManagementCard from "@/components/activity-management/ActivityManagementCard";
import { ActivityApiProps } from "@/components/activity-management/ActivityManagementCardWrapper";

import ACTIVITY_LIST from "@/components/common/ACTIVITY_LIST";
import RESERVATION_DATA from "@/components/common/RESERVATION_DATA";
import ReservationListCard from "@/components/reservation-status/ReservationListCard";
import React, { Fragment } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-10">
      {RESERVATION_DATA.map((item) => (
        <ReservationListCard key={item.id} prop={item} />
      ))}
      <div className="mt-10">
        {ACTIVITY_LIST.map((item: ActivityApiProps) => (
          <Fragment key={item.id}>
            {/* <ActivityManagementCard prop={item} /> */}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default page;
