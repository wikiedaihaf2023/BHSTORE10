"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Gift,
    Smartphone,
    Mail,
    CreditCard,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Zap,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GiftCardsPage() {
    const { language } = useLanguage();
    const [selectedAmount, setSelectedAmount] = useState<number>(100);

    const amounts = [50, 100, 200, 500, 1000];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-primary py-24 md:py-40 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent z-0" />
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/20">
                            <Gift size={12} /> {language === "ar" ? "هدية مثالية لكل مناسبة" : "PERFECT GIFT FOR EVERY OCCASION"}
                        </div>
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                            {language === "ar" ? "امنحهم متعة الاختيار مع بطاقات هدايا بي إتش" : "Give them the joy of choice with BH Gift Cards"}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "بطاقة واحدة، آلاف الإمكانيات. أرسل هدية فورية لأحبائك عبر البريد أو رسالة نصية."
                                : "One card, thousands of possibilities. Send an instant gift to your loved ones via email or SMS."}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-24 mb-32 relative z-20">
                    <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200 border border-black/5 p-12 md:p-24 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            {/* Left Side: Customization */}
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black text-slate-900">{language === "ar" ? "حدد قيمة البطاقة" : "Select Card Amount"}</h2>
                                    <div className="flex flex-wrap gap-4">
                                        {amounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setSelectedAmount(amount)}
                                                className={`px-8 py-5 rounded-3xl font-black text-xl transition-all ${selectedAmount === amount ? 'bg-primary text-white scale-110 shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                            >
                                                {amount} <span className="text-sm">SAR</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-slate-900">{language === "ar" ? "طريقة الإرسال" : "Delivery Method"}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <DeliveryMethod icon={<Mail />} label={language === "ar" ? "إيميل" : "Email"} active />
                                        <DeliveryMethod icon={<Smartphone />} label={language === "ar" ? "رسالة نصية" : "SMS"} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">{language === "ar" ? "رسالة خاصة (اختياري)" : "Personal Message (Optional)"}</label>
                                    <textarea
                                        placeholder={language === "ar" ? "اكتب تمنياتك الطيبة هنا..." : "Write your wishes here..."}
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] py-6 px-10 font-bold focus:bg-white focus:border-accent transition-all min-h-[120px]"
                                    />
                                </div>

                                <Button variant="primary" size="lg" className="w-full rounded-2xl py-8 text-2xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    {language === "ar" ? "شراء البطاقة الآن" : "Purchase Gift Card"}
                                </Button>
                            </div>

                            {/* Right Side: Preview */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] p-12 rounded-[3.5rem] text-white aspect-[1.6/1] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-10 transform scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                        <Gift size={200} />
                                    </div>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="text-3xl font-black italic">BH<span className="text-accent">STORE</span></div>
                                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/20">E-GIFT CARD</div>
                                    </div>
                                    <div className="relative z-10 space-y-2">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{language === "ar" ? "قيمة البطاقة" : "CARD VALUE"}</p>
                                        <p className="text-6xl font-black text-accent">{selectedAmount} <span className="text-2xl">SAR</span></p>
                                    </div>
                                    <div className="flex justify-between items-end relative z-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">VALID FOR 12 MONTHS</p>
                                            <p className="text-sm font-bold">**** **** **** 2026</p>
                                        </div>
                                        <Sparkles className="text-accent animate-pulse" />
                                    </div>
                                </div>
                                <div className="mt-12 grid grid-cols-1 gap-6">
                                    <FeatureItem icon={<Zap size={18} className="text-orange-400" />} text={language === "ar" ? "إرسال فوري ومباشر بمجرد الدفع." : "Instant delivery immediately after payment."} />
                                    <FeatureItem icon={<Heart size={18} className="text-red-400" />} text={language === "ar" ? "صالحة للاستخدام على كافة المنتجات." : "Valid for use on all store products."} />
                                    <FeatureItem icon={<CheckCircle2 size={18} className="text-emerald-400" />} text={language === "ar" ? "يمكن تقسيم القيمة على عدة مشتريات." : "Value can be split across multiple purchases."} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function DeliveryMethod({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`p-6 rounded-3xl border-2 flex items-center justify-center gap-4 cursor-pointer transition-all ${active ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>
            {icon}
            <span className="font-black">{label}</span>
        </div>
    );
}

function FeatureItem({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
            {icon}
            <span className="font-bold text-slate-600">{text}</span>
        </div>
    );
}
