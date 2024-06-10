import ReservationModal from "@/components/activity-detail/ReservationModal";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex h-screen justify-end">
      <ReservationModal />
    </div>
  );
};

export default page;
