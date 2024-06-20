import CreateOrUpdateMain from "@/components/activity-management/createOrUpdate/CreateOrUpdateMain";
import CreateOrUpdateWrapper from "@/components/activity-management/createOrUpdate/CreateOrUpdateWrapper";

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
