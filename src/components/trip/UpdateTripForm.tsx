"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import SelectImgModal from "./SelectImageModal/SelectImgModal";

type Props = {
  trip: Trip;
};

const UpdateTripForm = ({ trip }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-2">
        <div onClick={() => router.push("/trip")} className="cursor-pointer">
          <ChevronLeft size={20} color="grey" />
        </div>

        <div className="h-full w-full ">
          {trip.coverImage === "" ? (
            <div
              onClick={() => setShowModal(true)}
              className="bg-gray-300 py-10 rounded-lg mt-2 cursor-pointer"
            >
              <h1 className="text-gray-800 text-sm text-center">
                Add a trip photo
              </h1>
            </div>
          ) : (
            <div className="relative flex h-60 overflow-hidden">
              <Image
                src={trip.coverImage}
                alt="_image"
                width={400}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
      <SelectImgModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UpdateTripForm;
