import { getMyActivities } from "@/util/api";
import type { MyActivitiesQuery } from "@/util/apiType";

import React from "react";
import ActivityManagementHeader from "@/components/activity-management/ActivityManagementHeader";

import ActivityManagementWrapper from "@/components/activity-management/ActivityManagementWrapper";
import ActivityManagementCardWrapper from "@/components/activity-management/ActivityManagementCardWrapper";

const page = async () => {
  const query: MyActivitiesQuery = {
    size: 5,
  };
  const {
    cursorId: hasNext,
    totalCount,
    activities,
  } = await getMyActivities(query);

  return (
    <ActivityManagementWrapper>
      <ActivityManagementHeader />
      <ActivityManagementCardWrapper
        hasNext={hasNext}
        totalCount={totalCount}
        initialActivities={activities}
      />
    </ActivityManagementWrapper>
  );
};

export default page;
