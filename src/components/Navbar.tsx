"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export const Navbar = ({ user }: Props) => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {!user && (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/signin">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}

          {user && <Button onClick={() => signOut()}>Logout</Button>}
        </div>
      </div>
    </div>
  );
};
