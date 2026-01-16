"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Globe, LogOut, LayoutDashboard, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cart = useCart();
    const [mounted, setMounted] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();
    const { data: session, status } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = mounted ? cart.getTotalItems() : 0;
    const isAdmin = (session?.user as any)?.role === "ADMIN";

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-2xl transition-all duration-500 ring-1 ring-white/10">
            {/* Top Bar - App Promo Link */}
            <div className="bg-accent py-2 text-center text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                <Link href="#" className="flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                    <Smartphone size={14} />
                    {language === "ar" ? "حمل تطبيقنا الآن لعروض حصرية" : "Download our app for exclusive deals"}
                </Link>
            </div>

            <div className="container mx-auto px-4">
                {/* Main Header Row */}
                <div className="flex h-20 items-center justify-between gap-6 md:gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
                            <span className="text-lg font-black italic">BH</span>
                        </div>
                        <span className="hidden text-lg font-black tracking-tight uppercase sm:inline-block group-hover:text-accent transition-colors">STORE</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden max-w-2xl flex-1 lg:flex animate-in fade-in slide-in-from-top-2 duration-700">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                placeholder={t("header.search")}
                                className="w-full rounded-2xl border-none bg-white/10 py-3 pr-12 pl-6 text-white placeholder:text-white/50 focus:bg-white focus:text-primary focus:ring-4 focus:ring-accent/40 transition-all font-bold"
                            />
                            <div className={`absolute inset-y-0 flex items-center ${language === "ar" ? "right-4" : "left-4"} pointer-events-none transition-transform group-focus-within:scale-110`}>
                                <Search className="h-5 w-5 opacity-60 group-focus-within:opacity-100 group-focus-within:text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-white/10 hover:bg-accent transition-all duration-300 group overflow-hidden"
                            title={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
                        >
                            <Globe className="h-6 w-6 transition-transform group-hover:rotate-45" />
                            <span className="absolute bottom-1 text-[8px] font-black uppercase">
                                {language === "ar" ? "EN" : "ع"}
                            </span>
                        </button>

                        {!mounted ? (
                            <div className="hidden h-12 w-32 rounded-2xl bg-white/5 md:block" />
                        ) : status === "loading" ? (
                            <div className="hidden h-12 w-32 rounded-2xl bg-white/5 animate-pulse md:block" />
                        ) : session ? (
                            <div className="hidden items-center gap-4 md:flex">
                                <div className="flex flex-col items-end leading-tight max-w-[120px]">
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-white/50">{t("header.hello")}</span>
                                    <span className="text-sm font-black truncate w-full text-right">{session.user?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isAdmin && (
                                        <Link href="/admin" className="h-10 w-10 rounded-xl bg-accent text-primary flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-accent/20" title={t("admin.overview")}>
                                            <LayoutDashboard size={20} className="font-black" />
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleSignOut}
                                        className="h-10 w-10 rounded-xl bg-red-500/20 text-red-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        title={t("admin.logout")}
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="hidden items-center gap-3 hover:text-accent transition-all duration-300 md:flex group">
                                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                                    <User className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-white/50">{t("header.hello")}</span>
                                    <span className="text-sm font-black truncate">{t("header.login")}</span>
                                </div>
                            </Link>
                        )}

                        <Link href="/cart" className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-white/10 hover:bg-accent transition-all duration-300 group">
                            <ShoppingCart className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-black text-primary ring-4 ring-primary animate-in zoom-in bounce-in">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar - Visible only on mobile */}
                <div className="pb-4 lg:hidden">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder={t("header.search")}
                            className="w-full rounded-xl border-none bg-white/10 py-3 pr-10 pl-5 text-sm text-white placeholder:text-white/40 focus:bg-white focus:text-primary transition-all font-bold"
                        />
                        <div className={`absolute inset-y-0 flex items-center ${language === "ar" ? "right-3" : "left-3"} pointer-events-none`}>
                            <Search className="h-4 w-4 opacity-40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Bar - Desktop */}
            <div className="hidden border-t border-white/5 bg-primary/40 backdrop-blur-md lg:block">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-10 py-3 text-sm font-black uppercase tracking-widest">
                        <Link href="/products" className="flex items-center gap-2 hover:text-accent transition-colors group">
                            <Menu className="h-4 w-4 transition-transform group-hover:scale-125" /> {t("header.all")}
                        </Link>
                        <Link href="/category/electronics" className="hover:text-accent transition-colors">{t("header.electronics")}</Link>
                        <Link href="/category/fashion" className="hover:text-accent transition-colors">{t("header.fashion")}</Link>
                        <Link href="/category/home" className="hover:text-accent transition-colors">{t("header.home")}</Link>
                        <Link href="/category/beauty" className="hover:text-accent transition-colors">{t("header.beauty")}</Link>
                        <Link href="/category/toys" className="hover:text-accent transition-colors">{t("header.toys")}</Link>
                        <Link href="/deals" className="text-accent flex items-center gap-2 hover:brightness-125 transition-all">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            {t("header.deals")}
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-32 z-40 bg-background/98 backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <nav className="flex h-full flex-col gap-8 p-10 overflow-y-auto pb-32">
                        {session ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 py-5 px-6 rounded-3xl bg-primary/5 text-primary text-xl font-black ring-1 ring-primary/5">
                                    <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                                        {session.user?.name?.[0] || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">{language === "ar" ? "مرحباً بك" : "Welcome"}</span>
                                        <span className="truncate">{session.user?.name}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {isAdmin && (
                                        <Link href="/admin" className="flex items-center justify-center gap-2 py-5 rounded-3xl bg-accent text-primary font-black shadow-xl shadow-accent/20" onClick={() => setIsMenuOpen(false)}>
                                            <LayoutDashboard size={20} /> Admin
                                        </Link>
                                    )}
                                    <button onClick={handleSignOut} className="flex items-center justify-center gap-2 py-5 rounded-3xl bg-red-50 text-red-600 font-black">
                                        <LogOut size={20} /> {t("admin.logout")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="flex items-center gap-5 py-6 px-7 rounded-3xl bg-primary/5 text-primary text-2xl font-black ring-1 ring-primary/10" onClick={() => setIsMenuOpen(false)}>
                                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                    <User className="h-7 w-7 text-primary" />
                                </div>
                                {t("header.login")}
                            </Link>
                        )}

                        <div className="h-[1px] bg-slate-100" />

                        <div className="space-y-6">
                            <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] px-2">{t("header.categories")}</span>
                            <div className="grid grid-cols-1 gap-4">
                                <Link href="/products" className="text-3xl font-black py-4 px-2 border-l-4 border-transparent hover:border-accent hover:text-accent transition-all" onClick={() => setIsMenuOpen(false)}>{t("header.all")}</Link>
                                <Link href="/category/electronics" className="text-3xl font-black py-4 px-2" onClick={() => setIsMenuOpen(false)}>{t("header.electronics")}</Link>
                                <Link href="/category/fashion" className="text-3xl font-black py-4 px-2" onClick={() => setIsMenuOpen(false)}>{t("header.fashion")}</Link>
                                <Link href="/category/home" className="text-3xl font-black py-4 px-2" onClick={() => setIsMenuOpen(false)}>{t("header.home")}</Link>
                                <Link href="/deals" className="text-3xl font-black text-accent py-4 px-2" onClick={() => setIsMenuOpen(false)}>{t("header.deals")}</Link>
                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl bg-accent/20 p-8 border border-accent/20">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-accent p-2 rounded-xl text-primary font-black">
                                    <Smartphone size={24} />
                                </div>
                                <span className="text-lg font-black text-primary">BH APP</span>
                            </div>
                            <p className="text-sm font-bold text-primary opacity-60 mb-6 leading-relaxed">
                                {language === "ar" ? "حمل التطبيق لتجربة أسرع وعروض حصرية لا تظهر في الموقع." : "Download the app for a faster experience and exclusive deals not shown on the site."}
                            </p>
                            <button className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/30">
                                {language === "ar" ? "تحميل الآن" : "Download Now"}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
