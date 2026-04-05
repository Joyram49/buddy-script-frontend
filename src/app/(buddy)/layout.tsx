import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · BuddyScript",
    default: "BuddyScript",
  },
};

export default function BuddyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="no-scrollbar">{children}</div>;
}
