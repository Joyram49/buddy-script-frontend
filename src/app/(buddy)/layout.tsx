import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s · BuddyScript",
    default: "BuddyScript",
  },
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function BuddyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={poppins.className}>{children}</div>;
}
