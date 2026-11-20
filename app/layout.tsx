import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
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

// Archivo (SIL OFL), cut down to the only weight the site uses (800) and widths 110 to 125,
// Latin subset. Roman and italic are 18 KB and 20 KB instead of 100 KB each for the full variable font.
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-800-roman.woff2", weight: "800", style: "normal" },
    { path: "./fonts/archivo-800-italic.woff2", weight: "800", style: "italic" },
  ],
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "110% 125%" }],
  fallback: ["Arial Black", "Arial", "system-ui", "sans-serif"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
  // Body text never paints the largest element, so it does not compete with the hero photo.
  preload: false,
});

// Vercel Analytics only exists on Vercel. Locally its script would 404 and log a console error.
const onVercel = !!process.env.VERCEL;

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
        {onVercel && <Analytics />}
      </body>
    </html>
  );
}
