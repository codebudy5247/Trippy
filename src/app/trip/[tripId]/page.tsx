import React from "react";
import UpdateTripForm from "@/components/trip/UpdateTripForm";
import { getTrip } from "@/lib/data";
import { Trip } from "@prisma/client";

interface TripIdPageProps {
  params: {
    tripId: string;
  };
}
const TripIdPage = async ({ params }: TripIdPageProps) => {
  const trip = (await getTrip(params.tripId)) as Trip;
  return (
    <div className="mx-5 my-10 p-5">
      <div className="grid md:grid-cols-[3fr_3fr]">
        <div>
          <UpdateTripForm trip={trip} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TripIdPage;
