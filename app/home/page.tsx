"use client";

import ChatContent from "@/components/chat/chatContent";
import ChatList from "@/components/chat/chatList";
import UserProfile from "@/components/chat/userProfile";
import { useChatStore } from "@/states/chat-store";
import { cn } from "@/lib/utils";

type Props = {};

const Room = (props: Props) => {
  const { chatId } = useChatStore();

  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <main className="flex w-[95%] h-[90vh] max-w-[1200px] bg-white rounded-[30px] overflow-hidden shadow-2xl relative">
        {/* Sidebar / Chat List */}
        <aside
          className={cn(
            "h-full w-full md:w-[320px] lg:w-[360px] flex-shrink-0 flex flex-col border-r border-slate-100",
            chatId ? "hidden md:flex" : "flex"
          )}
        >
          <ChatList />
        </aside>

        {/* Main Content Area */}
        <section
          className={cn(
            "flex-1 flex flex-col min-w-0 bg-white relative",
            chatId ? "flex" : "hidden md:flex"
          )}
        >
          <ChatContent />
        </section>

        {/* Right Sidebar / Profile */}
        <aside className="hidden xl:flex w-[350px] flex-col border-l border-slate-100 bg-white">
          <UserProfile />
        </aside>
      </main>
    </div>
  );
};

export default Room;
