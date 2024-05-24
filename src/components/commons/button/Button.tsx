// rafce (short cut to create react component)
import clsx from "clsx";
import React, { HTMLProps } from "react";

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  className?: HTMLProps<HTMLElement>["className"];
  children: string;
}

const Button = ({
  disabled = false,
  onClick,
  className,
  children = "",
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.()}
      className="p-4 bg-purple-300 rounded-md text-white flex mt-5"
    >
      {children}
    </button>
  );
};

export default Button;
