import Nav from "@/components/header";
import ChatContent from "@/components/chat/chatContent";
import ChatList from "@/components/chat/chatList";
import UserProfile from "@/components/chat/userProfile";

type Props = {};

const Room = (props: Props) => {
  return (
    <div className="max-w-[90%] xl:max-w-[75%] bg-white m-auto w-full flex flex-col p-3 rounded-lg">
      <Nav />
      <div className="flex-grow bg-[#f4f3f8] my-3 py-6 px-5 flex rounded-lg">
        <ChatList />
        <ChatContent />
        <UserProfile />
      </div>
    </div>
  );
};

export default Room;
