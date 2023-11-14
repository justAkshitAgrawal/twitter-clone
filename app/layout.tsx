import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import "./globals.css";
import { Providers } from "./providers";
import SideBar from "@/components/SideBar";
import { Toaster } from "sonner";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Tweeter",
  description: "A beautiful Twitter clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <div className="flex p-10 min-h-screen justify-center">
            <SideBar />
            <div className="sm:px-10 pb-20 sm:pb-0">{children}</div>
            <MobileNav />
          </div>
          <Toaster closeButton />
        </Providers>
      </body>
    </html>
  );
}
