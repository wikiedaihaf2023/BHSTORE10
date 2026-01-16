"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegisterPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || t("auth.regError"));
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-12 bg-white p-12 shadow-2xl rounded-[2.5rem] border border-black/5 ring-1 ring-black/5">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black italic tracking-tighter text-primary">BH STORE</Link>
                    <h1 className="mt-8 text-3xl font-black tracking-tight">{t("auth.register")}</h1>
                    <p className="mt-4 text-lg text-gray-500 font-bold">
                        {t("auth.registerSubtitle")}
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-6 text-base text-red-600 border border-red-100 font-bold animate-in fade-in zoom-in-95">
                        <AlertCircle className="h-6 w-6 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-6 text-base text-green-600 border border-green-100 font-bold animate-in fade-in zoom-in-95">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                        <p>{t("auth.regSuccess")}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1" htmlFor="name">
                                {t("auth.name")}
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder={t("auth.regNamePlaceholder")}
                                className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1" htmlFor="email">
                                {t("auth.email")}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder={t("auth.regEmailPlaceholder")}
                                className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1" htmlFor="password">
                                {t("auth.password")}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-lg font-bold focus:border-primary focus:bg-white focus:outline-none transition-all"
                            />
                            <p className="text-xs text-gray-400 font-bold px-1 mt-2">{t("auth.regPasswordNote")}</p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || success}
                        variant="primary"
                        size="lg"
                        className="w-full py-8 text-xl font-black shadow-xl"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span>{t("checkout.processing")}</span>
                            </div>
                        ) : (
                            <span>{t("auth.register")}</span>
                        )}
                    </Button>
                </form>

                <div className="text-center pt-8 border-t border-gray-100">
                    <p className="text-lg text-gray-500 font-bold">
                        {t("auth.haveAccount")}{" "}
                        <Link href="/auth/login" className="font-black text-primary hover:text-accent transition-all underline underline-offset-4 decoration-2">
                            {t("auth.loginNow")}
                        </Link>
                    </p>
                </div>

                <div className="text-center text-xs font-bold text-gray-400 max-w-sm mx-auto leading-relaxed">
                    {t("auth.regAgree")}
                </div>
            </div>

            <div className="mt-16 text-center text-sm font-bold text-gray-400">
                <div className="flex justify-center gap-8 mb-4 uppercase tracking-widest">
                    <Link href="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</Link>
                    <Link href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
                    <Link href="/help" className="hover:text-primary transition-colors">{t("footer.helpCenter")}</Link>
                </div>
                <p className="opacity-50">{t("footer.copyright")}</p>
            </div>
        </div>
    );
}
