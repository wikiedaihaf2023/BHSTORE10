import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { productId, rating, comment } = body;

        if (!productId || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                productId,
                rating: Number(rating),
                comment,
                userId: session.user.id!,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Review Creation Error:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}
