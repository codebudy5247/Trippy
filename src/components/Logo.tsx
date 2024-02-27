import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/logo1.png"
          alt="Logo"
          height={20}
          width={20}
        />
        <p className={cn(
          "text-lg text-orange-600 mt-1",
          headingFont.className,
        )}>
          Trippy
        </p>
      </div>
    </Link>
  );
};
