"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    ar: {
        // Header
        "header.store": "متجر بي إتش",
        "header.search": "ابحث عن المنتجات...",
        "header.hello": "مرحباً بك،",
        "header.login": "تسجيل الدخول",
        "header.cart": "السلة",
        "header.myAccount": "حسابي",
        "header.all": "الكل",
        "header.electronics": "الإلكترونيات",
        "header.fashion": "الأزياء",
        "header.home": "المنزل والمطبخ",
        "header.beauty": "الجمال",
        "header.toys": "الألعاب",
        "header.deals": "عروض اليوم",
        "header.categories": "الفئات",

        // Home
        "home.heroTitle": "عروض الشتاء الكبرى!",
        "home.heroSubtitle": "خصومات تصل إلى 50% على أفضل الماركات العالمية.",
        "home.shopNow": "تسوق الآن",
        "home.bestSellers": "الأكثر مبيعاً",
        "home.viewMore": "عرض المزيد",
        "home.catElectronics": "إلكترونيات مبتكرة",
        "home.catFashion": "أحدث صيحات الموضة",
        "home.catHome": "مستلزمات المنزل",
        "home.catDeals": "عروض حصرية",

        // Auth
        "auth.login": "تسجيل الدخول",
        "auth.register": "إنشاء حساب",
        "auth.email": "البريد الإلكتروني",
        "auth.password": "كلمة المرور",
        "auth.name": "الاسم الكامل",
        "auth.noAccount": "ليس لديك حساب؟",
        "auth.registerNow": "إنشاء حساب جديد",
        "auth.haveAccount": "لديك حساب بالفعل؟",
        "auth.loginNow": "تسجيل الدخول الآن",
        "auth.registerSubtitle": "انضم إلينا اليوم واستمتع بتجربة تسوق فريدة",
        "auth.regNamePlaceholder": "أدخل اسمك الكامل",
        "auth.regEmailPlaceholder": "البريد الإلكتروني الإلكتروني",
        "auth.regPasswordNote": "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
        "auth.regSuccess": "تم إنشاء الحساب بنجاح! يتم توجيهك لصفحة تسجيل الدخول...",
        "auth.regError": "حدث خطأ ما",
        "auth.regAgree": "بالنقر على 'إنشاء الحساب'، فإنك توافق على شروط الاستخدام و سياسة الخصوصية الخاصة بنا.",

        // Products Page
        "products.categories": "التصنيفات",
        "products.all": "الكل",
        "products.found": "تم العثور على {count} منتجات",
        "products.loading": "جاري التحميل...",
        "products.electronics": "إلكترونيات",
        "products.fashion": "أزياء",
        "products.home": "المنزل والمطبخ",

        // Category Page
        "category.browse": "تصفح أفضل العروض في قسم {name}",
        "category.empty": "لا توجد منتجات حالياً",
        "category.emptyMessage": "سنقوم بإضافة منتجات جديدة لهذا القسم قريباً!",

        // Product Page
        "product.description": "الوصف",
        "product.specifications": "المواصفات",
        "product.reviews": "آراء العملاء",
        "product.reviewsCount": "({count}) تقييم",
        "product.addToCart": "إضافة للسلة",
        "product.added": "تمت الإضافة!",
        "product.inStock": "متوفر في المخزون",
        "product.freeShipping": "شحن مجاني",
        "product.freeReturns": "إرجاع مجاني",
        "product.secureShopping": "تسوق آمن 100% مع ضمان BH",
        "product.customer": "عميل BH",

        // Reviews
        "reviews.title": "تقييمات العملاء",
        "reviews.add": "أضف تقييمك",
        "reviews.placeholder": "اكتب رأيك في المنتج...",
        "reviews.submit": "إرسال التقييم",
        "reviews.empty": "لا توجد تقييمات لهذا المنتج بعد. كن أول من يقيمه!",
        "reviews.alert": "يرجى اختيار تقييم",
        "reviews.now": "الآن",

        // Deals Page
        "deals.title": "عروض التوفير",
        "deals.heroTitle": "توفير لا يصدق!",
        "deals.heroSubtitle": "خصومات تصل إلى 70% على أكثر من 1,000 منتج لفترة محدودة.",
        "deals.lightningDeals": "عروض البرق",
        "deals.endsIn": "ينتهي العرض خلال:",
        "deals.hours": "ساعة",
        "deals.minutes": "دقيقة",
        "deals.seconds": "ثانية",
        "deals.hot": "الأكثر سخونة",
        "deals.highest": "أعلى الخصومات",
        "deals.endingSoon": "أوشكت على الانتهاء",
        "deals.newlyArrived": "وصلت حديثاً",
        "deals.todayDeals": "عروض اليوم المميزة",
        "deals.off": "خصم {percent}%",

        // Cart
        "cart.title": "سلة التسوق",
        "cart.empty": "سلة التسوق فارغة",
        "cart.emptyMessage": "يبدو أنك لم تضف أي منتجات إلى سلتك بعد.",
        "cart.startShopping": "ابدأ التسوق الآن",
        "cart.inStock": "متوفر في المخزون",
        "cart.delete": "حذف",
        "cart.orderSummary": "ملخص الطلب",
        "cart.subtotal": "المجموع الفرعي",
        "cart.products": "منتجات",
        "cart.shipping": "الشحن",
        "cart.free": "مجاني",
        "cart.total": "الإجمالي الأساسي",
        "cart.checkout": "إتمام عملية الشراء",
        "cart.vatNote": "الأسعار تشمل ضريبة القيمة المضافة حيثما ينطبق ذلك.",
        "cart.quantity": "الكمية",

        // Checkout
        "checkout.title": "إتمام الطلب",
        "checkout.orderSummary": "ملخص الطلب",
        "checkout.quantity": "الكمية:",
        "checkout.total": "الإجمالي",
        "checkout.payButton": "الدفع والاستكمال",
        "checkout.processing": "جاري المعالجة...",
        "checkout.paymentInfo": "معلومات الدفع",
        "checkout.paymentMessage": "سيتم توجيهك إلى بوابة الدفع الآمنة لإكمال عملية الشراء.",
        "checkout.emptyCart": "عربة التسوق فارغة",
        "checkout.backToShopping": "العودة للتسوق",
        "checkout.securePaymentNote": "جميع معاملاتك المالية مشفرة وآمنة تماماً. نحن لا نقوم بتخزين تفاصيل بطاقتك الائتمانية.",

        // Success
        "success.title": "تم تأكيد طلبك!",
        "success.message": "شكرًا لتسوقك من متجر بي إتش. تم استلام طلبك وهو الآن قيد المعالجة.",
        "success.trackOrder": "تتبع طلبك",
        "success.backHome": "العودة للرئيسية",
        "success.securePayment": "عملية دفع آمنة مشفرة",

        // Footer
        "footer.backToTop": "العودة للأعلى",
        "footer.aboutUs": "تعرف علينا",
        "footer.about": "عن متجر بي إتش",
        "footer.careers": "وظائف",
        "footer.press": "علاقاتنا",
        "footer.partner": "كن شريكاً لنا",
        "footer.sell": "البيع على متجرنا",
        "footer.affiliate": "التسويق بالعمولة",
        "footer.advertise": "الإعلان عن منتجاتك",
        "footer.payment": "طرق الدفع والخدمات",
        "footer.giftCards": "بطاقات الهدايا",
        "footer.conversion": "محول العملات",
        "footer.shipping": "تتبع الشحنات",
        "footer.help": "المساعدة",
        "footer.account": "حسابك",
        "footer.returns": "سياسة الاسترجاع",
        "footer.helpCenter": "مركز المساعدة",
        "footer.terms": "شروط الاستخدام",
        "footer.privacy": "إشعار الخصوصية",
        "footer.ads": "إعلاناتك بناءً على اهتماماتك",
        "footer.copyright": "© 2026، متجر بي إتش. جميع الحقوق محفوظة.",

        // Admin
        "admin.title": "لوحة الإدارة",
        "admin.overview": "نظرة عامة",
        "admin.products": "المنتجات",
        "admin.categories": "التصنيفات",
        "admin.orders": "الطلبات",
        "admin.users": "المستخدمين",
        "admin.settings": "الإعدادات",
        "admin.logout": "تسجيل الخروج",
        "admin.welcome": "مرحباً بك مجدداً في لوحة التحكم الإدارية.",
        "admin.totalSales": "إجمالي المبيعات",
        "admin.newOrders": "الطلبات الجديدة",
        "admin.activeProducts": "المنتجات النشطة",
        "admin.newCustomers": "العملاء الجدد",
        "admin.recentOrders": "آخر الطلبات",
        "admin.productPerformance": "أداء المنتجات",
        "admin.orderId": "طلب #",
        "admin.processing": "قيد المعالجة",
        "admin.completed": "مكتمل",
        "admin.cancelled": "ملغي",
        "admin.viewAll": "عرض الكل",
        "admin.trending": "مقارنة بالشهر السابق",
        "admin.addCategory": "إضافة تصنيف جديد",
        "admin.editCategory": "تعديل التصنيف",
        "admin.categoryName": "اسم التصنيف",
        "admin.categorySlug": "الاسم اللطيف (Slug)",
        "admin.productCount": "عدد المنتجات",
        "admin.categoryImage": "صورة التصنيف",
        "admin.actions": "الإجراءات",
        "admin.userName": "اسم المستخدم",
        "admin.userEmail": "البريد الإلكتروني",
        "admin.userRole": "الصلاحية",
        "admin.userStatus": "الحالة",
        "admin.userActive": "نشط",
        "admin.userBanned": "محظور",
        "admin.userAdmin": "مدير",
        "admin.userCustomer": "عميل",
        "admin.addUser": "إضافة مستخدم جديد",
        "admin.roleAdmin": "مشرف",
        "admin.roleCustomer": "مشتري",
        "admin.lastLogin": "آخر ظهور",
    },
    en: {
        // Header
        "header.store": "BH STORE",
        "header.search": "Search for products...",
        "header.hello": "Hello,",
        "header.login": "Sign In",
        "header.cart": "Cart",
        "header.myAccount": "My Account",
        "header.all": "All",
        "header.electronics": "Electronics",
        "header.fashion": "Fashion",
        "header.home": "Home & Kitchen",
        "header.beauty": "Beauty",
        "header.toys": "Toys",
        "header.deals": "Today's Deals",
        "header.categories": "Categories",

        // Home
        "home.heroTitle": "Great Winter Deals!",
        "home.heroSubtitle": "Up to 50% off on top international brands.",
        "home.shopNow": "Shop Now",
        "home.bestSellers": "Best Sellers",
        "home.viewMore": "View More",
        "home.catElectronics": "Innovative Electronics",
        "home.catFashion": "Latest Fashion Trends",
        "home.catHome": "Home Essentials",
        "home.catDeals": "Exclusive Deals",

        // Auth
        "auth.login": "Sign In",
        "auth.register": "Create Account",
        "auth.email": "Email Address",
        "auth.password": "Password",
        "auth.name": "Full Name",
        "auth.noAccount": "Don't have an account?",
        "auth.registerNow": "Register now",
        "auth.haveAccount": "Already have an account?",
        "auth.loginNow": "Sign in now",
        "auth.registerSubtitle": "Join us today and enjoy a unique shopping experience",
        "auth.regNamePlaceholder": "Enter your full name",
        "auth.regEmailPlaceholder": "example@bhstore.com",
        "auth.regPasswordNote": "Password must be at least 8 characters",
        "auth.regSuccess": "Account created successfully! Redirecting to login...",
        "auth.regError": "Something went wrong",
        "auth.regAgree": "By clicking 'Create Account', you agree to our Terms of Use and Privacy Policy.",

        // Products Page
        "products.categories": "Categories",
        "products.all": "All",
        "products.found": "Found {count} products",
        "products.loading": "Loading...",
        "products.electronics": "Electronics",
        "products.fashion": "Fashion",
        "products.home": "Home & Kitchen",

        // Category Page
        "category.browse": "Browse the best offers in {name}",
        "category.empty": "No products available currently",
        "category.emptyMessage": "We will add new products to this section soon!",

        // Product Page
        "product.description": "Description",
        "product.specifications": "Specifications",
        "product.reviews": "Customer Reviews",
        "product.reviewsCount": "({count}) reviews",
        "product.addToCart": "Add to Cart",
        "product.added": "Added!",
        "product.inStock": "In Stock",
        "product.freeShipping": "Free Shipping",
        "product.freeReturns": "Free Returns",
        "product.secureShopping": "100% Secure Shopping with BH Guarantee",
        "product.customer": "BH Customer",

        // Reviews
        "reviews.title": "Customer Reviews",
        "reviews.add": "Add a Review",
        "reviews.placeholder": "Write your review...",
        "reviews.submit": "Submit Review",
        "reviews.empty": "No reviews yet. Be the first to review!",
        "reviews.alert": "Please select a rating",
        "reviews.now": "Now",

        // Deals Page
        "deals.title": "Saving Deals",
        "deals.heroTitle": "Incredible Savings!",
        "deals.heroSubtitle": "Up to 70% off on over 1,000 products for a limited time.",
        "deals.lightningDeals": "Lightning Deals",
        "deals.endsIn": "Deals end in:",
        "deals.hours": "Hours",
        "deals.minutes": "Min",
        "deals.seconds": "Sec",
        "deals.hot": "Hottest",
        "deals.highest": "Highest Discounts",
        "deals.endingSoon": "Ending Soon",
        "deals.newlyArrived": "Newly Arrived",
        "deals.todayDeals": "Featured Today's Deals",
        "deals.off": "{percent}% OFF",

        // Cart
        "cart.title": "Shopping Cart",
        "cart.empty": "Shopping Cart is Empty",
        "cart.emptyMessage": "Looks like you haven't added any products to your cart yet.",
        "cart.startShopping": "Start Shopping Now",
        "cart.inStock": "In Stock",
        "cart.delete": "Delete",
        "cart.orderSummary": "Order Summary",
        "cart.subtotal": "Subtotal",
        "cart.products": "items",
        "cart.shipping": "Shipping",
        "cart.free": "Free",
        "cart.total": "Total",
        "cart.checkout": "Proceed to Checkout",
        "cart.vatNote": "Prices include VAT where applicable.",
        "cart.quantity": "Quantity",

        // Checkout
        "checkout.title": "Checkout",
        "checkout.orderSummary": "Order Summary",
        "checkout.quantity": "Quantity:",
        "checkout.total": "Total",
        "checkout.payButton": "Pay & Complete",
        "checkout.processing": "Processing...",
        "checkout.paymentInfo": "Payment Information",
        "checkout.paymentMessage": "You will be redirected to a secure payment gateway to complete your purchase.",
        "checkout.emptyCart": "Shopping Cart is Empty",
        "checkout.backToShopping": "Back to Shopping",
        "checkout.securePaymentNote": "All your financial transactions are encrypted and completely secure. We do not store your credit card details.",

        // Success
        "success.title": "Order Confirmed!",
        "success.message": "Thank you for shopping at BH Store. Your order has been received and is now being processed.",
        "success.trackOrder": "Track Your Order",
        "success.backHome": "Back to Home",
        "success.securePayment": "Secure Encrypted Payment",

        // Footer
        "footer.backToTop": "Back to Top",
        "footer.aboutUs": "Get to Know Us",
        "footer.about": "About BH Store",
        "footer.careers": "Careers",
        "footer.press": "Press Relations",
        "footer.partner": "Partner with Us",
        "footer.sell": "Sell on Our Store",
        "footer.affiliate": "Affiliate Marketing",
        "footer.advertise": "Advertise Your Products",
        "footer.payment": "Payment Methods & Services",
        "footer.giftCards": "Gift Cards",
        "footer.conversion": "Currency Converter",
        "footer.shipping": "Track Shipments",
        "footer.help": "Help",
        "footer.account": "Your Account",
        "footer.returns": "Return Policy",
        "footer.helpCenter": "Help Center",
        "footer.terms": "Terms of Use",
        "footer.privacy": "Privacy Notice",
        "footer.ads": "Interest-Based Ads",
        "footer.copyright": "© 2026, BH Store. All rights reserved.",

        // Admin
        "admin.title": "Admin Panel",
        "admin.overview": "Overview",
        "admin.products": "Products",
        "admin.categories": "Categories",
        "admin.orders": "Orders",
        "admin.users": "Users",
        "admin.settings": "Settings",
        "admin.logout": "Logout",
        "admin.welcome": "Welcome back to your administration dashboard.",
        "admin.totalSales": "Total Sales",
        "admin.newOrders": "New Orders",
        "admin.activeProducts": "Active Products",
        "admin.newCustomers": "New Customers",
        "admin.recentOrders": "Recent Orders",
        "admin.productPerformance": "Product Performance",
        "admin.orderId": "Order #",
        "admin.processing": "Processing",
        "admin.completed": "Completed",
        "admin.cancelled": "Cancelled",
        "admin.viewAll": "View All",
        "admin.trending": "vs last month",
        "admin.addCategory": "Add New Category",
        "admin.editCategory": "Edit Category",
        "admin.categoryName": "Category Name",
        "admin.categorySlug": "Slug",
        "admin.productCount": "Products Count",
        "admin.categoryImage": "Category Image",
        "admin.actions": "Actions",
        "admin.userName": "User Name",
        "admin.userEmail": "Email",
        "admin.userRole": "Role",
        "admin.userStatus": "Status",
        "admin.userActive": "Active",
        "admin.userBanned": "Banned",
        "admin.userAdmin": "Admin",
        "admin.userCustomer": "Customer",
        "admin.addUser": "Add New User",
        "admin.roleAdmin": "Admin",
        "admin.roleCustomer": "Buyer",
        "admin.lastLogin": "Last Appearance",
    },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("ar");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && (savedLang === "ar" || savedLang === "en")) {
            setLanguage(savedLang);
            document.documentElement.lang = savedLang;
            document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
        }
    }, []);

    const toggleLanguage = () => {
        const newLang: Language = language === "ar" ? "en" : "ar";
        setLanguage(newLang);
        localStorage.setItem("language", newLang);
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    };

    const t = (key: string, params?: Record<string, string | number>): string => {
        let text = translations[language][key as keyof typeof translations.ar] || key;

        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, String(v));
            });
        }

        return text;
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        // Provide fallback for server-side rendering
        return {
            language: "ar" as Language,
            toggleLanguage: () => { },
            t: (key: string, params?: Record<string, string | number>) => {
                let text = translations.ar[key as keyof typeof translations.ar] || key;
                if (params) {
                    Object.entries(params).forEach(([k, v]) => {
                        text = text.replace(`{${k}}`, String(v));
                    });
                }
                return text;
            },
        };
    }
    return context;
}
