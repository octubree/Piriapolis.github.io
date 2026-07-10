import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarDays, MapPin, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSINESS } from "@/components/site/data";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Background emerald radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hero-bg-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-6">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            <Zap className="size-3.5" fill="currentColor" />
            Técnico Electricista · Firmas y Habilitaciones
          </Badge>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Electricista Piriápolis
            <span className="mt-2 block text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              Técnico Electricista
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Soluciones eléctricas de obra nueva, urgencias, instalaciones, domótica, sistemas de seguridad, control de accesos, termotanques entre otros.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group text-base">
              <a href="#contacto">
                Solicitar Presupuesto
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/70 bg-transparent text-base hover:bg-secondary/60 hover:text-foreground"
            >
              <a href="#servicios">Ver Servicios</a>
            </Button>
          </div>

          {/* Trust row */}
          <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-primary" />
              +5 años de experiencia
            </li>
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-primary" />
              Trabajos con firma de UTE
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              Cobertura en toda la zona
            </li>
          </ul>
        </div>

        {/* Right — hero image with glow (hidden on mobile/tablet for performance) */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none hidden lg:block">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/20 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/40">
            <Image
              src="/images/portada.png"
              alt="Técnico electricista Jorge realizando trabajos eléctricos en Piriápolis"
              width={800}
              height={600}
              priority
              fetchPriority="high"
              sizes="50vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
            />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-border/70 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md sm:flex">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <BadgeCheck className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">Firmas de UTE</p>
              <p className="text-xs text-muted-foreground">Técnico electricista calificado</p>
            </div>
          </div>

          {/* Floating phone card */}
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="absolute -top-4 -right-3 hidden items-center gap-3 rounded-xl border border-border/70 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md transition-colors hover:border-primary/40 sm:flex"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-5" fill="currentColor" />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Llamar ahora</p>
              <p className="text-sm font-semibold text-foreground">
                {BUSINESS.phoneDisplay}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
