"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ChangeEvent, useState } from "react";
import useSettingsModal from "@/states/settings-modal";

import SettingsForm from "./settings-form";
import { ScrollArea } from "../ui/scroll-area";
import { useUserStore } from "@/states/user-store";
import { ProfileFormValues, UserSchema } from "@/types";

import { doc, updateDoc } from "firebase/firestore";
import upload from "@/lib/upload-image";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

type ImgState = {
  file: File | null;
  url: string;
};

type Props = {};

const SettingsDialog = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<ImgState>({
    file: null,
    url: "",
  });

  const settingsModal = useSettingsModal();
  const { currentUser, fetchUserInfo } = useUserStore();

  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onUpdate = async (data: ProfileFormValues) => {
    setLoading(true);

    if (!data) return;

    let imgUrl = "";

    try {
      if (img.file) {
        imgUrl = (await upload(img.file)) as string;
      }
      const userData: Omit<UserSchema, "id" | "email" | "blocked"> = {
        avatar: imgUrl || currentUser?.avatar,
        bio: data.bio,
        status: data.status,
        username: data.username,
        links: data.urls?.map((url) => url.value),
      };

      const promise = updateDoc(doc(db, "users", currentUser?.id!), {
        ...userData,
      });

      toast.promise(promise, {
        loading: "Updating...",
        success: (data) => {
          return `Profile updated! 🎉`;
        },
        error: "Somthing went wrong, Please try again!",
      });

      fetchUserInfo(currentUser?.id!);
      settingsModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const profileImage = currentUser?.avatar || "https://github.com/shadcn.png";

  return (
    <Dialog open={settingsModal.isOpen} onOpenChange={settingsModal.onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <ScrollArea className="h-[780px]">
          <div className="mx-1">
            <DialogHeader>
              <DialogTitle>Profile settings</DialogTitle>
              <DialogDescription>
                This is how others will see you on the ChatRoom.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <form className="flex items-center space-x-6 my-3">
                <div className="shrink-0">
                  <img
                    className="h-20 w-20 object-cover rounded-full"
                    src={!img.url ? profileImage : img.url}
                    alt="Current profile photo"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    onChange={(e) => handleImg(e)}
                    className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-sky-700
                         hover:file:bg-violet-100"
                  />
                </label>
              </form>
              <SettingsForm
                currentUser={currentUser}
                onUpdate={onUpdate}
                loading={loading}
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
