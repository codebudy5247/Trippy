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
          src="/FullLogo.png"
          alt="Logo"
          height={90}
          width={90}
        />
        {/* <p className={cn(
          "text-lg text-neutral-700",
          headingFont.className,
        )}>
          Trippy
        </p> */}
      </div>
    </Link>
  );
};
