import { Geist } from "next/font/google";
import {
    IconHome,
    IconNewSection,
    IconTerminal2,
  } from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import DashHeader from "@/components/dash-header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
     
        {
          title: "Products",
          icon: (
            <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Components",
          icon: (
            <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
    ]
  return (
    <div className="flex w-full gap-10 justify-evenly ">
      <div>
        <FloatingDock desktopClassName="flex flex-col min-h-[200px] justify-center translate-y-20"
        items={links}
      />
      </div>
      <div>
      <DashHeader />
        {children}
      </div>
    </div>
  );
}
