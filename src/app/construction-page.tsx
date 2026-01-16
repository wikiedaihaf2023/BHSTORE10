"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Construction,
    ChevronLeft,
    Home,
    Wrench,
    Clock,
    ArrowRight,
    Headset,
    ShieldInfo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function GenericInfoPage() {
    const { language } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();

    // Mapping path names to title for better UX
    const getPageTitle = () => {
        const segment = pathname.split('/').pop() || "";
        const titles: Record<string, { ar: string, en: string }> = {
            'careers': { ar: 'الوظائف', en: 'Careers' },
            'press': { ar: 'علاقاتنا', en: 'Press Relations' },
            'sell': { ar: 'البيع على متجرنا', en: 'Sell on BH Store' },
            'affiliate': { ar: 'التسويق بالعمولة', en: 'Affiliate Program' },
            'advertise': { ar: 'الإعلان عن منتجاتك', en: 'Advertise Your Products' },
            'payment': { ar: 'طرق الدفع والخدمات', en: 'Payment Methods' },
            'conversion': { ar: 'محول العملات', en: 'Currency Conversion' },
            'shipping': { ar: 'تتبع الشحنات', en: 'Order Tracking' },
            'returns': { ar: 'سياسة الاسترجاع', en: 'Returns Policy' },
            'help': { ar: 'مركز المساعدة', en: 'Help Center' },
            'privacy': { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
            'terms': { ar: 'شروط الاستخدام', en: 'Terms of Service' },
            'ads': { ar: 'إعلانات مخصصة', en: 'Interest-Based Ads' },
        };
        return titles[segment] || { ar: 'صفحة تحت الإنشاء', en: 'Page Under Construction' };
    };

    const title = getPageTitle();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-4xl w-full bg-white rounded-[4rem] shadow-2xl shadow-slate-200 border border-black/5 p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="h-32 w-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-primary transform rotate-12 hover:rotate-0 transition-transform duration-500 shadow-inner">
                            <Wrench size={64} className="animate-bounce" />
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 ring-1 ring-inset ring-blue-500/20">
                                <Clock size={12} /> {language === "ar" ? "قريباً جداً" : "COMING SOON"}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                                {language === "ar" ? title.ar : title.en}
                            </h1>
                            <p className="text-lg md:text-xl font-bold text-slate-500 max-w-xl mx-auto leading-relaxed">
                                {language === "ar"
                                    ? "نحن ننتقل بمتجرنا إلى آفاق جديدة! هذه الصفحة حالياً تحت الصيانة والتحسين لتوفير أفضل تجربة لكم."
                                    : "We are taking our store to new heights! This page is currently under maintenance and improvement to provide the best experience for you."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
                            <Button
                                variant="primary"
                                size="lg"
                                className="rounded-2xl font-black py-8 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                onClick={() => router.push("/")}
                            >
                                <Home size={20} /> {language === "ar" ? "العودة للرئيسية" : "Home Page"}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-2xl font-black py-8 border-2 flex items-center justify-center gap-3"
                                onClick={() => router.push("/products")}
                            >
                                <ArrowRight className={language === "ar" ? "rotate-180" : ""} size={20} />
                                {language === "ar" ? "متابعة التسوق" : "Back to Shop"}
                            </Button>
                        </div>

                        <div className="pt-12 border-t border-slate-50 w-full">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400 font-bold">
                                <div className="flex items-center gap-2">
                                    <Headset size={18} /> {language === "ar" ? "الدعم متوفر 24/7" : "24/7 Support"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldInfo size={18} /> {language === "ar" ? "بياناتك محمية" : "Cloud Secure"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ShieldInfo({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
        </svg>
    );
}
