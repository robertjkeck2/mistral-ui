import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Mistral UI",
  description: "Next.js UI for Mistral AI platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          (cn("min-h-screen bg-background font-sans antialiased"),
          fontSans.variable)
        }
      >
        {children}
      </body>
    </html>
  );
}
