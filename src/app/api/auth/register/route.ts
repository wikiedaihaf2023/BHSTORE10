import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "هذا البريد الإلكتروني مسجل بالفعل" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER"
            },
        });

        return NextResponse.json({
            success: "تم إنشاء الحساب بنجاح",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "فشل إنشاء الحساب. يرجى المحاولة لاحقاً" }, { status: 500 });
    }
}
