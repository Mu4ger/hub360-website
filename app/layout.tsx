import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUB360 — Sunshine Act compliance, quietly handled",
  description:
    "Order meals, enforce limits, and keep Open Payments evidence structured—without the spreadsheet tax.",
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
        className={`${plusJakarta.variable} font-sans bg-hub-cream text-hub-ink antialiased transition-colors duration-300 dark:bg-[#0b0f14] dark:text-[#e8eef6]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
