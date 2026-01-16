"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Filter, Download, MoreHorizontal, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    user: {
        name: string | null;
        email: string | null;
    } | null;
}

export default function AdminOrdersPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/orders");
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error("Failed to fetch orders:", error);
            setError(error.message || "Something went wrong while fetching orders.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        setIsUpdating(orderId);
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Connection error");
        } finally {
            setIsUpdating(null);
        }
    };

    const getStatusInfo = (status: string) => {
        const s = status?.toUpperCase() || "";
        switch (s) {
            case 'DELIVERED':
            case 'COMPLETED':
                return {
                    label: language === "ar" ? "تم التوصيل" : "Delivered",
                    style: 'bg-emerald-100 text-emerald-700 ring-emerald-500/20'
                };
            case 'PROCESSING':
            case 'PENDING':
                return {
                    label: language === "ar" ? "قيد المعالجة" : "Processing",
                    style: 'bg-amber-100 text-amber-700 ring-amber-500/20'
                };
            case 'SHIPPED':
                return {
                    label: language === "ar" ? "تم الشحن" : "Shipped",
                    style: 'bg-blue-100 text-blue-700 ring-blue-500/20'
                };
            case 'CANCELLED':
                return {
                    label: language === "ar" ? "ملغي" : "Cancelled",
                    style: 'bg-red-100 text-red-700 ring-red-500/20'
                };
            default:
                return {
                    label: status || "N/A",
                    style: 'bg-gray-100 text-gray-700 ring-gray-500/20'
                };
        }
    };

    const filteredOrders = orders.filter(o =>
        (o.id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t("admin.orders")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{language === "ar" ? "متابعة وتحديث حالات طلبات العملاء." : "Follow up and update the status of customer orders."}</p>
                </div>
                <Button variant="primary" size="lg" className="rounded-2xl font-black shadow-lg flex items-center gap-2">
                    <Download size={20} /> {language === "ar" ? "تحميل التقرير" : "Download Report"}
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder={language === "ar" ? "ابحث برقم الطلب أو اسم العميل..." : "Search by order number or customer name..."}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 pr-12 pl-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className={`absolute ${language === "ar" ? "right-4" : "left-4"} top-4.5 h-6 w-6 text-slate-300`} />
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white shadow-2xl shadow-slate-200/40 ring-1 ring-black/5 transition-all">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                            <AlertCircle className="w-16 h-16 text-red-500" />
                            <h3 className="text-xl font-black text-slate-900">{language === "ar" ? "عذراً، حدث خطأ" : "Oops, an error occurred"}</h3>
                            <p className="text-slate-500 font-bold">{error}</p>
                            <Button onClick={fetchOrders} variant="outline" className="rounded-xl border-2">
                                {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className={`bg-slate-50/50 text-slate-400 border-b border-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                <tr>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "رقم الطلب" : "Order ID"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "العميل" : "Customer"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "التاريخ" : "Date"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الإجمالي" : "Total"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الحالة" : "Status"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الإجراءات" : "Actions"}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-black">
                                            {language === "ar" ? "لا توجد طلبات" : "No orders found"}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6 font-black text-slate-900 text-base">#{order.id?.slice(-6).toUpperCase() || "N/A"}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 text-base">{order.user?.name || "N/A"}</span>
                                                    <span className="text-xs text-slate-400 font-medium">{order.user?.email || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-slate-500 font-bold">
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US") : "N/A"}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-lg text-primary">
                                                    {(order.total || 0).toLocaleString()}
                                                    <span className="text-[10px] font-bold opacity-40 ml-1 uppercase">{language === "ar" ? "ر.س" : "SAR"}</span>
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${getStatusInfo(order.status).style}`}>
                                                        {getStatusInfo(order.status).label}
                                                    </span>
                                                    {isUpdating === order.id && <Loader2 size={12} className="animate-spin text-primary" />}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                    className="bg-slate-50 border-0 rounded-xl px-3 py-2 text-xs font-black focus:ring-2 focus:ring-primary/20 outline-none"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="PROCESSING">PROCESSING</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="CANCELLED">CANCELLED</option>
                                                </select>
                                            </td>
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
