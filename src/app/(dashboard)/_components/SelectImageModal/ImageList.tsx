"use client";
import Image from "next/image";
import React from "react";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";
import { updateTrip } from "@/actions/update-trip";

interface Props {
  ImageListData: PixabayImage[];
  tripID: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageList = ({ ImageListData, tripID,setShowModal }: Props) => {
  const { execute } = useAction(updateTrip, {
    onSuccess: (data) => {
      toast.success("Cover Img updated!");
      setShowModal(false)
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleClick = (imgUrl: string) => {
    const payload = {
      tripId:tripID,
      coverImage: imgUrl,
    };
    execute(payload);
  };
  return (
    <div className="flex flex-wrap justify-evenly mt-1">
      {ImageListData?.length > 0 &&
        ImageListData?.map((img: PixabayImage) => (
          <div key={img.id} className="mb-1">
            <div
              onClick={() => handleClick(img.webformatURL)}
              className="
            aspect-square 
            w-[90px]
            h-[80px]
            relative 
            overflow-hidden 
            rounded-md
            cursor-pointer
          "
            >
              <Image fill src={img?.webformatURL} alt="image" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageList;
