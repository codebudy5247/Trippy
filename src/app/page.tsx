import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(`/trip`);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl underline">A Social trip planner.</h1>
    </main>
  );
}
