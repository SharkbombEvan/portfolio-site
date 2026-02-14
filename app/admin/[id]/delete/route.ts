import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params; // ✅ unwrap params promise

  console.log("DELETE POST hit. id =", id);

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  try {
    const deleted = await prisma.project.delete({
      where: { id },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, deleted });
  } catch (err: any) {
    console.error("DELETE ERROR FULL:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Delete failed", code: err?.code ?? null },
      { status: 500 }
    );
  }
}