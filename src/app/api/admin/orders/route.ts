import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        console.log("[API ADMIN ORDERS] Session:", session?.user?.email, "Role:", (session?.user as any)?.role);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Admin Orders Error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
