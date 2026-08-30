"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar in the wizard flow
  if (pathname.startsWith("/create-event/wizard")) {
    return null;
  }
  
  return <Navbar />;
}
