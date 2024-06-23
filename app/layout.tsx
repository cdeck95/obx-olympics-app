import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MenuHeader from "./components/menuheader";
import SideMenu from "./components/sidemenu";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamSelectionPopup from "./components/TeamSelectionPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OBX Olympics App",
  description:
    "OBX Olympics App for the crazy Italian Family. Built by Chris because why not.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex row-auto w-full h-full">
            <SideMenu />
            <div className="w-full">
              <MenuHeader />
              <TeamSelectionPopup />
              <main className="flex flex-col min-h-screen w-full items-start justify-start p-4 lg:p-6 gap-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
