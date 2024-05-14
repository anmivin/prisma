import { initTRPC } from '@trpc/server';
import { Service } from './service';
import { z } from 'zod';
const t = initTRPC.create();

export const appRouter = t.router({
  signin: t.procedure
    .input(
      z.object({
        login: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const user = await Service.getUserByLogin(input.login);
      await Service.checkUserPassword(user.password, input.password);
      return user;
    }),
  signup: t.procedure
    .input(
      z.object({
        login: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await Service.signUp(input);
    }),
  getReports: t.procedure.input(z.number()).query(async ({ input }) => {
    return await Service.getUserReports(input);
  }),
  createReport: t.procedure
    .input(
      z.object({
        date: z.date(),
        userId: z.number(),
        content: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      return await Service.addReport(input.date, input.userId, input.content);
    }),
});

export type AppRouter = typeof appRouter;
