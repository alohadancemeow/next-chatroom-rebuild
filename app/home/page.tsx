import ChatBody from "@/components/chatBody";
import Nav from "@/components/nav";

type Props = {};

const Room = (props: Props) => {
  return (
    <div>
      <div className="main">
        <Nav />
        <ChatBody />
      </div>
    </div>
  );
};

export default Room;
