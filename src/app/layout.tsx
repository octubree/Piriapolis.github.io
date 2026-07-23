import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://electricista-piria.top";
const OG_IMAGE = "https://ellwinan.sirv.com/electricidad.png?profile=Example&w=1200&h=630";
const FAVICON = "https://ellwinan.sirv.com/electricidad.png?profile=Example&w=192&h=192";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Electricista Piriápolis | Técnico Electricista | Urgencias",
    template: "%s | Electricista Piriápolis",
  },
  description:
    "Técnico electricista en Piriápolis, Uruguay. Más de 5 años de experiencia. Firma de UTE, instalaciones comerciales y residenciales, reformas, cámaras de seguridad, domótica y urgencias eléctricas.",
  keywords: [
    "electricista piriapolis",
    "electricista en piriapolis",
    "tecnico autorizado por ute",
    "tecnico autorizado por ute piriapolis",
    "firmas de ute piriapolis",
    "firma de UTE electricista",
    "urgencias electricas piriapolis",
    "camaras de seguridad piriapolis",
    "domotica piriapolis"
  ],
  authors: [{ name: "Electricista Piriápolis Jorge" }],
  creator: "Electricista Piriápolis Jorge",
  publisher: "Electricista Piriápolis Jorge",
  applicationName: "Electricista Piriápolis",
  category: "electrician",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Electricista Piriápolis | Técnico Electricista | Jorge",
    description:
      "Técnico electricista en Piriápolis. Firma de UTE, instalaciones, reformas, cámaras de seguridad y urgencias eléctricas.",
    url: SITE_URL,
    siteName: "Electricista Piriápolis",
    type: "website",
    locale: "es_UY",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Electricista Piriápolis Jorge — Técnico Electricista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electricista Piriápolis | Técnico Electricista",
    description:
      "Técnico electricista en Piriápolis. Trabajos con firma de UTE y urgencias.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: FAVICON, type: "image/png" }],
    apple: [{ url: FAVICON }],
    shortcut: [FAVICON],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

const electricianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Electricista Piriápolis Jorge",
  description:
    "Técnico electricista en Piriápolis, Uruguay. Ofrezco servicios de instalaciones, reformas, reparaciones, urgencias eléctricas, cámaras de seguridad y domótica con firma de UTE.",
  telephone: "+59894588012",
  url: SITE_URL,
  image: "https://electricista-piria.top/assets/img/me.jpg",
  email: "jorgitobaliero@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Piriápolis",
    addressRegion: "Maldonado",
    addressCountry: "UY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.8628,
    longitude: -55.2731
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Piriápolis" },
    { "@type": "AdministrativeArea", name: "Punta Negra" },
    { "@type": "AdministrativeArea", name: "Punta Colorada" }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Electricidad",
    itemListElement: [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Firmas de UTE Piriápolis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Urgencias Eléctricas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instalaciones Eléctricas Generales"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Reformas Eléctricas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cámaras de Seguridad y Alarmas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sistemas de Domótica"
        }
      }
    ]
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Electricista Piriápolis",
  url: SITE_URL,
  inLanguage: "es-UY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(electricianJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Sonner />
      </body>
    </html>
  );
}
