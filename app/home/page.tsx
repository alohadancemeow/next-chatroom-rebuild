import Nav from "@/components/nav";
import ChatContent from "@/components/chat/chatContent";
import ChatList from "@/components/chat/chatList";
import UserProfile from "@/components/chat/userProfile";

type Props = {};

const Room = (props: Props) => {
  return (
    <div className="max-w-[90%] min-h-[80vh] bg-white m-auto w-full flex flex-col p-3 rounded-lg">
      <Nav />
      <div className="flex-grow bg-[#f4f3f8] mt-2 py-4 px-5 flex rounded-lg">
        <ChatList />
        <ChatContent />
        <UserProfile />
      </div>
    </div>
  );
};

export default Room;
