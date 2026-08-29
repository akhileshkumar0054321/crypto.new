import { NextRequest, NextResponse } from "next/server";
import { getThesisAndInvalidation } from "@/lib/server/advancedSignalsService";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get("coin_id") || "bitcoin";

    const thesis = await getThesisAndInvalidation(coinId);
    return NextResponse.json({ success: true, data: thesis });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate Thesis & Invalidation" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const coinId = body.coin_id || "bitcoin";

    const thesis = await getThesisAndInvalidation(coinId);
    return NextResponse.json({ success: true, data: thesis });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate Thesis & Invalidation" },
      { status: 500 }
    );
  }
}
