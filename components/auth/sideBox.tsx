import React from "react";

type Props = {
  current: "Register" | "Login";
  containerRef?: React.LegacyRef<HTMLDivElement> | undefined;
  onClick: () => void;
};

const SideBox = ({ containerRef, current, onClick }: Props) => {
  return (
    <div
      className="flex flex-col text-center duration-300 ease-in-out justify-center h-[90%] absolute rounded-md z-[1] cursor-pointer w-full bg-sky-700 right shadow-md"
      ref={containerRef}
      onClick={onClick}
    >
      <div>
        <div className="mx-4 text-white">
          <div className="text-5xl my-3">
            {current === "Login" ? <div>✌️</div> : <div>👋</div>}
          </div>
          <div className="font-semibold text-xl">{current}</div>

          <div className="text-gray-200 text-sm">
            {current === "Login" ? "Welcome Back" : "Create Account"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBox;
