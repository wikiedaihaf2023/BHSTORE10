"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, Filter, Save, X, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { Modal } from "@/components/admin/Modal";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
    category: {
        name: string;
    } | null;
}

interface Category {
    id: string;
    name: string;
}

export default function AdminProductsPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch("/api/admin/products"),
                fetch("/api/admin/categories")
            ]);

            if (!productsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch product data");

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            setProducts(Array.isArray(productsData) ? productsData : []);
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);

            if (categoriesData.length > 0 && !formData.categoryId) {
                setFormData(prev => ({ ...prev, categoryId: categoriesData[0].id }));
            }
        } catch (error: any) {
            console.error("Failed to fetch data:", error);
            setError(error.message || "Something went wrong while loading products.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: categories[0]?.id || "",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
        });
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            description: product.description || "",
            price: (product.price || 0).toString(),
            stock: (product.stock || 0).toString(),
            categoryId: product.categoryId || "",
            image: product.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
        });
        setIsAddModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products";
            const method = editingProduct ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price || "0"),
                    stock: parseInt(formData.stock || "0")
                })
            });

            if (res.ok) {
                await fetchData();
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
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const filteredProducts = products.filter(p =>
        (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t("admin.products")}</h1>
                    <p className="text-lg text-slate-500 font-bold">{language === "ar" ? "إضافة، تعديل، وحذف المنتجات في متجرك." : "Add, edit, and delete products in your store."}</p>
                </div>
                <Button
                    onClick={handleOpenAddModal}
                    variant="accent" size="lg" className="rounded-2xl font-black shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105 transition-all"
                >
                    <Plus className="h-6 w-6" /> {language === "ar" ? "إضافة منتج جديد" : "Add New Product"}
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 rounded-[2rem] border border-black/5 bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-black/5">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder={language === "ar" ? "ابحث عن منتج بالاسم..." : "Search for a product by name..."}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 pr-12 pl-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className={`absolute ${language === "ar" ? "right-4" : "left-4"} top-4.5 h-6 w-6 text-slate-300`} />
                </div>
            </div>

            {/* Products Table */}
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
                            <Button onClick={fetchData} variant="outline" className="rounded-xl border-2">
                                {language === "ar" ? "إعادة المحاولة" : "Try Again"}
                            </Button>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className={`bg-slate-50/50 text-slate-400 border-b border-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                <tr>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "المنتج" : "Product"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الفئة" : "Category"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "السعر" : "Price"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "المخزون" : "Stock"}</th>
                                    <th className="px-8 py-6 font-black uppercase tracking-widest text-xs">{language === "ar" ? "الإجراءات" : "Actions"}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-slate-50 ${language === "ar" ? "text-right" : "text-left"}`}>
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-black">
                                            {language === "ar" ? "لا توجد منتجات" : "No products found"}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-black/5">
                                                        <Image src={product.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200"} alt={product.name || "Product"} fill className="object-cover transition-transform group-hover:scale-110" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-900 text-base">{product.name || "N/A"}</span>
                                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">ID: {product.id?.slice(-6) || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 uppercase tracking-widest">
                                                    {product.category?.name || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-lg text-primary">
                                                    {(product.price || 0).toLocaleString()}
                                                    <span className="text-[10px] font-bold opacity-40 ml-1 uppercase">{language === "ar" ? "ر.س" : "SAR"}</span>
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-base font-black ${(product.stock || 0) < 15 ? 'text-red-500' : 'text-slate-900'}`}>
                                                        {product.stock || 0}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleOpenEditModal(product)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all">
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
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
                title={editingProduct ? (language === "ar" ? "تعديل منتج" : "Edit Product") : (language === "ar" ? "إضافة منتج جديد" : "Add New Product")}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup
                            label={language === "ar" ? "اسم المنتج" : "Product Name"}
                            value={formData.name}
                            onChange={(v) => setFormData({ ...formData, name: v })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">{language === "ar" ? "الفئة" : "Category"}</label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 font-black text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label={language === "ar" ? "السعر" : "Price"} type="number" value={formData.price} onChange={(v) => setFormData({ ...formData, price: v })} />
                        <FormGroup label={language === "ar" ? "المخزون" : "Stock"} type="number" value={formData.stock} onChange={(v) => setFormData({ ...formData, stock: v })} />
                    </div>

                    <FormGroup label={language === "ar" ? "الوصف" : "Description"} isTextArea value={formData.description} onChange={(v) => setFormData({ ...formData, description: v })} />

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
            {isTextArea ? (
                <textarea
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all min-h-[120px]"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            ) : (
                <input
                    type={type}
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 py-4 px-6 text-slate-900 font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                />
            )}
        </div>
    );
}
