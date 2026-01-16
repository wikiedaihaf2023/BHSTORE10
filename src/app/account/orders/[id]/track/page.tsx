"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Clock, Truck, Package, ChevronRight } from "lucide-react";
import { useState, useEffect, use } from "react";
import Link from "next/link";

const steps = [
    { id: 1, label: "تم استلام الطلب", date: "12 يناير - 10:30 ص", icon: CheckCircle2, status: "completed" },
    { id: 2, label: "قيد التجهيز", date: "12 يناير - 02:15 م", icon: Clock, status: "completed" },
    { id: 3, label: "خرج للشحن", date: "في انتظار التحديث", icon: Truck, status: "current" },
    { id: 4, label: "تم التوصيل", date: "متوقع 15 يناير", icon: Package, status: "pending" },
];

export default function OrderTrackingPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-12">
                <div className="mb-6">
                    <Link href="/account/orders" className="flex items-center gap-1 text-sm text-blue-600 hover:text-accent">
                        <ChevronRight className="h-4 w-4" /> العودة لطلباتي
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold">تتبع الطلب #{params.id || "ORD-7642"}</h1>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Tracking Timeline */}
                    <div className="lg:col-span-2 rounded-xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-8 text-xl font-bold">حالة الشحنة</h2>
                        <div className="relative space-y-8">
                            {/* Timeline Connector */}
                            <div className="absolute top-0 right-[23px] h-full w-0.5 bg-gray-100" />

                            {steps.map((step) => (
                                <div key={step.id} className="relative flex items-start gap-6">
                                    <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-sm ${step.status === 'completed' ? 'bg-green-500 text-white' :
                                        step.status === 'current' ? 'bg-accent text-accent-foreground' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <h3 className={`font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                                            {step.label}
                                        </h3>
                                        <p className="text-sm text-gray-500">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Details Details */}
                    <div className="space-y-6">
                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <h2 className="mb-4 font-bold">عنوان التوصيل</h2>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="font-bold text-gray-900">أحمد محمد</p>
                                <p>حي الملقا، طريق الملك فهد</p>
                                <p>الرياض، المملكة العربية السعودية</p>
                                <p>+966 50 123 4567</p>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <h2 className="mb-4 font-bold">تفاصيل الشحن</h2>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>شركة الشحن: <span className="font-bold">ارامكس</span></p>
                                <p>رقم التتبع: <span className="font-bold text-blue-600">BH9988776655</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
