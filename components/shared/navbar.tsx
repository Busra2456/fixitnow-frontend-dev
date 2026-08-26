"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";



const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Technicians",
    href: "/technicians",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];


export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const role = user.data?.role;
  const dashboardHref =
    role === "CUSTOMER"
      ? "/customer-dashboard"
      : role === "TECHNICIAN"
        ? "/technician-dashboard"
        : role === "ADMIN"
          ? "/admin-dashbard"
          : "/login";

    const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b mx-auto max-w-6xl bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     

        <div className="flex h-16 items-center justify-between">
       

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/Wrench.svg"
              alt="FixItNow"
              width={30}
              height={30}
              className="h-[30px] w-[30px]"
              priority
            />

            <span className="text-2xl font-bold text-primary">
              FixItNow
            </span>
          </Link>

      

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

         {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open user menu"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary/10 outline-none transition hover:bg-primary/20"
                >
                  <User className="h-4 w-4 text-primary" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56"
              >
         

                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.name || "User"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data?.email}
                    </p>

                    <p className="text-xs font-medium text-primary">
                      {role}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href={dashboardHref}
                    className="flex cursor-pointer items-center"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />

                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

               
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center"
                  >
                    <User className="mr-2 h-4 w-4" />

                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex cursor-pointer items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />

                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />


                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />

                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            

            <Link href="/login">
              <Button className="cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>

        
        <div className="flex gap-5 overflow-x-auto py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}