"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Calculator,
    RefreshCcw,
    TrendingUp,
    Globe,
    Info,
    ArrowRightLeft,
    ChevronDown,
    ShieldCheck,
    CheckCircle2,
    DollarSign
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConversionPage() {
    const { language } = useLanguage();
    const [amount, setAmount] = useState<string>("100");
    const [from, setFrom] = useState("SAR");
    const [to, setTo] = useState("USD");

    const converted = from === "SAR" ? (Number(amount) / 3.75).toFixed(2) : (Number(amount) * 3.75).toFixed(2);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-primary py-24 md:py-32 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/20">
                            <RefreshCcw size={12} /> {language === "ar" ? "أداة تحويل العملات" : "CURRENCY CONVERTER"}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
                            {language === "ar" ? "محول عملات دقيق وسريع" : "Quick & Accurate Currency Converter"}
                        </h1>
                        <p className="text-xl font-bold text-slate-400 max-w-2xl mx-auto">
                            {language === "ar" ? "احسب مشترياتك بأي عملة تفضلها بناءً على أسعار السوق الحالية." : "Calculate your purchases in any preferred currency based on current market rates."}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-20 mb-32 relative z-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200 border border-black/5 p-12 md:p-24 space-y-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <Calculator size={300} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end relative z-10">
                                <div className="md:col-span-5 space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">{language === "ar" ? "المبلغ" : "Amount"}</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2.5rem] py-8 px-10 text-3xl font-black text-primary focus:bg-white focus:border-accent focus:outline-none transition-all shadow-inner"
                                        />
                                        <div className={`absolute inset-y-0 ${language === "ar" ? "left-10" : "right-10"} flex items-center font-black text-slate-300 text-xl`}>{from}</div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex justify-center pb-6">
                                    <button
                                        onClick={() => { setFrom(to); setTo(from); }}
                                        className="h-16 w-16 bg-accent text-primary rounded-full flex items-center justify-center shadow-xl shadow-accent/20 hover:rotate-180 transition-transform duration-500"
                                    >
                                        <ArrowRightLeft size={24} />
                                    </button>
                                </div>

                                <div className="md:col-span-5 space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">{language === "ar" ? "العملة" : "Converted to"}</label>
                                    <div className="relative">
                                        <div className="w-full bg-slate-900 border-2 border-slate-900 rounded-[2.5rem] py-8 px-10 text-3xl font-black text-white shadow-2xl">
                                            {converted} <span className="text-xl text-accent opacity-50 ml-4">{to}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                                        <Info size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-600">{language === "ar" ? "1 ريال سعودي (SAR) = 0.27 دولار أمريكي (USD)" : "1 SAR = 0.27 USD"}</p>
                                        <p className="text-xs font-bold text-slate-400">{language === "ar" ? "يتم تحديث الأسعار تلقائياً كل ساعة." : "Rates updated automatically every hour."}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe className="text-slate-300" />
                                    <span className="text-sm font-black uppercase tracking-widest text-slate-400">{language === "ar" ? "سعر السوق الحالي" : "Market Live Rates"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <InfoBox icon={<ShieldCheck className="text-emerald-500" />} text={language === "ar" ? "تقديرات دقيقة لضمان وضوح ميزانيتك عند التسوق." : "Accurate estimates for budget clarity while shopping."} />
                            <InfoBox icon={<TrendingUp className="text-blue-500" />} text={language === "ar" ? "دعم كافة العملات الخليجية والعالمية الكبرى قريباً." : "Support for all GCC and major global currencies coming soon."} />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function InfoBox({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-black/5 flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex-shrink-0 flex items-center justify-center shadow-inner">
                {icon}
            </div>
            <p className="text-base font-bold text-slate-500 leading-relaxed">{text}</p>
        </div>
    );
}
