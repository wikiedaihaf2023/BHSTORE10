"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewsCount: number;
}

export default function ProductCard({ id, name, price, image, rating, reviewsCount }: ProductCardProps) {
    const { language, t } = useLanguage();

    return (
        <div className="group flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ring-1 ring-black/5">
            <Link href={`/product/${id}`} className="relative mb-6 h-52 w-full overflow-hidden rounded-xl bg-gray-50 p-4">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            <Link href={`/product/${id}`} className="mb-3 line-clamp-2 h-12 text-base font-bold leading-snug hover:text-accent transition-colors">
                {name}
            </Link>

            <div className="mb-4 flex items-center gap-2">
                <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                </div>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                    {reviewsCount} {t("product.reviews")}
                </span>
            </div>

            <div className="mb-6 flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-primary">
                        {price.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-primary/60">
                        {language === "ar" ? "ر.س" : "SAR"}
                    </span>
                </div>
                <span className="text-sm text-gray-400 line-through font-medium">
                    {(price * 1.2).toFixed(0)} {language === "ar" ? "ر.س" : "SAR"}
                </span>
            </div>

            <div className="w-full mt-auto">
                <AddToCartButton
                    id={id}
                    name={name}
                    price={price}
                    image={image}
                />
            </div>
        </div>
    );
}
