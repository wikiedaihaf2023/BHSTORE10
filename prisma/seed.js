const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    try {
        await prisma.review.deleteMany();
        await prisma.orderItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();
    } catch (e) {
        console.log("No data to clear or tables don't exist yet.");
    }

    // Create Categories
    const electronics = await prisma.category.create({
        data: { name: 'إلكترونيات', slug: 'electronics' },
    });

    const fashion = await prisma.category.create({
        data: { name: 'أزياء', slug: 'fashion' },
    });

    const home = await prisma.category.create({
        data: { name: 'المنزل والمطبخ', slug: 'home' },
    });

    const toys = await prisma.category.create({
        data: { name: 'الألعاب', slug: 'toys' },
    });

    const beauty = await prisma.category.create({
        data: { name: 'الجمال', slug: 'beauty' },
    });

    // Create Products
    await prisma.product.createMany({
        data: [
            {
                name: 'هاتف ذكي بلس 15 برو - تيتانيوم',
                description: 'أحدث هاتف ذكي بمعالج A17 وشاشة OLED مذهلة وتصميم تيتانيوم متين.',
                price: 4999,
                stock: 50,
                image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
                categoryId: electronics.id,
            },
            {
                name: 'ساعة ذكية الترا - الإصدار الثاني',
                description: 'رفيقك المثالي للمغامرة مع بطارية تدوم طويلاً ونظام تحديد مواقع دقيق.',
                price: 3299,
                stock: 30,
                image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
                categoryId: electronics.id,
            },
            {
                name: 'سماعات بلوتوث لاسلكية عازلة للضجيج',
                description: 'صوت عالي الدقة مع خاصية إلغاء الضوضاء الفعالة لراحة طوال اليوم.',
                price: 1299,
                stock: 100,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
                categoryId: electronics.id,
            },
            {
                name: 'سيارة سباق بجهاز تحكم عن بعد',
                description: 'سيارة سباق سريعة ومتينة مع نظام تحكم 2.4 جيجاهرتز ومدى طويل.',
                price: 245,
                stock: 45,
                image: 'https://images.unsplash.com/photo-1594787334569-356127b7503a?auto=format&fit=crop&q=80&w=800',
                categoryId: toys.id,
            },
            {
                name: 'مجموعة بناء الروبوت الذكي',
                description: 'مجموعة تعليمية لتعلم البرمجة وبناء الروبوتات للأطفال والناشئين.',
                price: 540,
                stock: 15,
                image: 'https://images.unsplash.com/photo-1535313366835-bc3222dc6446?auto=format&fit=crop&q=80&w=800',
                categoryId: toys.id,
            },
            {
                name: 'طائرة بدون طيار (درون) استكشافية',
                description: 'طائرة درون مع كاميرا HD ونظام ثبات ذكي، مثالية للمبتدئين.',
                price: 890,
                stock: 10,
                image: 'https://images.unsplash.com/photo-1473966968600-fa804b8682a3?auto=format&fit=crop&q=80&w=800',
                categoryId: toys.id,
            },
            {
                name: 'مجموعة مستحضرات التجميل العضوية',
                description: 'تركيبة طبيعية 100% لبشرة نضرة ومشرقة طوال اليوم.',
                price: 320,
                stock: 60,
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
                categoryId: beauty.id,
            }
        ],
    });

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
