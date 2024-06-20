import { ActivityResponseById } from "@/app/(app)/activity-management/[activityId]/page";
import Button from "@/components/common/Button";

interface Props {
  isDisabled: boolean;
  responseApiData?: ActivityResponseById | null;
}

const ActivityCreateOrUpdateHeader = ({
  responseApiData,
  isDisabled,
}: Props) => {
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="text-[32px] font-bold">
        내 체험 {responseApiData ? "수정" : "등록"}
      </div>
      <div className="h-12 w-[120px] rounded-[4px] font-medium text-white">
        <Button disabled={isDisabled} type="submit">
          {responseApiData ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </div>
  );
};

export default ActivityCreateOrUpdateHeader;
