"use client";

import { AtSign, Link as LinkIcon, Quote, UserCheck, UserX } from "lucide-react";
import { Button } from "../ui/button";
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
    <div className="flex flex-col h-full w-full p-6 bg-white overflow-y-auto">
      <div className="flex flex-col items-center">
        {/* Avatar Card */}
        <div className="bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-4">
          <Avatar className="w-28 h-28 rounded-full">
            <AvatarImage
              className="object-cover rounded-full"
              src={profile?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback className="rounded-full text-2xl">CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Name & Status */}
        <h4 className="text-xl font-bold text-slate-900">{profile?.username}</h4>
        <div className="flex items-center gap-2 mt-1 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-bold text-slate-400 tracking-wider">ONLINE</span>
        </div>
      </div>

      {/* Status Card */}
      <div className="w-full mb-8">
        <p className="text-[10px] font-bold text-slate-300 mb-2 tracking-wider">CURRENT STATUS</p>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <p className="text-sm font-medium italic text-slate-700">"{profile?.status || "Hello world! 👋"}"</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="w-full mb-8">
        <div className="flex gap-2 mb-2">
          <Quote className="w-4 h-4 text-slate-300 fill-slate-300" />
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          {profile?.bio ||
            `I own a computer. I love building things and talking about the future of tech.`}
        </p>
      </div>

      {/* Social Links */}
      <div className="w-full flex-grow">
        <p className="text-[10px] font-bold text-slate-300 mb-4 tracking-wider">SOCIAL & LINKS</p>
        <div className="flex flex-col gap-3">
          {profile?.links && profile.links.length > 0 ? (
            profile.links.map((link: string, index: number) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-500 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="truncate">{link}</span>
              </Link>
            ))
          ) : (
            <>
              <Link href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-500 transition-colors">
                <LinkIcon className="w-4 h-4" />
                <span className="truncate">https://shadcn.com</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-500 transition-colors">
                <AtSign className="w-4 h-4" />
                <span className="truncate">twitter.com/shadcn</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Block Button */}
      {profile.id !== currentUser?.id && (
        <div className="mt-4 pt-4">
          <Button
            className="w-full gap-2 rounded-2xl h-12 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border-none shadow-none"
            variant="outline"
            onClick={handleBlock}
            disabled={isCurrentUserBlocked}
          >
            {isCurrentUserBlocked || isReceiverBlocked ? (
              <UserCheck size={18} />
            ) : (
              <UserX size={18} />
            )}
            <span className="font-semibold">
              {isCurrentUserBlocked
                ? "Blocked User"
                : isReceiverBlocked
                  ? "Unblock User"
                  : "Block User"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
