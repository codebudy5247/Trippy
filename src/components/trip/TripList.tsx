'use client'
import { Trip } from "@prisma/client";
import React from "react";
import TripCard from "./TripCard";

type Props = {
  trips: Trip[];
};

function TripList({ trips }: Props) {
  return (
    <div className="grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mt-5">
      {trips?.length > 0 &&
        trips.map((trip) => (
          <div key={trip.id}>
            <TripCard trip={trip} />
          </div>
        ))}

     
    </div>
  );
}

export default TripList;
