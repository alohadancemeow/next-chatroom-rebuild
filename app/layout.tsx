import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import ClientComponents from "@/components/client-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatRoom",
  description: "A minimal real-time chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponents>
          {children}
          <Toaster />
        </ClientComponents>
      </body>
    </html>
  );
}
