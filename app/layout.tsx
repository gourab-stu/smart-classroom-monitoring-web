import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins_font = Poppins({
  weight: "400",
  preload: true,
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "MLeC",
  description: "Sign Up or Sign In to continue to Smart Classroom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins_font.className}>{children}</body>
    </html>
  );
}
