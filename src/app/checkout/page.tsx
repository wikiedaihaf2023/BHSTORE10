"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ShieldCheck, MapPin, Phone, User, CreditCard, ChevronRight, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CheckoutPage() {
    const cart = useCart();
    const router = useRouter();
    const { language, t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Address form state
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        city: "",
        address: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
            alert(language === "ar" ? "يرجى إكمال جميع البيانات المطلوبة" : "Please complete all required fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart.items,
                    address: `${formData.city}, ${formData.address}`,
                    customerName: formData.fullName,
                    customerPhone: formData.phone
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Checkout failed:", data.error);
                alert(language === "ar" ? "فشل إتمام العملية، يرجى المحاولة لاحقاً" : "Checkout failed, please try again later");
            }
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col bg-slate-50">
                <Header />
                <main className="container mx-auto flex flex-1 items-center justify-center p-4">
                    <div className="text-center p-16 bg-white rounded-[2.5rem] shadow-2xl border border-black/5 w-full max-w-xl ring-1 ring-black/5">
                        <div className="flex justify-center mb-8">
                            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center">
                                <ShieldCheck className="h-12 w-12 text-slate-200" />
                            </div>
                        </div>
                        <h1 className="mb-6 text-3xl font-black text-slate-900 tracking-tight">{t("checkout.emptyCart")}</h1>
                        <Button variant="primary" size="lg" className="rounded-2xl px-12 py-8 text-lg font-black" onClick={() => router.push("/products")}>
                            {t("checkout.backToShopping")}
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />
            <main className="container mx-auto flex-1 px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t("checkout.title")}</h1>
                    </div>

                    <form onSubmit={onCheckout} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Left Column: Details & Summary */}
                        <div className="lg:col-span-8 space-y-12">

                            {/* Shipping Details */}
                            <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                                <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-8">
                                    <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                        <MapPin size={24} />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">{language === "ar" ? "تفاصيل الشحن والتوصيل" : "Shipping & Delivery Details"}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                            <User size={14} /> {language === "ar" ? "الاسم الكامل" : "Full Name"}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                            <Phone size={14} /> {language === "ar" ? "رقم الجوال" : "Mobile Number"}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="05xxxxxxxx"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                            <LayoutDashboard size={14} /> {language === "ar" ? "المدينة" : "City"}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder={language === "ar" ? "مثلاً: الرياض" : "e.g. Riyadh"}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                            <MapPin size={14} /> {language === "ar" ? "العنوان بالتفصيل" : "Detailed Address"}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder={language === "ar" ? "اسم الحي، الشارع، رقم المبنى" : "District, Street, Building No."}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Order Summary Table */}
                            <section className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                                <h2 className="text-2xl font-black text-slate-900 mb-10 border-b border-slate-50 pb-8">{t("checkout.orderSummary")}</h2>
                                <div className="space-y-8">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-8 group">
                                            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-[2rem] bg-slate-50 ring-1 ring-black/5">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h3 className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors">{item.name}</h3>
                                                <div className="flex items-center gap-3 text-slate-400 font-bold">
                                                    <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs uppercase tracking-tighter">{t("checkout.quantity")} {item.quantity}</span>
                                                    <span>•</span>
                                                    <span>{item.price.toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                                                </div>
                                            </div>
                                            <p className="font-black text-2xl text-slate-900">
                                                {(item.price * item.quantity).toLocaleString()}
                                                <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">{language === "ar" ? "ر.س" : "SAR"}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Checkout Panel */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32 space-y-8">
                                <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-2xl shadow-slate-200/40 ring-1 ring-black/5">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">{t("checkout.paymentInfo")}</h2>
                                    </div>

                                    <p className="text-slate-500 text-base mb-10 leading-relaxed font-bold">
                                        {t("checkout.paymentMessage")}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        {["VISA", "Mastercard", "Mada", "Apple Pay"].map((brand) => (
                                            <div key={brand} className="flex h-12 items-center justify-center rounded-xl border-2 border-slate-50 bg-slate-50/30 font-black text-slate-400 text-xs uppercase tracking-widest transition-all hover:bg-white hover:border-primary/20 hover:text-primary cursor-default">
                                                {brand}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Expandable Details */}
                                    <div className="mb-10 group">
                                        <details className="cursor-pointer">
                                            <summary className="text-primary font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2 list-none">
                                                <ChevronRight className={`h-4 w-4 transition-transform group-open:rotate-90 ${language === "ar" ? "rotate-180" : ""}`} />
                                                {language === "ar" ? "إظهار التفاصيل" : "Show Details"}
                                            </summary>
                                            <div className="mt-4 p-6 rounded-2xl bg-slate-50 text-xs font-bold text-slate-500 space-y-3 leading-relaxed border border-slate-100 animate-in fade-in slide-in-from-top-2">
                                                <p>{language === "ar" ? "• سيتم معالجة طلبك عبر Stripe، أحد أكثر بوابات الدفع أماناً في العالم." : "• Your order will be processed via Stripe, one of the world's most secure payment gateways."}</p>
                                                <p>{language === "ar" ? "• تدعم البوابة خاصية 3D Secure للحماية من الاحتيال." : "• The gateway supports 3D Secure for fraud protection."}</p>
                                                <p>{language === "ar" ? "• جميع البيانات مشفرة باستخدام بروتوكول SSL." : "• All data is encrypted using SSL protocol."}</p>
                                            </div>
                                        </details>
                                    </div>

                                    <div className="space-y-4 border-t border-slate-50 pt-8 mb-8">
                                        <div className="flex justify-between items-center text-slate-400 font-black uppercase tracking-widest text-xs">
                                            <span>{t("cart.subtotal")}</span>
                                            <span>{cart.getTotalPrice().toLocaleString()} {language === "ar" ? "ر.س" : "SAR"}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-400 font-black uppercase tracking-widest text-xs">
                                            <span>{t("cart.shipping")}</span>
                                            <span className="text-emerald-500">{t("cart.free")}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="text-xl font-black text-slate-900">{t("checkout.total")}</span>
                                            <div className="text-right">
                                                <div className="text-3xl font-black text-primary">{cart.getTotalPrice().toLocaleString()}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language === "ar" ? "شامل الضريبة" : "VAT INCLUDED"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-10 text-2xl font-black rounded-3xl shadow-2xl shadow-accent/30 hover:scale-[1.02] transition-all active:scale-95 group"
                                        variant="accent"
                                        disabled={isLoading}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="h-8 w-8 animate-spin" />
                                                    {t("checkout.processing")}
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldCheck className="h-8 w-8" />
                                                    {t("checkout.payButton")}
                                                    <ChevronRight className={`h-6 w-6 transition-transform group-hover:translate-x-2 ${language === "ar" ? "rotate-180 group-hover:-translate-x-2" : ""}`} />
                                                </>
                                            )}
                                        </div>
                                    </Button>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                                        <ShieldCheck size={14} />
                                        {language === "ar" ? "دفع آمن ومحمي 100%" : "100% SECURE & PROTECTED"}
                                    </div>
                                </div>

                                <div className="p-8 bg-blue-50/30 rounded-[2rem] border-2 border-blue-50/50">
                                    <p className="text-xs text-blue-800/60 font-black leading-relaxed text-center uppercase tracking-tighter">
                                        {t("checkout.securePaymentNote")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
