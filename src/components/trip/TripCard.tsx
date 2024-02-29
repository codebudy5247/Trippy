"use client";
import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type Props = {
  trip: Trip;
};

function TripCard({ trip }: Props) {
  return (
    <Link href={`/trip/${trip.id}`} prefetch={true}>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md cursor-pointer">
        <div className="relative flex h-60 overflow-hidden">
          <Image
            src={
              trip?.coverImage ||
              "https://pixabay.com/get/ga2cca282ba3b60117efb06be2dbcb5f802f15ec25a38f4e9ded3e5ad966082b18a0a1f9711268af8079a05d17132fe21_1280.jpg"
            }
            alt="_image"
            width={400}
            height={300}
          />
        </div>
        <div className="mt-4 px-5 pb-3">
          <h5 className="text-xl tracking-tight text-slate-900">
            {trip.title}
          </h5>
          <div className="mt-2 mb-2 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900"></span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
