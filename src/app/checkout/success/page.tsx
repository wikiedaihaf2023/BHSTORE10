"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, PackageCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CheckoutSuccessPage() {
    const cart = useCart();
    const { language, t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        cart.clearCart();
    }, [cart]);

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />
            <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-20">
                <div className="w-full max-w-xl rounded-2xl border bg-white p-12 text-center shadow-2xl ring-1 ring-black/5 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500" />

                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
                            <div className="relative bg-green-50 rounded-full p-6 text-green-500">
                                <CheckCircle2 className="h-24 w-24" />
                            </div>
                        </div>
                    </div>

                    <h1 className="mb-4 text-3xl font-black text-gray-900 tracking-tight">{t("success.title")}</h1>
                    <p className="mb-10 text-lg text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
                        {t("success.message")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/account/orders" className="flex-1">
                            <Button variant="primary" size="lg" className="w-full gap-2">
                                <PackageCheck className="h-5 w-5" />
                                {t("success.trackOrder")}
                            </Button>
                        </Link>
                        <Link href="/" className="flex-1">
                            <Button variant="outline" size="lg" className="w-full gap-2 group">
                                {t("success.backHome")}
                                <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                        <ShieldCheck className="h-4 w-4" />
                        {language === "ar" ? "عملية دفع آمنة مشفرة" : "Secure Encrypted Payment"}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
