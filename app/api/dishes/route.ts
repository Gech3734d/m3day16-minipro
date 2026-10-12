import { NextResponse } from "next/server";
import { dishes } from "@/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = 6;
  const filtered = dishes.filter((dish) => !q || `${dish.name} ${dish.category} ${dish.description}`.toLowerCase().includes(q));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const results = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  return NextResponse.json({ items: results, page: safePage, pageSize, total: filtered.length, totalPages, query: q }, { headers: { "Cache-Control": "no-store" } });
}
