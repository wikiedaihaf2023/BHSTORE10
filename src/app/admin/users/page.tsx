"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Shield, User, Filter, Mail, Calendar, Save, X, Loader2, Key, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Modal } from "@/components/admin/Modal";

interface DBUser {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<DBUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<DBUser | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/users");
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to fetch users");
            }
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error("Failed to fetch users:", error);
            setError(error.message || "Something went wrong while fetching users.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "USER"
        });
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (user: DBUser) => {
        setEditingUser(user);
        setFormData({
            name: user.name || "",
            email: user.email || "",
            password: "",
            role: user.role
        });
        setIsAddModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users";
            const method = editingUser ? "PATCH" : "POST";

            const payload = editingUser
                ? { name: formData.name, email: formData.email, role: formData.role }
                : formData;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await fetchUsers();
                setIsAddModalOpen(false);
                alert(language === "ar" ? "تمت العملية بنجاح!" : "Operation successful!");
            } else {
                const data = await res.json();
                alert(data.error || (language === "ar" ? "حدث خطأ ما" : "Something went wrong"));
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert(language === "ar" ? "فشل الاتصال بالخادم" : "Server connection failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(language === "ar" ? "هل أنت متأكد من الحذف؟" : "Are you sure you want to delete?")) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert(language === "ar" ? "فشل الحذف" : "Deletion failed");
        }
    };

    const getRoleInfo = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return {
                    label: t("admin.roleAdmin"),
                    style: 'bg-indigo-100 text-indigo-700 ring-indigo-500/20',
                    icon: Shield
                };
            default:
                return {
                    label: t("admin.roleCustomer"),
                    style: 'bg-slate-100 text-slate-700 ring-slate-500/20',
                    icon: User
                };
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t("admin.users")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{language === "ar" ? "إدارة المستخدمين، الصلاحيات، وحسابات العملاء." : "Manage users, permissions, and customer accounts."}</p>
                </div>
                <Button
                    onClick={handleOpenAddModal}
                    variant="accent" size="lg" className="rounded-2xl font-black shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105 transition-all"
                >
                    <Plus className="h-6 w-6" /> {t("admin.addUser")}
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder={language === "ar" ? "ابحث بالاسم أو البريد الإلكتروني..." : "Search by name or email..."}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 pr-12 pl-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className={`absolute ${language === "ar" ? "right-4" : "left-4"} top-4.5 h-6 w-6 text-slate-300`} />
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white shadow-2xl shadow-slate-200/40 ring-1 ring-black/5 transition-all">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                            <div className="p-4 rounded-full bg-red-50 text-red-500">
                                <AlertCircle size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">{language === "ar" ? "عذراً، حدث خطأ" : "Oops, an error occurred"}</h3>
                                <p className="text-slate-500 font-bold max-w-md mx-auto">{error}</p>
                            </div>
                            <Button onClick={fetchUsers} variant="outline" className="rounded-xl font-black border-2">
                                {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className={`bg-slate-50/50 text-slate-400 border-b border-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                <tr>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.userName")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.userRole")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.lastLogin")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <p className="text-slate-400 font-black text-lg">
                                                {language === "ar" ? "لا يوجد مستخدمون مطابقون لبحثك." : "No users found matching your search."}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary text-xl border-2 border-primary/10 shadow-inner group-hover:scale-110 transition-transform">
                                                        {user.name?.[0] || 'U'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-900 text-lg">{user.name || "N/A"}</span>
                                                        <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                                                            <Mail size={14} />
                                                            <span className="text-xs lowercase">{user.email || "N/A"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest ring-1 ring-inset ${getRoleInfo(user.role).style}`}>
                                                    {React.createElement(getRoleInfo(user.role).icon, { size: 14 })}
                                                    {getRoleInfo(user.role).label}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-500 font-bold">
                                                    <Calendar size={14} className="text-slate-300" />
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US") : "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleOpenEditModal(user)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all">
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-md transition-all">
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title={editingUser ? (language === "ar" ? "تعديل مستخدم" : "Edit User") : t("admin.addUser")}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormGroup label={t("auth.name")} value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                    <FormGroup label={t("auth.email")} type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {!editingUser && <FormGroup label={t("auth.password")} type="password" value={formData.password} onChange={(v) => setFormData({ ...formData, password: v })} />}
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">{t("admin.userRole")}</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 font-black text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="USER">{t("admin.roleCustomer")}</option>
                                <option value="ADMIN">{t("admin.roleAdmin")}</option>
                            </select>
                        </div>
                    </div>

                    {formData.role === "ADMIN" && (
                        <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100 space-y-2">
                            <h4 className="flex items-center gap-2 font-black text-amber-800 text-sm">
                                <Key size={16} /> {language === "ar" ? "ملاحظة حول الصلاحيات" : "Note about Permissions"}
                            </h4>
                            <p className="text-xs text-amber-700 font-bold leading-relaxed">
                                {language === "ar"
                                    ? "المشرفون لديهم وصول كامل إلى لوحة التحكم. يرجى توخي الحذر عند منح هذه الصلاحية."
                                    : "Admins have full access to the control panel. Please be careful when granting this permission."}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                        <Button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            variant="outline" size="lg" className="rounded-2xl font-black px-8 border-2"
                        >
                            {language === "ar" ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="primary" size="lg" className="rounded-2xl font-black px-10 shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {language === "ar" ? "حفظ" : "Save"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

function FormGroup({ label, value, isTextArea = false, type = "text", onChange }: { label: string; value?: string; isTextArea?: boolean, type?: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
            <input
                type={type}
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:outline-none focus:border-primary focus:bg-white transition-all"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    );
}
