import React from "react";

interface DropdownInputType<E> {
  dataArray: E[];
}

interface ReservationAvailableTime {
  endTime: string;
  startTime: string;
  id: number;
}

const DropdownInput = ({
  dataArray,
}: DropdownInputType<ReservationAvailableTime>) => {
  return <div>DropdownInput</div>;
};

export default DropdownInput;
