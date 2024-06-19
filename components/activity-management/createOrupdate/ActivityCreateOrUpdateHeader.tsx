import Button from "@/components/common/Button";

interface Props {
  isDisabled: boolean;
}

const ActivityCreateOrUpdateHeader = ({ isDisabled }: Props) => {
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="text-[32px] font-bold">내 체험 등록</div>
      <div className="h-12 w-[120px] rounded-[4px] font-medium text-white">
        <Button disabled={isDisabled} type="submit">
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default ActivityCreateOrUpdateHeader;
