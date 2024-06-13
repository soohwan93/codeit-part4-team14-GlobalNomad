import ActivityCreateForm from "@/components/activity-management/create/ActivityCreateForm";
import ActivityCreateHeader from "@/components/activity-management/create/ActivityCreateHeader";
import CreateMain from "@/components/activity-management/create/CreateMain";
import CreateWrapper from "@/components/activity-management/create/CreateWrapper";
import Input from "@/components/common/Input";
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
