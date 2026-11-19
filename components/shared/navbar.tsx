
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
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const dashboardRoutes: Record<string, string> = {
  CUSTOMER: "/customer-dashboard",
  TECHNICIAN: "/technician-dashboard",
  ADMIN: "/admin-dashboard",
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const role = user.data?.role;

  const dashboardHref = role
    ? dashboardRoutes[role] || "/login"
    : "/login";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully!");

      startTransition(() => {
        router.push("/login");
        router.refresh();
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            prefetch
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
              <Image
                src="/Wrench.svg"
                alt="FixItNow"
                width={28}
                height={28}
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[23px] font-extrabold leading-tight tracking-tight text-slate-900">
                FixIt<span className="text-blue-600">Now</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[2px] text-slate-400">
                Home Service Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 rounded-full bg-slate-50 p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Authentication */}
          <div className="flex items-center">
            {user.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open user menu"
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <User className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
                >
                  <DropdownMenuLabel className="px-3 py-3 font-normal">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-bold text-slate-900">
                        {user.data?.name || "User"}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user.data?.email || ""}
                      </p>

                      <span className="mt-1 w-fit rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                        {role || "USER"}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 bg-slate-100" />

                  <DropdownMenuItem asChild>
                    <Link
                      href={dashboardHref}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:bg-slate-100 focus:text-slate-900"
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-600" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:bg-slate-100 focus:text-slate-900"
                    >
                      <User className="h-4 w-4 text-slate-600" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:bg-slate-100 focus:text-slate-900"
                    >
                      <Settings className="h-4 w-4 text-slate-600" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-slate-100" />

                  <DropdownMenuItem
                    onSelect={handleLogout}
                    disabled={isPending}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    {isPending ? "Logging out..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="group h-11 rounded-full bg-slate-900 px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg"
              >
                <Link href="/login" prefetch>
                  Login
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                isActive(item.href)
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
