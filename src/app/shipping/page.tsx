"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Truck,
    Search,
    Package,
    MapPin,
    Clock,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Smartphone
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
    const { language, t } = useLanguage();
    const [orderNumber, setOrderNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [trackingData, setTrackingData] = useState<any>(null);

    const handleTrack = () => {
        if (!orderNumber) return;
        setIsLoading(true);
        // Simulate tracking lookup
        setTimeout(() => {
            setTrackingData({
                status: language === "ar" ? "في الطريق" : "In Transit",
                currentLocation: language === "ar" ? "مستودع الرياض الرئيسي" : "Riyadh Main Hub",
                expectedDate: "20 Jan 2026",
                steps: [
                    { time: "16 Jan - 10:00 AM", status: language === "ar" ? "تم تجهيز الشحنة" : "Shipment Prepared", completed: true },
                    { time: "16 Jan - 04:00 PM", status: language === "ar" ? "في الطريق للمستودع" : "On the way to Hub", completed: true },
                    { time: "17 Jan - 08:00 AM", status: language === "ar" ? "تم الوصول للمستودع" : "Arrived at Hub", completed: true },
                    { time: "17 Jan - 02:00 PM", status: language === "ar" ? "جاري التوصيل للمدينة" : "Transit to City", completed: false },
                ]
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans" dir={language === "ar" ? "rtl" : "ltr"}>
            <Header />

            <main className="flex-1">
                {/* Hero section with Tracking Input */}
                <section className="bg-primary pt-24 pb-48 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <Truck size={800} className="-translate-x-1/4 translate-y-1/4 -rotate-12" />
                    </div>
                    <div className="container mx-auto px-8 relative z-10 text-center space-y-12">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                                {language === "ar" ? "تتبع شحنتك لحظة بلحظة" : "Track your shipment, live."}
                            </h1>
                            <p className="text-lg md:text-xl font-bold opacity-70 max-w-2xl mx-auto">
                                {language === "ar" ? "أدخل رقم الطلب لمعرفة حالة شحنتك وموعد التوصيل المتوقع." : "Enter your order number to check the status and expected delivery date."}
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative group">
                                <Search className={`absolute inset-y-0 ${language === "ar" ? "right-6" : "left-6"} my-auto h-6 w-6 text-slate-400 group-focus-within:text-primary z-20`} />
                                <input
                                    type="text"
                                    placeholder={language === "ar" ? "مثلاً: BH-12345-SA" : "e.g. BH-12345-SA"}
                                    className="w-full rounded-[2.5rem] bg-white border-none py-8 pr-16 pl-16 text-xl font-black text-slate-900 placeholder:text-slate-300 focus:ring-8 focus:ring-accent/40 shadow-2xl transition-all"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="accent"
                                className="rounded-[2.5rem] px-12 py-8 text-2xl font-black text-primary shadow-2xl shadow-accent/40 hover:scale-[1.02] active:scale-95 transition-all"
                                onClick={handleTrack}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        {language === "ar" ? "جاري البحث..." : "Searching..."}
                                    </div>
                                ) : (
                                    language === "ar" ? "تتبع الآن" : "Track Now"
                                )}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Tracking Results (Conditional) */}
                {trackingData && (
                    <section className="container mx-auto px-8 -mt-24 mb-24 relative z-30 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 p-12 md:p-20 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <CheckCircle2 size={300} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                {/* Left Side: Status Steps */}
                                <div className="space-y-12">
                                    <div className="flex items-center gap-6">
                                        <div className="h-20 w-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-inner">
                                            <Package size={40} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900">{language === "ar" ? "حالة الشحنة" : "Shipment Status"}</h2>
                                            <p className="text-lg font-black text-emerald-600 uppercase tracking-widest mt-1">{trackingData.status}</p>
                                        </div>
                                    </div>

                                    <div className="relative space-y-12 pl-4 pr-4">
                                        <div className={`absolute top-0 bottom-0 ${language === "ar" ? "right-11" : "left-11"} w-1 bg-slate-100 rounded-full`} />
                                        {trackingData.steps.map((step: any, i: number) => (
                                            <div key={i} className={`relative flex items-center gap-10 group ${step.completed ? 'opacity-100' : 'opacity-40'}`}>
                                                <div className={`h-16 w-16 rounded-3xl flex items-center justify-center text-white z-10 shadow-lg transition-transform group-hover:scale-110 ${step.completed ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                                    {step.completed ? <CheckCircle2 size={24} /> : <div className="h-3 w-3 bg-white/50 rounded-full" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-slate-400 uppercase tracking-tight mb-1">{step.time}</p>
                                                    <h4 className="text-xl font-black text-slate-900">{step.status}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Side: Summary Card */}
                                <div className="space-y-10">
                                    <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 space-y-10">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{language === "ar" ? "موعد التوصيل المتوقع" : "EXPECTED DELIVERY"}</span>
                                            <h3 className="text-4xl font-black text-primary">{trackingData.expectedDate}</h3>
                                        </div>
                                        <div className="h-[1px] bg-slate-200" />
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-6">
                                                <MapPin className="text-slate-400" size={24} />
                                                <div>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{language === "ar" ? "الموقع الحالي" : "Current Location"}</p>
                                                    <p className="font-black text-xl text-slate-900">{trackingData.currentLocation}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <Smartphone className="text-slate-400" size={24} />
                                                <div>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{language === "ar" ? "التنبيهات" : "Notifications"}</p>
                                                    <p className="font-bold text-slate-600">{language === "ar" ? "مفعلة عبر الرسائل النصية" : "Enabled via SMS"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary p-10 rounded-[3rem] text-white flex items-center justify-between group cursor-pointer hover:bg-slate-900 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                                <ShieldCheck size={32} className="text-accent" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black">{language === "ar" ? "تحتاج مساعدة؟" : "Need Help?"}</h4>
                                                <p className="text-sm font-bold opacity-60">{language === "ar" ? "تواصل مع الدعم الفني للشحنات" : "Contact Shipping Support"}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className={`h-8 w-8 transition-transform group-hover:translate-x-3 ${language === "ar" ? "rotate-180 group-hover:-translate-x-3" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Info Cards - Displayed if no results or as general info */}
                {!trackingData && (
                    <section className="container mx-auto px-8 mb-32 -mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <InfoCard
                                icon={<Truck className="text-blue-500" />}
                                title={language === "ar" ? "توصيل سريع" : "Fast Delivery"}
                                desc={language === "ar" ? "نغطي كافة مناطق المملكة خلال 2-5 أيام عمل." : "We cover all Saudi regions within 2-5 business days."}
                            />
                            <InfoCard
                                icon={<ShieldCheck className="text-emerald-500" />}
                                title={language === "ar" ? "شحن آمن" : "Safe Transport"}
                                desc={language === "ar" ? "تغليف متين وحماية فائقة لكافة أنواع المنتجات." : "Strong packaging and premium protection for all items."}
                            />
                            <InfoCard
                                icon={<Clock className="text-orange-500" />}
                                title={language === "ar" ? "تتبع 24/7" : "24/7 Tracking"}
                                desc={language === "ar" ? "راقب تحرك شحنتك في أي وقت ومن أي مكان." : "Monitor your shipment movement anytime, anywhere."}
                            />
                        </div>
                    </section>
                )}

                {/* Partners Section */}
                <section className="bg-white py-24 mb-32 border-y border-slate-50">
                    <div className="container mx-auto px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">{language === "ar" ? "شركاء النجاح في التوصيل" : "OUR SHIPPING PARTNERS"}</h2>
                            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
                            <span className="text-3xl font-black italic">ARAMEX</span>
                            <span className="text-3xl font-black italic">DHL</span>
                            <span className="text-3xl font-black italic">SMSA</span>
                            <span className="text-3xl font-black italic">SPL</span>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function InfoCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-black/5 text-center space-y-8 hover:-translate-y-3 transition-transform duration-500">
            <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto shadow-inner text-primary">
                {icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900">{title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
