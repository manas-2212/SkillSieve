"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = ["/login", "/register"].includes(pathname);

  return (
    <UserProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </UserProvider>
  );
}
