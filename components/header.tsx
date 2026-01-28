"use client";

import useSettingsModal from "@/states/settings-modal";
import { Settings } from "lucide-react";
import SettingsDialog from "./settings/settings-dialog";
import { useChatStore } from "@/states/chat-store";

type Props = {};

const Header = (props: Props) => {
  const settingsModal = useSettingsModal();
  const { resetChat } = useChatStore();

  return (
    <div className="flex items-center justify-between h-14 border-b px-4 bg-background">
      <div
        onClick={() => resetChat()}
        className="flex items-center justify-center cursor-pointer gap-2"
      >
        <img src="./chat.svg" alt="logo" className="w-8 h-8" />
        <p className="text-lg font-medium tracking-tight">
          Let’s Chat
        </p>
      </div>

      <div
        className="cursor-pointer p-2 hover:bg-muted rounded-full transition-colors"
        onClick={() => settingsModal.onOpen()}
      >
        <Settings className="w-5 h-5 text-muted-foreground" />
      </div>
      <SettingsDialog />
    </div>
  );
};

export default Header;
