import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { SettingsForm } from "./settings-form";
import useSettingsModal from "@/states/settings-modal";

type Props = {};

const SettingsDialog = (props: Props) => {
  const settingsModal = useSettingsModal();

  return (
    <Dialog open={settingsModal.isOpen} onOpenChange={settingsModal.onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Profile settings</DialogTitle>
          <DialogDescription>
            This is how others will see you on the ChatRoom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <SettingsForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
