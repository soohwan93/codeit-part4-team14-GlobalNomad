import { tailwindClassMerge } from "@/util/tailwindClassMerge";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

export const ButtonVariants = cva(
  //모든 경우에 공통으로 들어갈 CSS
  `
  flex justify-center items-center rounded-md 
  `,
  {
    //variant , size에 따라 다른 디자인을 보여줄수 있다
    variants: {
      variant: {
        primary: "bg-nomad-black text-white ",
        white: " bg-white text-nomad-black border-nomad-black border-[1px] ",
        gray: " bg-gray-60 cursor-not-allowed text-white ",
      },
      size: {
        full: "w-full py-[14px] h-48px] text-base font-bold leading-[125%] ",
        lg: "w-[350px] py-[14px] h-[48px] text-base font-bold leading-[125%] ",
        md: "w-[144px] py-[8px] h-[48px] text-base font-bold leading-[100%] ",
        sm: "w-[108px] py-[10px] h-[38px] text-sm font-bold ",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "full",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    //Button의 속성을 타입지정을 통해 손쉽게 사용
    VariantProps<typeof ButtonVariants> {
  children?: ReactNode;
  additionalClass?: string;
}

/**
 * @variant 색상 지정 ex) gray, blue, red
 * @size 사이즈 지정 md, lg, wlg
 * @children ReactElement 아이콘같은걸 넣어준다
 * @additionalClass 추가할 클래스 속성을 넣어준다
 * @props 추가할 버튼 속성을 넣어준다
 * @type 현재 버튼의 타입을 넣어준다. 기본값은 button
 */
const Button: FC<ButtonProps> = ({
  variant,
  size,
  children,
  additionalClass,
  disabled,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={tailwindClassMerge(
        ButtonVariants({ variant: disabled ? "gray" : variant, size }),
        additionalClass,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children && children}
    </button>
  );
};

export default Button;
