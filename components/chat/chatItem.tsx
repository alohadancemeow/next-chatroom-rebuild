import React from "react";

type Props = {
  message: { name: string; momentTime: string; message: string };
};

const ChatItem = ({ message: { message, name, momentTime } }: Props) => {
  return (
    <div className="chat-messages" id="chat-messsage">
      <div className="px-2 py-1 m-3 bg-white rounded break-words">
        <p className="font-bold opacity-70 m-1 text-[#0e81ce]">
          {name}
          <span className="ml-2 text-[#777]">{momentTime}</span>
        </p>
        <p className="m-1 font-bold text-black opacity-70 ">{`Say: ${message}`}</p>
      </div>
    </div>
  );
};

export default ChatItem;
