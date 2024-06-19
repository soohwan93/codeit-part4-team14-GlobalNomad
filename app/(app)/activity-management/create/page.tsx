import CreateOrUpdateMain from "@/components/activity-management/createOrupdate/CreateOrUpdateMain";
import CreateOrUpdateWrapper from "@/components/activity-management/createOrupdate/CreateOrUpdateWrapper";

import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <CreateOrUpdateWrapper>
      <CreateOrUpdateMain />
    </CreateOrUpdateWrapper>
  );
};

export default page;
