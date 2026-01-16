"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Users,
    TrendingUp,
    DollarSign,
    Gift,
    Target,
    Share2,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AffiliatePage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-gradient-to-tr from-[#1E293B] to-[#334155] py-24 md:py-40 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                        <Share2 size={800} className="translate-x-1/3 -translate-y-1/3" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-10">
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/10 uppercase tracking-[0.3em] text-accent">
                            <DollarSign className="h-5 w-5" />
                            {language === "ar" ? "برنامج التسويق بالعمولة" : "AFFILIATE PROGRAM"}
                        </div>
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                            {language === "ar" ? "حول شغفك بالتواصل إلى أرباح حقيقية" : "Turn your passion into real profit"}
                        </h1>
                        <p className="text-lg md:text-2xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "انضم لبرنامجنا وشارك منتجات متجر بي إتش مع جمهورك واحصل على عمولات مجزية عن كل عملية شراء ناجحة."
                                : "Join our program, share BH Store products with your audience, and earn rewarding commissions on every successful purchase."}
                        </p>
                        <Button variant="accent" size="lg" className="rounded-3xl px-12 py-8 text-xl font-black text-primary shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                            {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
                        </Button>
                    </div>
                </section>

                {/* Benefits section */}
                <section className="container mx-auto px-8 -mt-16 mb-24 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard icon={<TrendingUp className="text-emerald-400" />} title={language === "ar" ? "عمولات مرتفعة" : "High Commission"} val="UP TO 15%" />
                        <StatCard icon={<Users className="text-blue-400" />} title={language === "ar" ? "مدة الكوكي" : "Cookie Duration"} val="30 DAYS" />
                        <StatCard icon={<Target className="text-orange-400" />} title={language === "ar" ? "دعم تسويقي" : "Marketing Support"} val="LIVE" />
                        <StatCard icon={<BarChart3 className="text-indigo-400" />} title={language === "ar" ? "تتبع فوري" : "Live Tracking"} val="24/7" />
                    </div>
                </section>

                {/* How it works */}
                <section className="container mx-auto px-8 mb-32">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{language === "ar" ? "كيف يعمل البرنامج؟" : "How it works?"}</h2>
                        <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <StepBox num="1" title={language === "ar" ? "سجل مجاناً" : "Sign Up Free"} desc={language === "ar" ? "قم بتقديم طلبك وسنقوم بمراجعته خلال 24 ساعة." : "Submit your application and we'll review it within 24 hours."} />
                        <StepBox num="2" title={language === "ar" ? "روّج للمنتجات" : "Promote Items"} desc={language === "ar" ? "استخدم أدواتنا لإنشاء روابط مخصصة ومشاركتها." : "Use our tools to create custom links and share them."} />
                        <StepBox num="3" title={language === "ar" ? "احصد الأرباح" : "Earn Rewards"} desc={language === "ar" ? "سحب أرباحك يتم شهرياً بطرق دفع متعددة." : "Withdraw your earnings monthly via multiple pay methods."} />
                    </div>
                </section>

                {/* Tools Section */}
                <section className="bg-white py-24 mb-32 border-y border-slate-50 relative overflow-hidden">
                    <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h2 className="text-4xl font-black text-slate-900 leading-tight">
                                {language === "ar" ? "كل الأدوات التي تحتاجها للنجاح" : "All tools you need to succeed"}
                            </h2>
                            <div className="space-y-6">
                                <FeatureItem text={language === "ar" ? "لوحة تحكم شاملة لمتابعة الأرباح والضغطات." : "Comprehensive dashboard to track earnings and clicks."} />
                                <FeatureItem text={language === "ar" ? "تصاميم وبانرات إعلانية جاهزة للاستخدام." : "Ready-to-use creative assets and banners."} />
                                <FeatureItem text={language === "ar" ? "روابط تتبع ذكية تدعم كافة الأجهزة." : "Smart tracking links supporting all devices."} />
                                <FeatureItem text={language === "ar" ? "دعم فني خاص للمسوقين بمتجرنا." : "Dedicated technical support for our affiliates."} />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white space-y-8 relative z-10">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    <Palette className="text-accent" /> {language === "ar" ? "مواد تسويقية" : "Marketing Assets"}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 italic">Banner 728x90</div>
                                    <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 italic">Square 300x300</div>
                                    <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 italic">Story 1080x1920</div>
                                    <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 italic">Email Template</div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function StatCard({ icon, title, val }: { icon: any, title: string, val: string }) {
    return (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-black/5 text-center space-y-3 hover:-translate-y-2 transition-transform duration-500">
            <div className="flex justify-center mb-4">{icon}</div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
            <p className="text-3xl font-black text-slate-900">{val}</p>
        </div>
    );
}

function StepBox({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <div className="text-center space-y-6 group">
            <div className="h-20 w-20 rounded-[2rem] bg-primary text-white flex items-center justify-center mx-auto text-3xl font-black shadow-xl shadow-primary/20 transform group-hover:rotate-12 transition-transform">
                {num}
            </div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 group">
            <CheckCircle2 className="text-emerald-500 flex-shrink-0 group-hover:scale-125 transition-transform" size={24} />
            <span className="text-lg font-bold text-slate-700">{text}</span>
        </div>
    );
}
