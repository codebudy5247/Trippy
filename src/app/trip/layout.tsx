import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { getUserByEmail } from "@/lib/data";
import { User } from "@prisma/client";

const TripLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;
  const userInfo = (await getUserByEmail(userEmail)) as User;
  return (
    <div className="h-full">
      <Navbar user={userInfo} />
      <main className="p-20 m-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default TripLayout;
