import { Geist, Manrope, Oswald } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "@/components/main-nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Baby Paradise",
  description: "A one stop shop for all your kids' needs.",
};

const oswald = Oswald({
  display: "swap",
  subsets: ["latin"],
});

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.className} ${geistSans.className} ${oswald.className} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-2 items-center justify-between">
              <MainNav />
              <div className="flex flex-col gap-10 max-w-screen-2xl p-5">
                {children}
              </div>

              <footer className="w-full bg-slate-200 flex items-center justify-center border-t mx-auto text-center text-xs gap-2 py-8">
                <p>
                  Developed by{" "}
                  <a
                    href="https://github.com/Robin-Kurian"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Robin
                  </a>
                </p>
              </footer>
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
