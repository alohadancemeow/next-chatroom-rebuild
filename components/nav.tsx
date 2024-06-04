import React from "react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div>
      <div className="flex items-center cursor-pointer gap-3">
        <img src="./chat.svg" alt="logo" className="block max-w-12" />
        <p className="text-xl font-semibold text-center opacity-80 text-black">
          Let's Chat
        </p>
      </div>
    </div>
  );
};

export default Nav;
