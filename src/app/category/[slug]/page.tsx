"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/products?category=${slug}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, [slug]);

    const categoryNames: { [key: string]: string } = {
        'electronics': t('header.electronics'),
        'fashion': t('header.fashion'),
        'home': t('header.home'),
        'beauty': t('header.beauty'),
        'toys': t('header.toys'),
    };

    const title = categoryNames[slug] || slug;

    return (
        <div className="flex min-h-screen flex-col bg-muted-bg">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-16">
                <div className="mb-12">
                    <h1 className="text-3xl font-black tracking-tight mb-4">{title}</h1>
                    <p className="text-lg text-gray-500 font-bold">{t("category.browse", { name: title })}</p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="h-80 w-full animate-pulse rounded-2xl bg-white shadow-sm border border-black/5"></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/50 p-24 text-center">
                        <h2 className="mb-4 text-3xl font-black text-gray-400">{t("category.empty")}</h2>
                        <p className="text-xl text-gray-500 font-bold max-w-md">{t("category.emptyMessage")}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
            </main>

            <Footer />
        </div>
    );
}
