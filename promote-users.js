const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.updateMany({
        where: { email: { in: ['hafethhafedthyem@gmail.com', 'wikiedai.haf2023@gmail.com'] } },
        data: { role: 'ADMIN' }
    });
    console.log('Users promoted to ADMIN');
}

main().catch(console.error).finally(() => prisma.$disconnect());
