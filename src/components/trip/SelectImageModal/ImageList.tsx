"use client";
import Image from "next/image";
import React from "react";

interface Props {
  ImageListData: PixabayImage[];
}

const ImageList = ({ ImageListData }: Props) => {
  return (
    <div className="flex flex-wrap justify-evenly mt-1">
      {ImageListData?.length > 0 &&
        ImageListData?.map((img: PixabayImage) => (
          <div key={img.id} className="mb-1">
            <div
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
