import React from "react";
import { getTrip } from "@/lib/data";
import { Trip } from "@prisma/client";
import BackButton from "@/app/(dashboard)/_components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Plan from "@/app/(dashboard)/_components/Plan";
import UpdateDateTitle from "@/app/(dashboard)/_components/UpdateDateTitle";

interface TripIdPageProps {
  params: {
    tripId: string;
  };
}
const TripIdPage = async ({ params }: TripIdPageProps) => {
  const trip = (await getTrip(params.tripId)) as Trip;
  return (
    <div>
      {/* <div className="flex items-center">
        <BackButton />
        <UpdateDateTitle trip={trip} />
      </div> */}

      {/* <div className="mt-1">
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
      </div> */}
      <Plan trip={trip} />
    </div>
  );
};

export default TripIdPage;
