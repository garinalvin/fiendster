import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNavs from "@/components/navbar/TopNav";


export const metadata: Metadata = {
  title: "Fiendster",
  description: "Make enemies not friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Providers>
        <TopNavs />

        {children}
      </Providers>
      </body>
    </html>
  );
}
