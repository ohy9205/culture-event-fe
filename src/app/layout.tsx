import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "../components/UI/layout/Header";
import SWRProvider from "../provider/swrProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bye4zyjsa`}
        />
      </head>
      <body
        className={`${inter.className} flex flex-col justify-center items-center`}
      >
        <SWRProvider>
          <div id="modal"></div>
          <Header />
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}
