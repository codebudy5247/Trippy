import { Trip } from "@prisma/client";
import React from "react";
import UpdateTripForm from "./UpdateTripForm";
import MapBox from "./MapBox";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  trip: Trip;
};

const Plan = ({ trip }: Props) => {
  return (
    <div className="grid md:grid-cols-[3fr_3fr] h-screen">
      <div>
        <ScrollArea className="h-[70vh]">
          <UpdateTripForm trip={trip} />
        </ScrollArea>
      </div>
      <div className="h-full">
        <MapBox />
      </div>
    </div>
  );
};

export default Plan;
