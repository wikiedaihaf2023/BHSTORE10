"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Store,
    TrendingUp,
    Globe,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Package,
    Rocket,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellPage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-[#0F172A] py-16 md:py-32 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-indigo-900/40" />
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/10 uppercase tracking-[0.3em] text-accent">
                            <Rocket className="h-5 w-5" />
                            {language === "ar" ? "ابدأ تجارتك اليوم" : "START YOUR BUSINESS TODAY"}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                            {language === "ar" ? "وصل منتجاتك لملايين العملاء في ثوانٍ" : "Reach millions of customers in seconds"}
                        </h1>
                        <p className="text-lg md:text-xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "انضم لأكبر منصة تجارة إلكترونية في المنطقة وابدأ البيع باحترافية وسهولة مطلقة."
                                : "Join the largest e-commerce platform in the region and start selling professionally with absolute ease."}
                        </p>
                        <Button variant="accent" size="lg" className="rounded-3xl px-12 py-8 text-xl font-black text-primary shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "ابدأ البيع الآن" : "Start Selling Now"}
                        </Button>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="container mx-auto px-8 -mt-12 mb-20 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={<Globe className="text-blue-400" />}
                            title={language === "ar" ? "وصول واسع" : "Wide Reach"}
                            desc={language === "ar" ? "منتجاتك ستكون متاحة لملايين الزوار النشطين يومياً في كافة أنحاء المملكة." : "Your products will be available to millions of active daily visitors across the Kingdom."}
                        />
                        <BenefitCard
                            icon={<TrendingUp className="text-emerald-400" />}
                            title={language === "ar" ? "نمو سريع" : "Fast Growth"}
                            desc={language === "ar" ? "نوفر لك أدوات تحليلية متقدمة لمتابعة مبيعاتك وتطوير أعمالك باستمرار." : "We provide advanced analytical tools to track your sales and continuously grow your business."}
                        />
                        <BenefitCard
                            icon={<ShieldCheck className="text-orange-400" />}
                            title={language === "ar" ? "دفع آمن وموثوق" : "Secure Payments"}
                            desc={language === "ar" ? "نظام مالي متطور يضمن لك استلام مستحقاتك بدقة وفي موعدها." : "An advanced financial system that ensures you receive your dues accurately and on time."}
                        />
                    </div>
                </section>

                {/* Sell Features Checklist */}
                <section className="container mx-auto px-8 mb-20 py-16 bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                {language === "ar" ? "لماذا تختار متجر بي إتش للبيع؟" : "Why choose BH Store for selling?"}
                            </h2>
                            <div className="space-y-6">
                                <FeatureItem text={language === "ar" ? "أقل عمولة على المبيعات في السوق." : "Lowest sales commission in the market."} />
                                <FeatureItem text={language === "ar" ? "دعم لوجستي وتوصيل عبر شركائنا المعتمدين." : "Logistics support and delivery via our certified partners."} />
                                <FeatureItem text={language === "ar" ? "لوحة تحكم سهلة لإدارة المخزون والطلبات." : "Easy control panel to manage inventory and orders."} />
                                <FeatureItem text={language === "ar" ? "خدمة عملاء مخصصة للتجار على مدار الساعة." : "Dedicated 24/7 customer service for merchants."} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <StatBox icon={<Users size={24} />} num="5M+" label={language === "ar" ? "عميل نشط" : "Active Customers"} color="bg-blue-50" />
                            <StatBox icon={<Package size={24} />} num="10K+" label={language === "ar" ? "منتج مباع يومياً" : "Daily Orders"} color="bg-orange-50" />
                            <StatBox icon={<BarChart3 size={24} />} num="24/7" label={language === "ar" ? "دعم تقني" : "Live Support"} color="bg-emerald-50" />
                            <StatBox icon={<CreditCard size={24} />} num="SAR" label={language === "ar" ? "دفع فوري" : "Instant Payouts"} color="bg-indigo-50" />
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-8 pb-32 text-center">
                    <div className="bg-primary p-16 rounded-[4rem] text-white space-y-10 border-4 border-accent shadow-2xl">
                        <h2 className="text-3xl md:text-5xl font-black italic">
                            {language === "ar" ? "هل أنت مستعد لتكون شريكنا القادم؟" : "Ready to be our next partner?"}
                        </h2>
                        <Button variant="accent" size="lg" className="rounded-2xl px-12 py-8 text-xl font-black text-primary shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "سجل كتاجر الآن" : "Register as Merchant"}
                            <ArrowRight className={`ml-3 h-6 w-6 ${language === "ar" ? "rotate-180" : ""}`} />
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function BenefitCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-black/5 text-center space-y-6 hover:-translate-y-3 transition-transform duration-500">
            <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto text-3xl shadow-inner">
                {icon}
            </div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 group">
            <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={24} />
            <span className="text-lg font-bold text-slate-700">{text}</span>
        </div>
    );
}

function StatBox({ icon, num, label, color }: { icon: any, num: string, label: string, color: string }) {
    return (
        <div className={`${color} p-8 rounded-[2.5rem] text-center space-y-2 border-2 border-white shadow-xl shadow-slate-200/20`}>
            <div className="text-primary flex justify-center mb-2">{icon}</div>
            <div className="text-3xl font-black text-primary tracking-tighter">{num}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
        </div>
    );
}
