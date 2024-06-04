import React from "react";

type Props = {
  username: string;
  momentTime: string;
};

const UserList = ({ username, momentTime }: Props) => {
  return (
    <div className="flex flex-col overflow-auto max-h-[calc(100vh - calc(100vh / 2))]">
      <div className="flex flex-col border-b-[#ebe7fb] border bg-[#e0e5ec] my-1 rounded py-[2px] px-4 break-words">
        <p className="text-lg font-bold bg-[#05f710] w-fit py-[2px] px-4 rounded-sm text-white mt-2 mx-1 mb-1">
          {username}
        </p>
        <p className="mb-1 ml-1 font-bold opacity-70 text-[#0e81ce]">
          Joined : {momentTime}
        </p>
      </div>
    </div>
  );
};

export default UserList;
