import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        console.log("[API ADMIN PRODUCTS] Session:", session?.user?.email, "Role:", (session?.user as any)?.role);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Products Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, stock, image, categoryId } = body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                image,
                categoryId,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error("Create Product Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
