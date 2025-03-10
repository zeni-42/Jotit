import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthSessionProvider from "@/components/AuthSessionProvider";

const inter = Inter({ subsets:['latin'] })

export const metadata: Metadata = {
  title: "JotIt",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark`} >
        <AuthSessionProvider>
        <Toaster/>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
