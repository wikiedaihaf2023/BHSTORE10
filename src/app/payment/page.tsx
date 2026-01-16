"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    CreditCard,
    Wallet,
    ShieldCheck,
    CheckCircle2,
    Lock,
    Zap,
    Smartphone,
    Globe,
    Building,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-slate-900 py-24 md:py-32 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/20">
                            <ShieldCheck size={12} /> {language === "ar" ? "دفع آمن 100%" : "100% SECURE PAYMENT"}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-tight">
                            {language === "ar" ? "وسائل دفع مرنة تناسب احتياجك" : "Flexible payment methods for your needs"}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "نحن نوفر لك أحدث وسائل الدفع الإلكتروني العالمية والمحلية في المملكة لضمان عملية شراء سهلة وآمنة."
                                : "We provide you with the latest global and local electronic payment methods in the Kingdom to ensure an easy and secure purchase."}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-16 mb-32 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        <PaymentMethodCard
                            icon={<CreditCard className="text-blue-500" />}
                            title={language === "ar" ? "البطاقات البنكية" : "Bank Cards"}
                            desc="Visa, Mastercard, Mada"
                        />
                        <PaymentMethodCard
                            icon={<Smartphone className="text-emerald-500" />}
                            title="Apple Pay"
                            desc={language === "ar" ? "دفع سريع بلمسة" : "Instant one-touch pay"}
                        />
                        <PaymentMethodCard
                            icon={<Building className="text-orange-500" />}
                            title={language === "ar" ? "تحويل بنكي" : "Bank Transfer"}
                            desc={language === "ar" ? "الراحجي، الأهلي، الإنماء" : "Al Rajhi, NCB, Alinma"}
                        />
                        <PaymentMethodCard
                            icon={<Wallet className="text-indigo-500" />}
                            title={language === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery"}
                            desc={language === "ar" ? "متاح لمدن مختارة" : "Available for select cities"}
                        />
                    </div>

                    <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-24 overflow-hidden relative">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                                    {language === "ar" ? "حماية مضاعفة لكل عملية شراء" : "Double protection for every purchase"}
                                </h2>
                                <div className="space-y-8">
                                    <SecurityPoint
                                        icon={<Lock />}
                                        title={language === "ar" ? "تشفير SSL متقدم" : "Advanced SSL Encryption"}
                                        desc={language === "ar" ? "بياناتك مشفرة ولا يمكن الوصول إليها من أي طرف ثالث." : "Your data is encrypted and inaccessible to any third party."}
                                    />
                                    <SecurityPoint
                                        icon={<CheckCircle2 />}
                                        title={language === "ar" ? "توثيق 3D Secure" : "3D Secure Verification"}
                                        desc={language === "ar" ? "تحقق إضافي عبر هاتفك لضمان أنك من يقوم بالدفع." : "Extra verification via your phone to ensure you're the one paying."}
                                    />
                                    <SecurityPoint
                                        icon={<Zap />}
                                        title={language === "ar" ? "معالجة فورية" : "Instant Processing"}
                                        desc={language === "ar" ? "لا ننتظر طويلاً، بمجرد الدفع يصلنا التأكيد فوراً." : "No long waits; we receive confirmation immediately after payment."}
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-slate-50 p-12 rounded-[3.5rem] border-2 border-slate-100 space-y-10 group hover:bg-white hover:shadow-2xl transition-all">
                                    <h3 className="text-2xl font-black text-slate-900 border-b pb-6">{language === "ar" ? "خطوات التحويل البنكي" : "Bank Transfer Steps"}</h3>
                                    <div className="space-y-8">
                                        <Step num="1" text={language === "ar" ? "اختر التحويل البنكي عند الدفع." : "Select Bank Transfer at checkout."} />
                                        <Step num="2" text={language === "ar" ? "قم بتحويل المبلغ لأحد حساباتنا." : "Transfer amount to one of our accounts."} />
                                        <Step num="3" text={language === "ar" ? "ارسل صورة التحويل عبر الواتساب." : "Send transfer photo via WhatsApp."} />
                                    </div>
                                    <Button variant="outline" className="w-full rounded-2xl font-black py-7 border-2 group-hover:bg-primary group-hover:text-white transition-all">
                                        {language === "ar" ? "عرض الحسابات البنكية" : "View Bank Accounts"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-8 pb-32">
                    <div className="bg-primary p-20 rounded-[4rem] text-white flex flex-col items-center text-center space-y-12">
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">
                            {language === "ar" ? "تسوق الآن وادفع بالطريقة التي تريحك" : "Shop now and pay the way you like"}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale group-hover:grayscale-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-10 invert" alt="Stripe" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-10 invert" alt="PayPal" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" className="h-10 invert" alt="Apple Pay" />
                        </div>
                        <Button variant="accent" size="lg" className="rounded-2xl px-12 py-8 text-xl font-black text-primary shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "العودة للتسوق" : "Back to Shopping"}
                            <ArrowRight className={language === "ar" ? "rotate-180" : ""} size={20} />
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function PaymentMethodCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-black/5 text-center space-y-6 hover:-translate-y-3 transition-transform duration-500">
            <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto shadow-inner text-primary">
                {icon}
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">{title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
            </div>
        </div>
    );
}

function SecurityPoint({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-500 flex-shrink-0 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-slate-900 mb-1">{title}</h4>
                <p className="text-sm font-bold text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function Step({ num, text }: { num: string, text: string }) {
    return (
        <div className="flex items-center gap-6">
            <div className="h-10 w-10 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center font-black">
                {num}
            </div>
            <p className="font-bold text-slate-700">{text}</p>
        </div>
    );
}
