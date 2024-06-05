"use client";

import {
  Facebook,
  Instagram,
  Quote,
  Twitter,
  UserX,
  Youtube,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const notifyMessages = [
  {
    name: "user1",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user2",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user3",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user4",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user5",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
];

type Props = {};

const UserProfile = (props: Props) => {
  return (
    <div className="w-[20%] ml-4">
      <div className="bg-white h-[97%] rounded-lg flex flex-col items-center justify-between">
        <div className="items-center flex flex-col ">
          <div className="border w-24 h-24 rounded-full object-cover my-3">
            <img src="/user.svg" alt="profile" />
          </div>
          <h4 className="text-[#607d8b] mt-1">3rd rabbit Bot</h4>
          <div className="mt-1 text-xs flex gap-1">
            <strong>Active : </strong>
            <p className="italic">5 min ago.</p>
          </div>

          <Separator className="my-6 w-4/5" />
          <div className="mx-5">
            <Quote size={20} className="rotate-180" />
            <p className="my-5 text-xs italic">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatum, excepturi. ✌️
            </p>
            <div className="flex justify-between">
              <div />
              <Quote size={20} />
            </div>
          </div>

          <Separator className="my-6 w-4/5" />
          <div className="flex gap-2">
            <Facebook />
            <Twitter />
            <Instagram />
            <Youtube />
          </div>
        </div>
        <Button
          className="shadow-sm gap-2 hover:bg-red-700 mb-5"
          variant="secondary"
        >
          <UserX />
          <div>Block</div>
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
