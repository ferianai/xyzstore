import { NextResponse } from "next/server";

const API_URL = process.env.GOOGLE_SHEET_API as string;

export const dynamic = "force-static";

/**
 * GET — Ambil semua produk
 */
export async function GET() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return NextResponse.json({ status: "success", message: "Products fetched successfully", data });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ status: "error", message: "Failed to fetch products" }, { status: 500 });
  }
}

/**
 * POST — Tambah produk baru
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

/**
 * PUT — Update produk berdasarkan row
 */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

/**
 * DELETE — Hapus produk berdasarkan row
 */
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
