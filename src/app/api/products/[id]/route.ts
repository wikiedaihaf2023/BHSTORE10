import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: { name: true }
                        }
                    },
                    orderBy: { createdAt: "desc" }
                },
                _count: {
                    select: { reviews: true }
                }
            },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Fetch Product Error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
