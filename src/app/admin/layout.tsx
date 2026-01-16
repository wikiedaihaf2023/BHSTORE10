"use client";

import Link from "next/link";
import { LayoutDashboard, Package, ListTree, Users, ShoppingCart, Settings, LogOut, Globe, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { language, toggleLanguage, t } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarItems = [
        { icon: LayoutDashboard, label: t("admin.overview"), href: "/admin" },
        { icon: Package, label: t("admin.products"), href: "/admin/products" },
        { icon: ListTree, label: t("admin.categories"), href: "/admin/categories" },
        { icon: ShoppingCart, label: t("admin.orders"), href: "/admin/orders" },
        { icon: Users, label: t("admin.users"), href: "/admin/users" },
        { icon: Settings, label: t("admin.settings"), href: "/admin/settings" },
    ];

    const handleLogout = () => {
        signOut({ callbackUrl: "/auth/login" });
    };

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen bg-slate-50" dir={language === "ar" ? "rtl" : "ltr"}>
            {/* Sidebar Desktop */}
            <aside className={`fixed inset-y-0 ${language === "ar" ? "right-0" : "left-0"} z-50 w-72 bg-primary text-white shadow-2xl transition-all duration-500 hidden lg:block`}>
                <div className="flex h-20 items-center justify-center border-b border-white/10 px-6 mb-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 transition-transform group-hover:scale-110">
                            <span className="text-xl font-black italic">BH</span>
                        </div>
                        <span className="text-xl font-black tracking-tight uppercase group-hover:text-accent transition-colors">ADMIN</span>
                    </Link>
                </div>

                <nav className="space-y-2 px-6">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 rounded-2xl px-5 py-4 text-base font-black transition-all duration-300",
                                    isActive
                                        ? "bg-accent text-primary shadow-lg scale-[1.02]"
                                        : "hover:bg-white/5 text-white/70 hover:text-white"
                                )}
                            >
                                <item.icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-10 w-full px-6 space-y-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-base font-black bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10"
                    >
                        <Globe className="h-6 w-6" />
                        {language === "ar" ? "English View" : "العرض بالعربية"}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-base font-black bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-white transition-all border border-red-500/20"
                    >
                        <LogOut className="h-6 w-6" />
                        {t("admin.logout")}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="fixed top-0 z-40 w-full h-20 bg-primary lg:hidden flex items-center justify-between px-6 shadow-xl">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center font-black italic">BH</div>
                    <span className="font-black tracking-tight text-white uppercase">ADMIN</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white bg-white/10 p-2 rounded-xl">
                    {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                    <aside className={`absolute inset-y-0 ${language === "ar" ? "right-0" : "left-0"} w-80 bg-primary p-8 shadow-2xl animate-in slide-in-from-right duration-500`}>
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-black text-white">BH ADMIN</span>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-white/50"><X size={32} /></button>
                        </div>
                        <nav className="space-y-4">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 rounded-2xl px-6 py-5 text-lg font-black transition-all",
                                        pathname === item.href ? "bg-accent text-primary" : "text-white/70"
                                    )}
                                >
                                    <item.icon size={24} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-12 space-y-4">
                            <button onClick={toggleLanguage} className="w-full text-right font-black text-white bg-white/10 p-5 rounded-2xl flex items-center gap-4">
                                <Globe size={24} /> {language === "ar" ? "English" : "عربي"}
                            </button>
                            <button onClick={handleLogout} className="w-full text-right font-black text-red-200 bg-red-500/10 p-5 rounded-2xl flex items-center gap-4">
                                <LogOut size={24} /> {t("admin.logout")}
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 p-8 pt-28 lg:pt-8 ${language === "ar" ? "lg:mr-72" : "lg:ml-72"}`}>
                <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
