"use client";
import React from "react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Share2, Trash2 } from "lucide-react";

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  return (
    <div className="col-span-2 group rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="flex flex-col gap-2 w-full">
        <Link href={`/trip/${trip.id}`}>
          <div
            className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            cursor-pointer
          "
          >
            <Image
              fill
              className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
              src={
                trip?.coverImage ||
                "https://pixabay.com/get/ga2cca282ba3b60117efb06be2dbcb5f802f15ec25a38f4e9ded3e5ad966082b18a0a1f9711268af8079a05d17132fe21_1280.jpg"
              }
              alt="_image"
            />
          </div>
        </Link>

        <div className="p-2">
          <h5 className="text-lg tracking-tight text-slate-900 font-semibold">
            {trip.title}
          </h5>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h5 className="text-lg tracking-tight text-gray-500">
                {format(trip?.startDate, "LLL, y")}
              </h5>
              <h5 className="text-lg tracking-tight text-gray-500">|</h5>
              <h5 className="text-lg tracking-tight text-gray-500">
                {getTripDays(trip?.startDate, trip?.endDate)} Days
              </h5>
            </div>

            <div className="flex gap-2 items-center cursor-pointer">
              <Share2 />
              <Trash2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;

const getTripDays = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());
  const dates = [];
  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }
  return dates.length;
};
