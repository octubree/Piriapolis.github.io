import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PORTFOLIO_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(PORTFOLIO_PATH, "utf-8");
    const data = JSON.parse(fileData);
    return NextResponse.json({ success: true, photos: data });
  } catch (error) {
    console.error("Error reading portfolio.json:", error);
    return NextResponse.json(
      { success: false, error: "No se pudo leer el archivo portfolio.json" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { success: false, error: "El panel de administración local solo está disponible en entorno de desarrollo." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body.photos)) {
      return NextResponse.json(
        { success: false, error: "Estructura de datos inválida" },
        { status: 400 }
      );
    }

    // Write formatted JSON directly to disk
    fs.writeFileSync(PORTFOLIO_PATH, JSON.stringify(body.photos, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "portfolio.json actualizado con éxito en tu disco duro",
    });
  } catch (error) {
    console.error("Error writing portfolio.json:", error);
    return NextResponse.json(
      { success: false, error: "No se pudo guardar el archivo portfolio.json" },
      { status: 500 }
    );
  }
}
