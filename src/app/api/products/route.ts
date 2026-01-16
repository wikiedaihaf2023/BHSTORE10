import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "createdAt_desc";

        const where: any = {};
        if (category) {
            where.category = { slug: category };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        const [orderByField, orderDirection] = sort.split("_");
        const orderBy: any = {};
        orderBy[orderByField] = orderDirection;

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                _count: {
                    select: { reviews: true },
                },
            },
            orderBy,
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
