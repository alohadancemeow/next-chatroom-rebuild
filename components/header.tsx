"use client";

import useSettingsModal from "@/states/settings-modal";
import { Settings } from "lucide-react";
import SettingsDialog from "./settings/settings-dialog";
import { useChatStore } from "@/states/chat-store";

type Props = {};

const Header = (props: Props) => {
  const settingsModal = useSettingsModal();
  // const { resetChat } = useChatStore();

  return (
    <div className="flex items-center justify-between">
      <div
        // onClick={() => resetChat()}
        className="flex items-center justify-center cursor-pointer gap-3"
      >
        <img src="./chat.svg" alt="logo" className="w-14" />
        <p className="text-xl font-semibold opacity-80 text-black">
          Let's Chat
        </p>
      </div>

      <div
        className="mr-4 cursor-pointer"
        onClick={() => settingsModal.onOpen()}
      >
        <Settings />
      </div>
      <SettingsDialog />
    </div>
  );
};

export default Header;
