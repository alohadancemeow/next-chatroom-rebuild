import { Settings } from "lucide-react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center cursor-pointer gap-3">
        <img src="./chat.svg" alt="logo" className="w-14" />
        <p className="text-xl font-semibold opacity-80 text-black">
          Let's Chat
        </p>
      </div>

      <div className="mr-4 cursor-pointer">
        <Settings />
      </div>
    </div>
  );
};

export default Header;
