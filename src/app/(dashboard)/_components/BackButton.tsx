'use client'
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="mt-2">
      <div onClick={() => router.push("/trip")} className="cursor-pointer mb-1">
        <ChevronLeft size={20} color="grey" />
      </div>
    </div>
  );
};

export default BackButton;
