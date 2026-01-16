"use client";

import { useState } from "react";
import { Save, Bell, Lock, Globe, Smartphone, CreditCard, ShieldCheck, Mail, Database, CheckCircle2, AlertTriangle, RefreshCcw, Download, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type SettingsTab = 'general' | 'security' | 'notifications' | 'payments' | 'backup';

export default function AdminSettingsPage() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [isSaving, setIsSaving] = useState(false);
    const [isClearingCache, setIsClearingCache] = useState(false);

    // Settings State
    const [settings, setSettings] = useState({
        // Security
        twoFactor: true,
        systemLogging: true,
        dataEncryption: true,
        sessionTimeout: "60",
        // Notifications
        emailOrders: true,
        emailReg: false,
        emailReviews: true,
        sysLowStock: true,
        sysLoginFail: true,
        sysUpdates: true,
        // Payments (mock status)
        stripe: true,
        paypal: false,
        applePay: true,
        bankTransfer: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert(language === "ar" ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!");
        }, 1500);
    };

    const handleClearCache = () => {
        setIsClearingCache(true);
        setTimeout(() => {
            setIsClearingCache(false);
            alert(language === "ar" ? "تم مسح الذاكرة المؤقتة بنجاح!" : "Cache cleared successfully!");
        }, 2000);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                            <h2 className="text-2xl font-black mb-8 pb-4 border-b border-slate-50">{language === "ar" ? "المعلومات الأساسية" : "General Information"}</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label={language === "ar" ? "اسم المتجر" : "Store Name"} value={t("header.store")} />
                                    <FormGroup label={language === "ar" ? "البريد الرئيسي" : "Support Email"} value="support@bhstore.com" />
                                </div>
                                <FormGroup label={language === "ar" ? "وصف المتجر" : "Store Description"} isTextArea value={language === "ar" ? "متجر بي إتش هو وجهتك الأولى لأفضل المنتجات العالمية بأسعار تنافسية." : "BH Store is your first destination for the best international products at competitive prices."} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label={language === "ar" ? "العملة الافتراضية" : "Default Currency"} value={language === "ar" ? "ريال سعودي (SAR)" : "Saudi Riyal (SAR)"} />
                                    <FormGroup label={language === "ar" ? "اللغة الافتراضية" : "Default Language"} value={language === "ar" ? "العربية" : "Arabic"} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                            <h2 className="text-2xl font-black mb-8 pb-4 border-b border-slate-50">{language === "ar" ? "إعدادات التواصل" : "Contact Settings"}</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormGroup label={language === "ar" ? "رقم الواتساب" : "WhatsApp Number"} value="+966 50 000 0000" />
                                    <FormGroup label={language === "ar" ? "رقم الهاتف" : "Phone Number"} value="920000000" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormGroup label="Twitter / X" value="@bhstore" />
                                    <FormGroup label="Instagram" value="@bhstore_sa" />
                                    <FormGroup label="Facebook" value="bhstore.official" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                            <h2 className="text-2xl font-black mb-8 pb-4 border-b border-slate-50">{language === "ar" ? "الأمان والخصوصية" : "Security & Privacy"}</h2>
                            <div className="space-y-8">
                                <ToggleGroup
                                    label={language === "ar" ? "المصادقة الثنائية (2FA)" : "Two-Factor Authentication"}
                                    description={language === "ar" ? "تفعيل طبقة حماية إضافية لحسابات المدراء." : "Enable an extra layer of protection for admin accounts."}
                                    checked={settings.twoFactor}
                                    onToggle={() => handleToggle('twoFactor')}
                                />
                                <ToggleGroup
                                    label={language === "ar" ? "تسجيل سجلات النظام" : "System Logging"}
                                    description={language === "ar" ? "حفظ كافة الإجراءات والتحركات داخل لوحة التحكم." : "Save all actions and movements within the control panel."}
                                    checked={settings.systemLogging}
                                    onToggle={() => handleToggle('systemLogging')}
                                />
                                <ToggleGroup
                                    label={language === "ar" ? "تشفير بيانات العملاء" : "Customer Data Encryption"}
                                    description={language === "ar" ? "تشفير البيانات الحساسة مثل العناوين وأرقام الهواتف." : "Encrypt sensitive data such as addresses and phone numbers."}
                                    checked={settings.dataEncryption}
                                    onToggle={() => handleToggle('dataEncryption')}
                                />
                                <div className="pt-6 border-t border-slate-50">
                                    <FormGroup
                                        label={language === "ar" ? "مدة انتهاء الجلسة (بالدقائق)" : "Session Timeout (minutes)"}
                                        value={settings.sessionTimeout}
                                        onChange={(v) => setSettings(prev => ({ ...prev, sessionTimeout: v }))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl relative overflow-hidden group">
                            <Shield className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                                <ShieldCheck className="text-emerald-400" /> {language === "ar" ? "حالة الأمان مفعّلة" : "Security Status Active"}
                            </h3>
                            <p className="text-slate-400 font-bold mb-0">
                                {language === "ar" ? "نظامك محمي حالياً بآخر تحديثات الأمان. يتم فحص كافة العمليات على مدار الساعة." : "Your system is currently protected with the latest security updates. All operations are scanned 24/7."}
                            </p>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black mb-8 pb-4 border-b border-slate-50">{language === "ar" ? "إعدادات التنبيهات" : "Notification Settings"}</h2>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{language === "ar" ? "تنبيهات البريد" : "Email Alerts"}</h3>
                                    <ToggleGroup label={language === "ar" ? "طلبات جديدة" : "New Orders"} checked={settings.emailOrders} onToggle={() => handleToggle('emailOrders')} />
                                    <ToggleGroup label={language === "ar" ? "تسجيل عميل جديد" : "New User Registration"} checked={settings.emailReg} onToggle={() => handleToggle('emailReg')} />
                                    <ToggleGroup label={language === "ar" ? "تقييمات جديدة" : "New Reviews"} checked={settings.emailReviews} onToggle={() => handleToggle('emailReviews')} />
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{language === "ar" ? "تنبيهات النظام" : "System Alerts"}</h3>
                                    <ToggleGroup label={language === "ar" ? "انخفاض المخزون" : "Low Stock Alert"} checked={settings.sysLowStock} onToggle={() => handleToggle('sysLowStock')} />
                                    <ToggleGroup label={language === "ar" ? "محاولات دخول فاشلة" : "Failed Login Attempts"} checked={settings.sysLoginFail} onToggle={() => handleToggle('sysLoginFail')} />
                                    <ToggleGroup label={language === "ar" ? "تحديثات النظام" : "System Updates"} checked={settings.sysUpdates} onToggle={() => handleToggle('sysUpdates')} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'payments':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                            <h2 className="text-2xl font-black mb-8 pb-4 border-b border-slate-50">{language === "ar" ? "بوابات الدفع الإلكتروني" : "Payment Gateways"}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <PaymentCard
                                    name="Stripe"
                                    logo="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                                    active={settings.stripe}
                                    onToggle={() => handleToggle('stripe')}
                                />
                                <PaymentCard
                                    name="PayPal"
                                    logo="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                    active={settings.paypal}
                                    onToggle={() => handleToggle('paypal')}
                                />
                                <PaymentCard
                                    name="Apple Pay"
                                    logo="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                                    active={settings.applePay}
                                    onToggle={() => handleToggle('applePay')}
                                />
                                <PaymentCard
                                    name="Bank Transfer"
                                    logo="https://cdn-icons-png.flaticon.com/512/2830/2830284.png"
                                    active={settings.bankTransfer}
                                    onToggle={() => handleToggle('bankTransfer')}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'backup':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                                <h2 className="text-2xl font-black">{language === "ar" ? "النسخ الاحتياطي والبيانات" : "Backup & Data"}</h2>
                                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-600 ring-1 ring-inset ring-emerald-500/20`}>
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {language === "ar" ? "النظام مؤمن" : "SYSTEM SECURED"}
                                </span>
                            </div>

                            <div className="space-y-10">
                                <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-lg group">
                                    <div className="h-24 w-24 rounded-3xl bg-white shadow-md flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                                        <Database className="h-12 w-12" />
                                    </div>
                                    <div className="flex-1 text-center md:text-right">
                                        <h4 className="text-2xl font-black mb-1 text-slate-900">{language === "ar" ? "آخر نسخة احتياطية" : "Last Backup Sent"}</h4>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                            <span className="text-sm font-bold text-slate-400 flex items-center gap-1"><Calendar size={14} /> 16 Jan 2026</span>
                                            <span className="text-sm font-bold text-slate-400 flex items-center gap-1"><Database size={14} /> 1.2 GB</span>
                                        </div>
                                    </div>
                                    <Button size="lg" className="rounded-2xl font-black flex items-center gap-3 py-7 px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                        <Download size={22} /> {language === "ar" ? "تحميل الآن" : "Download Now"}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 rounded-[2.5rem] border-2 border-slate-50 space-y-6 hover:border-primary/10 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-black">{language === "ar" ? "النسخ الاحتياطي التلقائي" : "Auto Backup"}</h4>
                                            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{language === "ar" ? "مفعل" : "ACTIVE"}</span>
                                        </div>
                                        <p className="text-sm text-slate-400 font-bold leading-relaxed">{language === "ar" ? "حدد الموعد الزمني المفضل للقيام بعملية النسخ التلقائي لكافة بيانات المتجر." : "Select the preferred time interval for automatic backup of all store data."}</p>
                                        <select className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 font-black text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer">
                                            <option>{language === "ar" ? "يومياً (صباحاً)" : "Daily (Morning)"}</option>
                                            <option>{language === "ar" ? "أسبوعياً" : "Weekly"}</option>
                                            <option>{language === "ar" ? "شهرياً" : "Monthly"}</option>
                                        </select>
                                    </div>
                                    <div className="p-10 rounded-[2.5rem] border-2 border-slate-50 space-y-6 hover:border-red-100 transition-colors group">
                                        <h4 className="text-lg font-black">{language === "ar" ? "تنظيف الذاكرة المؤقتة" : "Cache Management"}</h4>
                                        <p className="text-sm text-slate-400 font-bold leading-relaxed">{language === "ar" ? "يساعد مسح الذاكرة المؤقتة على تسريع لوحة التحكم وحل مشاكل العرض." : "Clearing the cache helps speed up the control panel and solve display issues."}</p>
                                        <Button
                                            onClick={handleClearCache}
                                            disabled={isClearingCache}
                                            variant="outline"
                                            className="w-full rounded-2xl font-black py-7 border-2 flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 hover:border-red-100 group-hover:scale-[1.02] transition-all"
                                        >
                                            {isClearingCache ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} /> {language === "ar" ? "جاري التنظيف..." : "Clearing..."}
                                                </>
                                            ) : (
                                                <>
                                                    <RefreshCcw size={20} /> {language === "ar" ? "مسح الذاكرة المؤقتة" : "Clear Cache Memory"}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t("admin.settings")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{language === "ar" ? "تعديل إعدادات المتجر، النظام، وتفضيلات الإدارة." : "Configure store settings, system, and admin preferences."}</p>
                </div>
                {activeTab !== 'backup' && (
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        variant="primary"
                        size="lg"
                        className="rounded-2xl font-black px-10 shadow-lg shadow-primary/20 flex items-center gap-3 hover:scale-105 transition-all py-7"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {language === "ar" ? "حفظ التغييرات" : "Save Changes"}
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Sidebar Navigation for Settings */}
                <div className="lg:col-span-1 space-y-4">
                    <SettingsNavButton
                        icon={Globe}
                        label={language === "ar" ? "إعدادات المتجر" : "Store Settings"}
                        active={activeTab === 'general'}
                        onClick={() => setActiveTab('general')}
                    />
                    <SettingsNavButton
                        icon={Lock}
                        label={language === "ar" ? "الأمان والخصوصية" : "Security & Privacy"}
                        active={activeTab === 'security'}
                        onClick={() => setActiveTab('security')}
                    />
                    <SettingsNavButton
                        icon={Bell}
                        label={language === "ar" ? "التنبيهات" : "Notifications"}
                        active={activeTab === 'notifications'}
                        onClick={() => setActiveTab('notifications')}
                    />
                    <SettingsNavButton
                        icon={CreditCard}
                        label={language === "ar" ? "بوابات الدفع" : "Payment Gateways"}
                        active={activeTab === 'payments'}
                        onClick={() => setActiveTab('payments')}
                    />
                    <SettingsNavButton
                        icon={Database}
                        label={language === "ar" ? "النسخ الاحتياطي" : "Backup & Data"}
                        active={activeTab === 'backup'}
                        onClick={() => setActiveTab('backup')}
                    />
                </div>

                {/* Main Settings Form */}
                <div className="lg:col-span-2 space-y-8">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

function SettingsNavButton({ icon: Icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-4 rounded-2xl px-6 py-6 text-base font-black transition-all ${active ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105 z-10' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 border border-transparent hover:border-slate-100 shadow-sm'}`}
        >
            <Icon size={24} className={active ? "animate-pulse" : ""} />
            {label}
        </button>
    );
}

function FormGroup({ label, value, isTextArea = false, onChange }: { label: string; value: string; isTextArea?: boolean, onChange?: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
            {isTextArea ? (
                <textarea
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all min-h-[120px]"
                    defaultValue={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                    defaultValue={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            )}
        </div>
    );
}

function ToggleGroup({ label, description, checked, onToggle }: { label: string; description?: string; checked: boolean; onToggle: () => void }) {
    return (
        <div className="flex items-center justify-between gap-10 group cursor-pointer" onClick={onToggle}>
            <div className="space-y-1">
                <p className="font-black text-slate-900 group-hover:text-primary transition-colors">{label}</p>
                {description && <p className="text-xs text-slate-400 font-bold">{description}</p>}
            </div>
            <button className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 focus:outline-none ${checked ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200'}`}>
                <span className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? (document.documentElement.dir === 'rtl' ? '-translate-x-8' : 'translate-x-8') : (document.documentElement.dir === 'rtl' ? '-translate-x-1' : 'translate-x-1')}`} />
            </button>
        </div>
    );
}

function PaymentCard({ name, logo, active, onToggle }: { name: string; logo: string; active: boolean; onToggle: () => void }) {
    const { language } = useLanguage();
    return (
        <div className={`relative group p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-2xl ${active ? 'border-primary/20 bg-primary/5' : 'border-slate-50 bg-white'}`}>
            <div className="flex items-center justify-between mb-8">
                <div className="relative h-12 w-28 grayscale group-hover:grayscale-0 transition-all">
                    <img src={logo} alt={name} className="h-full w-full object-contain" />
                </div>
                <button
                    onClick={onToggle}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${active ? (document.documentElement.dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') : (document.documentElement.dir === 'rtl' ? '-translate-x-1' : 'translate-x-1')}`} />
                </button>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h4 className="font-black text-xl text-slate-900">{name}</h4>
                    <span className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {active ? (language === "ar" ? "بوابة نشطة" : "ACTIVE GATEWAY") : (language === "ar" ? "معطلة حالياً" : "DISCONNECTED")}
                    </span>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-primary hover:shadow-md transition-all shadow-sm">
                    <Edit size={18} />
                </button>
            </div>
        </div>
    );
}

function Calendar({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function Edit({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    );
}
