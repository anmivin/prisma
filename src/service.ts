import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const Service = {
  getUserById: async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('Пользователь не найден');
    return user;
  },
  getUserByLogin: async (login: string) => {
    const user = await prisma.user.findUnique({ where: { name: login } });
    if (!user) throw new Error('Пользователь не найден');
    return user;
  },
  checkUserPassword: async (dbPass: string, inputPass: string) => {
    if (dbPass !== inputPass) throw new Error('Неверный пароль');
  },
  signUp: async (userCreds: { login: string; email: string; password: string }) => {
    return await prisma.user.create({
      data: { name: userCreds.login, email: userCreds.email, password: userCreds.password },
    });
  },
  getUserReports: async (userId: number) => {
    return await prisma.report.findMany({ where: { userId } });
  },
  addReport: async (date: Date, userId: number, content: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue) => {
    await prisma.report.create({ data: { date, userId, content } });
  },
};
