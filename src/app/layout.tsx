import type { Metadata } from "next";
import {
  Alexandria,
  Amiri,
  Aref_Ruqaa,
  Cairo,
  Cormorant_Garamond,
  El_Messiri,
  Great_Vibes,
  Pinyon_Script,
  Rakkas,
} from "next/font/google";
import { StoreProvider } from "@/components/store";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

const rakkas = Rakkas({
  subsets: ["arabic", "latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
});

const messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});

const ruqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نقطني",
    template: "%s | نقطني",
  },
  description:
    "دعوات تفاعلية للزفاف والخطوبة والسبوع والعقيقة وعيد الميلاد. الضيف يفتح الدعوة، يسمع اللحن، ويرد ويبعث نقطته.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${alexandria.variable} ${amiri.variable} ${rakkas.variable} ${messiri.variable} ${ruqaa.variable} ${script.variable} ${pinyon.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
