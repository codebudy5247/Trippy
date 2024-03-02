import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { getUserByEmail } from "@/lib/data";
import { User } from "@prisma/client";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;
  const userInfo = (await getUserByEmail(userEmail)) as User;
  return (
    <div className="h-full">
      <Navbar user={userInfo} />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
