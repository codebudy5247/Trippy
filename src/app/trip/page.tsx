import CreateTrip from "@/components/trip/CreateTrip";
import React from "react";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { getUserByEmail } from "@/lib/data";

const TripPage = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;
  const userInfo = await getUserByEmail(userEmail) as User;

  return (
    <div className="p-20 m-auto">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Upcoming trips</h1>
        <CreateTrip user={userInfo} />
      </div>
      <div className="grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mt-5"></div>
    </div>
  );
};

export default TripPage;
