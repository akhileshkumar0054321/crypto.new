import { NextRequest, NextResponse } from "next/server";
import { cryptoStore } from "@/lib/server/cryptoService";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const coin = await cryptoStore.getCoin(id);
  if (!coin) {
    return NextResponse.json({ error: `Coin '${id}' not found` }, { status: 404 });
  }
  return NextResponse.json(coin);
}
