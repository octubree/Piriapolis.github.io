"use client";

import * as React from "react";
import {
  Save,
  Search,
  CheckCircle2,
  AlertCircle,
  Zap,
  Lightbulb,
  Wrench,
  FileCheck,
  RefreshCw,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit3,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type PortfolioItem = {
  src: string;
  alt: string;
  title: string;
  category: "filter-electricidad" | "filter-card" | "filter-app" | "filter-web" | string;
};

const CATEGORIES = [
  { slug: "filter-electricidad", label: "Electricidad", icon: Zap, color: "text-amber-400 border-amber-400/40 bg-amber-500/10" },
  { slug: "filter-card", label: "Luminarias", icon: Lightbulb, color: "text-yellow-400 border-yellow-400/40 bg-yellow-500/10" },
  { slug: "filter-app", label: "Instalaciones", icon: Wrench, color: "text-emerald-400 border-emerald-400/40 bg-emerald-500/10" },
  { slug: "filter-web", label: "Firma UTE", icon: FileCheck, color: "text-cyan-400 border-cyan-400/40 bg-cyan-500/10" },
] as const;

export default function AdminPage() {
  const [photos, setPhotos] = React.useState<PortfolioItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState<string>("all");
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  // New photo modal state
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newUrl, setNewUrl] = React.useState("");
  const [newAlt, setNewAlt] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<string>("filter-electricidad");

  // Delete confirmation state
  const [photoToDelete, setPhotoToDelete] = React.useState<number | null>(null);

  const fetchPhotos = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) {
        setPhotos(data.photos);
      } else {
        setMessage({ type: "error", text: data.error || "Error al cargar fotos" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de red al conectar con el servidor local" });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleCategoryChange = (index: number, newCategory: string) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], category: newCategory };
      return updated;
    });
  };

  const handleAltChange = (index: number, newAltText: string) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], alt: newAltText };
      return updated;
    });
  };

  const handleAddPhoto = () => {
    if (!newUrl.trim()) return;
    const newItem: PortfolioItem = {
      src: newUrl.trim(),
      alt: newAlt.trim(),
      title: "Electricista Piria",
      category: newCategory,
    };

    setPhotos((prev) => [newItem, ...prev]);
    setNewUrl("");
    setNewAlt("");
    setNewCategory("filter-electricidad");
    setIsAddOpen(false);
    setMessage({
      type: "success",
      text: "Nueva foto agregada al inicio de la lista. Haz clic en 'Guardar Cambios' para sincronizar portfolio.json.",
    });
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoToDelete(null);
    setMessage({
      type: "success",
      text: "Foto eliminada de la lista. Haz clic en 'Guardar Cambios' para aplicar en portfolio.json.",
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "¡portfolio.json guardado en tu disco local!" });
      } else {
        setMessage({ type: "error", text: data.error || "Error al guardar" });
      }
    } catch {
      setMessage({ type: "error", text: "No se pudo comunicar con la API local" });
    } finally {
      setSaving(false);
    }
  };

  const filteredPhotos = React.useMemo(() => {
    return photos.filter((p, index) => {
      const matchesSearch =
        p.src.toLowerCase().includes(search.toLowerCase()) ||
        p.alt.toLowerCase().includes(search.toLowerCase()) ||
        `foto-${index + 1}`.includes(search.toLowerCase());
      const matchesCategory =
        activeCategoryFilter === "all" || p.category === activeCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [photos, search, activeCategoryFilter]);

  const counts = React.useMemo(() => {
    const acc: Record<string, number> = {
      "filter-electricidad": 0,
      "filter-card": 0,
      "filter-app": 0,
      "filter-web": 0,
    };
    photos.forEach((p) => {
      if (acc[p.category] !== undefined) {
        acc[p.category]++;
      }
    });
    return acc;
  }, [photos]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      {/* Sticky Bar */}
      <header className="sticky top-0 z-40 mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <Zap className="size-5" /> Admin Local de Fotos (Piriápolis)
            </h1>
            <p className="text-xs text-zinc-400">
              Asigna categorías, agrega o elimina fotos visualmente. Clic en &quot;Guardar Cambios&quot; sobrescribe `portfolio.json`.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsAddOpen(true)}
              className="bg-amber-500 font-semibold text-zinc-950 hover:bg-amber-400 shadow-md shadow-amber-500/20"
            >
              <Plus className="size-4" />
              Agregar Foto Nueva
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPhotos}
              disabled={loading}
              className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Recargar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
            >
              <Save className="size-4" />
              {saving ? "Guardando..." : "Guardar Cambios en Disco"}
            </Button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`mt-4 flex items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-xs font-medium ${
              message.type === "success"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <CheckCircle2 className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="opacity-70 hover:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Stats & Filters */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-zinc-400 mr-2">Filtros:</span>
          <button
            type="button"
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-3 py-1 rounded-full border transition-all ${
              activeCategoryFilter === "all"
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-medium"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Todas ({photos.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategoryFilter === cat.slug;
            const count = counts[cat.slug] || 0;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.slug)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-medium"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <cat.icon className="size-3" />
                {cat.label} ({count})
              </button>
            );
          })}
          <div className="ml-auto w-full sm:w-64">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-zinc-500" />
              <Input
                placeholder="Buscar por URL o alt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 border-zinc-800 bg-zinc-900/90 text-xs text-zinc-200"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-zinc-400">
          <RefreshCw className="size-6 animate-spin text-emerald-400" />
          <span className="ml-2 text-sm">Cargando fotos del archivo local...</span>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 text-zinc-500">
          <p className="text-sm">No hay fotos que coincidan con la búsqueda o filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo) => {
            const originalIndex = photos.findIndex((p) => p === photo);
            return (
              <div
                key={originalIndex}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 transition-all hover:border-zinc-700 hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={photo.src}
                    alt={photo.alt || `Foto ${originalIndex + 1}`}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-2 top-2 flex items-center gap-1.5">
                    <Badge className="bg-zinc-950/80 text-[10px] text-zinc-300 backdrop-blur-md">
                      #{originalIndex + 1}
                    </Badge>
                  </div>

                  {/* Delete button top-right */}
                  <button
                    type="button"
                    onClick={() => setPhotoToDelete(originalIndex)}
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-lg bg-red-500/80 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100 shadow-md backdrop-blur-md"
                    title="Eliminar foto"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Body & Category Selectors */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Editable Alt Text */}
                  <div className="mb-3 space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                      <Edit3 className="size-3" /> Texto Alt (SEO):
                    </label>
                    <Input
                      value={photo.alt}
                      onChange={(e) => handleAltChange(originalIndex, e.target.value)}
                      placeholder="Descripción de la foto..."
                      className="h-8 border-zinc-800 bg-zinc-950/60 text-xs text-zinc-200 focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="mt-auto space-y-1.5">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Categoría / Filtro:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CATEGORIES.map((cat) => {
                        const isSelected = photo.category === cat.slug;
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.slug}
                            type="button"
                            onClick={() => handleCategoryChange(originalIndex, cat.slug)}
                            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                              isSelected
                                ? cat.color + " ring-1 ring-emerald-400/50"
                                : "border-zinc-800 bg-zinc-950/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                            }`}
                          >
                            <Icon className="size-3.5 shrink-0" />
                            <span className="truncate">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Photo Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-emerald-400 flex items-center gap-2">
              <ImageIcon className="size-5" /> Agregar Nueva Foto al Portfolio
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Ingresa la URL de la imagen (ImageKit, Sirv, etc.) y selecciona su categoría.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">URL de la imagen (`src`):</label>
              <Input
                placeholder="https://ik.imagekit.io/tnzquipyu/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="border-zinc-800 bg-zinc-950 text-zinc-200"
              />
            </div>

            {/* Image Preview */}
            {newUrl.trim() && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                <img
                  src={newUrl.trim()}
                  alt="Vista previa"
                  className="size-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Descripción / Alt (SEO):</label>
              <Input
                placeholder="Ej: Instalación de tablero eléctrico en Piriápolis"
                value={newAlt}
                onChange={(e) => setNewAlt(e.target.value)}
                className="border-zinc-800 bg-zinc-950 text-zinc-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-300">Categoría inicial:</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = newCategory === cat.slug;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setNewCategory(cat.slug)}
                      className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium transition-all ${
                        isSelected
                          ? cat.color + " ring-1 ring-emerald-400/50"
                          : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-800"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsAddOpen(false)}
              className="border-zinc-800 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddPhoto}
              disabled={!newUrl.trim()}
              className="bg-emerald-500 font-semibold text-zinc-950 hover:bg-emerald-400"
            >
              Agregar Foto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={photoToDelete !== null} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <Trash2 className="size-5" /> ¿Eliminar esta foto?
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              La foto será removida de la lista del portfolio. Para guardar los cambios de forma permanente en el archivo `portfolio.json`, recuerda hacer clic en &quot;Guardar Cambios en Disco&quot;.
            </DialogDescription>
          </DialogHeader>

          {photoToDelete !== null && photos[photoToDelete] && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              <img
                src={photos[photoToDelete].src}
                alt={photos[photoToDelete].alt}
                className="size-full object-contain"
              />
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setPhotoToDelete(null)}
              className="border-zinc-800 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => photoToDelete !== null && handleDeletePhoto(photoToDelete)}
              className="bg-red-500 font-semibold text-white hover:bg-red-600"
            >
              Sí, eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
