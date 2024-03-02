import React from "react";
import { getTrip } from "@/lib/data";
import { Trip } from "@prisma/client";
import BackButton from "@/app/(dashboard)/_components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Plan from "@/app/(dashboard)/_components/Plan";
import UpdateDateTitle from "@/app/(dashboard)/_components/UpdateDateTitle";
import Header from "../../_components/Header";

interface TripIdPageProps {
  params: {
    tripId: string;
  };
}
const TripIdPage = async ({ params }: TripIdPageProps) => {
  const trip = (await getTrip(params.tripId)) as Trip;
  return (
    <div>
      <Header trip={trip}  />
      <div className="mx-5 py-2">
        <Tabs defaultValue="plan" className="w-full h-screen">
          <TabsList className="w-full">
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
