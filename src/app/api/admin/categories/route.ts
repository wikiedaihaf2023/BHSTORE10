import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        console.log("[API ADMIN CATEGORIES] Session:", session?.user?.email, "Role:", (session?.user as any)?.role);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Categories Error:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, slug } = body;
        const category = await prisma.category.create({
            data: { name, slug }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
