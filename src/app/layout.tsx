import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { AuthProvider } from "@/provider/AuthProvider";
import ToasterProvider from "../provider/ToastProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getUserByEmail } from "@/lib/data";
import { User } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo1.png",
      href: "/logo1.png",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;
  const userInfo = (await getUserByEmail(userEmail)) as User;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={userInfo} />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
