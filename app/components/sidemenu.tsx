"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarCheck2,
  CalendarPlus,
  CalendarSearch,
  Home,
  LayoutDashboard,
  Medal,
  NotebookText,
  Settings,
  Swords,
} from "lucide-react";
import DRNLightLogo from "@/public/tags_logo_lightmode_long.png";
import DRNDarkLogo from "@/public/tags_logo_darkmode_long.png";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import logo from "@/public/logo2.png";

function SideMenu() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [systemTheme, setSystemTheme] = useState("light"); // Default to light theme
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-3/7 lg:w-1/5">
      <div className="flex max-h-screen flex-col gap-2 ">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            {/* <Image
              src={logo}
              width={0}
              height={0}
              alt="Disc Rescue Network"
              style={{ width: "auto", height: "auto", maxHeight: "50px" }}
            /> */}
            <Label className="text-lg font-semibold">OBX Olympics 2024</Label>
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">
              Analyze
            </h2> */}

            <Button
              asChild
              variant={pathname === "/" ? "secondary" : "ghost"}
              className="w-full justify-start flex gap-2 my-1"
            >
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Medal className="h-4 w-4" />
                Standings
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/check-in" ? "secondary" : "ghost"}
              className="w-full justify-start flex gap-2 my-1"
            >
              <Link
                href="/schedule"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CalendarCheck2 className="h-4 w-4" />
                Schedule
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/my-rounds" ? "secondary" : "ghost"}
              className="w-full justify-start flex gap-2 my-1"
            >
              <Link
                href="/bracket"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Swords className="h-4 w-4" />
                Bracket
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
