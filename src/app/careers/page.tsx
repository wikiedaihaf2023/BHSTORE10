"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Briefcase,
    Globe,
    Users,
    Sparkles,
    Star,
    Coffee,
    Zap,
    ArrowRight,
    MapPin,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
    const { language } = useLanguage();

    const jobs = [
        { title: language === "ar" ? "مدير تسويق رقمي" : "Digital Marketing Manager", type: language === "ar" ? "دوام كامل" : "Full-time", location: language === "ar" ? "الرياض" : "Riyadh" },
        { title: language === "ar" ? "مطور واجهات أمامية" : "Frontend Developer", type: language === "ar" ? "عن بعد" : "Remote", location: language === "ar" ? "المملكة العربية السعودية" : "KSA" },
        { title: language === "ar" ? "أخصائي خدمة عملاء" : "Customer Support Specialist", type: language === "ar" ? "دوام كامل" : "Full-time", location: language === "ar" ? "جدة" : "Jeddah" },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-primary py-32 md:py-48 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-indigo-900 opacity-50" />
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
                        <Briefcase size={600} className="translate-x-1/4 -translate-y-1/4 rotate-12" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-10">
                        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/10 uppercase tracking-[0.3em] text-accent">
                            <Star className="h-5 w-5 fill-current" />
                            {language === "ar" ? "انضم لفريقنا" : "JOIN OUR TEAM"}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                            {language === "ar" ? "اصنع مستقبل التجارة الإلكترونية معنا" : "Shape the future of e-commerce with us"}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {language === "ar"
                                ? "نحن نبحث عن المبدعين والمتحمسين الذين يرغبون في ترك بصمة حقيقية في عالم التسوق الرقمي."
                                : "We are looking for creative and passionate individuals who want to leave a real mark in the world of digital shopping."}
                        </p>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="container mx-auto px-8 -mt-24 mb-32 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <CultureCard
                            icon={<Zap className="text-yellow-400" />}
                            title={language === "ar" ? "الابتكار الدائم" : "Always Innovating"}
                            desc={language === "ar" ? "نحن لا نتبع القواعد، بل نصنعها. نرحب دائماً بالأفكار الجريئة." : "We don't follow rules, we make them. We always welcome bold ideas."}
                        />
                        <CultureCard
                            icon={<Users className="text-blue-400" />}
                            title={language === "ar" ? "روح الفريق" : "Team Spirit"}
                            desc={language === "ar" ? "نعمل كعائلة واحدة في بيئة محفزة تدعم النمو الشخصي والمهني." : "We work as one family in a stimulating environment that supports personal and professional growth."}
                        />
                        <CultureCard
                            icon={<Coffee className="text-orange-400" />}
                            title={language === "ar" ? "بيئة عمل مرنة" : "Flexible Environment"}
                            desc={language === "ar" ? "نحن نهتم بالنتائج والإبداع أكثر من عدد الساعات." : "We care about results and creativity more than the number of hours."}
                        />
                    </div>
                </section>

                {/* Open Positions */}
                <section className="container mx-auto px-8 mb-32">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black text-slate-900">{language === "ar" ? "الوظائف المتاحة حالياً" : "Current Openings"}</h2>
                            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
                        </div>

                        <div className="space-y-6">
                            {jobs.map((job, i) => (
                                <div key={i} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border-2 border-transparent hover:border-primary/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4">
                                            <span className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest"><MapPin size={16} /> {job.location}</span>
                                            <span className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest"><Clock size={16} /> {job.type}</span>
                                        </div>
                                    </div>
                                    <Button variant="primary" size="lg" className="rounded-2xl font-black px-10 py-7 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                        {language === "ar" ? "التصنيف الآن" : "Apply Now"}
                                        <ArrowRight className={`ml-3 h-5 w-5 ${language === "ar" ? "rotate-180" : ""}`} />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-indigo-50 border-2 border-dashed border-indigo-200 text-center space-y-6">
                            <p className="text-lg font-bold text-indigo-900">
                                {language === "ar" ? "لم تجد وظيفة تناسبك؟ أرسل سيرتك الذاتية وسنتواصل معك لاحقاً." : "Didn't find a matching job? Send your resume and we'll contact you later."}
                            </p>
                            <span className="text-2xl font-black text-primary block">careers@bhstore.com</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function CultureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-black/5 text-center space-y-6 hover:-translate-y-3 transition-transform duration-500">
            <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto text-3xl shadow-inner border border-slate-50">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
        </div>
    );
}
