import { NextRequest, NextResponse } from "next/server";
import { getSmartMoneyFlows, getSmartMoneyForCoin } from "@/lib/server/advancedSignalsService";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get("coin_id");

    if (coinId) {
      const data = await getSmartMoneyForCoin(coinId);
      return NextResponse.json({ success: true, data });
    }

    const list = await getSmartMoneyFlows();
    return NextResponse.json({ success: true, data: list, count: list.length });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch smart money flows" },
      { status: 500 }
    );
  }
}
