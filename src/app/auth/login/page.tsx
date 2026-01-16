"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const { t, language } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(language === "ar" ? "بريد إلكتروني أو كلمة مرور غير صحيحة" : "Invalid email or password");
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            setError(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-12 bg-white p-12 shadow-2xl rounded-[2.5rem] border border-black/5 ring-1 ring-black/5">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-black italic tracking-tighter text-primary">BH STORE</Link>
                    <h2 className="mt-8 text-3xl font-black tracking-tight text-gray-900">
                        {t("auth.login")}
                    </h2>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                )}

                <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                                {t("auth.email")}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                disabled={isLoading}
                                className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-4 text-gray-900 font-bold focus:border-primary focus:bg-white focus:outline-none focus:ring-0 transition-all text-lg disabled:opacity-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                                {t("auth.password")}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                                className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-4 text-gray-900 font-bold focus:border-primary focus:bg-white focus:outline-none focus:ring-0 transition-all text-lg disabled:opacity-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full font-black text-xl py-8 flex items-center justify-center gap-3 relative overflow-hidden transition-all active:scale-95"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span>{language === "ar" ? "جاري الدخول..." : "Logging in..."}</span>
                                </>
                            ) : (
                                t("auth.login")
                            )}
                        </Button>
                    </div>
                </form>

                <div className="text-center text-lg">
                    <p className="text-gray-500 font-bold">
                        {t("auth.noAccount")}{" "}
                        <Link href="/auth/register" className="font-black text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-2">
                            {t("auth.registerNow")}
                        </Link>
                    </p>
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
