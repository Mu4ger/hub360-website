import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "HUB360 - Sunshine Act compliance, quietly handled",
  description:
    "Order meals, enforce limits, and keep Open Payments evidence structured-without the spreadsheet tax.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${workSans.variable} font-sans bg-[#dcecff] text-hub-ink antialiased transition-colors duration-300 dark:bg-[#0b1220] dark:text-[#e8eef6]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
