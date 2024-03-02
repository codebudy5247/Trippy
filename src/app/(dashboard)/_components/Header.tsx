"use client";
import { Trip } from "@prisma/client";
import React from "react";
import BackButton from "./BackButton";
import UpdateDateTitle from "./UpdateDateTitle";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";

type Props = {
  trip: Trip;
};

const Header = ({ trip }: Props) => {
  return (
    <div className="top-0 p-5 w-full border-b shadow-sm bg-white flex justify-between items-center">
      <div className="flex items-center">
        <BackButton />
        <UpdateDateTitle trip={trip} />
      </div>
      <div className="flex space-x-4">
        <Button className="flex gap-2">
          {" "}
          <UserRoundPlus /> Invite Friends
        </Button>
      </div>
    </div>
  );
};

export default Header;
