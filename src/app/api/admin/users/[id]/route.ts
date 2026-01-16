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
        const { name, email, role } = body;

        const user = await prisma.user.update({
            where: { id },
            data: { name, email, role }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Prevent self-deletion
        if (session.user?.id === id) {
            return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
