import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "متجر بي إتش | BH Store",
  description: "منصة التسوق الإلكتروني الشاملة - أفضل المنتجات بأفضل الأسعار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoKufiArabic.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
