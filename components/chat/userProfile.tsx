"use client";

import { Link as LinkIcon, Quote, UserCheck, UserX } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/states/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { useChatStore } from "@/states/chat-store";
import useGetUsers from "@/hooks/use-get-users";
import { db } from "@/lib/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

type Props = {};

const UserProfile = (props: Props) => {
  const { receiverId, changeBlock, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const { getUserById } = useGetUsers();

  const profile = getUserById(receiverId) || currentUser;

  const handleBlock = async () => {
    if (!currentUser) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(receiverId)
          : arrayUnion(receiverId),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-[20%] p-4 ml-4 rounded-lg flex flex-col items-center justify-between">
      <div className="items-center flex flex-col ">
        <div className="border-[2.5px] rounded-full my-3 border-slate-500">
          <Avatar className="w-24 h-24">
            <AvatarImage
              className="object-cover"
              src={profile?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="text-[#607d8b] mt-1">{profile?.username}</h4>
        <div className="mt-1 text-xs flex gap-1">
          <strong>Status : </strong>
          <p className="italic">{profile?.status || "Hi there! 👋"}</p>
        </div>
      </div>

      <Separator className="my-6 w-4/5" />

      <div className="mx-5">
        <Quote size={20} className="rotate-180" />
        <p className="my-5 text-xs italic">
          {profile?.bio ||
            `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum,
          excepturi. ✌️`}
        </p>
        <div className="flex justify-between">
          <div />
          <Quote size={20} />
        </div>
      </div>

      <Separator className="my-6 w-4/5" />

      {profile?.links?.length !== 0 && (
        <div className="w-full flex flex-col mb-8 gap-1">
          {profile?.links?.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <LinkIcon size={12} />
              <Link
                href={link}
                target="_blank"
                className="text-xs font-extralight text-sky-700 truncate"
              >
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      {profile.id !== currentUser?.id && (
        <Button
          className="shadow-sm gap-2 hover:bg-red-700 mb-5"
          variant="secondary"
          onClick={handleBlock}
          disabled={isCurrentUserBlocked}
        >
          {isCurrentUserBlocked || isReceiverBlocked ? (
            <UserCheck />
          ) : (
            <UserX />
          )}
          <div>
            {isCurrentUserBlocked
              ? "Blocked!"
              : isReceiverBlocked
              ? "Unblock"
              : "Block"}
          </div>
        </Button>
      )}
    </div>
  );
};

export default UserProfile;
