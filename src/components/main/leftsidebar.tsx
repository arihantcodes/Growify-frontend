"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Inbox,
  Search,
  Menu,
  House,
  
  Award,
 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BagIcon, PenIcon } from "../icon";

// Define navigation items
const navItems = [
  { href: "/scroll", icon: House, label: "Scroll" },
  { href: "/spotlight", icon: PenIcon , label: "Post" },
  { href: "/pitchroom", icon: Award  , label: "Pitchroom" },
  { href: "/gig", icon: BagIcon, label: "Freelance" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/search", icon: Search, label: "Search" },
];

const LeftSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when screen size changes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 md:left-0 lg:left-52 z-30",
          "w-64 bg-background transition-transform duration-200 ease-in-out",
          "md:translate-x-0 md:w-20 lg:w-48 lg:ml-44",
          "flex flex-col border-r dark:border-neutral-700",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <Header />
        <Navigation />
        <Footer />
      </aside>
    </>
  );
};

const Header: React.FC = () => (
  <div className="p-6 flex items-center justify-center md:justify-start">
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/growify.svg" width={30} height={40} alt="Devlly Logo" />
      <span className="font-bold font-inter text-xl hidden md:hidden lg:inline">
        Growify
      </span>
    </Link>
  </div>
);

const Navigation: React.FC = () => (
  <nav className="flex-1 space-y-1 p-2">
    {navItems.map((item) => (
      <NavItem key={item.href} {...item} />
    ))}
  </nav>
);

interface NavItemProps {
  href: string;
  icon: string | React.FC<{ className?: string }>;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2  rounded-lg px-3 py-2 hover:bg-accent transition duration-200"
  >
    {React.createElement(icon, { className: "h-6 w-6 opacity-80  " })}
    <span className="hidden font-medium font-poppins lg:inline">{label}</span>
  </Link>
);

const Footer: React.FC = () => (
  <div className="p-2 text-center md:text-left">
    <div className="text-sm text-muted-foreground font-inter space-x-2 hidden md:hidden lg:block">
      <Link href="#">Blog</Link>
      <Link href="#">Support</Link>
      <Link href="#">Help</Link>
      <Link href="#">Legal</Link>
    </div>
    <div className="pl-4 mt-2 text-sm text-muted-foreground font-inter" >© 2025 Growify</div>
  </div>
);

export default LeftSidebar;
