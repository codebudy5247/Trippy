import { Trip } from "@prisma/client";
import React from "react";
import UpdateTripForm from "./UpdateTripForm";
import MapBox from "./MapBox";

type Props = {
  trip: Trip;
};

const Plan = ({ trip }: Props) => {
  return (
    <div className="grid md:grid-cols-[3fr_3fr]">
      <div>
        <UpdateTripForm trip={trip} />
      </div>
      <div className="h-full">
        <MapBox />
      </div>
    </div>
  );
};

export default Plan;
