import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        console.log("[API ADMIN STATS] Session:", session?.user?.email, "Role:", (session?.user as any)?.role);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [totalSales, ordersCount, productsCount, usersCount] = await Promise.all([
            prisma.order.aggregate({
                _sum: { total: true },
                where: { status: "DELIVERED" }
            }),
            prisma.order.count(),
            prisma.product.count(),
            prisma.user.count({ where: { role: "USER" } })
        ]);

        return NextResponse.json({
            totalSales: totalSales._sum.total || 0,
            ordersCount,
            productsCount,
            usersCount
        });
    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
