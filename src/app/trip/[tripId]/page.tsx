import React from "react";

interface TripIdPageProps {
  params: {
    tripId: string;
  };
}
const TripIdPage = ({params}:TripIdPageProps) => {
  return (
    <div className="mt-20">
    <h1>TripIdPage</h1>
    <h1>{params?.tripId}</h1>
    </div>
  )
};

export default TripIdPage;
