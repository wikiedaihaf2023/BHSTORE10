"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AddToCartButtonProps {
    id: string;
    name: string;
    price: number;
    image: string;
}

export function AddToCartButton({ id, name, price, image }: AddToCartButtonProps) {
    const cart = useCart();
    const { t } = useLanguage();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        cart.addItem({ id, name, price, image, quantity: 1 });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Button
            variant={isAdded ? "primary" : "accent"}
            size="md"
            className={`w-full group relative overflow-hidden transition-all duration-500 rounded-xl ${isAdded ? 'bg-emerald-600 shadow-emerald-200' : ''}`}
            onClick={handleAdd}
            disabled={isAdded}
        >
            <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${isAdded ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                <span className="font-black tracking-tight">{t("product.addToCart")}</span>
            </div>

            <div className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${isAdded ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
                <Check className="h-6 w-6" />
                <span className="font-black tracking-tight">{t("product.added")}</span>
            </div>
        </Button>
    );
}
