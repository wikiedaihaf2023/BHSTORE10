"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Newspaper,
    Download,
    Calendar,
    ArrowRight,
    MessageCircle,
    Mic2,
    CheckCircle2,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressPage() {
    const { language } = useLanguage();

    const releases = [
        { date: "10 Jan 2026", title: language === "ar" ? "متجر بي إتش يطلق تطبيق الجوال الجديد كلياً" : "BH Store launches all-new mobile application", tag: language === "ar" ? "أخبار الشركة" : "Company News" },
        { date: "05 Jan 2026", title: language === "ar" ? "شراكة استراتيجية مع كبار الموردين العالميين" : "Strategic partnership with major global suppliers", tag: language === "ar" ? "شراكات" : "Partnerships" },
        { date: "28 Dec 2025", title: language === "ar" ? "تحقيق رقم قياسي في مبيعات نهاية العام" : "Record-breaking year-end sales achieved", tag: language === "ar" ? "أرباح" : "Earnings" },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-[#1e293b] py-24 md:py-32 text-white relative overflow-hidden">
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-white/10">
                            <Newspaper size={12} /> {language === "ar" ? "مركز الأخبار" : "NEWS CENTER"}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
                            {language === "ar" ? "علاقاتنا الإعلامية وأحدث أخبارنا" : "Our Media Relations & Latest News"}
                        </h1>
                        <p className="text-xl font-bold text-slate-400 max-w-2xl mx-auto">
                            {language === "ar" ? "كن أول من يعرف عن ابتكاراتنا وتوسعاتنا في سوق التجارة الإلكترونية." : "Be the first to know about our innovations and expansions in the e-commerce market."}
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-8 -mt-16 mb-32 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Media Assets Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-black/5 space-y-10">
                                <h3 className="text-2xl font-black border-b pb-6">{language === "ar" ? "المواد الإعلامية" : "Media Assets"}</h3>
                                <AssetItem icon={<ImageIcon className="text-blue-500" />} label={language === "ar" ? "مجموعة الشعارات" : "Logo Package"} size="45 MB" />
                                <AssetItem icon={<FileText className="text-emerald-500" />} label={language === "ar" ? "البروفايل التعريفي" : "Company Profile"} size="12 MB" />
                                <AssetItem icon={<Mic2 className="text-orange-500" />} label={language === "ar" ? "صور المؤسسين" : "Founders Photos"} size="120 MB" />
                                <Button className="w-full rounded-2xl font-black py-7 shadow-xl shadow-primary/10 flex items-center justify-center gap-3">
                                    <Download size={20} /> {language === "ar" ? "تحميل الكل" : "Download All"}
                                </Button>
                            </div>

                            <div className="bg-primary p-10 rounded-[3rem] text-white space-y-6">
                                <MessageCircle size={40} className="text-accent" />
                                <h4 className="text-xl font-black">{language === "ar" ? "للاستفسارات الإعلامية" : "Media Inquiries"}</h4>
                                <p className="text-sm font-bold opacity-60 leading-relaxed">
                                    {language === "ar" ? "يرجى التواصل مع فريق العلاقات العامة لاي طلبات خاصة أو مقابلات." : "Please contact our PR team for any special requests or interviews."}
                                </p>
                                <span className="block font-black text-accent text-lg">press@bhstore.com</span>
                            </div>
                        </div>

                        {/* Recent News List */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200 border border-black/5">
                                <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
                                    <div className="h-10 w-2 bg-accent rounded-full" />
                                    {language === "ar" ? "آخر البيانات الصحفية" : "Latest Press Releases"}
                                </h2>
                                <div className="space-y-10">
                                    {releases.map((item, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-slate-50 last:border-none last:pb-0">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[10px] font-black text-white bg-primary px-3 py-1 rounded-full">{item.tag}</span>
                                                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-slate-800 group-hover:text-primary transition-colors">{item.title}</h3>
                                                </div>
                                                <Button variant="ghost" className="rounded-xl px-4 py-8 group-hover:bg-slate-50">
                                                    <ArrowRight className={language === "ar" ? "rotate-180" : ""} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
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

function AssetItem({ icon, label, size }: { icon: any, label: string, size: string }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-4 -m-4 rounded-2xl transition-colors">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:bg-white">
                    {icon}
                </div>
                <div>
                    <p className="font-black text-slate-800 text-sm">{label}</p>
                    <p className="text-[10px] font-bold text-slate-400">{size}</p>
                </div>
            </div>
            <Download size={16} className="text-slate-300 group-hover:text-primary" />
        </div>
    );
}
