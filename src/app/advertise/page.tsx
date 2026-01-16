"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Megaphone,
    BarChart3,
    Target,
    Zap,
    Users,
    Smartphone,
    Globe,
    ArrowRight,
    CheckCircle2,
    Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdvertisePage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-indigo-900 py-24 md:py-48 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent" />
                    <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-10 pointer-events-none">
                        <Megaphone size={800} className="translate-x-1/4 translate-y-1/4 -rotate-12" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-10">
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/10 uppercase tracking-[0.3em] text-accent">
                            <Target className="h-5 w-5" />
                            {language === "ar" ? "أعلن عن منتجاتك" : "ADVERTISE YOUR PRODUCTS"}
                        </div>
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                            {language === "ar" ? "ضع علامتك التجارية في الصدارة" : "Put your brand in the lead"}
                        </h1>
                        <p className="text-lg md:text-2xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "استهدف العملاء المناسبين في اللحظة المناسبة تماماً. حلول إعلانية ذكية لزيادة مبيعاتك بشكل انفجاري."
                                : "Target the right customers at exactly the right moment. Smart advertising solutions to explosively increase your sales."}
                        </p>
                        <Button variant="accent" size="lg" className="rounded-3xl px-12 py-8 text-xl font-black text-primary shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "ابدأ حملتك الآن" : "Start Your Campaign"}
                        </Button>
                    </div>
                </section>

                {/* Ad Formats */}
                <section className="container mx-auto px-8 -mt-24 mb-32 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FormatCard
                            icon={<Smartphone className="text-blue-400" />}
                            title={language === "ar" ? "إعلانات الجوال" : "Mobile Ads"}
                            desc={language === "ar" ? "تظهر إعلاناتك لمستخدمي التطبيق في الصفحات الرئيسية وصفحات البحث." : "Your ads appear to app users on home and search pages."}
                        />
                        <FormatCard
                            icon={<Zap className="text-yellow-400" />}
                            title={language === "ar" ? "منتجات مميزة" : "Featured Products"}
                            desc={language === "ar" ? "ارفع ترتيب منتجاتك لتظهر في النتائج الأولى دائماً." : "Boost your product ranking to always appear in top results."}
                        />
                        <FormatCard
                            icon={<Globe className="text-emerald-400" />}
                            title={language === "ar" ? "إعلانات البانر" : "Banner Placements"}
                            desc={language === "ar" ? "مساحات إعلانية جذابة في تصنيفات الموقع المختلفة." : "Attractive ad spaces across different site categories."}
                        />
                    </div>
                </section>

                {/* Audience Insight */}
                <section className="container mx-auto px-8 mb-32">
                    <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center p-12 md:p-24">
                            <div className="space-y-12">
                                <h2 className="text-4xl font-black text-slate-900">{language === "ar" ? "استهدف من يهمك فعلاً" : "Target who really matters"}</h2>
                                <div className="space-y-6">
                                    <TargetDetail title={language === "ar" ? "الاستهداف السلوكي" : "Behavioral Targeting"} desc={language === "ar" ? "بناءً على اهتمامات الشراء السابقة." : "Based on past purchase interests."} />
                                    <TargetDetail title={language === "ar" ? "الاستهداف الجغرافي" : "Geographic Targeting"} desc={language === "ar" ? "حسب المدينة أو المنطقة في المملكة." : "By city or region within the Kingdom."} />
                                    <TargetDetail title={language === "ar" ? "الاستهداف حسب الفئة" : "Category Targeting"} desc={language === "ar" ? "ضمن التصنيفات التي تناسب منتجاتك." : "Within categories that match your products."} />
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 relative group border-4 border-white shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black">{language === "ar" ? "إحصائيات المنصة" : "Platform Stats"}</h3>
                                    <BarChart3 className="text-accent animate-pulse" />
                                </div>
                                <div className="space-y-8">
                                    <StatRow label={language === "ar" ? "مرات الظهور الشهري" : "Monthly Impressions"} val="450M+" />
                                    <StatRow label={language === "ar" ? "معدل النقر (CTR)" : "Average CTR"} val="2.4%" />
                                    <StatRow label={language === "ar" ? "زوار نشطون" : "Active Users"} val="8M+" />
                                </div>
                                <div className="absolute -top-6 -right-6 h-20 w-20 bg-accent rounded-2xl flex items-center justify-center text-primary transform rotate-12 shadow-xl">
                                    <Eye size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-8 pb-32 text-center">
                    <div className="bg-primary p-20 rounded-[4rem] text-white space-y-10 relative overflow-hidden group">
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter">
                            {language === "ar" ? "هل أنت مستعد لمضاعفة مبيعاتك؟" : "Ready to multiply your sales?"}
                        </h2>
                        <Button variant="accent" size="lg" className="rounded-2xl px-12 py-8 text-xl font-black text-primary shadow-2xl hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "تواصل مع فريق الإعلانات" : "Talk to Ad Team"}
                            <ArrowRight className={`ml-3 h-6 w-6 ${language === "ar" ? "rotate-180" : ""}`} />
                        </Button>
                        <p className="text-sm font-bold opacity-40">ads@bhstore.com</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FormatCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-black/5 text-center space-y-6 hover:-translate-y-3 transition-transform duration-500">
            <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto shadow-inner text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function TargetDetail({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 size={14} className="text-emerald-600" />
            </div>
            <div>
                <h4 className="font-black text-slate-800">{title}</h4>
                <p className="text-sm font-bold text-slate-400">{desc}</p>
            </div>
        </div>
    );
}

function StatRow({ label, val }: { label: string, val: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-none">
            <span className="text-slate-400 font-bold">{label}</span>
            <span className="text-2xl font-black text-accent">{val}</span>
        </div>
    );
}
