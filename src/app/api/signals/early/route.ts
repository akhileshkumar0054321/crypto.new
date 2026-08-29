import { NextRequest, NextResponse } from "next/server";
import { getEarlySignalsList, getEarlySignalForCoin } from "@/lib/server/advancedSignalsService";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get("coin_id");

    if (coinId) {
      const signal = await getEarlySignalForCoin(coinId);
      return NextResponse.json({ success: true, data: signal });
    }

    const list = await getEarlySignalsList();
    return NextResponse.json({ success: true, data: list, count: list.length });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch early signals" },
      { status: 500 }
    );
  }
}
