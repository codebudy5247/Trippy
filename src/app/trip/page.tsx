import CreateTrip from "@/app/trip/_components/CreateTrip";
import React from "react";
import { Trip, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { getUserByEmail, getUserTrips } from "@/lib/data";
import TripList from "@/app/trip/_components/TripList";

const TripPage = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;
  const userInfo = (await getUserByEmail(userEmail)) as User;

  const trips = (await getUserTrips(userInfo?.id)) as Trip[];

  return (
    <div className="px-20">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Upcoming trips</h1>
        <CreateTrip user={userInfo} />
      </div>
      <TripList trips={trips} />
    </div>
  );
};

export default TripPage;
