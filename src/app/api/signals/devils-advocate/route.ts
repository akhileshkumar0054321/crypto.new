import { NextRequest, NextResponse } from "next/server";
import { getDevilsAdvocate } from "@/lib/server/advancedSignalsService";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get("coin_id") || "bitcoin";
    const prompt = searchParams.get("prompt") || undefined;

    const analysis = await getDevilsAdvocate(coinId, prompt);
    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate Devil's Advocate analysis" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const coinId = body.coin_id || "bitcoin";
    const prompt = body.prompt || undefined;

    const analysis = await getDevilsAdvocate(coinId, prompt);
    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to generate Devil's Advocate analysis" },
      { status: 500 }
    );
  }
}
