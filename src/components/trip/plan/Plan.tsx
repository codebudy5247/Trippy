import { Trip } from "@prisma/client";
import React from "react";
import UpdateTripForm from "./UpdateTripForm";

type Props = {
  trip: Trip;
};

const Plan = ({ trip }: Props) => {
  return (
    <div className="grid md:grid-cols-[3fr_3fr]">
      <div>
        <UpdateTripForm trip={trip} />
      </div>
      <div></div>
    </div>
  );
};

export default Plan;
