"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    ShieldCheck,
    Lock,
    Eye,
    FileText,
    Clock,
    UserCheck,
    ArrowRight,
    Search
} from "lucide-react";

export default function PrivacyPage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Header section */}
                <section className="bg-primary py-24 text-white relative overflow-hidden">
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/20">
                            <ShieldCheck size={12} /> {language === "ar" ? "بياناتك في أمان" : "YOUR DATA IS SECURE"}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                        </h1>
                        <p className="text-slate-400 font-bold max-w-2xl mx-auto">
                            {language === "ar" ? "آخر تحديث: 16 يناير 2026" : "Last Updated: 16 Jan 2026"}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-16 mb-32 relative z-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-black/5 p-12 md:p-20 space-y-16">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-slate-50">
                            <QuickInfo icon={<Lock className="text-primary" />} title={language === "ar" ? "تشفير كامل" : "Full Encryption"} />
                            <QuickInfo icon={<Eye className="text-primary" />} title={language === "ar" ? "شفافية مطلقة" : "Full Transparency"} />
                            <QuickInfo icon={<UserCheck className="text-primary" />} title={language === "ar" ? "تحكم بالبيانات" : "Data Control"} />
                        </div>

                        <Section
                            title={language === "ar" ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
                            content={language === "ar"
                                ? "نقوم بجمع المعلومات الضرورية فقط لتوفير تجربة تسوق سلسة لك، مثل الاسم، العنوان، البريد الإلكتروني، وتاريخ الطلبات. نحن لا نقوم بتخزين تفاصيل بطاقات الائتمان على سيرفراتنا."
                                : "We collect only necessary information to provide you with a smooth shopping experience, such as name, address, email, and order history. We do not store credit card details on our servers."}
                        />

                        <Section
                            title={language === "ar" ? "2. كيف نستخدم معلوماتك" : "2. How We Use Your Info"}
                            content={language === "ar"
                                ? "تستخدم معلوماتك لمعالجة الطلبات، تحسين التوصيل، وتخصيص العروض التي تهمك. يمكنك دائماً إلغاء الاشتراك في الرسائل الترويجية."
                                : "Your info is used to process orders, improve delivery, and personalize offers. You can always opt-out of promotional messages."}
                        />

                        <Section
                            title={language === "ar" ? "3. حماية البيانات" : "3. Data Protection"}
                            content={language === "ar"
                                ? "نستخدم أحدث تقنيات التشفير العالمي (SSL) لضمان أمان بياناتك أثناء انتقالها عبر الإنترنت. جميع العمليات مشفرة بالكامل."
                                : "We use the latest global encryption technologies (SSL) to ensure your data is secure while traveling across the internet. All operations are fully encrypted."}
                        />

                        <Section
                            title={language === "ar" ? "4. الكوكيز (Cookies)" : "4. Cookies Policy"}
                            content={language === "ar"
                                ? "نستخدم الكوكيز لتحسين أداء الموقع وتذكر سلة تسوقك. يمكنك تعطيلها من إعدادات المتصفح ولكن قد يؤثر ذلك على بعض الميزات."
                                : "We use cookies to improve site performance and remember your cart. You can disable them from browser settings, though it may affect some features."}
                        />

                        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h4 className="text-xl font-black text-slate-900">{language === "ar" ? "لديك أسئلة حول الخصوصية؟" : "Questions about privacy?"}</h4>
                                <p className="text-sm font-bold text-slate-400">privacy@bhstore.com</p>
                            </div>
                            <button className="bg-primary text-white font-black px-10 py-5 rounded-2xl hover:bg-slate-900 transition-all flex items-center gap-3">
                                {language === "ar" ? "اطلع على الشروط" : "View Terms"}
                                <ArrowRight className={language === "ar" ? "rotate-180" : ""} size={18} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function Section({ title, content }: { title: string, content: string }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900">{title}</h2>
            <p className="text-lg font-bold text-slate-500 leading-relaxed">{content}</p>
        </div>
    );
}

function QuickInfo({ icon, title }: { icon: any, title: string }) {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner">
                {icon}
            </div>
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</span>
        </div>
    );
}
