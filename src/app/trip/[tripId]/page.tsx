import React from "react";
import { getTrip } from "@/lib/data";
import { Trip } from "@prisma/client";
import BackButton from "@/components/trip/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Plan from "@/components/trip/plan/Plan";
import UpdateDateTitle from "@/components/trip/UpdateDateTitle";

interface TripIdPageProps {
  params: {
    tripId: string;
  };
}
const TripIdPage = async ({ params }: TripIdPageProps) => {
  const trip = (await getTrip(params.tripId)) as Trip;
  return (
    <div className="mx-5 my-10 p-5">
      <div className="flex items-center">
        <BackButton />
        <UpdateDateTitle trip={trip} />
      </div>

      <div className="mt-2">
        <Tabs defaultValue="plan" className="w-full h-screen">
          <TabsList>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="plan">
            <Plan trip={trip} />
          </TabsContent>
          <TabsContent value="notes">Notes.</TabsContent>
          <TabsContent value="files">Files.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripIdPage;
