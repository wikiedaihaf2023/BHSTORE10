"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50" suppressHydrationWarning>
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-[500px] w-full md:h-[700px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-center">
            <div className="container mx-auto px-6 md:px-16">
              <div className="max-w-2xl text-white">
                <div className="mb-6 inline-flex items-center gap-3 rounded-2xl bg-accent/20 px-6 py-3 text-sm font-black backdrop-blur-md ring-1 ring-white/30 animate-in fade-in slide-in-from-top-4 duration-700">
                  <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                  <span className="uppercase tracking-[0.2em]">{language === "ar" ? "عروض حصرية لفترة محدودة" : "Exclusive Limited Time Offers"}</span>
                </div>
                <h2 className="mb-8 text-5xl font-black md:text-7xl leading-[1.1] tracking-tighter animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                  {t("home.heroTitle")}
                </h2>
                <p className="mb-12 text-lg md:text-2xl font-bold opacity-80 max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-12 duration-700 delay-200">
                  {t("home.heroSubtitle")}
                </p>
                <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-left-16 duration-700 delay-300">
                  <Link
                    href="/deals"
                    className="flex items-center gap-4 rounded-3xl bg-accent px-12 py-6 text-2xl font-black text-primary transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,193,7,0.4)] active:scale-95 group"
                  >
                    {t("home.shopNow")}
                    <ArrowRight className={`h-8 w-8 transition-transform group-hover:translate-x-2 ${language === "ar" ? "rotate-180 group-hover:-translate-x-2" : ""}`} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid - Mobile Optimized */}
        <section className="container mx-auto -mt-16 sm:-mt-24 relative z-10 px-4 md:px-8 pb-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <CategoryCard title={t("home.catElectronics")} image="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600" link="/category/electronics" icon={<Smartphone />} />
            <CategoryCard title={t("home.catFashion")} image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600" link="/category/fashion" icon={<Sparkles />} />
            <CategoryCard title={t("home.catHome")} image="https://images.unsplash.com/photo-1513694203232-719a28db496d?auto=format&fit=crop&q=80&w=600" link="/category/home" icon={<ShieldCheck />} />
            <CategoryCard title={t("home.catDeals")} image="https://images.unsplash.com/photo-1607083213304-fe03db444158?auto=format&fit=crop&q=80&w=600" link="/deals" icon={<Zap className="text-accent fill-accent" />} />
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 md:px-8 py-20">
          <div className="mb-16 flex items-end justify-between border-b-2 border-slate-100 pb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-12 bg-accent rounded-full" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">{language === "ar" ? "مختاراتنا لك" : "Our Picks"}</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900">{t("home.bestSellers")}</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-3 text-xl font-black text-primary transition-all hover:text-accent">
              {t("home.viewMore")}
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-primary">
                <ArrowRight className={`h-6 w-6 transition-transform group-hover:translate-x-1 ${language === "ar" ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.length > 0 ? (
              featuredProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  image={product.image}
                  rating={4.5}
                  reviewsCount={product._count?.reviews || 0}
                />
              ))
            ) : (
              // Loading placeholders
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[500px] w-full animate-pulse rounded-[3rem] bg-white shadow-xl shadow-slate-100 border border-slate-50"></div>
              ))
            )}
          </div>
        </section>

        {/* Why Choose Us - Responsive Section */}
        <section className="bg-slate-900 py-32 text-white">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-6 flex flex-col items-center">
                <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 rotate-12 transition-transform hover:rotate-0">
                  <ShieldCheck size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black">{language === "ar" ? "تسوق آمن" : "Secure Shopping"}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{language === "ar" ? "جميع معاملاتك المالية محمية بأحدث تقنيات التشفير العالمي." : "All your financial transactions are protected by the latest global encryption technologies."}</p>
              </div>
              <div className="space-y-6 flex flex-col items-center">
                <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 -rotate-6 transition-transform hover:rotate-0">
                  <Sparkles size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-black">{language === "ar" ? "أفضل الأسعار" : "Best Prices"}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{language === "ar" ? "نحن نضمن لك أفضل قيمة مقابل السعر مع عروضنا اليومية المتجددة." : "We guarantee you the best value for money with our daily renewed offers."}</p>
              </div>
              <div className="space-y-6 flex flex-col items-center">
                <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 rotate-3 transition-transform hover:rotate-0">
                  <Smartphone size={40} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-black">{language === "ar" ? "تطبيق الموبايل" : "Mobile App"}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{language === "ar" ? "تجربة تسوق سلسة وسريعة عبر تطبيقنا لكافة أنواع الهواتف." : "Seamless and fast shopping experience through our app for all types of phones."}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CategoryCard({ title, image, link, icon }: { title: string; image: string; link: string; icon: React.ReactNode }) {
  const { t, language } = useLanguage();
  return (
    <div className="group flex flex-col bg-white p-5 shadow-2xl transition-all duration-500 hover:shadow-indigo-100 hover:-translate-y-3 rounded-[3rem] border border-black/5 ring-1 ring-black/5 overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-base md:text-xl font-black tracking-tight text-slate-800">{title}</h3>
        <div className="opacity-20 group-hover:opacity-100 transition-opacity text-primary">
          {icon}
        </div>
      </div>
      <div className="relative mb-6 h-48 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-inner bg-slate-50">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500" />
      </div>
      <Link href={link} className="mt-auto flex items-center justify-between group/btn p-1">
        <span className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-primary transition-colors">
          {t("home.shopNow")}
        </span>
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-primary transition-all shadow-sm">
          <ArrowRight className={`h-5 w-5 md:h-6 md:w-6 transition-transform group-hover/btn:scale-110 ${language === "ar" ? "rotate-180" : ""}`} />
        </div>
      </Link>
    </div>
  );
}
