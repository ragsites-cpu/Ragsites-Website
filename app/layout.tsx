import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ragsites - AI Automation for Local Businesses",
  description: "From AI Receptionists that never sleep to 5-Star Review Systems. We build the tech that scales local businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
