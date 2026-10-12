import { NextResponse } from "next/server";
import { getOrder } from "@/lib/data";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!id || !/^[a-zA-Z0-9-]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }
  return NextResponse.json(getOrder(id), { headers: { "Cache-Control": "no-store" } });
}
