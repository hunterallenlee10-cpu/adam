import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { robotsMeta } from "@/lib/seo";
import { business } from "@/lib/business";
import { PlannerProvider } from "@/components/EstimatePlanner/PlannerProvider";
import { DiscountBar } from "@/components/layout/DiscountBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyBar } from "@/components/layout/StickyBar";
import { BackToTop } from "@/components/layout/BackToTop";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: business.name,
  robots: robotsMeta,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EC",
  width: "device-width",
  initialScale: 1,
};

// Hides the discount bar before first paint if it was dismissed this session. No layout shift.
const barScript = `try{if(sessionStorage.getItem('apw-bar')==='0')document.documentElement.classList.add('bar-dismissed')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: barScript }} />
      </head>
      <body>
        <PlannerProvider>
          <a
            href="#main"
            className="sr-only-focusable fixed left-3 top-3 z-[100] rounded-[6px] bg-ink px-4 py-3 font-semibold text-bg"
          >
            Skip to content
          </a>
          <div id="top" />
          <DiscountBar />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <StickyBar />
          <BackToTop />
        </PlannerProvider>
        <Analytics />
      </body>
    </html>
  );
}
