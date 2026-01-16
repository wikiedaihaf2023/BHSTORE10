"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Info,
    ShieldCheck,
    Eye,
    Target,
    Lock,
    Settings,
    ArrowRight,
    CircleHelp
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdsPage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Header section */}
                <section className="bg-[#131921] py-24 text-white relative overflow-hidden">
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/20">
                            <Info size={12} /> {language === "ar" ? "إعلانات تهمك" : "ADS THAT INTEREST YOU"}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            {language === "ar" ? "حول الإعلانات القائمة على الاهتمامات" : "About Interest-Based Ads"}
                        </h1>
                        <p className="text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "نحن نهدف لعرض المنتجات التي تهمك فعلاً وتجعل تسوقك أسهل وأسرع. إليك كيف يعمل ذلك."
                                : "We aim to show products that actually matter to you and make your shopping faster. Here is how it works."}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-16 mb-32 relative z-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-black/5 p-12 md:p-20 space-y-20">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <FeatureCard
                                icon={<Eye className="text-blue-500" />}
                                title={language === "ar" ? "ماذا نرى؟" : "What do we see?"}
                                desc={language === "ar" ? "نستخدم معلومات مثل تصفحك للمنتجات وعمليات الشراء السابقة لعرض توصيات مخصصة لك." : "We use info like product browsing and past purchases to show personalized recommendations."}
                            />
                            <FeatureCard
                                icon={<ShieldCheck className="text-emerald-500" />}
                                title={language === "ar" ? "حماية خصوصيتك" : "Protecting Privacy"}
                                desc={language === "ar" ? "نحن لا نشارك اسمك أو بريدك الإلكتروني مع المعلنين الخارجيين." : "We don't share your name or email with third-party advertisers."}
                            />
                        </div>

                        <div className="space-y-10">
                            <h2 className="text-3xl font-black text-slate-900 border-b-4 border-accent inline-block pb-4">{language === "ar" ? "كيف تتحكم في إعلاناتك؟" : "How to control your ads?"}</h2>
                            <div className="space-y-8">
                                <ControlStep
                                    icon={<Settings />}
                                    title={language === "ar" ? "إعدادات الإعلانات" : "Ad Preferences"}
                                    desc={language === "ar" ? "يمكنك تعديل اهتماماتك أو إلغاء تفعيل الإعلانات المخصصة من صفحة إعدادات الحساب." : "You can adjust interests or opt-out of personalized ads in your account settings."}
                                />
                                <ControlStep
                                    icon={<CircleHelp />}
                                    title={language === "ar" ? "إلغاء الاشتراك" : "Opt-Out Option"}
                                    desc={language === "ar" ? "إذا اخترت عدم رؤية هذه الإعلانات، فستظل ترى إعلانات ولكنها قد لا تكون مرتبطة باهتماماتك." : "If you opt-out, you'll still see ads, but they won't be linked to your interests."}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform rotate-12">
                                <Target size={200} />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-black">{language === "ar" ? "التزامنا تجاهك" : "Our Commitment"}</h3>
                                <p className="text-slate-400 font-bold leading-relaxed">
                                    {language === "ar"
                                        ? "نحن نلتزم بالشفافية الكاملة وتوفير كافة الخيارات لك للتحكم في كيفية استخدام بياناتك لعرض الإعلانات."
                                        : "We commit to full transparency and providing all options for you to control how your data is used for advertising."}
                                </p>
                                <Button className="rounded-2xl bg-accent text-primary font-black py-7 px-10 hover:scale-105 active:scale-95 transition-all">
                                    {language === "ar" ? "الذهاب للإعدادات" : "Go to Settings"}
                                    <ArrowRight className={`ml-3 ${language === "ar" ? "rotate-180" : ""}`} size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="space-y-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function ControlStep({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex gap-8 group">
            <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                {icon}
            </div>
            <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900">{title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
