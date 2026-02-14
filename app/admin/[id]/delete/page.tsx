import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.project.delete({ where: { id: params.id } });
  redirect("/admin");
}