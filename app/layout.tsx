import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Addis Eats | Good food, good mood",
  description: "Explore Ethiopian favorites, track your delivery, and find your next favorite meal with Addis Eats.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
