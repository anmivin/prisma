import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function DefaultUser() {
  await prisma.user.create({ data: { email: 'admin@admin.com', password: 'password', name: 'admin' } });
}

DefaultUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
