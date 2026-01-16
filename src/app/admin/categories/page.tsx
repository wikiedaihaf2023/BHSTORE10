"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, ListTree, Filter, Save, X, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { Modal } from "@/components/admin/Modal";

interface Category {
    id: string;
    name: string;
    slug: string;
    _count?: {
        products: number;
    };
    image?: string;
}

export default function AdminCategoriesPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800"
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error("Failed to fetch categories:", error);
            setError(error.message || "Something went wrong while loading categories.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingCategory(null);
        setFormData({
            name: "",
            slug: "",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800"
        });
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (cat: Category) => {
        setEditingCategory(cat);
        setFormData({
            name: cat.name || "",
            slug: cat.slug || "",
            image: cat.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800"
        });
        setIsAddModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories";
            const method = editingCategory ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchCategories();
                setIsAddModalOpen(false);
                alert(language === "ar" ? "تمت العملية بنجاح!" : "Operation successful!");
            } else {
                alert(language === "ar" ? "حدث خطأ ما" : "Something went wrong");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Connection error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(language === "ar" ? "هل أنت متأكد من الحذف؟" : "Are you sure you want to delete?")) return;

        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
            if (res.ok) {
                setCategories(categories.filter(c => c.id !== id));
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const filteredCategories = categories.filter(c =>
        (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{t("admin.categories")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{language === "ar" ? "إدارة تصنيفات المنتجات والأقسام الرئيسية." : "Manage product categories and main sections."}</p>
                </div>
                <Button
                    onClick={handleOpenAddModal}
                    variant="accent" size="lg" className="rounded-2xl font-black shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105 transition-all"
                >
                    <Plus className="h-6 w-6" /> {t("admin.addCategory")}
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder={language === "ar" ? "ابحث عن تصنيف..." : "Search for a category..."}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 pr-12 pl-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className={`absolute ${language === "ar" ? "right-4" : "left-4"} top-4.5 h-6 w-6 text-slate-300`} />
                </div>
            </div>

            {/* Content */}
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
                            <Button onClick={fetchCategories} variant="outline" className="rounded-xl border-2">
                                {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className={`bg-slate-50/50 text-slate-400 border-b border-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                <tr>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.categoryName")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.categorySlug")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.productCount")}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{t("admin.actions")}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                {filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-black">
                                            {language === "ar" ? "لا توجد تصنيفات" : "No categories found"}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-black/5">
                                                        <Image src={cat.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=200"} alt={cat.name || "Category"} fill className="object-cover transition-transform group-hover:scale-110" />
                                                    </div>
                                                    <span className="font-black text-slate-900 text-lg">{cat.name || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center rounded-xl bg-primary/5 px-4 py-2 text-xs font-black text-primary uppercase tracking-widest border border-primary/10">
                                                    /{cat.slug || "n-a"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-xl text-slate-900">{cat._count?.products || 0}</span>
                                                    <span className="text-xs font-bold text-slate-400 uppercase">{t("cart.products")}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleOpenEditModal(cat)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
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
                title={editingCategory ? (language === "ar" ? "تعديل تصنيف" : "Edit Category") : t("admin.addCategory")}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup
                            label={language === "ar" ? "اسم التصنيف" : "Category Name"}
                            value={formData.name}
                            onChange={(v) => setFormData({ ...formData, name: v })}
                        />
                        <FormGroup
                            label={language === "ar" ? "الاسم اللطيف (Slug)" : "Slug"}
                            value={formData.slug}
                            onChange={(v) => setFormData({ ...formData, slug: v })}
                            placeholder="e.g. electronics"
                        />
                    </div>

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

function FormGroup({ label, value, isTextArea = false, type = "text", placeholder = "", onChange }: { label: string; value?: string; isTextArea?: boolean, type?: string, placeholder?: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
            <input
                type={type}
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:outline-none focus:border-primary focus:bg-white transition-all"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required
            />
        </div>
    );
}
