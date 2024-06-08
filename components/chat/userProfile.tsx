"use client";

import { Link as LinkIcon, Quote, UserX } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/states/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type Props = {};

const UserProfile = (props: Props) => {
  const { currentUser } = useUserStore();

  return (
    <div className="bg-white w-[20%] p-4 ml-4 rounded-lg flex flex-col items-center justify-between">
      <div className="items-center flex flex-col ">
        <div className="border-[2.5px] rounded-full my-3 border-slate-500">
          <Avatar className="w-24 h-24">
            <AvatarImage
              className="object-cover"
              src={currentUser?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="text-[#607d8b] mt-1">{currentUser?.username}</h4>
        <div className="mt-1 text-xs flex gap-1">
          {/* <strong>Active : </strong>
          <p className="italic">5 min ago.</p> */}
          <strong>Status : </strong>
          <p className="italic">{currentUser?.status || "Hi there! 👋"}</p>
        </div>
      </div>

      <Separator className="my-6 w-4/5" />

      <div className="mx-5">
        <Quote size={20} className="rotate-180" />
        <p className="my-5 text-xs italic">
          {currentUser?.bio ||
            `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum,
          excepturi. ✌️`}
        </p>
        <div className="flex justify-between">
          <div />
          <Quote size={20} />
        </div>
      </div>

      <Separator className="my-6 w-4/5" />

      {currentUser?.links?.length && (
        <div className="w-full flex flex-col mb-8 gap-1">
          {currentUser?.links?.map((link, index) => (
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

      {/* todo: block condition */}
      <Button
        className="shadow-sm gap-2 hover:bg-red-700 mb-5"
        variant="secondary"
      >
        <UserX />
        <div>Block</div>
      </Button>
    </div>
  );
};

export default UserProfile;
