import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = {
    success: true,
    message: "User fetched successfully",
    data: {
      profile: {
        id: "1",
        name: "FixItNow User",
        email: "user@example.com",
        activeStatus: "ACTIVE",
        role: "CUSTOMER",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        profile: {
          id: "profile-1",
          profilePhoto: "",
          bio: null,
          userId: "1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    },
  };

  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">

        <Toaster position="top-right" richColors />

        {/* Navbar */}
        <Navbar user={user} />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}

      </body>
    </html>
  );
}