import { NextRequest, NextResponse } from "next/server";
import { cryptoStore } from "@/lib/server/cryptoService";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const existing = cryptoStore.alerts.get(id);
  if (!existing) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }
  return NextResponse.json(existing);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;
    const existing = cryptoStore.alerts.get(id);
    if (!existing) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      threshold: body?.threshold !== undefined ? Number(body.threshold) : existing.threshold,
    };

    cryptoStore.alerts.set(id, updated);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Alert update error" }, { status: 500 });
  }
}

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const alert = cryptoStore.alerts.get(id);
  if (!alert) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 });
  }

  alert.is_active = !alert.is_active;
  cryptoStore.alerts.set(id, alert);
  return NextResponse.json(alert);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (cryptoStore.alerts.has(id)) {
    cryptoStore.alerts.delete(id);
    return NextResponse.json({ status: "deleted", id });
  }
  return NextResponse.json({ error: "Alert not found" }, { status: 404 });
}
