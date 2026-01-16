"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
    id: string;
    name: string;
}

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') || "all";
    const { t } = useLanguage();

    const [activeCategory, setActiveCategory] = useState(categoryParam);
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Sync state with URL parameter changes
    useEffect(() => {
        setActiveCategory(categoryParam);
    }, [categoryParam]);

    useEffect(() => {
        setCategories([
            { id: 'electronics', name: t('products.electronics') },
            { id: 'fashion', name: t('products.fashion') },
            { id: 'home', name: t('products.home') }
        ]);
    }, [t]);

    useEffect(() => {
        setIsLoading(true);
        const url = activeCategory === 'all' ? '/api/products' : `/api/products?category=${activeCategory}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, [activeCategory]);

    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex flex-col gap-6 px-4 py-12 md:flex-row">
                {/* Sidebar Filters - Desktop */}
                <aside className="hidden w-64 flex-shrink-0 space-y-8 md:block">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                        <h3 className="mb-6 font-black text-lg tracking-tight border-b pb-4">{t("products.categories")}</h3>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => setActiveCategory("all")}
                                    className={`w-full text-right text-base transition-all hover:text-accent font-bold ${activeCategory === "all" ? 'text-accent translate-x-1' : 'text-gray-500'}`}
                                >
                                    {t("products.all")}
                                </button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`w-full text-right text-base transition-all hover:text-accent font-bold ${activeCategory === cat.id ? 'text-accent translate-x-1' : 'text-gray-500'}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Listing Area */}
                <div className="flex-1 space-y-8">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-6 py-4 shadow-sm">
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                            {isLoading ? t("products.loading") : t("products.found", { count: products.length })}
                        </span>
                    </div>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="h-80 w-full animate-pulse rounded-2xl bg-white shadow-sm border border-black/5"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product: any) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                    image={product.image}
                                    rating={4.5}
                                    reviewsCount={product._count?.reviews || 0}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-muted-bg">
                <Loader2 className="h-16 w-16 animate-spin text-accent" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
