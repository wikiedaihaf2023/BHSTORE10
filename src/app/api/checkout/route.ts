import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";

export async function POST(request: Request) {
    try {
        const session = await auth();
        const body = await request.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Empty cart" }, { status: 400 });
        }

        // Mock Checkout for Development/Demo if no real key
        if (process.env.STRIPE_SECRET_KEY?.includes("placeholder")) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({
                url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id=mock_session_${Date.now()}`
            });
        }

        const line_items = items.map((item: any) => ({
            price_data: {
                currency: "sar",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            customer_email: session?.user?.email || undefined,
            metadata: {
                userId: session?.user?.id || "guest",
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
