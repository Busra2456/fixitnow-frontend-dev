import { cn } from "@/lib/utils";
import { Inter, Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">

        <Toaster position="top-right" richColors />
        {/* Navbar */}
        {children}

        {/* Footer */}
      </body>
    </html>
  );
}