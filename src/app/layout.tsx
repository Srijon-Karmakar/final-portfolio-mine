import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Srijon Karmakar | Developer Portfolio",
  description:
    "Full-stack developer portfolio built with Next.js, TypeScript, GSAP, and smooth scrolling interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${anton.variable}`}
    >
      <body className="bg-[#0f0f0d] text-white antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
