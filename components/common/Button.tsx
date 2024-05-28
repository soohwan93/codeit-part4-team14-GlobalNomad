import React from "react";

interface ButtonTypes {
  name: string;
  size: string;
  color: "default" | "white" | "gray";
  type: "button" | "submit";
  onClick: () => void;
  class?: string;
}

const Button = ({
  name,
  size,
  color = "default",
  onClick,
  type = "button",
}: ButtonTypes) => {
  return <button></button>;
};

export default Button;
