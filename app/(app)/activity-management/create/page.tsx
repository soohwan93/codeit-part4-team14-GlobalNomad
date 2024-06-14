import CreateMain from "@/components/activity-management/create/CreateMain";
import CreateWrapper from "@/components/activity-management/create/CreateWrapper";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <CreateWrapper>
      <CreateMain />
    </CreateWrapper>
  );
};

export default page;
