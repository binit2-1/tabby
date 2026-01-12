import { RootProvider } from 'fumadocs-ui/provider/next';
import localFont from "next/font/local";
import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight:['400','500','600','700','800'],
  style: ['normal', 'italic'],
  variable: "--font-plus-jakarta-sans",
  display: 'swap',
});

const carity = localFont({
  src: [
    {
      path:"../../public/fonts/CarityDemo.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-carity",
  display: "swap",
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.className} ${carity.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
