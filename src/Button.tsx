import { FC, PropsWithChildren } from "react";

export const Button: FC<{
  disabled: boolean;
  onClick: () => void;
  text: string;
}> = ({ disabled, onClick, text }) => {
  return (
    <button
      className="bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed px-8 py-3 rounded-sm  font-medium"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
