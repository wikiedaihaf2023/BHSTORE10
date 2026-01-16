"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Info, Target, Users, Award, ShieldCheck, Globe, Smartphone, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AboutPage() {
    const { language, t } = useLanguage();
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section */}
                <section className="relative h-[400px] w-full md:h-[600px] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000"
                        alt="About Us"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-center">
                        <div className="container mx-auto px-8">
                            <div className="max-w-3xl text-white">
                                <div className="mb-6 inline-flex items-center gap-3 rounded-2xl bg-accent/20 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/30 animate-in fade-in slide-in-from-top-4 duration-700">
                                    <Info className="h-5 w-5 text-accent" />
                                    <span className="uppercase tracking-[0.2em]">{language === "ar" ? "من نحن" : "WHO WE ARE"}</span>
                                </div>
                                <h1 className="mb-8 text-5xl font-black md:text-7xl leading-tight tracking-tighter animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                                    {language === "ar" ? "قصة متجر بي إتش: حيث يلتقي التميز بالتكنولوجيا" : "BH Store Story: Where Excellence Meets Technology"}
                                </h1>
                                <p className="mb-12 text-lg md:text-2xl font-bold opacity-80 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-12 duration-700 delay-200">
                                    {language === "ar"
                                        ? "نحن لسنا مجرد متجر إلكتروني، بل نحن شريكك الموثوق في رحلة تسوق ذكية وآمنة وممتعة."
                                        : "We are not just an online store; we are your trusted partner in a smart, secure, and enjoyable shopping journey."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="container mx-auto -mt-24 relative z-10 px-8 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-black/5 ring-1 ring-black/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
                            <div className="h-24 w-24 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 border-2 border-primary/5 group-hover:scale-110 transition-transform">
                                <Target size={48} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-black mb-6 text-slate-900">{language === "ar" ? "رؤيتنا" : "Our Vision"}</h2>
                            <p className="text-lg text-slate-500 font-bold leading-relaxed">
                                {language === "ar"
                                    ? "أن نصبح المنصة الأولى في المنطقة العربية التي تجمع بين جودة المنتجات العالمية وخدمة العملاء الاستثنائية باستخدام أحدث تقنيات التجارة الإلكترونية."
                                    : "To become the premier platform in the Arab region that combines global product quality with exceptional customer service using the latest e-commerce technologies."}
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-black/5 ring-1 ring-black/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
                            <div className="h-24 w-24 rounded-3xl bg-accent/5 flex items-center justify-center mb-8 border-2 border-accent/5 group-hover:scale-110 transition-transform">
                                <Sparkles size={48} className="text-accent" />
                            </div>
                            <h2 className="text-3xl font-black mb-6 text-slate-900">{language === "ar" ? "رسالتنا" : "Our Mission"}</h2>
                            <p className="text-lg text-slate-500 font-bold leading-relaxed">
                                {language === "ar"
                                    ? "تسهيل حياة عملائنا من خلال توفير تشكيلة واسعة من المنتجات المبتكرة بأسعار تنافسية، مع ضمان عملية دفع آمنة وتوصيل فائق السرعة."
                                    : "To simplify our customers' lives by providing a wide range of innovative products at competitive prices, while ensuring a secure payment process and ultra-fast delivery."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="bg-primary py-32 text-white">
                    <div className="container mx-auto px-8">
                        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                            <h2 className="text-4xl font-black italic tracking-tighter">{language === "ar" ? "قيمنا الأساسية" : "Our Core Values"}</h2>
                            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
                            <p className="text-white/60 font-bold">{language === "ar" ? "نحن نؤمن بأن النجاح يبدأ من الالتزام بالمبادئ التي تضع العميل أولاً." : "We believe that success starts with a commitment to principles that put the customer first."}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            <ValueCard
                                icon={<ShieldCheck size={32} />}
                                title={language === "ar" ? "الأمان والثقة" : "Security & Trust"}
                                desc={language === "ar" ? "حماية بياناتك وأموالك هي أولويتنا القصوى." : "Protecting your data and money is our top priority."}
                            />
                            <ValueCard
                                icon={<Heart size={32} />}
                                title={language === "ar" ? "العميل أولاً" : "Customer First"}
                                desc={language === "ar" ? "نسعى جاهدين لتحويل كل عملية شراء إلى تجربة سعيدة." : "We strive to turn every purchase into a happy experience."}
                            />
                            <ValueCard
                                icon={<Award size={32} />}
                                title={language === "ar" ? "الجودة" : "Quality Excellence"}
                                desc={language === "ar" ? "لا نرضى بأقل من الممتاز في كل ما نقدمه." : "We don't settle for less than excellent in everything we offer."}
                            />
                            <ValueCard
                                icon={<Zap size={32} />}
                                title={language === "ar" ? "السرعة" : "Ultra Speed"}
                                desc={language === "ar" ? "وقتك ثمين، لذا نحرص على معالجة طلباتك بأقصى سرعة." : "Your time is precious, so we process your orders as fast as possible."}
                            />
                        </div>
                    </div>
                </section>

                {/* Numbers / Stats */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            <StatItem number="50K+" label={language === "ar" ? "عميل سعيد" : "Happy Customers"} />
                            <StatItem number="120K+" label={language === "ar" ? "منتج تم شحنه" : "Products Shipped"} />
                            <StatItem number="100%" label={language === "ar" ? "دفع آمن" : "Secure Payment"} />
                            <StatItem number="24/7" label={language === "ar" ? "دعم فني" : "Live Support"} />
                        </div>
                    </div>
                </section>

                {/* CTA section */}
                <section className="container mx-auto px-8 pb-32">
                    <div className="bg-accent rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <Globe size={800} className="translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
                                {language === "ar" ? "هل أنت جاهز لبدء رحلة تسوق استثنائية؟" : "Ready to start an exceptional shopping journey?"}
                            </h2>
                            <Button
                                variant="primary"
                                size="lg"
                                className="rounded-3xl px-12 py-9 text-2xl font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group/btn"
                                onClick={() => router.push("/products")}
                            >
                                {language === "ar" ? "تسوق الآن" : "Shop Now"}
                                <ArrowRight className={`h-8 w-8 ml-3 transition-transform group-hover/btn:translate-x-2 ${language === "ar" ? "rotate-180 group-hover/btn:-translate-x-2" : ""}`} />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-accent mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-black mb-4">{title}</h3>
            <p className="text-white/40 font-bold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function StatItem({ number, label }: { number: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-black text-primary tracking-tighter">{number}</div>
            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function Zap({ size, className }: { size?: number, className?: string }) {
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
            <path d="M4 14.75V3.5a1.5 1.5 0 0 1 2.25-1.3l13.5 7.75a1.5 1.5 0 0 1 0 2.6l-13.5 7.75a1.5 1.5 0 0 1-2.25-1.3v-11.25" />
        </svg>
    );
}
