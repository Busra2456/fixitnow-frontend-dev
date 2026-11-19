
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
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
          ? "/admin-dashboard"
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
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Wrench.svg"
                alt="FixItNow"
                width={28}
                height={28}
                priority
              />
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-primary">
              FixItNow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Login */}
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open user menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-64 rounded-xl border border-border/70 p-2 shadow-xl"
              >
                <DropdownMenuLabel className="px-3 py-3 font-normal">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-bold text-foreground">
                      {user.data?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.data?.email}
                    </p>

                    <span className="mt-1 w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {role}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem asChild>
                  <Link
                    href={dashboardHref}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5"
                  >
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5"
                  >
                    <User className="h-4 w-4 text-primary" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5"
                  >
                    <Settings className="h-4 w-4 text-primary" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="h-10 cursor-pointer rounded-lg px-6 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg bg-muted/60 px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
