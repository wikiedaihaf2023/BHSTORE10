import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { status } = body;

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Order Update Error:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
