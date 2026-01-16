"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Timer, Zap, Flame, Percent, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DealsPage() {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-12 md:py-20">
                {/* Deals Hero Banner */}
                <div className="mb-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-600 via-red-600 to-rose-700 p-12 text-white shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
                        <div className="text-center lg:text-right">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 text-base font-black backdrop-blur-md ring-1 ring-white/30">
                                <Zap className="h-5 w-5 fill-current animate-pulse" /> {t("deals.lightningDeals")}
                            </div>
                            <h1 className="mb-6 text-4xl font-black md:text-5xl tracking-tight leading-tight">{t("deals.heroTitle")}</h1>
                            <p className="text-xl opacity-90 font-bold max-w-2xl">{t("deals.heroSubtitle")}</p>
                        </div>

                        <div className="flex flex-col items-center gap-6 rounded-3xl bg-black/30 p-8 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl">
                            <span className="text-base font-black uppercase tracking-widest opacity-80">{t("deals.endsIn")}</span>
                            <div className="flex gap-6">
                                <CountdownItem value="08" label={t("deals.hours")} />
                                <div className="text-3xl font-black opacity-30">:</div>
                                <CountdownItem value="45" label={t("deals.minutes")} />
                                <div className="text-3xl font-black opacity-30">:</div>
                                <CountdownItem value="12" label={t("deals.seconds")} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories of Deals */}
                <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
                    <DealCategoryIcon icon={Flame} label={t("deals.hot")} color="text-red-500 bg-red-50" />
                    <DealCategoryIcon icon={Percent} label={t("deals.highest")} color="text-orange-500 bg-orange-50" />
                    <DealCategoryIcon icon={Timer} label={t("deals.endingSoon")} color="text-blue-500 bg-blue-50" />
                    <DealCategoryIcon icon={Zap} label={t("deals.newlyArrived")} color="text-yellow-500 bg-yellow-50" />
                </div>

                {/* Deals Grid */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b-2 border-black/5 pb-6">
                        <h2 className="text-2xl font-black tracking-tight">{t("deals.todayDeals")}</h2>
                        <div className="text-base font-black text-gray-400">{t("products.found", { count: products.length })}</div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <div key={n} className="h-96 w-full animate-pulse rounded-3xl bg-white shadow-sm border border-black/5"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product: any) => (
                                <div key={product.id} className="relative group">
                                    <div className="absolute -top-3 -right-3 z-20 rounded-xl bg-red-600 px-4 py-1.5 text-sm font-black text-white shadow-xl ring-2 ring-white transition-transform group-hover:scale-110">
                                        {t("deals.off", { percent: 15 })}
                                    </div>
                                    <ProductCard
                                        {...product}
                                        image={product.image}
                                        rating={4.8}
                                        reviewsCount={product._count?.reviews || 24}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function CountdownItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl font-black md:text-5xl tabular-nums">{value}</span>
            <span className="text-xs font-black opacity-70 uppercase tracking-widest mt-2">{label}</span>
        </div>
    );
}

function DealCategoryIcon({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
    return (
        <button className="group flex flex-col items-center gap-4 rounded-[2rem] border-2 border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-black/10">
            <div className={`rounded-[1.5rem] p-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${color}`}>
                <Icon className="h-8 w-8" />
            </div>
            <span className="font-black text-gray-700 text-lg">{label}</span>
        </button>
    );
}
