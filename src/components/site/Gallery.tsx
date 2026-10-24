"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Grid } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/site/SectionHeading";
import { optimizeImage } from "@/lib/image-cdn";

// Import portfolio data directly
import portfolioData from "@/data/portfolio.json";

const CATEGORY_MAP: Record<string, string> = {
  "filter-electricidad": "Electricidad",
  "filter-card": "Luminarias",
  "filter-app": "Instalaciones",
  "filter-web": "Firma UTE",
};

export const CATEGORIES_CONFIG = [
  {
    id: "Electricidad",
    name: "Electricidad",
    categoryKey: "filter-electricidad",
    coverImage: "https://ik.imagekit.io/tnzquipyu/electricidad/electricidad/joaquin%20punta%20negra/despues%201.jpg?updatedAt=1763863593798",
    description: "Tableros, cableados, reformas y reparaciones eléctricas",
  },
  {
    id: "Luminarias",
    name: "Luminarias",
    categoryKey: "filter-card",
    coverImage: "https://ik.imagekit.io/tnzquipyu/electricidad/electricidad/irisarri%20confiter%C3%ADa/irisarri%204.jpeg?updatedAt=1768525887132",
    description: "Diseño e instalación de iluminación LED y luminarias",
  },
  {
    id: "Instalaciones",
    name: "Instalaciones",
    categoryKey: "filter-app",
    coverImage: "https://ik.imagekit.io/tnzquipyu/video%20vigilancia/camara%201.jpeg?updatedAt=1733111173513",
    description: "Instalaciones generales, vigilancia y automatismos",
  },
  {
    id: "Firma UTE",
    name: "Firma UTE",
    categoryKey: "filter-web",
    coverImage: "https://ik.imagekit.io/tnzquipyu/electricidad/electricidad/joaquin%20punta%20negra/IMG_20251103_094545574_HDR_AE.jpg?updatedAt=1763863653095",
    description: "Proyectos, habilitaciones y firmas autorizadas por UTE",
  },
] as const;

export type GalleryCategory = (typeof CATEGORIES_CONFIG)[number]["name"];

type GalleryItem = {
  id: string;
  imageUrl: string;
  altText: string;
  category: GalleryCategory;
  description: string;
};

// Map raw data: keep SEO altText for <img alt>, but only set description if item.alt actually has text
const GALLERY_ITEMS: GalleryItem[] = portfolioData.map((item, idx) => {
  const categoryLabel = (CATEGORY_MAP[item.category] || "Instalaciones") as GalleryCategory;
  const rawDescription = item.alt ? item.alt.trim() : "";

  let seoAltText = rawDescription;
  if (!seoAltText) {
    if (item.category === "filter-web") {
      seoAltText = `Firma de UTE y habilitación eléctrica en Piriápolis realizada por técnico autorizado`;
    } else if (item.category === "filter-card") {
      seoAltText = `Instalación de luminaria y diseño de iluminación por electricista en Piriápolis`;
    } else {
      seoAltText = `Instalación eléctrica residencial realizada en Piriápolis por técnico calificado`;
    }
  }

  return {
    id: `photo-${idx}`,
    imageUrl: item.src,
    altText: seoAltText,
    category: categoryLabel,
    description: rawDescription,
  };
});

export function Gallery() {
  const [filter, setFilter] = React.useState<GalleryCategory | null>(null);
  const [selected, setSelected] = React.useState<GalleryItem | null>(null);

  const filtered = React.useMemo(() => {
    if (!filter) return [];
    return GALLERY_ITEMS.filter((i) => i.category === filter);
  }, [filter]);

  const handlePrev = React.useCallback(() => {
    if (!selected || filtered.length <= 1) return;
    const currentIndex = filtered.findIndex((i) => i.id === selected.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setSelected(filtered[prevIndex]);
  }, [selected, filtered]);

  const handleNext = React.useCallback(() => {
    if (!selected || filtered.length <= 1) return;
    const currentIndex = filtered.findIndex((i) => i.id === selected.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filtered.length;
    setSelected(filtered[nextIndex]);
  }, [selected, filtered]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, handlePrev, handleNext]);

  return (
    <section id="trabajos" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fotos"
          title="Trabajos Realizados"
        />

        {/* Filter / Category Selector Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filtrar trabajos por categoría"
        >
          {/* Button to show Categories Overview */}
          <button
            role="tab"
            aria-selected={filter === null}
            onClick={() => setFilter(null)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              filter === null
                ? "border-primary/50 text-primary-foreground"
                : "border-border/70 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {filter === null && (
              <motion.span
                layoutId="gallery-filter"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Grid className="size-3.5" />
            Ver Categorías
          </button>

          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = filter === cat.name;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(cat.name)}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "border-primary/50 text-primary-foreground"
                    : "border-border/70 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {cat.name}
              </button>
            );
          })}
        </motion.div>

        {/* Overview Mode: 4 Representative Cover Cards */}
        {filter === null ? (
          <div className="mt-12">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Seleccioná una categoría para explorar la galería de fotos correspondiente:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES_CONFIG.map((cat, idx) => {
                const count = GALLERY_ITEMS.filter((i) => i.category === cat.name).length;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => setFilter(cat.name)}
                    className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border/70 bg-card p-6 h-80 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15 cursor-pointer"
                  >
                    {/* Cover image */}
                    <img
                      src={optimizeImage(cat.coverImage, 600)}
                      alt={`Foto representativa de ${cat.name}`}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-95"
                    />

                    {/* Badge count */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        variant="outline"
                        className="border-white/20 bg-black/60 text-xs font-medium text-white backdrop-blur-md"
                      >
                        {count} fotos
                      </Badge>
                    </div>

                    {/* Content info */}
                    <div className="relative z-10 flex flex-col gap-2">
                      <Badge className="w-fit bg-primary text-primary-foreground text-xs font-semibold">
                        {cat.name}
                      </Badge>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-1">
                        <span>Ver fotos</span>
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Category Mode: Grid of photos for the selected category */
          <div className="mt-10">
            {/* Category Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter(null)}
                  className="gap-1.5 text-xs border-border/70 hover:bg-secondary cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  Volver a Categorías
                </Button>
                <Badge variant="secondary" className="text-xs font-medium">
                  {filter} · {filtered.length} fotos
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Hacé clic en cualquier foto para ampliarla
              </p>
            </div>

            {/* Photo Grid */}
            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => (
                    <motion.button
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelected(item)}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-2xl border border-border/70 bg-card text-left transition-all duration-300 cursor-pointer",
                        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      )}
                      aria-label={`Ver ${item.altText}`}
                    >
                      <img
                        src={optimizeImage(item.imageUrl, 500)}
                        alt={item.altText}
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* gradient overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"
                      />
                      {/* category badge */}
                      <div className="absolute left-3 top-3">
                        <Badge
                          variant="outline"
                          className="border-white/20 bg-black/50 text-[10px] font-medium text-white backdrop-blur-sm"
                        >
                          {item.category}
                        </Badge>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent className="w-[calc(100%-1rem)] max-w-3xl gap-0 overflow-hidden border-border/70 bg-background/95 p-0 backdrop-blur-xl sm:max-w-3xl">
          {selected && (
            <>
              <div className="relative flex h-[64vh] w-full items-center justify-center overflow-hidden rounded-t-lg bg-zinc-950/80 sm:h-[70vh]">
                <img
                  src={selected.imageUrl}
                  alt={selected.altText}
                  className="h-full w-full object-contain"
                />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                  <Badge className="bg-primary/95 text-primary-foreground font-semibold">
                    {selected.category}
                  </Badge>
                </div>

                {/* Navigation arrows */}
                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                      aria-label="Foto siguiente"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </>
                )}
              </div>
              <DialogHeader className="items-center px-4 py-4 text-center sm:px-6">
                <DialogTitle className="sr-only">
                  {selected.altText}
                </DialogTitle>
                {selected.description ? (
                  <DialogDescription className="text-sm leading-snug text-muted-foreground">
                    {selected.description}
                  </DialogDescription>
                ) : (
                  <DialogDescription className="sr-only">
                    Fotografía de trabajo realizado por Jorge Electricidad en Piriápolis
                  </DialogDescription>
                )}
                <div className={cn(selected.description ? "mt-2" : "mt-0")}>
                  <DialogClose asChild>
                    <a
                      href="#contacto"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Consultar por este servicio
                    </a>
                  </DialogClose>
                </div>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
