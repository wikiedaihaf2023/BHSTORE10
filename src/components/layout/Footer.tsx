"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Smartphone, Download, ShieldCheck, Globe, CreditCard } from "lucide-react";

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-[#131921] text-white pt-16">
            {/* App Promotion Banner */}
            <div className="container mx-auto px-4 mb-20">
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary to-indigo-900 p-8 md:p-12 shadow-2xl">
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
                        <Smartphone size={400} className="translate-x-1/4 -translate-y-1/4 rotate-12" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="max-w-xl text-center md:text-right">
                            <h3 className="mb-4 text-3xl font-black md:text-4xl">
                                {language === "ar" ? "تسوق أسرع مع تطبيق BH STORE" : "Shop faster with BH STORE App"}
                            </h3>
                            <p className="text-lg font-bold text-indigo-100 opacity-80">
                                {language === "ar"
                                    ? "احصل على عروض حصرية وتنبيهات فورية عند تحميل التطبيق."
                                    : "Get exclusive deals and instant notifications when you download the app."}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-primary transition-all hover:scale-105 active:scale-95 shadow-xl">
                                <Download size={24} />
                                App Store
                            </button>
                            <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-8 py-4 font-black text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                <Download size={24} />
                                Google Play
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top */}
            <button
                className="w-full bg-[#37475A] py-5 text-sm font-black hover:bg-[#485769] transition-colors uppercase tracking-[0.2em]"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                {t("footer.backToTop")}
            </button>

            {/* Main Footer Links */}
            <div className="container mx-auto grid grid-cols-1 gap-12 px-8 py-20 sm:grid-cols-2 md:grid-cols-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black tracking-tight border-b border-white/10 pb-4 inline-block min-w-[100px]">{t("footer.aboutUs")}</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-bold">
                        <li><Link href="/about" className="hover:text-accent transition-colors">{t("footer.about")}</Link></li>
                        <li><Link href="/careers" className="hover:text-accent transition-colors">{t("footer.careers")}</Link></li>
                        <li><Link href="/press" className="hover:text-accent transition-colors">{t("footer.press")}</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="text-lg font-black tracking-tight border-b border-white/10 pb-4 inline-block min-w-[100px]">{t("footer.partner")}</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-bold">
                        <li><Link href="/sell" className="hover:text-accent transition-colors">{t("footer.sell")}</Link></li>
                        <li><Link href="/affiliate" className="hover:text-accent transition-colors">{t("footer.affiliate")}</Link></li>
                        <li><Link href="/advertise" className="hover:text-accent transition-colors">{t("footer.advertise")}</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="text-lg font-black tracking-tight border-b border-white/10 pb-4 inline-block min-w-[100px]">{t("footer.payment")}</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-bold">
                        <li><Link href="/gift-cards" className="hover:text-accent transition-colors">{t("footer.giftCards")}</Link></li>
                        <li><Link href="/conversion" className="hover:text-accent transition-colors">{t("footer.conversion")}</Link></li>
                        <li><Link href="/shipping" className="hover:text-accent transition-colors">{t("footer.shipping")}</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="text-lg font-black tracking-tight border-b border-white/10 pb-4 inline-block min-w-[100px]">{t("footer.help")}</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-bold">
                        <li><Link href="/account" className="hover:text-accent transition-colors">{t("footer.account")}</Link></li>
                        <li><Link href="/returns" className="hover:text-accent transition-colors">{t("footer.returns")}</Link></li>
                        <li><Link href="/help" className="hover:text-accent transition-colors">{t("footer.helpCenter")}</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 bg-[#0F1111] py-12">
                <div className="container mx-auto px-8">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <Link href="/" className="text-3xl font-black italic tracking-tighter text-white">
                            BH<span className="text-accent">STORE</span>
                        </Link>

                        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
                            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
                            <Link href="/ads" className="hover:text-white transition-colors">{t("footer.ads")}</Link>
                        </div>

                        <div className="flex items-center gap-4 text-gray-500">
                            <Globe size={20} className="opacity-50" />
                            <span className="text-sm font-bold">{language === "ar" ? "العربية" : "English"} - SAR</span>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
                        <p className="text-xs font-medium text-gray-600">
                            {t("footer.copyright")}
                        </p>
                        <div className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 transition-all">
                            <CreditCard size={24} />
                            <span className="text-[10px] font-black uppercase">Secure Payments Protected</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
