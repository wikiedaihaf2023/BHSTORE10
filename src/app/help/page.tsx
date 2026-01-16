"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Search,
    MessageCircle,
    Mail,
    Phone,
    HelpCircle,
    ChevronRight,
    Package,
    CreditCard,
    RefreshCcw,
    ShieldCheck,
    User,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HelpCenterPage() {
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        {
            category: language === "ar" ? "الطلبات والتوصيل" : "Orders & Shipping",
            icon: <Package className="text-blue-500" />,
            questions: [
                { q: language === "ar" ? "كيف يمكنني تتبع طلبي؟" : "How can I track my order?", a: language === "ar" ? "يمكنك تتبع طلبك من خلال الدخول إلى صفحة 'تتبع الشحنات' واستخدام رقم الطلب المرسل إليك." : "You can track your order by visiting the 'Track Shipping' page using your order number." },
                { q: language === "ar" ? "ما هي مدة التوصيل المتوقعة؟" : "What is the expected delivery time?", a: language === "ar" ? "يستغرق التوصيل عادة من 2-5 أيام عمل حسب مدينتك." : "Delivery usually takes 2-5 business days depending on your city." },
            ]
        },
        {
            category: language === "ar" ? "الدفع والفواتير" : "Payment & Billing",
            icon: <CreditCard className="text-emerald-500" />,
            questions: [
                { q: language === "ar" ? "ما هي وسائل الدفع المتاحة؟" : "What payment methods are available?", a: language === "ar" ? "نقبل فيزا، ماستركارد، مدى، وأبل باي." : "We accept Visa, Mastercard, Mada, and Apple Pay." },
                { q: language === "ar" ? "هل أسعاركم شاملة للضريبة؟" : "Are your prices tax-inclusive?", a: language === "ar" ? "نعم، جميع الأسعار المعلنة شاملة لضريبة القيمة المضافة 15%." : "Yes, all listed prices include 15% VAT." },
            ]
        },
        {
            category: language === "ar" ? "الإرجاع والاستبدال" : "Returns & Exchanges",
            icon: <RefreshCcw className="text-orange-500" />,
            questions: [
                { q: language === "ar" ? "كم هي فترة الاسترجاع المسموحة؟" : "How long is the return period?", a: language === "ar" ? "يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام بشرط أن تكون بحالتها الأصلية." : "You can return products within 14 days of receipt, provided they are in their original condition." },
            ]
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero Search Section */}
                <section className="bg-primary pt-24 pb-48 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <HelpCircle size={600} className="translate-x-1/3 -translate-y-1/3" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                            {language === "ar" ? "كيف يمكننا مساعدتك اليوم؟" : "How can we help you today?"}
                        </h1>
                        <div className="max-w-2xl mx-auto relative group">
                            <input
                                type="text"
                                placeholder={language === "ar" ? "ابحث عن موضوع (مثلاً: تتبع الشحنة)..." : "Search for a topic (e.g. tracking)..."}
                                className="w-full rounded-3xl bg-white/10 border-none py-6 pr-14 pl-14 text-xl font-bold placeholder:text-white/40 focus:bg-white focus:text-primary focus:ring-4 focus:ring-accent transition-all shadow-2xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className={`absolute inset-y-0 ${language === "ar" ? "right-5" : "left-5"} my-auto h-6 w-6 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary`} />
                        </div>
                    </div>
                </section>

                {/* Quick Help Cards */}
                <section className="container mx-auto px-8 -mt-24 mb-24 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <QuickActionCard icon={<Package />} title={language === "ar" ? "طلباتي" : "My Orders"} link="/account/orders" />
                        <QuickActionCard icon={<RefreshCcw />} title={language === "ar" ? "الإرجاع" : "Returns"} link="/returns" />
                        <QuickActionCard icon={<CreditCard />} title={language === "ar" ? "الدفع" : "Payments"} link="/payment" />
                        <QuickActionCard icon={<User />} title={language === "ar" ? "الحساب" : "Account"} link="/account" />
                    </div>
                </section>

                {/* FAQ Categories */}
                <section className="container mx-auto px-8 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 border-b-4 border-accent inline-block pb-4 px-6">{language === "ar" ? "الأسئلة الشائعة" : "Popular Questions"}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {faqs.map((cat, i) => (
                            <div key={i} className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-black/5 hover:border-primary/10 transition-colors">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{cat.category}</h3>
                                </div>
                                <div className="space-y-6">
                                    {cat.questions.map((q, j) => (
                                        <details key={j} className="group cursor-pointer">
                                            <summary className="flex items-center justify-between font-black text-slate-700 list-none group-hover:text-primary transition-colors py-2">
                                                <span>{q.q}</span>
                                                <ChevronRight className={`h-5 w-5 transition-transform group-open:rotate-90 ${language === "ar" ? "rotate-180" : ""}`} />
                                            </summary>
                                            <p className="mt-4 text-sm font-bold text-slate-400 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                                                {q.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                        <MessageCircle size={800} className="translate-x-1/4" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                                {language === "ar" ? "لم تجد ما تبحث عنه؟ نحن هنا للمساعدة" : "Didn't find what you're looking for? We're here."}
                            </h2>
                            <p className="text-xl font-bold text-slate-400">
                                {language === "ar" ? "فريق الدعم لدينا يعمل على مدار الساعة لخدمتك." : "Our support team works around the clock to serve you."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <ContactMethodCard
                                icon={<MessageCircle />}
                                title={language === "ar" ? "المحادثة الفورية" : "Live Chat"}
                                desc={language === "ar" ? "تحدث معنا الآن عبر الموقع." : "Talk to us now on the site."}
                                action={language === "ar" ? "بدء المحادثة" : "Start Chatting"}
                            />
                            <ContactMethodCard
                                icon={<Mail />}
                                title={language === "ar" ? "البريد الإلكتروني" : "Email Support"}
                                desc="support@bhstore.com"
                                action={language === "ar" ? "إرسال إيميل" : "Send Email"}
                            />
                            <ContactMethodCard
                                icon={<Phone />}
                                title={language === "ar" ? "اتصل بنا" : "Call Us"}
                                desc="920000000"
                                action={language === "ar" ? "اتصال هاتفي" : "Call Now"}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function QuickActionCard({ icon, title, link }: { icon: any, title: string, link: string }) {
    const { language } = useLanguage();
    return (
        <a href={link} className="flex flex-col items-center gap-6 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-black/5 hover:-translate-y-2 hover:bg-primary hover:text-white transition-all duration-500 group">
            <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary transform group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white transition-all shadow-sm ring-1 ring-black/5">
                {icon}
            </div>
            <span className="text-xl font-black">{title}</span>
            <div className="mt-auto h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 group-hover:bg-white/20 transition-all">
                <ArrowRight className={`h-5 w-5 ${language === "ar" ? "rotate-180" : ""}`} />
            </div>
        </a>
    );
}

function ContactMethodCard({ icon, title, desc, action }: { icon: any, title: string, desc: string, action: string }) {
    return (
        <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 ring-1 ring-white/5 hover:bg-white/10 transition-all group text-center space-y-8">
            <div className="h-20 w-20 rounded-3xl bg-primary text-white flex items-center justify-center mx-auto shadow-xl shadow-primary/20 transform group-hover:rotate-12 transition-transform">
                {icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="text-slate-400 font-bold">{desc}</p>
            </div>
            <Button variant="accent" className="w-full rounded-2xl font-black py-7 text-lg shadow-2xl shadow-accent/20">
                {action}
            </Button>
        </div>
    );
}
