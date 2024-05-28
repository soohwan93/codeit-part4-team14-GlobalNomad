import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const tailwindClassMerge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
