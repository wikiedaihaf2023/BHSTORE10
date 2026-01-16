"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    RefreshCcw,
    ShieldCheck,
    Truck,
    Clock,
    AlertCircle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReturnsPage() {
    const { language, t } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <RefreshCcw size={800} className="translate-x-1/2 -translate-y-1/2 animate-spin-slow rotate-12" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/10 uppercase tracking-[0.3em]">
                            <RefreshCcw className="h-5 w-5 text-orange-400" />
                            {language === "ar" ? "سياسة الإرجاع والضمان" : "REPORTS & WARRANTY POLICY"}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-tight">
                            {language === "ar" ? "تسوق بكل ثقة. نحن نضمن حقك في الإرجاع." : "Shop with confidence. We guarantee your right to return."}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "نحن في متجر بي إتش نؤمن بتقديم تجربة خالية من المتاعب، لذا بسطنا إجراءات الإرجاع لنريح بالك."
                                : "At BH Store, we believe in providing a hassle-free experience, so we've simplified our return procedures for your peace of mind."}
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="container mx-auto px-8 -mt-20 mb-32 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sidebar: Summary */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-black/5 ring-1 ring-black/5">
                                <h3 className="text-2xl font-black mb-8 border-b border-slate-50 pb-6">{language === "ar" ? "نقاط هامة" : "Key Points"}</h3>
                                <div className="space-y-8">
                                    <PolicyPoint
                                        icon={<Clock className="text-blue-500" />}
                                        title={language === "ar" ? "14 يوماً للاسترجاع" : "14 Days Return"}
                                        desc={language === "ar" ? "بشرط أن يكون المنتج بحالته الأصلية." : "Provided the product is in its original condition."}
                                    />
                                    <PolicyPoint
                                        icon={<RefreshCcw className="text-orange-500" />}
                                        title={language === "ar" ? "استبدال فوري" : "Instant Exchange"}
                                        desc={language === "ar" ? "في حال وجود خلل مصنعي." : "In case of a manufacturing defect."}
                                    />
                                    <PolicyPoint
                                        icon={<ShieldCheck className="text-emerald-500" />}
                                        title={language === "ar" ? "ضمان ممتد" : "Extended Warranty"}
                                        desc={language === "ar" ? "على معظم الإلكترونيات المختارة." : "On most selected electronics."}
                                    />
                                </div>
                            </div>

                            <div className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100 space-y-6">
                                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                                    <AlertCircle size={32} />
                                </div>
                                <h4 className="text-xl font-black text-orange-900">{language === "ar" ? "ملاحظة هامة" : "Important Note"}</h4>
                                <p className="text-orange-800/60 font-bold text-sm leading-relaxed">
                                    {language === "ar"
                                        ? "لا تفتح علبة المنتج إذا كنت تنوي إرجاعه لغير أسباب العطل المصنعي."
                                        : "Do not open the product packaging if you intend to return it for reasons other than a manufacturing defect."}
                                </p>
                            </div>
                        </div>

                        {/* Main detailed policy */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-slate-200 border border-black/5">
                                <section className="space-y-8 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                        <div className="h-10 w-2 bg-accent rounded-full" />
                                        {language === "ar" ? "شروط قبول الإرجاع" : "Conditions for Acceptance"}
                                    </h2>
                                    <div className="space-y-6">
                                        <ConditionItem
                                            icon={<CheckCircle2 className="text-emerald-500" />}
                                            text={language === "ar" ? "أن يكون المنتج مغلفاً في عبوته الأصلية." : "The product must be sealed in its original packaging."}
                                        />
                                        <ConditionItem
                                            icon={<CheckCircle2 className="text-emerald-500" />}
                                            text={language === "ar" ? "أن تكون جميع الملحقات (كابلات، كتيبات) موجودة." : "All accessories (cables, manuals) must be present."}
                                        />
                                        <ConditionItem
                                            icon={<CheckCircle2 className="text-emerald-500" />}
                                            text={language === "ar" ? "وجود الفاتورة الأصلية أو رقم الطلب الإلكتروني." : "Presence of the original invoice or electronic order number."}
                                        />
                                    </div>
                                </section>

                                <section className="space-y-8 mb-16">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                        <div className="h-10 w-2 bg-red-500 rounded-full" />
                                        {language === "ar" ? "منتجات لا يمكن إرجاعها" : "Non-Returnable Items"}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <XCard text={language === "ar" ? "منتجات العناية الشخصية المفتوحة" : "Opened personal care products"} />
                                        <XCard text={language === "ar" ? "الملابس الداخلية" : "Innerwear / Underwear"} />
                                        <XCard text={language === "ar" ? "البرمجيات والبطاقات الرقمية" : "Software & Digital Cards"} />
                                        <XCard text={language === "ar" ? "المنتجات المستعملة أو المعطوبة بسبب العميل" : "Used or customer-damaged items"} />
                                    </div>
                                </section>

                                <section className="space-y-8">
                                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                        <div className="h-10 w-2 bg-blue-500 rounded-full" />
                                        {language === "ar" ? "خطوات الإرجاع السهلة" : "Easy Return Steps"}
                                    </h2>
                                    <div className="space-y-8 ml-4">
                                        <StepItem num="1" title={language === "ar" ? "طلب الإرجاع" : "Request Return"} desc={language === "ar" ? "عبر الموقع من حسابك الشخصي أو التواصل مع الدعم." : "Via the website through your account or by contacting support."} />
                                        <StepItem num="2" title={language === "ar" ? "تأكيد الطلب" : "Approval"} desc={language === "ar" ? "سيقوم فريقنا بمراجعة طلبك وتزويدك بـ 'بوليصة الشحن' مجانية." : "Our team will review your request and provide a free 'Shipping Label'."} />
                                        <StepItem num="3" title={language === "ar" ? "التسليم والاستلام" : "Drop-off"} desc={language === "ar" ? "سلم المنتج لشركة الشحن، وبمجرد وصوله وفحصه، سنعيد لك أموالك." : "Drop off the item at the shipping company; once inspected, we'll issue a refund."} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <section className="container mx-auto px-8 pb-32">
                    <div className="bg-primary rounded-[4rem] p-16 text-center text-white space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <HelpCircle size={600} className="translate-x-1/4 -translate-y-1/4" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter">
                            {language === "ar" ? "لديك المزيد من الاستفسارات؟" : "Have more questions?"}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button size="lg" className="rounded-3xl px-12 py-8 text-xl font-black bg-accent text-primary transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20" onClick={() => window.location.href = '/help'}>
                                {language === "ar" ? "اذهب لمركز المساعدة" : "Go to Help Center"}
                                <ArrowRight className={`ml-3 h-6 w-6 ${language === "ar" ? "rotate-180" : ""}`} />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function PolicyPoint({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="h-12 w-12 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center shadow-inner">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-slate-900 mb-1">{title}</h4>
                <p className="text-sm font-bold text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function ConditionItem({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-50 transition-all hover:bg-white hover:shadow-lg">
            {icon}
            <span className="text-lg font-bold text-slate-700">{text}</span>
        </div>
    );
}

function XCard({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 p-8 bg-red-50/20 border-2 border-dashed border-red-50 rounded-3xl group hover:bg-red-50/40 transition-all">
            <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <XCircle size={18} />
            </div>
            <span className="text-sm font-black text-red-900/60 leading-tight">{text}</span>
        </div>
    );
}

function StepItem({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <div className="flex gap-8 group">
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-primary/20 transform group-hover:rotate-12 transition-transform">
                {num}
            </div>
            <div className="flex-1 border-b border-slate-50 pb-8 group-last:border-none">
                <h4 className="text-xl font-black text-slate-900 mb-2">{title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
