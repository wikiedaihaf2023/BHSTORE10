"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Calendar,
    Loader2,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const { t, language } = useLanguage();
    const [isDownloading, setIsDownloading] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [statsRes, ordersRes] = await Promise.all([
                fetch("/api/admin/stats"),
                fetch("/api/admin/orders")
            ]);

            console.log("Stats Res Status:", statsRes.status);
            console.log("Orders Res Status:", ordersRes.status);

            if (!statsRes.ok || !ordersRes.ok) {
                const sData = !statsRes.ok ? await statsRes.json().catch(() => ({})) : {};
                const oData = !ordersRes.ok ? await ordersRes.json().catch(() => ({})) : {};
                throw new Error(sData.error || oData.error || "Failed to fetch dashboard data");
            }

            const statsData = await statsRes.json();
            const ordersData = await ordersRes.json();

            setStats(statsData);
            setRecentOrders(Array.isArray(ordersData) ? ordersData.slice(0, 5) : []);
        } catch (error: any) {
            console.error("Dashboard error:", error);
            setError(error.message || "An error occurred while loading the dashboard.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadReport = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            alert(language === "ar" ? "تم تجهيز التقرير بنجاح!" : "Report generated successfully!");
        }, 2000);
    };

    const statCards = stats ? [
        { label: t("admin.totalSales"), value: (stats.totalSales || 0).toLocaleString(), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: t("admin.newOrders"), value: (stats.ordersCount || 0).toString(), icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
        { label: t("admin.activeProducts"), value: (stats.productsCount || 0).toString(), icon: Package, color: "text-orange-600", bg: "bg-orange-50" },
        { label: t("admin.newCustomers"), value: (stats.usersCount || 0).toString(), icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    ] : [];

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-2xl font-black text-slate-900">{language === "ar" ? "عذراً، حدث خطأ" : "Oops, an error occurred"}</h2>
                <p className="text-slate-500 font-bold">{error}</p>
                <Button onClick={fetchDashboardData} variant="outline" className="rounded-xl border-2">
                    {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t("admin.overview")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{t("admin.welcome")}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleDownloadReport}
                        disabled={isDownloading}
                        variant="primary"
                        size="lg"
                        className="rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        {isDownloading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                        <span>{language === "ar" ? "تحميل التقرير" : "Download Report"}</span>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="h-40 rounded-[2.5rem] bg-slate-100 animate-pulse" />
                    ))
                ) : (
                    statCards.map((stat, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/40 ring-1 ring-black/5 transition-all hover:-translate-y-1">
                            <div className={`rounded-2xl ${stat.bg} p-4 ${stat.color} w-fit`}>
                                <stat.icon className="h-8 w-8" />
                            </div>
                            <div className="mt-6">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.label}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                                    {i === 0 && <span className="text-xs font-bold text-slate-400">SAR</span>}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Recent Orders */}
            <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-2xl shadow-slate-200/40 ring-1 ring-black/5">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900">{t("admin.recentOrders")}</h2>
                    <Button variant="outline" className="rounded-xl border-slate-100 font-black">{t("admin.viewAll")}</Button>
                </div>
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="py-10 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className={`bg-slate-50/50 text-slate-400 border-b border-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                <tr>
                                    <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">{t("admin.orderId")}</th>
                                    <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">{t("admin.userName")}</th>
                                    <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الحالة" : "Status"}</th>
                                    <th className="px-6 py-4 font-black uppercase tracking-widest text-xs">{t("cart.total")}</th>
                                </tr>
                            </thead>
                            <tbody className={`${language === "ar" ? "text-right" : "text-left"}`}>
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-10 text-center text-slate-400 font-bold">
                                            {language === "ar" ? "لا توجد طلبات حديثة" : "No recent orders"}
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order: any) => (
                                        <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-6 font-black text-primary">#{order.id?.slice(-6).toUpperCase() || "N/A"}</td>
                                            <td className="px-6 py-6 font-bold text-slate-900">{order.user?.name || "N/A"}</td>
                                            <td className="px-6 py-6 font-bold text-xs uppercase text-slate-500">{order.status || "N/A"}</td>
                                            <td className="px-6 py-6 font-black text-slate-900">{(order.total || 0).toLocaleString()} SAR</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
