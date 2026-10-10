import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/shared/components/footer";

const jakarta = Plus_Jakarta_Sans({ 
  variable: "--font-jakarta",
  subsets: ["latin"],
});
const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BalanceMe",
  description: "Manage your finances with ease",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${dm_sans.variable} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f6f6ee] text-slate-900">
        {children}
        <Footer />
      </body>
    </html>
  );
}
