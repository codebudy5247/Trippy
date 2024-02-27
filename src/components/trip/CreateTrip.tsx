"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { User } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createTrip } from "@/actions/create-trip";

type Props = {
  user: User;
};

function CreateTrip({ user }: Props) {
  const router = useRouter();

  const { execute } = useAction(createTrip, {
    onSuccess: (data) => {
      toast.success("Trip created!");
      router.push(`/trip/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClickHandler = () => {
    const payload = {
      title: "",
      coverImage: "",
      ownerId: user.id,
      startDate: new Date(),
      endDate: new Date(),
    };
    execute(payload);
  };

  return (
    <div>
      <Button onClick={onClickHandler} className="gap-2 items-center text-sm">
        {" "}
        <PlusCircle size={10} /> Create new trip
      </Button>
    </div>
  );
}

export default CreateTrip;
