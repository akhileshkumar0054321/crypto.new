import { NextRequest, NextResponse } from "next/server";
import { getMasterSignalsOverview } from "@/lib/server/advancedSignalsService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMasterSignalsOverview();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch signals overview" },
      { status: 500 }
    );
  }
}
