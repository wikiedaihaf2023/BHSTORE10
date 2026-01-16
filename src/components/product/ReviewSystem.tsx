"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewSystemProps {
    productId: string;
    initialReviews: Review[];
}

export default function ReviewSystem({ productId, initialReviews }: ReviewSystemProps) {
    const { t } = useLanguage();
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0) return alert(t("reviews.alert"));

        const review: Review = {
            id: Math.random().toString(),
            userName: t("product.customer"),
            rating: newRating,
            comment: newComment,
            date: t("reviews.now")
        };

        setReviews([review, ...reviews]);
        setNewRating(0);
        setNewComment("");
    };

    return (
        <div className="space-y-12 py-16 border-t border-black/5">
            <h2 className="text-2xl font-black tracking-tight">{t("reviews.title")}</h2>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                {/* Review Form */}
                <div className="lg:col-span-1 border border-black/5 rounded-2xl p-8 bg-white h-fit shadow-xl ring-1 ring-black/5">
                    <h3 className="text-lg font-bold mb-6">{t("reviews.add")}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`h-8 w-8 transition-colors ${(hoverRating || newRating) >= star
                                            ? 'fill-accent text-accent'
                                            : 'text-gray-200'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full border-2 border-gray-100 rounded-xl p-4 text-base focus:border-accent focus:ring-0 focus:outline-none min-h-[150px] transition-colors resize-none font-medium"
                            placeholder={t("reviews.placeholder")}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
                        <Button variant="accent" size="lg" className="w-full font-black text-lg">
                            {t("reviews.submit")}
                        </Button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-10">
                    {reviews.length === 0 ? (
                        <div className="p-12 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold italic text-lg">{t("reviews.empty")}</p>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 transition-all hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center font-black text-primary text-base border-2 border-primary/10">
                                            {review.userName[0]}
                                        </div>
                                        <div>
                                            <div className="font-black text-lg">{review.userName}</div>
                                            <div className="flex text-accent mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 mr-auto bg-gray-50 px-3 py-1 rounded-full">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium leading-relaxed text-base">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
