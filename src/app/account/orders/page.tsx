"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Package, ChevronLeft, Clock, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_ORDERS = [
    {
        id: "ORD-7642",
        date: "12 يناير 2026",
        total: 5449.00,
        status: "PROCESSING",
        itemsCount: 2,
        statusLabel: "قيد المعالجة",
        statusColor: "text-amber-600 bg-amber-50"
    },
    {
        id: "ORD-5120",
        date: "05 يناير 2026",
        total: 999.00,
        status: "DELIVERED",
        itemsCount: 1,
        statusLabel: "تم التوصيل",
        statusColor: "text-green-600 bg-green-50"
    }
];

export default function OrdersPage() {
    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">طلباتي</h1>
                    <Link href="/products">
                        <Button variant="outline" size="sm">مواصلة التسوق</Button>
                    </Link>
                </div>

                {MOCK_ORDERS.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border bg-white p-16 text-center shadow-sm">
                        <Package className="mb-6 h-16 w-16 text-gray-300" />
                        <h2 className="mb-2 text-2xl font-bold">لا توجد طلبات سابقة</h2>
                        <p className="mb-8 text-gray-500">لم تطلب أي شيء بعد. ابحث عن منتجاتك المفضلة وأضفها للسلة!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {MOCK_ORDERS.map((order) => (
                            <div key={order.id} className="overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
                                {/* Order Header */}
                                <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500">
                                    <div className="flex gap-8">
                                        <div>
                                            <p>تم الطلب في</p>
                                            <p className="text-gray-900">{order.date}</p>
                                        </div>
                                        <div>
                                            <p>الإجمالي</p>
                                            <p className="text-gray-900">{order.total.toLocaleString()} ر.س</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p>رقم الطلب</p>
                                        <p className="text-gray-900">#{order.id}</p>
                                    </div>
                                </div>

                                {/* Order Body */}
                                <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Package className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${order.statusColor}`}>
                                                {order.statusLabel}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">طلب يحتوي على {order.itemsCount} منتجات</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Link href={`/account/orders/${order.id}`}>
                                            <Button variant="outline" className="font-bold">عرض تفاصيل الطلب</Button>
                                        </Link>
                                        <Link href={`/account/orders/${order.id}/track`}>
                                            <Button variant="accent" className="font-bold">تتبع الشحنة</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
