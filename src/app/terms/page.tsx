"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    FileText,
    CheckSquare,
    AlertCircle,
    Clock,
    Globe,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

export default function TermsPage() {
    const { language } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Header section */}
                <section className="bg-primary py-24 text-white relative overflow-hidden">
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/20">
                            <FileText size={12} /> {language === "ar" ? "اتفاقية الاستخدام" : "USAGE AGREEMENT"}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            {language === "ar" ? "شروط الاستخدام" : "Terms of Service"}
                        </h1>
                        <p className="text-slate-400 font-bold max-w-2xl mx-auto">
                            {language === "ar" ? "آخر تحديث: 16 يناير 2026" : "Last Updated: 16 Jan 2026"}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-16 mb-32 relative z-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-black/5 p-12 md:p-20 space-y-16">

                        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex items-start gap-6">
                            <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" />
                            <p className="text-sm font-bold text-blue-900/60 leading-relaxed">
                                {language === "ar"
                                    ? "باستخدامك لموقع متجر بي إتش، فإنك توافق على الالتزام بالشروط والأحكام الموضحة في هذه الصفحة. يرجى قراءتها بعناية قبل الشراء."
                                    : "By using BH Store, you agree to comply with the terms and conditions outlined on this page. Please read them carefully before purchasing."}
                            </p>
                        </div>

                        <TermSection
                            title={language === "ar" ? "1. شروط الحساب" : "1. Account Terms"}
                            points={[
                                language === "ar" ? "يجب أن تكون بعمر 18 عاماً على الأقل لإنشاء حساب." : "You must be at least 18 years old to create an account.",
                                language === "ar" ? "أنت مسؤول عن الحفاظ على سرية كلمة مرورك." : "You are responsible for maintaining your password confidentiality.",
                                language === "ar" ? "يمنع استخدام الموقع لأي غرض غير قانوني." : "Using the site for any illegal purpose is prohibited."
                            ]}
                        />

                        <TermSection
                            title={language === "ar" ? "2. الأسعار والطلبات" : "2. Pricing & Orders"}
                            points={[
                                language === "ar" ? "نحتفظ بالحق في تعديل الأسعار في أي وقت." : "We reserve the right to modify prices at any time.",
                                language === "ar" ? "جميع الأسعار تشمل ضريبة القيمة المضافة ما لم يذكر غير ذلك." : "All prices include VAT unless otherwise stated.",
                                language === "ar" ? "يحق للمتجر إلغاء الطلب في حال خطأ في التسعير." : "The store may cancel an order in case of a pricing error."
                            ]}
                        />

                        <TermSection
                            title={language === "ar" ? "3. الشحن والتوصيل" : "3. Shipping & Delivery"}
                            points={[
                                language === "ar" ? "تعتبر عناوين التوصيل مسؤولية العميل." : "Delivery addresses are the customer's responsibility.",
                                language === "ar" ? "مواعيد التوصيل تقديرية وقد تختلف لظروف خارجة." : "Delivery dates are estimated and may vary due to external factors.",
                                language === "ar" ? "يتم فرض رسوم شحن إضافية لبعض المناطق البعيدة." : "Additional shipping fees apply to some remote areas."
                            ]}
                        />

                        <TermSection
                            title={language === "ar" ? "4. ملكية المحتوى" : "4. Content Ownership"}
                            points={[
                                language === "ar" ? "جميع الصور والشعارات في الموقع ملكية خاصة لمتجر بي إتش." : "All images and logos on the site are BH Store's property.",
                                language === "ar" ? "يمنع نسخ أو إعادة استخدام المحتوى دون إذن كتابي." : "Copying or reusing content without written permission is prohibited."
                            ]}
                        />

                        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="text-emerald-500" />
                                <span className="font-black text-slate-900">{language === "ar" ? "اتفاقية آمنة وموثوقة" : "Secure & Trusted Agreement"}</span>
                            </div>
                            <button className="text-primary font-black hover:underline flex items-center gap-2">
                                {language === "ar" ? "تواصل معنا للاستفسار" : "Contact us for questions"}
                                <ArrowRight className={language === "ar" ? "rotate-180" : ""} size={16} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function TermSection({ title, points }: { title: string, points: string[] }) {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900">{title}</h2>
            <div className="space-y-4">
                {points.map((p, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckSquare size={14} className="text-slate-400" />
                        </div>
                        <p className="text-lg font-bold text-slate-500 leading-relaxed">{p}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
