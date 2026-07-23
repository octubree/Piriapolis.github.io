export const BUSINESS = {
  name: "Electricista Piriápolis Jorge",
  tagline: "Técnico Electricista",
  phoneDisplay: "094 588 012",
  phoneTel: "+59894588012",
  whatsapp: "https://wa.me/59894588012",
  whatsappPrefilled:
    "https://wa.me/59894588012?text=Hola%20Jorge%2C%20quiero%20consultar%20por%20un%20servicio%20de%20electricidad%20en%20Piri%C3%A1polis",
  email: "jorgitobaliero@gmail.com",
  location: "Piriápolis, Uruguay",
  web: "electricista-piria.top",
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
  { label: "Trabajos", href: "#trabajos" },
] as const;

export type ServiceItem = {
  id: string;
  icon: "zap" | "circuit" | "cctv";
  title: string;
  description: string;
  items: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: "electricidad",
    icon: "zap",
    title: "Electricidad",
    description:
      "Ofrezco servicios completos de electricidad en Piriápolis, incluyendo obra nueva, reformas eléctricas, atención de urgencias eléctricas, reconexiones, instalaciones eléctricas generales, protecciones, mantenimiento de motores y bombas, solución de problemas de energía reactiva, instalación de luminarias, automatismos y termotanques.",
    items: [
      "Obra nueva y reformas",
      "Urgencias eléctricas",
      "Instalaciones en general",
      "Protecciones y tableros",
      "Motores y bombas de agua",
      "Termotanques (calefones)",
      "Trámites y firmas de UTE",
    ],
  },
  {
    id: "afines",
    icon: "circuit",
    title: "Afines",
    description:
      "Servicios afines a la electricidad, como instalación de sistemas de domótica, control de accesos para edificios, automatización de portones eléctricos, instalación de video porteros y cableado estructurado para Internet y telefonía en Piriápolis.",
    items: [
      "Portones eléctricos y automatismos",
      "Sistemas de domótica e iluminación inteligente",
      "Control de accesos para edificios",
      "Video porteros y timbres",
      "Cableado estructurado (Internet/Red)",
      "Telefonía interna",
    ],
  },
  {
    id: "vigilancia",
    icon: "cctv",
    title: "Sistemas de Vigilancia",
    description:
      "Implementación de sistemas de vigilancia y seguridad en Piriápolis, incluyendo soluciones CCTV, cámaras IP con conectividad Wifi, cámaras cableadas con DVR o inalámbricas con NVR, cámaras con seguimiento inteligente y sistemas de alarmas con notificación al teléfono.",
    items: [
      "Sistemas de seguridad CCTV",
      "Cámaras IP inalámbricas (Wifi)",
      "Sistemas cableados con DVR",
      "Sistemas inalámbricos con NVR",
      "Cámaras con seguimiento inteligente",
      "Alarmas con notificación móvil",
    ],
  },
];

export const ABOUT_BIO =
  "Me llamo Jorge, técnico electricista en Piriápolis con más de 5 años de experiencia brindando servicios de electricidad y afines de forma autónoma o trabajando para empresas, con formación en electrotecnia en UTU y bachiller en ingeniería. Estamos a las órdenes, no dude en contactarse.";

export const ABOUT_HIGHLIGHTS = [
  { label: "+5 años de experiencia", icon: "calendar" as const },
  { label: "Formación en UTU", icon: "graduation" as const },
  { label: "Trabajos con firma de UTE", icon: "badge" as const },
  { label: "Piriápolis, Uruguay", icon: "map" as const },
];
