import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import { CookiesProvider } from 'next-client-cookies/server';
import { ContextProvider } from "@/components/shared/context";
import { Providers } from "./providers";
import { ToastContainer, Slide } from "react-toastify";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const cormorant = Cormorant({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: {
    default: "Cocktail: SaaS Starter Kit",
    template: "%s | Cocktail",
  },
  description: "Cocktail is a SaaS starter kit that helps you build your next SaaS in minutes, not months.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" h-full w-full" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans h-full w-full`}>

        <CookiesProvider>
          <Providers>
            {children}
          </Providers>
        </CookiesProvider>
        <ToastContainer
          position="bottom-right"
          theme="colored"
          pauseOnFocusLoss={false}
          toastStyle={{ opacity: 0.9 }}
          transition={Slide}
        />
      </body>
    </html>
  );
}
