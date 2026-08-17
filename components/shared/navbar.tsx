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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Public navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technicians", href: "/technicians" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// User dropdown items
const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    action: "dashboard",
  },
  {
    label: "Profile",
    icon: User,
    action: "profile",
  },
  {
    label: "Settings",
    icon: Settings,
    action: "settings",
  },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleUserMenuAction = async (action: string) => {
    const role = user.data?.profile?.role;

    // Dashboard based on role
    if (action === "dashboard") {
      if (role === "CUSTOMER") {
        router.push("/dashboard/customer");
      } else if (role === "TECHNICIAN") {
        router.push("/dashboard/technician");
      } else if (role === "ADMIN") {
        router.push("/dashboard/admin");
      }

      return;
    }

    // Profile
    if (action === "profile") {
      router.push("/profile");
      return;
    }

    // Settings
    if (action === "settings") {
      router.push("/settings");
      return;
    }

    // Logout
    if (action === "logout") {
      try {
        await logout();

        toast.success("Logged out successfully!");

        router.push("/login");
        router.refresh();
      } catch (error) {
        toast.error("Failed to logout");
        console.error(error);
      }
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-primary">
              FixItNow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">

                {/* User Information */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {user.data?.profile?.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.data?.profile?.email}
                    </p>

                    <p className="text-xs text-primary font-medium">
                      {user.data?.profile?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* User Menu */}
                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() =>
                        handleUserMenuAction(item.action)
                      }
                      className="cursor-pointer"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={() =>
                    handleUserMenuAction("logout")
                  }
                  className="cursor-pointer text-red-500"
                >
                  <LogOut className="w-4 h-4 mr-2" />
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
      </div>
    </nav>
  );
}