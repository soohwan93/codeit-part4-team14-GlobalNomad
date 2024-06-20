import AddImageSvg from "@/components/common/svg/AddImageSvg";
interface Props {
  onClick: () => void;
}
const AddImage = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-80 md:h-40 md:w-40"
    >
      <AddImageSvg />
      <span className="mt-5 text-xl text-gray-80 md:mt-8 md:text-2xl">
        이미지 등록
      </span>
    </div>
  );
};

export default AddImage;
