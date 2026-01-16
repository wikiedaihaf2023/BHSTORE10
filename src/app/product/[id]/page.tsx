"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star, ShieldCheck, Truck, RefreshCcw, Loader2 } from "lucide-react";
import ReviewSystem from "@/components/product/ReviewSystem";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { language, t } = useLanguage();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col bg-muted-bg">
                <Header />
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-16 w-16 animate-spin text-accent" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const reviews = product.reviews.map((r: any) => ({
        id: r.id,
        userName: r.user?.name || t("product.customer"),
        rating: r.rating,
        comment: r.comment,
        date: new Date(r.createdAt).toLocaleDateString(language === "ar" ? 'ar-SA' : 'en-US')
    }));

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="container mx-auto flex-1 px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Images Section */}
                    <div className="space-y-6">
                        <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-black/5 bg-gray-50 p-12 transition-all hover:shadow-2xl">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-8 transition-transform duration-700 hover:scale-110"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-[1.2] mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex text-accent">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-6 w-6 ${i < 4 ? 'fill-current' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <span className="text-lg font-black text-blue-500 bg-blue-50 px-4 py-1 rounded-full">
                                {t("product.reviewsCount", { count: product._count?.reviews || 0 })}
                            </span>
                        </div>

                        <div className="bg-gray-50/50 p-6 rounded-2xl mb-10 border border-black/5">
                            <div className="flex items-center gap-6 mb-4">
                                <span className="text-3xl font-black text-primary">
                                    {product.price.toLocaleString()} <span className="text-xl font-bold uppercase">{language === "ar" ? "ر.س" : "SAR"}</span>
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-xl text-gray-400 line-through font-bold">
                                        {(product.price * 1.2).toFixed(0)} {language === "ar" ? "ر.س" : "SAR"}
                                    </span>
                                    <span className="text-sm font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg mt-1 w-fit">
                                        {language === "ar" ? "وفر 20%" : "Save 20%"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 mb-12">
                            <p className="text-gray-600 leading-relaxed text-xl font-medium">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-auto space-y-6">
                            <div className="max-w-md">
                                <AddToCartButton
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6 max-w-md">
                                <div className="flex flex-col items-center p-6 border-2 border-gray-100 rounded-2xl text-center bg-white transition-colors hover:border-primary/20">
                                    <Truck className="h-8 w-8 text-primary mb-3" />
                                    <span className="text-sm font-black text-gray-900">{t("product.freeShipping")}</span>
                                </div>
                                <div className="flex flex-col items-center p-6 border-2 border-gray-100 rounded-2xl text-center bg-white transition-colors hover:border-primary/20">
                                    <RefreshCcw className="h-8 w-8 text-primary mb-3" />
                                    <span className="text-sm font-black text-gray-900">{t("product.freeReturns")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center gap-3 text-base text-gray-500 font-black uppercase tracking-wider bg-gray-50 w-fit px-6 py-2 rounded-full border border-black/5">
                            <ShieldCheck className="h-6 w-6 text-green-600" /> {t("product.secureShopping")}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-32">
                    <ReviewSystem productId={product.id} initialReviews={reviews} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
