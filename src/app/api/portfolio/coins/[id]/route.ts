import { NextRequest, NextResponse } from "next/server";
import { cryptoStore } from "@/lib/server/cryptoService";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const holding = cryptoStore.holdings.get(id);
  if (!holding) {
    return NextResponse.json({ error: "Holding not found" }, { status: 404 });
  }
  return NextResponse.json(holding);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (cryptoStore.holdings.has(id)) {
    cryptoStore.holdings.delete(id);
    return NextResponse.json({ status: "deleted", id });
  }
  return NextResponse.json({ error: "Holding not found" }, { status: 404 });
}
