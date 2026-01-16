"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CartPage() {
    const cart = useCart();
    const [mounted, setMounted] = useState(false);
    const { language, t } = useLanguage();

    // Prevent hydration error (Zustand persist)
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const items = cart.items;
    const totalPrice = cart.getTotalPrice();

    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-12">
                <h1 className="mb-8 text-2xl font-black">{t("cart.title")}</h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-16 text-center shadow-xl">
                        <div className="mb-6 rounded-full bg-blue-50 p-8 text-primary animate-bounce">
                            <ShoppingBag className="h-20 w-20" />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold">{t("cart.empty")}</h2>
                        <p className="mb-8 text-gray-500">{t("cart.emptyMessage")}</p>
                        <Link href="/products">
                            <Button variant="accent" size="lg">
                                {t("cart.startShopping")}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* List of items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-6 rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2">
                                        <Image src={item.image} alt={item.name} fill className="object-contain transition-transform hover:scale-110" />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-1">
                                        <Link href={`/product/${item.id}`} className="text-lg font-bold hover:text-accent line-clamp-1">
                                            {item.name}
                                        </Link>
                                        <span className="text-sm text-green-600 font-bold">{t("cart.inStock")}</span>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-100 p-1">
                                                <button
                                                    onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1.5 hover:text-accent disabled:opacity-30 rounded-lg hover:bg-gray-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-5 w-5" />
                                                </button>
                                                <span className="w-8 text-center text-lg font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1.5 hover:text-accent rounded-lg hover:bg-gray-50"
                                                >
                                                    <Plus className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => cart.removeItem(item.id)}
                                                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 hover:underline transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" /> {t("cart.delete")}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-left font-bold text-2xl min-w-[120px] text-primary">
                                        {(item.price * item.quantity).toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-2xl border bg-white p-8 shadow-lg ring-1 ring-black/5">
                            <h2 className="mb-8 text-2xl font-bold border-b pb-4">{t("cart.orderSummary")}</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>{t("cart.subtotal")} ({cart.getTotalItems()} {t("cart.products")})</span>
                                    <span className="font-bold">{totalPrice.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>{t("cart.shipping")}</span>
                                    <span className="text-green-600 font-bold">{t("cart.free")}</span>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("cart.total")}</div>
                                        <div className="text-3xl font-bold text-accent">
                                            {totalPrice.toLocaleString()} <span className="text-lg">{language === "ar" ? "ر.س" : "SAR"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/checkout">
                                <Button variant="accent" className="mt-10 w-full py-8 text-xl group">
                                    {t("cart.checkout")}
                                    <ArrowRight className={`mr-2 h-6 w-6 transition-transform group-hover:translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
                                </Button>
                            </Link>
                            <p className="mt-6 text-center text-xs text-gray-400 font-medium leading-relaxed">
                                {t("cart.vatNote")}
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
